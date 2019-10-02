import faunadb from 'faunadb';
import { Action } from 'redux';
import { client } from './fauna';
import offlineTypes from '@redux-offline/redux-offline/lib/types';

interface FaunaEffect {
  effect: faunadb.Expr;
}

export type FaunaOfflineAction = offlineTypes.OfflineAction & {
  meta: {
    offline: FaunaEffect;
  };
};

export type OfflineAction<T> = Action<T> & FaunaOfflineAction;

async function effect<T>(_: any, action: OfflineAction<T>) {
  return (await client).query(action.meta.offline.effect);
}

type DiscardFn = (error: any, action: offlineTypes.OfflineAction, retries: number) => boolean;
const discard: DiscardFn = (resp: any) => {
  console.log(resp);
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
