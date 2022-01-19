import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './alert.module.css';
import iconError from './error.png';
import iconSuccessfully from './ок.png';

function Alert({ type }) {
  const regMessage =
    type === 'User created' ? (
      <p className={classes.redirectMessage}>
        If you are not automatically redirected to the start page, click the button:
      </p>
    ) : null;

  const errorMessage = {
    anyError: {
      title: 'Oops, something is wrong...',
      description: 'Reload the page and try again',
    },
    accessError: {
      title: 'No Access',
      description: 'Sorry, you do not have access to this page',
    },
  };

  if (type === 'anyError' || type === 'accessError') {
    return (
      <div className={classes.container}>
        <img className={classes.icon} src={iconError} alt="error" />
        <div>
          <h2>{errorMessage[type].title}</h2>
          <p>{errorMessage[type].description}</p>
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
        {regMessage}
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
