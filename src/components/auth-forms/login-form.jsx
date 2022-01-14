import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import classes from './forms.module.css';
import EmailField from './fields/email-field';
import PasswordField from './fields/password-field';
import SubmitButton from './fields/submit-button';

function LoginForm({ onSubmit, authError, clearAuthError }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const fieldProps = {
    register,
    validationErrors: errors,
    clearServerError: clearAuthError,
  };

  const authErrorMessage = (
    <p
      className={classes.validationMessage}
      style={{
        margin: '10px auto',
        fontSize: '1.2rem',
        textAlign: 'center',
      }}
    >
      User with such email and password was not found
    </p>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {authError && authErrorMessage}
      <EmailField {...fieldProps} />
      <PasswordField {...fieldProps} />
      <SubmitButton text="Login" />
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authError: PropTypes.bool.isRequired,
  clearAuthError: PropTypes.func.isRequired,
};

export default LoginForm;
