import React, { FC } from 'react';
import IArticle from 'models/Article';
import { Link } from '@reach/router';
import { ProfileRoute, ArticleRoute } from 'constants/routes.constants';
import { fillParam2Url } from 'helpers/route.helper';

const DefaultAvatar = 'http://i.imgur.com/Qr71crq.jpg';

const BaseArticle: FC<IArticle> = ({
  slug,
  title,
  description,
  body,
  tagList,
  createdAt,
  updatedAt,
  favorited,
  favoritesCount,
  author,
}) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={fillParam2Url(ProfileRoute, { username: author.username })}>
          <img
            alt={`${author.username} avatar`}
            src={author.image || DefaultAvatar}
          />
        </Link>
        <div className="info">
          <a href="/" className="author">
            {author.username}
          </a>
          <span className="date">{updatedAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <Link to={fillParam2Url(ArticleRoute, { slug })} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default BaseArticle;
