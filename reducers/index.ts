import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer, UserAction } from './user'
import { User } from "../types/user";
import { ApplicationStore } from "../types/redux";

export interface ApplicationState {
    user: User
}

export type ApplicationAction = UserAction;

export const combinedReducer = combineReducers<ApplicationState, ApplicationAction>({
    user: userReducer
})

export const initializeStore : () => ApplicationStore = () => 
     createStore(combinedReducer, composeWithDevTools(applyMiddleware()));

    
