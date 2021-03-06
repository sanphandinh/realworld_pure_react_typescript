import React, { FC } from 'react';
import TheHeaderNavItem from './TheHeader.NavItem';
import { useAuthState } from '../providers/AuthProvider/hooks';
import {
  HomeRoute,
  EditorRoute,
  SettingsRoute,
  SigninRoute,
  SignupRoute,
  ProfileRoute,
} from '../constants/routes.constants';
import { Link } from '@reach/router';
import { fillParam2Url } from 'helpers/route.helper';

const TheHeader: FC = () => {
  const { isLogin, user } = useAuthState();
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={HomeRoute}>
          Conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <TheHeaderNavItem title="Home" url={HomeRoute} />
          {isLogin ? (
            <>
              <TheHeaderNavItem
                title={
                  <>
                    <i className="ion-compose"></i>&nbsp;New Article
                  </>
                }
                url={EditorRoute}
              />
              <TheHeaderNavItem
                title={
                  <>
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </>
                }
                url={SettingsRoute}
              />
              <TheHeaderNavItem
                title={user?.username || ''}
                url={fillParam2Url(ProfileRoute, {
                  username: user?.username || '',
                })}
              />
            </>
          ) : (
            <>
              <TheHeaderNavItem title="Sign in" url={SigninRoute} />
              <TheHeaderNavItem title="Sign up" url={SignupRoute} />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TheHeader;
