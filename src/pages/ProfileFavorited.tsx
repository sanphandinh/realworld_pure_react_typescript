import { RouteComponentProps } from '@reach/router';
import BaseArticleList from 'components/BaseArticleList';
import useArticles from 'hooks/useArticles';
import useQueryString from 'hooks/useQueryString';
import React, { FC } from 'react';

type Props = RouteComponentProps & {
  username: string;
};

const ProfileFavorited: FC<Props> = ({ username }) => {
  const [queryObj = {}] = useQueryString();
  const { page } = queryObj;
  const { data, status } = useArticles({
    page,
    favorited: username,
  });
  if (status === 'loading') return <div>Loading articles....</div>;
  if (status === 'error' || data === undefined)
    return <div>Something went wrong!</div>;
  if (data.articlesCount === 0) return <div>Nothing!</div>;
  const { articles, articlesCount } = data;
  return <BaseArticleList articles={articles} articlesCount={articlesCount} />;
};

export default ProfileFavorited;
