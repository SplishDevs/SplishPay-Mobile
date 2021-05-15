import {Action} from '../actions';
import {ActionType} from '../actions/type';

const INITIAL_STATE = {
  auth: true,
  loading: false,
};

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {...state, loading: true};
    case ActionType.STOP_LOADING:
      return {...state, loading: false};
    default:
      return {...state};
  }
};
