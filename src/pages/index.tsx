import React, { FC, Suspense } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import {
  HomeRoute,
  SigninRoute,
  SignupRoute,
  SettingsRoute,
  EditorRoute,
  ArticleRoute,
  ProfileRoute,
} from '../constants/routes.constants';
import BaseUnauthenticated from '../components/BaseUnauthenticated';
import BaseAuthenticated from '../components/BaseAuthenticated';

interface PropsCombineReachRoute extends RouteComponentProps {
  component: React.ComponentType;
  [key: string]: any;
}

const HomeAsync = React.lazy(() => import('./Home'));
const SigninAsync = React.lazy(() => import('./SignIn'));
const SignupAsync = React.lazy(() => import('./Signup'));
const SettingsAsync = React.lazy(() => import('./Settings'));
const ProfileAsync = React.lazy(() => import('./Profile'));
const EditorAsync = React.lazy(() => import('./Editor'));
const ArticleAsync = React.lazy(() => import('./Article'));
const NotFoundAsync = React.lazy(() => import('./Notfound'));

const BaseUnauthenticatedRoute = (props: PropsCombineReachRoute) => (
  <BaseUnauthenticated {...props} />
);

const BaseAuthenticatedRoute = (props: PropsCombineReachRoute) => (
  <BaseAuthenticated {...props} />
);

const RouteApp: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <HomeAsync path={HomeRoute} />
        <BaseUnauthenticatedRoute path={SigninRoute} component={SigninAsync} />
        <BaseUnauthenticatedRoute path={SignupRoute} component={SignupAsync} />
        <BaseAuthenticatedRoute
          path={SettingsRoute}
          component={SettingsAsync}
        />
        <BaseAuthenticatedRoute
          path={`${EditorRoute}/*`}
          component={EditorAsync}
        />
        <ArticleAsync path={ArticleRoute} />
        <ProfileAsync path={`${ProfileRoute}/*`} />
        <NotFoundAsync default />
      </Router>
    </Suspense>
  );
};

export default RouteApp;
