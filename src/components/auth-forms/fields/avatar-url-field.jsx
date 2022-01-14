import React from 'react';
import PropTypes from 'prop-types';
import classes from '../forms.module.css';

function AvatarURLField({ register, validationErrors }) {
  return (
    <label className={classes.userInfoItem}>
      {validationErrors.image && <p className={classes.validationMessage}>URL is incorrect.</p>}
      <input
        className={classes.textInput}
        type="text"
        placeholder="Avatar image"
        {...register('image', {
          pattern: /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
        })}
      />
      <span className={classes.label}>Avatar image (url)</span>
    </label>
  );
}

AvatarURLField.defaultProps = {
  validationErrors: {},
};

AvatarURLField.propTypes = {
  register: PropTypes.func.isRequired,
  validationErrors: PropTypes.object,
};

export default AvatarURLField;
