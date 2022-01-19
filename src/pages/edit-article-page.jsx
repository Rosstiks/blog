import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './pages.module.scss';
import ArticleForm from '../components/article-form/article-form';
import LoadSpinner from '../components/load-spinner';
import Alert from '../components/alert';
import { ApiServiceContext, UserContext } from '../context';

const EditArticlePage = () => {
  const user = useContext(UserContext);
  const apiService = useContext(ApiServiceContext);
  const [status, setStatus] = useState({ loading: true, error: false, completed: false, noAccess: false });
  const [article, setArticle] = useState({});
  const location = useLocation();
  const slug = location.pathname.split('/')[2];

  useEffect(() => {
    apiService
      .getArticle(slug)
      .then((data) => {
        setArticle(data.article);
        if (user.username !== data.article.author.username || !user.username) {
          setStatus({ loading: false, error: false, completed: false, noAccess: true });
          return;
        }
        setStatus({ loading: false, error: false, completed: false, noAccess: false });
      })
      .catch(() => setStatus({ loading: false, error: true, completed: false, noAccess: false }));
  }, [apiService, slug, user]);

  const onSubmit = (data) => {
    setStatus({ loading: true, error: false, completed: false, noAccess: false });
    const { tagList } = data;
    const responseData = { article: { ...data, tagList: tagList.map((el) => el.tag) } };
    apiService
      .updatePost(responseData, user.token, slug)
      .then(() => setStatus({ loading: false, error: false, completed: true, noAccess: false }))
      .catch(() => setStatus({ loading: false, error: true, completed: false, noAccess: false }));
  };

  if (status.noAccess) return <Alert type="accessError" />;
  if (status.loading) return <LoadSpinner />;
  if (status.error) return <Alert type="anyError" />;
  if (status.completed) return <Alert type="Post updated" />;

  return (
    <div className={classes.editArticleContainer}>
      <h2 className={classes.title}>Edit article</h2>
      <ArticleForm onSubmit={onSubmit} article={article} />
    </div>
  );
};

export default EditArticlePage;
