/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import TheSidebar from 'components/TheSidebar';
import { useAuthState } from 'providers/AuthProvider/hooks';
import classNames from 'helpers/className.helper';
import TheHomeYourFeed from 'components/TheHomeYourFeed';
import TheHomeGlobalFeed from 'components/TheHomeGlobalFeed';

enum Tabs {
  Your_Feed = 'your_feed',
  Global_Feed = 'global_feed',
}

const Home: FC<RouteComponentProps> = () => {
  const { isLogin } = useAuthState();
  const [currentTab, setCurrentTab] = useState(
    isLogin ? Tabs.Your_Feed : Tabs.Global_Feed
  );

  return (
    <div className="home-page">
      {!isLogin && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isLogin && (
                  <li className="nav-item">
                    <a
                      className={classNames('nav-link', {
                        disabled: !isLogin,
                        active: currentTab === Tabs.Your_Feed,
                      })}
                      onClick={() => setCurrentTab(Tabs.Your_Feed)}>
                      Your Feed
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    className={classNames('nav-link', {
                      active: currentTab === Tabs.Global_Feed,
                    })}
                    onClick={() => setCurrentTab(Tabs.Global_Feed)}>
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            {currentTab === Tabs.Your_Feed && isLogin && (
              <TheHomeYourFeed isLogin={isLogin} />
            )}
            {currentTab === Tabs.Global_Feed && <TheHomeGlobalFeed />}
          </div>
          <div className="col-md-3">
            <TheSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
