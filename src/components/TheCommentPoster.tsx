import React from 'react';
import { useAuthState } from 'providers/AuthProvider/hooks';

const TheCommentPoster = () => {
  const { user } = useAuthState();
  if (!user) return null;
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}></textarea>
      </div>
      <div className="card-footer">
        <img
          src={user.image}
          className="comment-author-img"
          alt="author icon"
        />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  );
};

export default TheCommentPoster;
