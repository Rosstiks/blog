import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import RegistrationForm from '../components/auth-forms/registration-form';
import Alert from '../components/alert';
import classes from './pages.module.scss';
import { ApiServiceContext, UserContext } from '../context';

function RegistrationPage({ autoLogin }) {
  const apiService = useContext(ApiServiceContext);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const initialStatusState = {
    errors: {
      server: {},
      network: false,
    },
    loading: false,
    completed: false,
  };
  const [status, setStatus] = useState(initialStatusState);
  useEffect(() => {
    let timeout;
    if (status.completed) {
      timeout = setTimeout(() => navigate('/', { replace: true }), 2000);
    }
    return () => clearTimeout(timeout);
  }, [status.completed, navigate]);

  const onSubmit = (userInfo) => {
    setStatus({ ...initialStatusState, loading: true });
    apiService
      .createUser(userInfo)
      .then((data) => {
        const { result } = data;
        if (!data.ok) {
          setStatus({ ...initialStatusState, errors: { network: false, server: result.errors } });
          return;
        }
        autoLogin({ ...result.user, password: userInfo.password });
        setStatus({ ...initialStatusState, completed: true });
      })
      .catch(() => setStatus({ ...initialStatusState, errors: { network: true, server: {} } }));
  };

  const clearServerError = (field) => {
    setStatus((prev) => ({
      ...initialStatusState,
      errors: {
        network: false,
        server: { ...prev.server, [field]: null },
      },
    }));
  };

  if (user.token && !status.completed) return <Navigate to="/articles" replace />;
  if (status.errors.network) return <Alert type="anyError" />;
  if (status.completed) return <Alert type="User created" />;

  return (
    <div className={classes.authFormContainer}>
      <h2 className={classes.title}>Create new account</h2>
      <RegistrationForm onSubmit={onSubmit} authError={status.errors.server} clearAuthError={clearServerError} />
      <span className={classes.redirectBlock}>
        Already have an account?
        <Link className={classes.redirectLink} to="/sign-in">
          Sign In.
        </Link>
      </span>
    </div>
  );
}

RegistrationPage.propTypes = {
  autoLogin: PropTypes.func.isRequired,
};

export default RegistrationPage;
