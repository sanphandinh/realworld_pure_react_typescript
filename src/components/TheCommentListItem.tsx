import React, { useCallback } from 'react';
import Comment from 'models/Comment';
import { fillParam2Url } from 'helpers/route.helper';
import { Link } from '@reach/router';
import { ProfileRoute } from 'constants/routes.constants';
import { useAuthState, useRequester } from 'providers/AuthProvider/hooks';
import { useMutation } from 'react-query';
import { MethodTypes } from 'utils/requester';
import { queryCache } from 'react-query';

interface Props extends Comment {
  slug: string;
}

const TheCommentListItem: React.FC<Props> = ({
  id,
  createdAt,
  updatedAt,
  body,
  author,
  slug,
}) => {
  const { user } = useAuthState();
  const isAuthor = user?.username === author?.username;
  const requester = useRequester();
  const deleteComment = useCallback(
    (commentId) => {
      return requester(`articles/${slug}/comments/${commentId}`, {
        method: MethodTypes.DELETE,
      });
    },
    [requester, slug]
  );
  const [mutate] = useMutation(deleteComment);
  const onDeleteComment = useCallback(() => {
    mutate(id, {
      onSettled: () => {
        queryCache.invalidateQueries(`articles/${slug}/comments`);
      },
    });
  }, [id, mutate, slug]);
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
        {isAuthor && (
          <span className="mod-options">
            <i className="ion-trash-a" onClick={onDeleteComment}></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default TheCommentListItem;
