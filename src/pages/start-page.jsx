import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Pagination } from 'antd';
import ApiService from '../services/api-service';
import Item from '../components/item';
import LoadSpinner from '../components/load-spinner';
import Alert from '../components/alert';
import classes from './pages.module.scss';

function StartPage() {
  const apiService = useMemo(() => new ApiService(), []);
  const [articles, setArticles] = useState([]);
  const [stateRequest, setStateRequest] = useState({ loading: true, error: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const getArticles = useCallback(() => {
    setStateRequest({ loading: true, error: false });
    apiService
      .getArticlesGlobally(currentPage)
      .then((data) => {
        setArticles(data.articles);
        setTotalArticles(data.articlesCount);
        setStateRequest({ loading: false, error: false });
      })
      .catch(() => setStateRequest({ loading: false, error: true }));
  }, [currentPage, apiService]);

  useEffect(() => getArticles(), [getArticles]);

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

  if (stateRequest.error) return <Alert type="error" />;

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
