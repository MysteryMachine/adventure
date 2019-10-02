import { combineReducers, createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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
    composeWithDevTools(
      applyMiddleware<Store<{ [key: string]: any }, AnyAction>, {}>(),
      // @ts-ignore
      offline({ ...offlineConfig, ...config }),
    ),
  );
