import React from 'react';
import PropTypes from 'prop-types';
import classes from '../forms.module.css';

function ConfidentialCheckbox({ register, validationErrors }) {
  return (
    <>
      <label className={classes.confidentialityBlock}>
        <input
          className={classes.confidentialityCheck}
          type="checkbox"
          defaultChecked
          {...register('confidential', {
            validate: (value) => value,
          })}
        />
        <span>I agree to the processing of my personal information</span>
      </label>
      {validationErrors.confidential && <p className={classes.validationMessage}>This checkbox is required.</p>}
    </>
  );
}

ConfidentialCheckbox.defaultProps = {
  validationErrors: {},
};

ConfidentialCheckbox.propTypes = {
  register: PropTypes.func.isRequired,
  validationErrors: PropTypes.object,
};

export default ConfidentialCheckbox;
