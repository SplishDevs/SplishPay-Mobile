import {Action} from '.';
import {ActionType} from './type';

export const startloading = (): Action => {
  return {type: ActionType.START_LOADING, payload: null};
};

export const stopLoading = (): Action => {
  return {type: ActionType.STOP_LOADING, payload: null};
};
