import React from 'react';
import PropTypes from 'prop-types';
import classes from '../forms.module.css';

function RepeatPasswordField({ register, validationErrors, watch }) {
  return (
    <label className={classes.userInfoItem}>
      {validationErrors.repeatPassword && <p className={classes.validationMessage}>Passwords must match.</p>}
      <input
        className={classes.textInput}
        type="password"
        placeholder="Password"
        {...register('repeatPassword', {
          required: true,
          validate: (value) => value === watch('password'),
        })}
      />
      <span className={classes.label}>Repeat Password</span>
    </label>
  );
}

RepeatPasswordField.defaultProps = {
  validationErrors: {},
};

RepeatPasswordField.propTypes = {
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  validationErrors: PropTypes.object,
};

export default RepeatPasswordField;
