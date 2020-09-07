import React from 'react';
import { ProfileRoute } from 'constants/routes.constants';
import { fillParam2Url } from 'helpers/route.helper';
import { Link } from '@reach/router';

type Props = {
  username?: string;
  image?: string;
  updatedAt?: string;
  following?: boolean;
  favorited?: boolean;
  favoritesCount?: number;
  followingAction?: () => void;
  favoriteAction?: () => void;
};

const BaseArticleMeta: React.FC<Props> = ({
  username = '',
  image = '',
  updatedAt = '',
  following = false,
  favoriteAction = () => null,
  favorited = false,
  favoritesCount,
  followingAction = () => null,
}) => {
  return (
    <div className="article-meta">
      <Link
        to={fillParam2Url(ProfileRoute, {
          username,
        })}>
        <img src={image} alt={`icon ${username}`} />
      </Link>
      <div className="info">
        <Link
          to={fillParam2Url(ProfileRoute, {
            username: username,
          })}
          className="author">
          {username}
        </Link>
        <span className="date">{new Date(updatedAt).toDateString()}</span>
      </div>
      <button
        onClick={followingAction}
        className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; {`${following ? 'Unfollow' : 'Follow'} ${username}`}{' '}
      </button>
      &nbsp;&nbsp;
      <button
        onClick={favoriteAction}
        className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; {favorited ? 'Unfavorite Article' : 'Favorite Article'}{' '}
        <span className="counter">({favoritesCount})</span>
      </button>
    </div>
  );
};

export default BaseArticleMeta;
