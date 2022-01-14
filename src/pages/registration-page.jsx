import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import RegistrationForm from '../components/auth-forms/registration-form';
import Alert from '../components/alert';
import classes from './pages.module.scss';
import ApiService from '../services/api-service';

function RegistrationPage({ token, autoLogin }) {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const [error, setError] = useState({ server: {}, network: false });

  const onSubmit = (userInfo) => {
    setError({ server: {}, network: false });
    apiService
      .createUser(userInfo)
      .then((data) => {
        const { result } = data;
        if (!data.ok) {
          setError({ network: false, server: result.errors });
          return;
        }
        autoLogin({ ...result.user, password: userInfo.password });
        navigate('/articles', { replace: true });
      })
      .catch(() => setError({ server: {}, network: true }));
  };

  const clearAuthError = (field) => {
    setError((prev) => ({
      network: false,
      server: { ...prev.server, [field]: null },
    }));
  };

  if (token) {
    return <Navigate to="/articles" replace />;
  }

  if (error.network) {
    return <Alert type="error" />;
  }

  return (
    <div className={classes.authFormContainer}>
      <h2 className={classes.title}>Create new account</h2>
      <RegistrationForm onSubmit={onSubmit} authError={error.server} clearAuthError={clearAuthError} />
      <span className={classes.redirectBlock}>
        Already have an account?
        <Link className={classes.redirectLink} to="/sign-in">
          Sign In.
        </Link>
      </span>
    </div>
  );
}

RegistrationPage.defaultProps = {
  token: null,
};

RegistrationPage.propTypes = {
  autoLogin: PropTypes.func.isRequired,
  token: PropTypes.string,
};

export default RegistrationPage;
