import React from 'react';
import { HashLoader } from 'react-spinners';
import classes from './load-spinner.module.css';

function LoadSpinner() {
  return (
    <div className={classes.container}>
      <HashLoader color="#2196f3" size={70} />
    </div>
  );
}

export default LoadSpinner;
