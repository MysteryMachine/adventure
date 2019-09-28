import { Store, Action } from "redux";
import { ApplicationState, ApplicationActions } from "../reducers";

export type ApplicationStore = Store<ApplicationState, Action<ApplicationActions>>