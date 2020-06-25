import React, { FC } from 'react';
import { useAuthState } from '../providers/AuthProvider/hooks';

const SigninAsync = React.lazy(() => import('../pages/SignIn'));

type Props = {
  component: React.ComponentType;
  [key: string]: any;
};

const BaseAuthenticated: FC<Props> = ({ component: C, ...other }) => {
  const { isLogin } = useAuthState();
  if (!isLogin) {
    return <SigninAsync {...other} />;
  }
  return <C {...other} />;
};

export default BaseAuthenticated;
