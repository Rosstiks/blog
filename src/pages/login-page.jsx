import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './pages.module.scss';
import LoginForm from '../components/auth-forms/login-form';
import Alert from '../components/alert';
import { ApiServiceContext, UserContext } from '../context';

function LoginPage({ onLogin }) {
  const apiService = useContext(ApiServiceContext);
  const user = useContext(UserContext);
  const initialStatusState = {
    errors: {
      server: false,
      network: false,
    },
    loading: false,
    completed: false,
  };
  const [status, setStatus] = useState(initialStatusState);

  const onSubmit = (user) => {
    setStatus({ ...initialStatusState, loading: true });
    apiService
      .loginUser(user)
      .then((data) => {
        const { result } = data;
        if (!data.ok) {
          setStatus({ ...initialStatusState, errors: { server: true, network: false } });
          return;
        }
        onLogin(result.user.token);
        setStatus({ ...initialStatusState, completed: true });
      })
      .catch(() => setStatus({ ...initialStatusState, errors: { server: false, network: true } }));
  };

  const clearAuthError = () => {
    if (status.errors.server) setStatus(initialStatusState);
  };

  if (user.token && !status.completed) return <Navigate to="/articles" replace />;
  if (status.errors.network) return <Alert type="anyError" />;
  if (status.completed) return <Alert type="Login" />;

  return (
    <div className={classes.authFormContainer}>
      <h2 className={classes.title}>Sign In</h2>
      <LoginForm onSubmit={onSubmit} authError={status.errors.server} clearAuthError={clearAuthError} />
      <span className={classes.redirectBlock}>
        Don’t have an account?
        <Link className={classes.redirectLink} to="/sign-up">
          Sign Up.
        </Link>
      </span>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
