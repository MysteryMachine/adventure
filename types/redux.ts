import { Store } from 'redux'
import { ApplicationState, ApplicationAction } from '../reducers'

export type ApplicationStore = Store<ApplicationState, ApplicationAction>