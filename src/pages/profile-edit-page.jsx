import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './pages.module.scss';
import ProfileForm from '../components/auth-forms/profile-form';
import Alert from '../components/alert';
import ApiService from '../services/api-service';

function ProfileEditPage({ token, setAuthToken }) {
  const navigate = useNavigate();
  const apiService = new ApiService();
  const [error, setError] = useState({ server: {}, network: false });

  if (!token) {
    return <Navigate to="/articles" replace />;
  }

  const onSubmit = (userInfo) => {
    apiService
      .updateUserInfo(userInfo, token)
      .then((data) => {
        const { result } = data;
        if (!data.ok) {
          setError({ network: false, server: result.errors });
          return;
        }
        setAuthToken(result.user.token);
        navigate('/articles', { replace: true });
      })
      .catch(() => setError({ server: {}, network: true }));
  };

  const clearDataError = (field) => {
    setError((prev) => ({
      network: false,
      server: { ...prev.server, [field]: null },
    }));
  };

  if (error.network) {
    return <Alert type="error" />;
  }

  return (
    <div className={classes.authFormContainer}>
      <h2 className={classes.title}>Edit Profile</h2>
      <ProfileForm onSubmit={onSubmit} dataError={error.server} clearDataError={clearDataError} />
    </div>
  );
}

ProfileEditPage.defaultProps = {
  token: null,
};

ProfileEditPage.propTypes = {
  token: PropTypes.string,
  setAuthToken: PropTypes.func.isRequired,
};

export default ProfileEditPage;
