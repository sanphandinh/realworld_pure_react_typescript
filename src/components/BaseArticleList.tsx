import React from 'react';
import IListArticle from '../models/ListArticle';
import BaseArticle from './BaseArticle';
import BasePaging from './BasePaging';

const DefaultNumPage = 20;

const BaseArticleList: React.FC<IListArticle> = ({
  articles,
  articlesCount,
}) => {
  return (
    <>
      {articles.map((item) => (
        <BaseArticle {...item} key={item.slug} />
      ))}
      <BasePaging pageCount={DefaultNumPage} totalItem={articlesCount} />
    </>
  );
};

export default BaseArticleList;
