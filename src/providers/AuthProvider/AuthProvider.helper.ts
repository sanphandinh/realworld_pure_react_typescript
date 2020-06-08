import { IAuthReducer } from './IAuthProvider';
import { AUTH_ACTION_TYPE } from './AuthProvider.constant';

export const authReducer: IAuthReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.auth_login_success: {
      return {
        isLogin: true,
        user: action.user,
      };
    }
    case AUTH_ACTION_TYPE.auth_update: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    }
    case AUTH_ACTION_TYPE.auth_logout: {
      return {
        isLogin: false,
      };
    }
    default:
      throw new Error('(Auth Reducer) type is not defined!');
  }
};
