import faunadb from 'faunadb';
import { Action } from 'redux';
import { client } from './fauna';
import offlineTypes from '@redux-offline/redux-offline/lib/types';

interface FaunaEffect {
  effect: faunadb.Expr;
}

export type FaunaOfflineAction = offlineTypes.OfflineAction & {
  meta: {
    offline: offlineTypes.OfflineMetadata & FaunaEffect;
    transaction?: number;
  };
};

export type OfflineAction<T> = Action<T> & FaunaOfflineAction;

async function effect(_: any, action: OfflineAction<any>) {
  return (await client).query(action.meta.offline.effect);
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
