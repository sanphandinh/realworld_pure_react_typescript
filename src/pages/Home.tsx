/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import TheSidebar from 'components/TheSidebar';
import { useAuthState } from 'providers/AuthProvider/hooks';
import classNames from 'helpers/className.helper';
import TheHomeYourFeed from 'components/TheHomeYourFeed';
import TheHomeGlobalFeed from 'components/TheHomeGlobalFeed';
import useQueryString from 'hooks/useQueryString';

enum Tabs {
  Your_Feed = 'your_feed',
  Global_Feed = 'global_feed',
}

const Home: FC<RouteComponentProps> = () => {
  const { isLogin } = useAuthState();
  const [queryObj = {}, updateQuerystring] = useQueryString();
  const { tag, ...rest } = queryObj;
  const [currentTab, setCurrentTab] = useState<string>(
    isLogin ? Tabs.Your_Feed : Tabs.Global_Feed
  );

  const selectTab = (tab: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentTab(tab);
    updateQuerystring({}, true);
  };

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
                      href="#"
                      className={classNames('nav-link', {
                        disabled: !isLogin,
                        active: currentTab === Tabs.Your_Feed && !tag,
                      })}
                      onClick={selectTab(Tabs.Your_Feed)}>
                      Your Feed
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    href="#"
                    className={classNames('nav-link', {
                      active: currentTab === Tabs.Global_Feed && !tag,
                    })}
                    onClick={selectTab(Tabs.Global_Feed)}>
                    Global Feed
                  </a>
                </li>
                {tag && (
                  <li className="nav-item">
                    <a className="nav-link active">{tag}</a>
                  </li>
                )}
              </ul>
            </div>
            {currentTab === Tabs.Your_Feed && isLogin && !tag && (
              <TheHomeYourFeed queryObj={queryObj} />
            )}
            {currentTab === Tabs.Global_Feed && !tag && (
              <TheHomeGlobalFeed queryObj={rest} />
            )}
            {tag && <TheHomeGlobalFeed queryObj={queryObj} />}
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
