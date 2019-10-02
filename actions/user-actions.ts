import { UserActionTypes } from '../reducers/user';
import { q } from '../lib/fauna';
import { OfflineAction, commit } from '../lib/offline';
import { Collection, Index } from '../types/database';

export const REGISTER = (
  email: string,
  password: string,
): OfflineAction<UserActionTypes.REGISTER> => ({
  type: UserActionTypes.REGISTER,
  meta: {
    offline: {
      effect: q.Create(q.Class(Collection.User), {
        credentials: { password },
        data: { email },
      }),
      commit: commit(UserActionTypes.REGISTER_SUCCESS),
    },
  },
});

export const LOGIN = (email: string, password: string): OfflineAction<UserActionTypes.LOGIN> => ({
  type: UserActionTypes.LOGIN,
  meta: {
    offline: {
      effect: q.Login(q.Select(['ref'], q.Get(q.Match(q.Index(Index.UsersByEmail), email))), {
        password,
      }),
      commit: commit(UserActionTypes.LOGIN_SUCCESS),
    },
  },
});
