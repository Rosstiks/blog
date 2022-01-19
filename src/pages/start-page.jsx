import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Pagination } from 'antd';
import Item from '../components/item';
import LoadSpinner from '../components/load-spinner';
import Alert from '../components/alert';
import classes from './pages.module.scss';
import { ApiServiceContext, UserContext } from '../context';

function StartPage() {
  const apiService = useContext(ApiServiceContext);
  const user = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [stateRequest, setStateRequest] = useState({ loading: true, error: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const getArticles = useCallback(() => {
    apiService
      .getArticlesGlobally(currentPage, user.token)
      .then((data) => {
        setArticles(data.articles);
        setTotalArticles(data.articlesCount);
        setStateRequest({ loading: false, error: false });
      })
      .catch(() => setStateRequest({ loading: false, error: true }));
  }, [apiService, currentPage, user]);

  useEffect(getArticles, [getArticles]);

  const onPageChange = (page) => {
    window.scroll(0, 0);
    setCurrentPage(page);
  };

  const items = articles.map((post) => (
    <li className={classes.itemContainer} key={post.slug}>
      <Item {...post} />
    </li>
  ));

  if (stateRequest.loading) return <LoadSpinner />;

  if (stateRequest.error) return <Alert type="anyError" />;

  return (
    <>
      <ul className={classes.itemList}>{items}</ul>
      <div className={classes.paginationContainer}>
        <Pagination
          size="small"
          pageSize={5}
          showSizeChanger={false}
          current={currentPage}
          onChange={onPageChange}
          total={totalArticles}
        />
      </div>
    </>
  );
}

export default StartPage;
