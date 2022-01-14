import React from 'react';
import PropTypes, { string } from 'prop-types';
import { useForm } from 'react-hook-form';
import UsernameField from './fields/username-field';
import EmailField from './fields/email-field';
import PasswordField from './fields/password-field';
import RepeatPasswordField from './fields/repeat-password-field';
import ConfidentialCheckbox from './fields/confidential-checkbox';
import SubmitButton from './fields/submit-button';
import classes from './forms.module.css';

function RegistrationForm({ onSubmit, authError, clearAuthError }) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const fieldProps = {
    register,
    watch,
    validationErrors: errors,
    serverError: authError,
    clearServerError: clearAuthError,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <fieldset className={classes.userInfo}>
        <UsernameField {...fieldProps} />
        <EmailField {...fieldProps} />
        <PasswordField {...fieldProps} />
        <RepeatPasswordField {...fieldProps} />
      </fieldset>
      <ConfidentialCheckbox register={register} validationErrors={errors} />
      <SubmitButton text="Create" />
    </form>
  );
}

RegistrationForm.defaultProps = {
  authError: {},
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  clearAuthError: PropTypes.func.isRequired,
  authError: PropTypes.objectOf(string),
};

export default RegistrationForm;
