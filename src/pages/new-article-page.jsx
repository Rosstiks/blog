import React, { useState, useContext } from 'react';
import classes from './pages.module.scss';
import ArticleForm from '../components/article-form/article-form';
import LoadSpinner from '../components/load-spinner';
import Alert from '../components/alert';
import { ApiServiceContext, UserContext } from '../context';

const NewArticlePage = () => {
  const user = useContext(UserContext);
  const apiService = useContext(ApiServiceContext);
  const [status, setStatus] = useState({ loading: false, error: false, completed: false });

  const onSubmit = (data) => {
    setStatus({ loading: true, error: false, completed: false });
    const { tagList } = data;
    const responseData = { article: { ...data, tagList: tagList.map((el) => el.tag) } };
    apiService
      .createPost(responseData, user.token)
      .then(() => setStatus({ loading: false, error: false, completed: true }))
      .catch(() => setStatus({ loading: false, error: true, completed: false }));
  };

  if (status.loading) return <LoadSpinner />;
  if (status.error) return <Alert type="anyError" />;
  if (status.completed) return <Alert type="Post created" />;

  return (
    <div className={classes.editArticleContainer}>
      <h2 className={classes.title}>Create new article</h2>
      <ArticleForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewArticlePage;
