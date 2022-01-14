import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './pages.module.scss';
import ApiService from '../services/api-service';
import ArticleForm from '../components/article-form/article-form';
import LoadSpinner from '../components/load-spinner';
import Alert from '../components/alert';

const EditArticlePage = ({ token }) => {
  const [status, setStatus] = useState({ loading: true, error: false, completed: false });
  const [article, setArticle] = useState({});
  const apiService = useMemo(() => new ApiService(), []);
  const location = useLocation();
  const { slug } = location.state;

  useEffect(() => {
    apiService
      .getArticle(slug)
      .then((data) => {
        setArticle(data.article);
        setStatus({ loading: false, error: false, completed: false });
      })
      .catch(() => setStatus({ loading: false, error: true, completed: false }));
  }, [apiService, slug]);

  const onSubmit = (data) => {
    setStatus({ loading: true, error: false, completed: false });
    const { tagList } = data;
    const responseData = { article: { ...data, tagList: tagList.map((el) => el.tag) } };
    apiService
      .updatePost(responseData, token, slug)
      .then(() => setStatus({ loading: false, error: false, completed: true }))
      .catch(() => setStatus({ loading: false, error: true, completed: false }));
  };

  if (status.loading) return <LoadSpinner />;
  if (status.error) return <Alert type="error" />;
  if (status.completed) return <Alert type="Post updated" />;

  return (
    <div className={classes.editArticleContainer}>
      <h2 className={classes.title}>Edit article</h2>
      <ArticleForm onSubmit={onSubmit} article={article} />
    </div>
  );
};

EditArticlePage.defaultProps = {
  token: null,
};

EditArticlePage.propTypes = {
  token: PropTypes.string,
};

export default EditArticlePage;
