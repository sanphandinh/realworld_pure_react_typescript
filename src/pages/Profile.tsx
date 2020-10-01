import React, { FC, useCallback } from 'react';
import {
  RouteComponentProps,
  Link,
  Router,
  useMatch,
  LinkGetProps,
} from '@reach/router';
import useProfile from 'hooks/useProfile';
import { ProfileRoute, SettingsRoute } from 'constants/routes.constants';
import { useAuthState } from 'providers/AuthProvider/hooks';
import useActionFollowAuthor from 'hooks/useActionFollowAuthor';
import { queryCache } from 'react-query';
import IProfileResponse from 'models/ProfileResponse';

const ProfileHomeAsync = React.lazy(() => import('./ProfileHome'));
const ProfileFavoritedAsync = React.lazy(() => import('./ProfileFavorited'));

const Profile: FC<RouteComponentProps> = () => {
  const { user } = useAuthState();
  const currentUserLogin = user?.username;
  const match = useMatch(`/${ProfileRoute}/*`);
  const username = (match?.username as string) || '';
  const isMatchUser = currentUserLogin === username;
  const { data, isError } = useProfile(username);
  const profile = data?.profile;
  const isFollowing = data?.profile?.following;
  const isActive = useCallback<(props: LinkGetProps) => {}>(({ isCurrent }) => {
    return { className: isCurrent ? 'nav-link active' : 'nav-link' };
  }, []);
  const { handleFollow, handleUnfollow } = useActionFollowAuthor({
    username,
    options: {
      onMutate: (variables) => {
        const previousValue = data;
        queryCache.setQueryData<IProfileResponse>(
          `profiles/${username}`,
          (oldData) => {
            if (!oldData) return undefined;
            return {
              profile: {
                ...oldData.profile,
                following: variables?.isUnfollow ? false : true,
              },
            };
          }
        );
        return previousValue;
      },
      onError: (_err, _variables, previousValue) =>
        queryCache.setQueryData(`profiles/${username}`, previousValue),
      onSettled: () => {
        queryCache.invalidateQueries(`profiles/${username}`);
      },
    },
  });
  const followHandle = useCallback(() => {
    if (isFollowing) {
      handleUnfollow();
    } else handleFollow();
  }, [handleFollow, handleUnfollow, isFollowing]);
  if (isError) return <div>{`Username ${username} not founded!`}</div>;
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile?.image}
                alt={profile?.username}
                className="user-img"
              />
              <h4>{profile?.username}</h4>
              <p>{profile?.bio}</p>
              {!isMatchUser && (
                <button
                  onClick={followHandle}
                  className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; {`${isFollowing ? 'Unfollow' : 'Follow'} ${username}`}
                </button>
              )}
              {isMatchUser && (
                <Link to={`/${SettingsRoute}`}>
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round"></i>
                    &nbsp; Edit Profile Setting
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link getProps={isActive} to={``}>
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link getProps={isActive} to={`favorited`}>
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>
            <Router>
              <ProfileFavoritedAsync path={'favorited'} username={username} />
              <ProfileHomeAsync path={'/'} username={username} />
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
