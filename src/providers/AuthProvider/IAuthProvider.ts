import { AUTH_ACTION_TYPE } from './AuthProvider.constant';
import IUser from 'models/User';

export interface IAuthState {
  isLogin: boolean;
  user?: IUser;
}

interface IAuthAction {
  type: AUTH_ACTION_TYPE;
  [id: string]: any;
}

export interface IAuthReducer {
  (state: IAuthState, action: IAuthAction): IAuthState;
}

export interface ILoginFunc {
  (user: IUser): void;
}

export interface ILogoutFunc {
  (): void;
}

export interface IUpdateUserInfoFunc {
  (user: IUser): void;
}

export interface IAuthFunction {
  login: ILoginFunc;
  logout: ILogoutFunc;
  updateUserInfo: IUpdateUserInfoFunc;
}

export interface IAuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface IUseAuthStateHook {
  (): IAuthState;
}

export interface IAuthFunctionHook {
  (): IAuthFunction;
}
