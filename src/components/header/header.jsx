import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './header.module.css';
import defaultAvatar from './testAvatar.png';
import useUserInfo from '../../hooks/useUserInfo';

function Header({ authToken, setAuthToken }) {
  const user = useUserInfo(authToken);

  const avatarURL = user.image ? user.image : defaultAvatar;
  const authButtons = (
    <>
      <Link to="/new-article" className={classes.buttonCreateArticle}>
        Create Article
      </Link>
      <Link to="/profile" className={classes.buttonProfile}>
        <span className={classes.username}>{user.username}</span>
        <img height="46px" src={avatarURL} alt="avatar" />
      </Link>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          setAuthToken(null);
        }}
        className={classes.buttonLogOut}
        type="button"
      >
        Log Out
      </button>
    </>
  );

  const nonAuthButtons = (
    <>
      <Link to="/sign-in" className={classes.buttonAuth} type="button">
        Sign In
      </Link>
      <Link to="/sign-up" className={`${classes.buttonAuth} ${classes.buttonAuthUp}`} type="button">
        Sign Up
      </Link>
    </>
  );
  const buttons = authToken ? authButtons : nonAuthButtons;

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/articles" className={classes.title}>
          Realworld Blog
        </Link>
        {buttons}
      </div>
    </header>
  );
}

Header.defaultProps = {
  authToken: null,
};

Header.propTypes = {
  authToken: PropTypes.string,
  setAuthToken: PropTypes.func.isRequired,
};

export default Header;
