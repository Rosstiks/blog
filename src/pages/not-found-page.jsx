import React from 'react';
import classes from './pages.module.scss';

function NotFoundPage() {
  return (
    <div className={classes.notFoundContainer}>
      <h2 className={classes.notFoundStatus}>404</h2>
      <div>
        <h2>Not Found Page</h2>
        <p className={classes.notFoundDescription}>This page does not exist or has been deleted</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
