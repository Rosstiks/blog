import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './pages.module.scss';
import ApiService from '../services/api-service';
import LoginForm from '../components/auth-forms/login-form';
import Alert from '../components/alert';

function LoginPage({ setAuthToken, token }) {
  const navigate = useNavigate();
  const apiService = new ApiService();
  const [error, setError] = useState({ server: false, network: false });

  const onSubmit = (user) => {
    apiService
      .loginUser(user)
      .then((data) => {
        const { result } = data;
        if (!data.ok) {
          setError({ server: true, network: false });
          return;
        }
        setAuthToken(result.user.token);
        localStorage.setItem('token', result.user.token);
        navigate('/articles', { replace: true });
      })
      .catch(() => setError({ server: false, network: true }));
  };

  const clearAuthError = () => {
    if (error.server) setError({ server: false, network: false });
  };

  if (token) return <Navigate to="/articles" replace />;

  if (error.network) return <Alert type="error" />;

  return (
    <div className={classes.authFormContainer}>
      <h2 className={classes.title}>Sign In</h2>
      <LoginForm onSubmit={onSubmit} authError={error.server} clearAuthError={clearAuthError} />
      <span className={classes.redirectBlock}>
        Don’t have an account?
        <Link className={classes.redirectLink} to="/sign-up">
          Sign Up.
        </Link>
      </span>
    </div>
  );
}

LoginPage.defaultProps = {
  token: null,
};

LoginPage.propTypes = {
  setAuthToken: PropTypes.func.isRequired,
  token: PropTypes.string,
};

export default LoginPage;
