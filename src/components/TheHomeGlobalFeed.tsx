import React from 'react';
import useArticles from 'hooks/useArticles';
import BaseArticleList from './BaseArticleList';

type Props = {
  queryObj?: { [id: string]: any };
};

const TheHomeGlobalFeed: React.FC<Props> = ({ queryObj = {} }) => {
  const { data, status } = useArticles(queryObj);
  if (status === 'loading') return <div>Loading articles...</div>;
  if (status === 'error' || data === undefined)
    return <div>Something went wrong!</div>;
  if (data.articlesCount === 0) return <div>Nothing!</div>;
  const { articles, articlesCount } = data;
  return <BaseArticleList articles={articles} articlesCount={articlesCount} />;
};

export default TheHomeGlobalFeed;
