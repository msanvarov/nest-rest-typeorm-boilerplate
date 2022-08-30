import { IUser } from '@starter/api-types';

// This is a in memory store for managing the app state. Should be replaced with NgRx Store in the future.
export interface IState {
  user?: IUser;
  [key: string]: unknown;
}
