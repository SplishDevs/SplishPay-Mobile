import {ActionType} from './type';

export * from './authAction';

export interface Action {
  type: ActionType;
  payload: any;
}
