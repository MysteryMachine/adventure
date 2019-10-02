import { User } from '../types/user';
import { OfflineAction } from '../lib/offline';

const initialState: User = {
  email: '',
  loggedIn: false,
};

export enum UserActionTypes {
  REGISTER = 'REGISTER',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
}

export type UserAction =
  | OfflineAction<UserActionTypes.REGISTER_SUCCESS> & {
      payload: {
        data: User;
      };
    }
  | OfflineAction<UserActionTypes.LOGIN_SUCCESS> & {
      payload: {
        data: User;
      };
    }
  | OfflineAction<UserActionTypes.REGISTER>
  | OfflineAction<UserActionTypes.LOGIN> & {
      email: string;
    };

export const userReducer = (state: User = initialState, action: UserAction): User => {
  console.log(action);
  switch (action.type) {
    case UserActionTypes.REGISTER_SUCCESS:
      return action.payload.data;
    case UserActionTypes.LOGIN:
      return { ...state, email: action.email };
    case UserActionTypes.LOGIN_SUCCESS:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};
