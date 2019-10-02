import faunadb, { Client } from 'faunadb';
import { Action } from 'redux';
import { client } from './fauna';
import offlineTypes from '@redux-offline/redux-offline/lib/types';
import { UserActionTypes } from '../reducers/user';

interface FaunaEffect {
  effect: faunadb.Expr;
}

export type FaunaOfflineAction = offlineTypes.OfflineAction & {
  meta: {
    offline: FaunaEffect;
  };
};

export type OfflineAction<T> = Action<T> & FaunaOfflineAction;
let secret: undefined | string;

async function effect<T>(_: any, action: OfflineAction<T>) {
  const useClient = secret ? new Client({ secret }) : await client;
  return useClient.query(action.meta.offline.effect).then((res: { secret?: string }) => {
    if (action.type === UserActionTypes.LOGIN && !secret) {
      secret = res.secret;
    }
    return res;
  });
}

type DiscardFn = (error: any, action: offlineTypes.OfflineAction, retries: number) => boolean;
const discard: DiscardFn = (resp: any) => {
  const errors = resp.errors ? resp.errors() : [];
  return errors.length > 0;
};

export const config = {
  effect,
  discard,
  persisAutoRehydrate: true,
  //   persistCallback: () => {
  //   },
};

export const commit = (type: string) => ({
  type: type,
  meta: {
    success: true,
    completed: true,
  },
});
