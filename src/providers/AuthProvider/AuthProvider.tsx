import React, { FC, useReducer, useCallback } from 'react';
import { authReducer } from './AuthProvider.helper';
import { AUTH_ACTION_TYPE, AUTH_INIT_STATE } from './AuthProvider.constant';
import {
  IAuthProviderProps,
  IAuthFunction,
  IAuthState,
  ILogoutFunc,
  ILoginFunc,
  IUpdateUserInfoFunc,
} from './IAuthProvider';
import { getItem } from 'utils/storage';
import { AUTH_STORAGE_ID } from '../../constants/storages_key.constants';
import IUser from 'models/User';

const authStorage: IUser = getItem(AUTH_STORAGE_ID);

const INIT_STATE: IAuthState = authStorage?.token
  ? {
      isLogin: true,
      ...authStorage,
    }
  : AUTH_INIT_STATE;

// Defined context
export const AuthContext = React.createContext<IAuthState | undefined>(
  undefined
);
AuthContext.displayName = 'AuthContext';
export const AuthFunctionContext = React.createContext<
  IAuthFunction | undefined
>(undefined);
AuthFunctionContext.displayName = 'AuthFunctionContext';

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INIT_STATE);

  const logout: ILogoutFunc = useCallback(() => {
    dispatch({ type: AUTH_ACTION_TYPE.auth_logout });
  }, []);

  const login: ILoginFunc = useCallback((user) => {
    dispatch({ type: AUTH_ACTION_TYPE.auth_login_success, user });
  }, []);

  const updateUserInfo: IUpdateUserInfoFunc = useCallback((user) => {
    dispatch({ type: AUTH_ACTION_TYPE.auth_update, user });
  }, []);

  return (
    <AuthContext.Provider value={state}>
      <AuthFunctionContext.Provider value={{ logout, login, updateUserInfo }}>
        {children}
      </AuthFunctionContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
