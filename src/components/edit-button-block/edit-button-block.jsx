import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './edit-button-block.module.scss';

const EditButtonBlock = ({ slug }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className={classes.buttonContainer}>
      <div className={classes.deleteContainer}>
        <button onClick={() => setShowConfirm(true)} className={classes.buttonDelete} type="button">
          Delete
        </button>
        <div className={classes.modalContainer} hidden={!showConfirm}>
          <span className={classes.modalText}>Are you sure to delete this article?</span>
          <div>
            <button type="button">No</button>
            <button type="button">Yes</button>
          </div>
        </div>
      </div>
      <Link to={`/articles/${slug}/edit`} state={{ slug }} className={classes.buttonEdit}>
        Edit
      </Link>
    </div>
  );
};

EditButtonBlock.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default EditButtonBlock;
