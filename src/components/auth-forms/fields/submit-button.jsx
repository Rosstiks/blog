import React from 'react';
import PropTypes from 'prop-types';
import classes from '../forms.module.css';

function SubmitButton({ text }) {
  return <input className={classes.submitButton} type="submit" value={text} />;
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubmitButton;
