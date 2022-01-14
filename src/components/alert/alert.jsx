import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './alert.module.css';
import iconError from './error.png';
import iconSuccessfully from './ок.png';

function Alert({ type }) {
  if (type === 'error') {
    return (
      <div className={classes.container}>
        <img className={classes.icon} src={iconError} alt="error" />
        <div>
          <h2>Ooops, something is wrong...</h2>
          <p>Reload the page and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <img className={classes.icon} src={iconSuccessfully} alt="ок" />
      <div>
        <h2>Congratulations!</h2>
        <p>{type} successfully</p>
        <Link to="/articles" className={classes.buttonStartPage}>
          Back to start page
        </Link>
      </div>
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Alert;
