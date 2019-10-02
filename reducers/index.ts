import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { userReducer, UserAction } from './user';
import { User } from '../types/user';
import { ApplicationStore } from '../types/redux';
import { config } from '../lib/offline';

export interface ApplicationState {
  user: User;
}

export type ApplicationAction = UserAction;

export const combinedReducer = combineReducers<ApplicationState, ApplicationAction>({
  user: userReducer,
});

export const initializeStore: () => ApplicationStore = () =>
  createStore(
    combinedReducer,
    compose(
      applyMiddleware(),
      offline({ ...offlineConfig, ...config }),
    ),
  );
