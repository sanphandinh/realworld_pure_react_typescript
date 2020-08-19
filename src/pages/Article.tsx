import React, { FC } from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import useArticle from 'hooks/useArticle';
import IArticle from 'models/Article';
import NotFound from 'pages/Notfound';
import TheCommenter from 'components/TheCommenter';
import BaseArticleMeta from 'components/BaseArticleMeta';

const Article: FC<RouteComponentProps> = () => {
  const { slug } = useParams();
  const { data, status } = useArticle(slug);
  const response = data as { article: IArticle };
  const article = response?.article;
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <NotFound />;
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <BaseArticleMeta
            username={article.author.username}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            following={article.author.following}
            image={article.author.image}
            updatedAt={article.updatedAt}
          />
        </div>
      </div>
      <div className="container page">
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
        <hr />
        <div className="article-actions">
          <BaseArticleMeta
            username={article.author.username}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            following={article.author.following}
            image={article.author.image}
            updatedAt={article.updatedAt}
          />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <TheCommenter slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
