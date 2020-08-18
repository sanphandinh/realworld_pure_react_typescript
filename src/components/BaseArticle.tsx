import React, { FC } from 'react';
import IArticle from 'models/Article';
import { Link } from '@reach/router';
import { ProfileRoute, ArticleRoute } from 'constants/routes.constants';
import { fillParam2Url } from 'helpers/route.helper';

const DefaultAvatar = 'http://i.imgur.com/Qr71crq.jpg';

console.log("test");

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
  const profileLink = fillParam2Url(ProfileRoute, {
    username: author.username,
  });
  const updatedAtFormat = new Date(updatedAt).toDateString();
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={profileLink}>
          <img
            alt={`${author.username} avatar`}
            src={author.image || DefaultAvatar}
          />
        </Link>
        <div className="info">
          <Link to={profileLink} className="author">
            {author.username}
          </Link>
          <span className="date">{updatedAtFormat}</span>
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
