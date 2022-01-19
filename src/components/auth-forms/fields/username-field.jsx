import React from 'react';
import PropTypes, { string } from 'prop-types';
import classes from '../forms.module.css';

function UsernameField({ register, serverError, validationErrors, clearServerError, defaultValue }) {
  const username = register('username');
  const serverErrorMessage = serverError.username ? (
    <p className={classes.validationMessage}>This username {serverError.username}</p>
  ) : null;

  return (
    <label className={classes.userInfoItem}>
      {serverErrorMessage}
      {validationErrors.username && (
        <p className={classes.validationMessage}>Your username must be 3-20 characters long.</p>
      )}
      <input
        className={classes.textInput}
        defaultValue={defaultValue}
        type="text"
        placeholder="Username"
        {...register('username', { required: true, minLength: 3, maxLength: 20 })}
        onChange={(evt) => {
          username.onChange(evt);
          clearServerError('username');
        }}
      />
      <span className={classes.label}>Username</span>
    </label>
  );
}

UsernameField.defaultProps = {
  serverError: {},
  clearServerError: () => {},
  validationErrors: {},
  defaultValue: null,
};

UsernameField.propTypes = {
  register: PropTypes.func.isRequired,
  serverError: PropTypes.objectOf(string),
  validationErrors: PropTypes.object,
  clearServerError: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default UsernameField;
