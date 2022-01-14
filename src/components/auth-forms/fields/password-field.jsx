import React from 'react';
import PropTypes, { string } from 'prop-types';
import classes from '../forms.module.css';

function PasswordField({ register, serverError, validationErrors, clearServerError }) {
  const password = register('password');
  const serverErrorMessage = serverError.password ? (
    <p className={classes.validationMessage}>This password {serverError.password}</p>
  ) : null;

  return (
    <label className={classes.userInfoItem}>
      {serverErrorMessage}
      {validationErrors.password && (
        <p className={classes.validationMessage}>Your password must be 6-40 characters long.</p>
      )}
      <input
        className={classes.textInput}
        type="password"
        placeholder="Password"
        {...register('password', { required: true, minLength: 6, maxLength: 40 })}
        onChange={(evt) => {
          password.onChange(evt);
          clearServerError('password');
        }}
      />
      <span className={classes.label}>Password</span>
    </label>
  );
}

PasswordField.defaultProps = {
  serverError: {},
  clearServerError: () => {},
  validationErrors: {},
};

PasswordField.propTypes = {
  register: PropTypes.func.isRequired,
  serverError: PropTypes.objectOf(string),
  validationErrors: PropTypes.object,
  clearServerError: PropTypes.func,
};

export default PasswordField;
