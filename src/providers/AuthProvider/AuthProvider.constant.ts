//Defined constant
export const AUTH_STORAGE_ID = '@auth/user_info';

export enum AUTH_ACTION_TYPE {
  auth_login_success,
  auth_update,
  auth_logout,
}

export const AUTH_INIT_STATE = {
  isLogin: false,
};
