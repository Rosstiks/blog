import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { marked } from 'marked';
import PropTypes from 'prop-types';
import ApiService from '../services/api-service';
import Item from '../components/item';
import LoadSpinner from '../components/load-spinner';
import classes from './pages.module.scss';
import Alert from '../components/alert';

function PostPage({ username }) {
  const apiService = useMemo(() => new ApiService(), []);
  const [article, setArticle] = useState({});
  const [status, setStatus] = useState({ loading: true, error: false });
  const location = useLocation();

  useEffect(() => {
    const lastSlashPos = location.pathname.lastIndexOf('/');
    const slug = location.pathname.slice(lastSlashPos + 1);
    apiService
      .getArticle(slug)
      .then((data) => {
        setArticle(data.article);
        setStatus({ loading: false, error: false });
      })
      .catch(() => setStatus({ loading: false, error: true }));
  }, [apiService, location]);

  if (status.loading) return <LoadSpinner />;
  if (status.error) return <Alert type="error" />;

  return (
    <div className={classes.articleContainer}>
      <Item {...article} currentUser={username}>
        <span className={classes.articlesBody} dangerouslySetInnerHTML={{ __html: marked(article.body) }} />
      </Item>
    </div>
  );
}

PostPage.defaultProps = {
  username: null,
};

PostPage.propTypes = {
  username: PropTypes.string,
};

export default PostPage;
