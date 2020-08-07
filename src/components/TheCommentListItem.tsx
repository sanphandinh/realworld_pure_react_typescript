import React from 'react';
import Comment from 'models/Comment';
import { fillParam2Url } from 'helpers/route.helper';
import { Link } from '@reach/router';
import { ProfileRoute } from 'constants/routes.constants';

const TheCommentListItem: React.FC<Comment> = ({
  id,
  createdAt,
  updatedAt,
  body,
  author,
}) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={fillParam2Url(ProfileRoute, { username: author?.username })}
          className="comment-author">
          <img
            alt="author comment"
            src={author?.image}
            className="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link
          to={fillParam2Url(ProfileRoute, { username: author?.username })}
          className="comment-author">
          {author?.username}
        </Link>
        <span className="date-posted">
          {new Date(updatedAt).toDateString()}
        </span>
        <span className="mod-options">
          <i className="ion-edit"></i>
          <i className="ion-trash-a"></i>
        </span>
      </div>
    </div>
  );
};

export default TheCommentListItem;
