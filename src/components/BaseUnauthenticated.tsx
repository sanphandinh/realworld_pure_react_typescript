import React, { FC } from 'react';
import { useAuthState } from '../providers/AuthProvider/hooks';
import { Redirect } from '@reach/router';
import { HomeRoute } from '../constants/routes.constants';

type Props = {
  component: React.ComponentType;
  [key: string]: any;
};

const BaseUnauthenticated: FC<Props> = ({ component: C, ...other }) => {
  const { isLogin } = useAuthState();
  if (isLogin) {
    return <Redirect to={HomeRoute} replace />;
  }
  return <C {...other} />;
};

export default BaseUnauthenticated;
