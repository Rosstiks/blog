import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { marked } from 'marked';
import Item from '../components/item';
import LoadSpinner from '../components/load-spinner';
import classes from './pages.module.scss';
import Alert from '../components/alert';
import { UserContext, ConfirmDeleteContext, ApiServiceContext } from '../context';

function PostPage() {
  const apiService = useContext(ApiServiceContext);
  const user = useContext(UserContext);
  const [article, setArticle] = useState({});
  const [status, setStatus] = useState({ loading: true, error: false, deleted: false });

  const location = useLocation();
  const lastSlashPos = location.pathname.lastIndexOf('/');
  const slug = location.pathname.slice(lastSlashPos + 1);

  useEffect(() => {
    apiService
      .getArticle(slug, user)
      .then((data) => {
        setArticle(data.article);
        setStatus({ loading: false, error: false, deleted: false });
      })
      .catch(() => setStatus({ loading: false, error: true, deleted: false }));
  }, [apiService, location, slug, user]);

  const onDeletePost = useCallback(() => {
    apiService.deletePost(slug, user.token).then(() => setStatus({ loading: false, error: false, deleted: true }));
  }, [apiService, slug, user.token]);

  if (status.loading) return <LoadSpinner />;
  if (status.error) return <Alert type="anyError" />;
  if (status.deleted) return <Alert type="Post deleted" />;

  return (
    <ConfirmDeleteContext.Provider value={onDeletePost}>
      <div className={classes.articleContainer}>
        <Item {...article} currentUser={user.username}>
          <span className={classes.articlesBody} dangerouslySetInnerHTML={{ __html: marked(article.body) }} />
        </Item>
      </div>
    </ConfirmDeleteContext.Provider>
  );
}

export default PostPage;
