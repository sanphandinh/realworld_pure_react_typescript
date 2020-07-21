import { IAuthReducer } from './IAuthProvider';
import { AUTH_ACTION_TYPE } from './AuthProvider.constant';
import { AUTH_STORAGE_ID } from 'constants/storages_key.constants';
import { getItem, setItem, deleteItem } from 'utils/storage';
import IUser from 'models/User';

const getToken = (): string => {
  const user: IUser = getItem(AUTH_STORAGE_ID);
  const token: string = user?.token || '';
  return token;
};

const authReducer: IAuthReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.auth_login_success: {
      const user: IUser = action?.user;
      //Save user info to localstorage
      setItem(AUTH_STORAGE_ID, user);
      return {
        isLogin: true,
        user: user,
      };
    }
    case AUTH_ACTION_TYPE.auth_update: {
      const user: IUser = action?.user;
      const newUser = { ...state.user, ...user };
      // update user info to localstorage
      setItem(AUTH_STORAGE_ID, newUser);
      return {
        ...state,
        user: newUser,
      };
    }
    case AUTH_ACTION_TYPE.auth_logout: {
      //Delete user info in localstorage
      deleteItem(AUTH_STORAGE_ID);
      return {
        isLogin: false,
      };
    }
    default:
      throw new Error('(Auth Reducer) type is not defined!');
  }
};

export { authReducer, getToken };
