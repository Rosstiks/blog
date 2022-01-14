import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './pages.module.scss';
import ApiService from '../services/api-service';
import ArticleForm from '../components/article-form/article-form';
import LoadSpinner from '../components/load-spinner';
import Alert from '../components/alert';

const NewArticlePage = ({ token }) => {
  const [status, setStatus] = useState({ loading: false, error: false, completed: false });
  const apiService = new ApiService();

  const onSubmit = (data) => {
    setStatus({ loading: true, error: false, completed: false });
    const { tagList } = data;
    const responseData = { article: { ...data, tagList: tagList.map((el) => el.tag) } };
    apiService
      .createPost(responseData, token)
      .then(() => setStatus({ loading: false, error: false, completed: true }))
      .catch(() => setStatus({ loading: false, error: true, completed: false }));
  };

  if (status.loading) return <LoadSpinner />;
  if (status.error) return <Alert type="error" />;
  if (status.completed) return <Alert type="Post created" />;

  return (
    <div className={classes.editArticleContainer}>
      <h2 className={classes.title}>Create new article</h2>
      <ArticleForm onSubmit={onSubmit} />
    </div>
  );
};

NewArticlePage.defaultProps = {
  token: null,
};

NewArticlePage.propTypes = {
  token: PropTypes.string,
};

export default NewArticlePage;
