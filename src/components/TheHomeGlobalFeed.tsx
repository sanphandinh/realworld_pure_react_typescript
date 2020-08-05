import React from 'react';
import useQueryString from 'hooks/useQueryString';
import useArticles from 'hooks/useArticles';
import BaseArticleList from './BaseArticleList';

const TheHomeGlobalFeed = () => {
  const [queryObj] = useQueryString();
  const { data, status } = useArticles(queryObj);
  if (status === 'loading') return <div>Loading articles...</div>;
  if (status === 'error' || data === undefined)
    return <div>Something went wrong!</div>;
  const { articles, articlesCount } = data;
  return <BaseArticleList articles={articles} articlesCount={articlesCount} />;
};

export default TheHomeGlobalFeed;
