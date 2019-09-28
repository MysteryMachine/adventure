import { Store, Action } from "redux";
import { ApplicationState, ApplicationAction } from "../reducers";

export type ApplicationStore = Store<ApplicationState, Action<ApplicationAction>>