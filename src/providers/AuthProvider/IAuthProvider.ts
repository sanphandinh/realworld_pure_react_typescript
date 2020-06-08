import { AUTH_ACTION_TYPE } from './AuthProvider.constant';

export interface IUserInfo {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
}

export interface IAuthState {
  isLogin: boolean;
  user?: IUserInfo;
}

interface IAuthAction {
  type: AUTH_ACTION_TYPE;
  [id: string]: any;
}

export interface IAuthReducer {
  (state: IAuthState, action: IAuthAction): IAuthState;
}

export interface ILoginFunc {
  (user: IUserInfo): void;
}

export interface ILogoutFunc {
  (): void;
}

export interface IUpdateUserInfoFunc {
  (user: IUserInfo): void;
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
