import {ActionType} from './type';

export * from './authAction';
export * from './productActions';

export interface Action {
  type: ActionType;
  payload: any;
}
