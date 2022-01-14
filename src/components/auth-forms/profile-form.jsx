import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes, { object } from 'prop-types';
import classes from './forms.module.css';
import UsernameField from './fields/username-field';
import EmailField from './fields/email-field';
import PasswordField from './fields/password-field';
import SubmitButton from './fields/submit-button';
import AvatarURLField from './fields/avatar-url-field';

function ProfileForm({ onSubmit, dataError, clearDataError }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const fieldProps = {
    register,
    validationErrors: errors,
    serverError: dataError,
    clearServerError: clearDataError,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <UsernameField {...fieldProps} />
      <EmailField {...fieldProps} />
      <PasswordField {...fieldProps} />
      <AvatarURLField {...fieldProps} />
      <SubmitButton text="Save" />
    </form>
  );
}

ProfileForm.defaultProps = {
  dataError: {},
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  clearDataError: PropTypes.func.isRequired,
  dataError: object,
};

export default ProfileForm;
