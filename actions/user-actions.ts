import { UserActionTypes } from '../reducers/user';
import { q } from '../lib/fauna';
import { OfflineAction, commit } from '../lib/offline';
import { Index, Collection } from '../types/database';

export const INIT = (): OfflineAction<UserActionTypes.INIT> => ({
  type: UserActionTypes.INIT,
  meta: {
    offline: {
      effect: q.Paginate(q.Match(q.Index(Index.AllUsers))),
      commit: commit(UserActionTypes.INIT_SUCCESS),
    },
  },
});

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
