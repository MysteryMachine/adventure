import { User } from '../types/user';
import { OfflineAction } from '../lib/offline';

const initialState: User = {
  email: 'sal@sisyphus.rocks',
};

export enum UserActionTypes {
  INIT = 'INIT',
}

export type UserAction = OfflineAction<UserActionTypes.INIT>;

export const userReducer = (state: User = initialState, action: UserAction): User => {
  switch (action.type) {
    case UserActionTypes.INIT:
      return state;
    default:
      return state;
  }
};
