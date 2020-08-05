import React, { FC } from 'react';
import { useAuthState } from '../providers/AuthProvider/hooks';
import { useNavigate } from '@reach/router';
import { HomeRoute } from '../constants/routes.constants';

type Props = {
  component: React.ComponentType;
  [key: string]: any;
};

const BaseUnauthenticated: FC<Props> = ({ component: C, ...other }) => {
  const { isLogin } = useAuthState();
  const navigate = useNavigate();
  if (isLogin) {
    navigate(HomeRoute, { replace: true });
  }
  return <C {...other} />;
};

export default BaseUnauthenticated;
