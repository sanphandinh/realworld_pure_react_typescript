import React, { FC, useCallback } from 'react';
import { RouteComponentProps, useParams, Link } from '@reach/router';
import useArticle from 'hooks/useArticle';
import IArticle from 'models/Article';
import { fillParam2Url } from 'helpers/route.helper';
import { ProfileRoute } from 'constants/routes.constants';
import NotFound from 'pages/Notfound';
import TheCommenter from 'components/TheCommenter';
import useControlFavoriteArticle from 'hooks/useControlFavoriteArticle';
import { queryCache } from 'react-query';

const Article: FC<RouteComponentProps> = () => {
  const { slug } = useParams();
  const { data, status } = useArticle(slug);
  const response = data as { article: IArticle };
  const article = response?.article;
  const [mutate, { reset }] = useControlFavoriteArticle(
    slug,
    article?.favorited
  );
  const favoriteHandler = useCallback(
    (e) => {
      mutate({
        onSuccess: (data) => {
          queryCache.setQueryData(`articles/${slug}`, data);
        },
        onSettled: () => {
          reset();
        },
      });
    },
    [mutate, reset, slug]
  );
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <NotFound />;
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <Link
              to={fillParam2Url(ProfileRoute, {
                username: article.author?.username,
              })}>
              <img
                src={article.author?.image}
                alt={`icon ${article.author?.username}`}
              />
            </Link>
            <div className="info">
              <Link
                to={fillParam2Url(ProfileRoute, {
                  username: article.author?.username,
                })}
                className="author">
                {article.author?.username}
              </Link>
              <span className="date">
                {new Date(article.updatedAt).toDateString()}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;{' '}
              {`${article.author?.following ? 'Unfollow' : 'Follow'} ${
                article.author.username
              }`}{' '}
              {/* <span className="counter">(10)</span> */}
            </button>
            &nbsp;&nbsp;
            <button
              onClick={favoriteHandler}
              className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;{' '}
              {article.favorited
                ? 'Unfavorite Article'
                : 'Favorite Article'}{' '}
              <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link
              to={fillParam2Url(ProfileRoute, {
                username: article.author?.username,
              })}>
              <img alt="icon author" src={article.author?.image} />
            </Link>
            <div className="info">
              <Link
                to={fillParam2Url(ProfileRoute, {
                  username: article.author?.username,
                })}
                className="author">
                {article.author.username}
              </Link>
              <span className="date">
                {new Date(article.updatedAt).toDateString()}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;{' '}
              {`${article.author?.following ? 'Unfollow' : 'Follow'} ${
                article.author.username
              }`}{' '}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;{' '}
              {article.favorited
                ? 'Unfavorite Article'
                : 'Favorite Article'}{' '}
              <span className="counter">(29)</span>
            </button>
          </div>
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
