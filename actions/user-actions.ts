import { UserActionTypes } from '../reducers/user';
import { Action } from 'redux';

export const INIT = (): Action<UserActionTypes.INIT> => ({ type: UserActionTypes.INIT });
