import { User } from '../../models/user';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface IAuthState {
  loggedIn: boolean;
  token?: string;
  user?: User;
  isUserLoaded: boolean;
}

const initialState: IAuthState = {
  loggedIn: false,
  token: undefined,
  user: undefined,
  isUserLoaded: false
};

export function authReducer(state = initialState, action: AuthActions): IAuthState {

  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        loggedIn: true,
        token: action.payload.token,
        isUserLoaded: false
      };
    }

    case AuthActionTypes.Register: {
      return {
        loggedIn: true,
        token: action.payload.token,
        isUserLoaded: false
      };
    }

    case AuthActionTypes.Logout:
      return initialState;

    case AuthActionTypes.UserLoaded: {
      return {
        ...state,
        user: action.payload.user,
        isUserLoaded: true
      };
    }

    default:
      return state;
  }
}
