import { UserActionTypes } from '../reducers/user';
import { q, Index } from '../lib/fauna';
import { OfflineAction } from '../lib/offline';

export const INIT = (): OfflineAction<UserActionTypes.INIT> => ({
  type: UserActionTypes.INIT,
  meta: {
    offline: {
      effect: q.Paginate(q.Match(q.Index(Index.AllUsers))),
    },
  },
});
