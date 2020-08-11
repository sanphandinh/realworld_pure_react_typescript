import React from 'react';
import { useAuthState } from 'providers/AuthProvider/hooks';
import TheCommentPoster from './TheCommentPoster';
import { Link } from '@reach/router';
import { SigninRoute, SignupRoute } from 'constants/routes.constants';
import TheCommentList from './TheCommentList';

type Props = {
  slug: string;
};

const TheCommenter: React.FC<Props> = ({ slug }) => {
  const { isLogin } = useAuthState();
  if (!isLogin) return <div></div>;
  return (
    <>
      {isLogin ? (
        <TheCommentPoster slug={slug} />
      ) : (
        <p style={{ display: 'inherit' }}>
          <Link to={SigninRoute}>Sign in</Link> or{' '}
          <Link to={SignupRoute}>sign up</Link> to add comments on this article.
        </p>
      )}
      <TheCommentList slug={slug} />
    </>
  );
};

export default TheCommenter;
