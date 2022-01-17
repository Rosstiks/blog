import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './edit-button-block.module.scss';
import { ConfirmDeleteContext } from '../../context';

const EditButtonBlock = ({ slug }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const onConfirmDelete = useContext(ConfirmDeleteContext);

  return (
    <div className={classes.buttonContainer}>
      <div className={classes.deleteContainer}>
        <button onClick={() => setShowConfirm(true)} className={classes.buttonDelete} type="button">
          Delete
        </button>
        <div className={classes.modalContainer} hidden={!showConfirm}>
          <span className={classes.modalText}>Are you sure to delete this article?</span>
          <div className={classes.modalButtonsContainer}>
            <button onClick={() => setShowConfirm(false)} className={classes.buttonDecline} type="button">
              No
            </button>
            <button onClick={onConfirmDelete} className={classes.buttonConfirm} type="button">
              Yes
            </button>
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
