import { User } from '../types/user';
import { OfflineAction } from '../lib/offline';

const initialState: User = {
  email: '',
};

export enum UserActionTypes {
  INIT = 'INIT',
  INIT_SUCCESS = 'INIT_SUCCESS',
  REGISTER = 'REGISTER',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
}

export type UserAction =
  | OfflineAction<UserActionTypes.INIT_SUCCESS> & {
      payload: {
        users: [];
      };
    }
  | OfflineAction<UserActionTypes.REGISTER_SUCCESS> & {
      payload: {
        data: User;
      };
    }
  | OfflineAction<UserActionTypes.INIT>
  | OfflineAction<UserActionTypes.REGISTER>;

export const userReducer = (state: User = initialState, action: UserAction): User => {
  console.log(action);
  switch (action.type) {
    case UserActionTypes.REGISTER_SUCCESS:
      return action.payload.data;
    default:
      return state;
  }
};
