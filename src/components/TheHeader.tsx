import React, { FC } from 'react';
import TheHeaderNavItem from './TheHeader.NavItem';

const TheHeader: FC = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <TheHeaderNavItem active title="Home" url="/" />
          <TheHeaderNavItem
            title={
              <>
                <i className="ion-compose"></i>&nbsp;New Post
              </>
            }
            url="/"
          />
          <TheHeaderNavItem
            title={
              <>
                <i className="ion-gear-a"></i>&nbsp;Settings
              </>
            }
            url="/"
          />
          <TheHeaderNavItem title="Sign up" url="/" />
        </ul>
      </div>
    </nav>
  );
};

export default TheHeader;
