import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './pages.module.scss';
import ProfileForm from '../components/auth-forms/profile-form';
import Alert from '../components/alert';
import { ApiServiceContext, UserContext } from '../context';

function ProfileEditPage({ updateInfo }) {
  const apiService = useContext(ApiServiceContext);
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

  const onSubmit = (userInfo) => {
    setStatus({ ...initialStatusState, loading: true });
    apiService
      .updateUserInfo(userInfo, user.token)
      .then((data) => {
        const { result } = data;
        if (!data.ok) {
          setStatus({ ...initialStatusState, errors: { network: false, server: result.errors } });
          return;
        }
        updateInfo(result.user.token);
        setStatus({ ...initialStatusState, completed: true });
      })
      .catch(() => setStatus({ ...initialStatusState, errors: { network: true, server: {} } }));
  };

  const clearDataError = (field) => {
    setStatus((prev) => ({
      ...initialStatusState,
      errors: {
        network: false,
        server: { ...prev.server, [field]: null },
      },
    }));
  };

  if (!user.token) return <Navigate to="/articles" replace />;
  if (status.errors.network) return <Alert type="anyError" />;
  if (status.completed) return <Alert type="Update user info" />;

  return (
    <div className={classes.authFormContainer}>
      <h2 className={classes.title}>Edit Profile</h2>
      <ProfileForm onSubmit={onSubmit} dataError={status.errors.server} clearDataError={clearDataError} />
    </div>
  );
}

ProfileEditPage.propTypes = {
  updateInfo: PropTypes.func.isRequired,
};

export default ProfileEditPage;
