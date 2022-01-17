import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import { format } from 'date-fns';
import EditButtonBlock from '../edit-button-block/edit-button-block';
import classes from './item.module.scss';
import iconLike from './Like-icon.svg';
import iconLikeActive from './Like-icon-active.svg';
import { ApiServiceContext, UserContext } from '../../context';

function Item({
  slug,
  title,
  favoritesCount,
  tagList,
  description,
  favorited,
  author,
  createdAt,
  // eslint-disable-next-line react/prop-types
  children,
  currentUser,
}) {
  const apiService = useContext(ApiServiceContext);
  const user = useContext(UserContext);
  const [favoritedMemo, setFavoritedMemo] = useState({ state: favorited, count: favoritesCount });

  const tagsBlock = tagList.map((tag) => {
    if (!tag) return null;
    return (
      <span key={`${tag}${Math.random()}`} className={classes.tag}>
        {tag}
      </span>
    );
  });

  const createDate = format(new Date(createdAt), 'MMMM d, uu');

  const editButtonsBlock = currentUser === author.username ? <EditButtonBlock slug={slug} /> : null;

  const onFavoritedChange = () => {
    if (!user.token) return;
    const type = favoritedMemo.state ? 'DELETE' : 'POST';
    apiService.changeFavoritePost(slug, user.token, type).then(() =>
      setFavoritedMemo((prev) => ({
        state: !prev.state,
        count: prev.state ? prev.count - 1 : prev.count + 1,
      }))
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.topAreaContent}>
            <Link to={`/articles/${slug}`} className={classes.titleLink}>
              <h2 className={classes.title}>{title}</h2>
            </Link>
            <button onClick={onFavoritedChange} className={classes.buttonLike} type="button">
              <img src={favoritedMemo.state ? iconLikeActive : iconLike} alt="like" height="16px" />
            </button>
            <span>{favoritedMemo.count}</span>
          </div>
          <div className={classes.tagsContainer}>{tagsBlock}</div>
          <p className={children ? classes.descriptionOnItem : classes.descriptionOnList}>{description}</p>
        </div>
        <div>
          <div className={classes.infoContainer}>
            <div className={classes.info}>
              <span className={classes.infoName}>{author.username}</span>
              <span className={classes.infoDate}>{createDate} </span>
            </div>
            <img src={author.image} alt="avatar" height="46px" />
          </div>
          {editButtonsBlock}
        </div>
      </div>
      {children}
    </>
  );
}

Item.defaultProps = {
  currentUser: null,
};

Item.propTypes = {
  currentUser: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  tagList: PropTypes.arrayOf(string).isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }).isRequired,
};

export default Item;
