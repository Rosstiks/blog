import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './header.module.scss';
import defaultAvatar from './testAvatar.png';
import { UserContext } from '../../context';

function Header({ onLogOut }) {
  const user = useContext(UserContext);

  const avatarURL = user.image ? user.image : defaultAvatar;
  const authButtons = (
    <>
      <Link to="/new-article" className={classes.buttonCreateArticle}>
        Create Article
      </Link>
      <Link to="/profile" className={classes.buttonProfile}>
        <span className={classes.username}>{user.username}</span>
        <img className={classes.avatar} src={avatarURL} alt="avatar" />
      </Link>
      <button onClick={onLogOut} className={classes.buttonLogOut} type="button">
        Log Out
      </button>
    </>
  );

  const nonAuthButtons = (
    <>
      <Link to="/sign-in" className={classes.buttonSignIn} type="button">
        Sign In
      </Link>
      <Link to="/sign-up" className={classes.buttonSignUp} type="button">
        Sign Up
      </Link>
    </>
  );
  const buttons = user.token ? authButtons : nonAuthButtons;

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

Header.propTypes = {
  onLogOut: PropTypes.func.isRequired,
};

export default Header;
