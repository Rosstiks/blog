import React from 'react';
import PropTypes, { string } from 'prop-types';
import classes from '../forms.module.css';

function EmailField({ register, serverError, validationErrors, clearServerError, defaultValue }) {
  const email = register('email');
  const serverErrorMessage = serverError.email ? (
    <p className={classes.validationMessage}>This email {serverError.email}</p>
  ) : null;

  return (
    <label className={classes.userInfoItem}>
      {serverErrorMessage}
      {validationErrors.email && <p className={classes.validationMessage}>Input correctly E-mail adress.</p>}
      <input
        className={classes.textInput}
        defaultValue={defaultValue}
        type="text"
        placeholder="Email address"
        {...register('email', {
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        onChange={(evt) => {
          email.onChange(evt);
          clearServerError('email');
        }}
      />
      <span className={classes.label}>Email address</span>
    </label>
  );
}

EmailField.defaultProps = {
  serverError: {},
  clearServerError: () => {},
  validationErrors: {},
  defaultValue: null,
};

EmailField.propTypes = {
  register: PropTypes.func.isRequired,
  serverError: PropTypes.objectOf(string),
  validationErrors: PropTypes.object,
  clearServerError: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default EmailField;
