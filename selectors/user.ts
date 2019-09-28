import { ApplicationState } from '../reducers';

export const getEmail = (state: ApplicationState): string => state.user.email;
