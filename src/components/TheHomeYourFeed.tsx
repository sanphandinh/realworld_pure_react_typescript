import React from 'react';
import { useQuery } from 'react-query';
import useRequester from 'providers/AuthProvider/hooks/useRequester';
import { makeQueryRequest } from 'utils/requester';
import IListArticle from 'models/ListArticle';
import BaseArticleList from './BaseArticleList';

type Props = {
  queryObj?: { [id: string]: any };
};

const TheHomeYourFeed: React.FC<Props> = ({ queryObj }) => {
  const requester = useRequester<IListArticle>();
  const page: number = queryObj?.page;
  const { data, status } = useQuery(
    makeQueryRequest(`articles/feed`, { offset: page }),
    requester
  );
  if (status === 'loading') return <div>Loading articles...</div>;
  if (status === 'error' || data === undefined)
    return <div>Something went wrong!</div>;
  const { articles, articlesCount } = data;
  return <BaseArticleList articles={articles} articlesCount={articlesCount} />;
};

export default TheHomeYourFeed;
