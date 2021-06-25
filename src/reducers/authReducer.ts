import {Action} from '../actions';
import {ActionType} from '../actions/type';

const INITIAL_STATE = {
  auth: true,
  loading: false,
  fullname: '',
  email: '',
  phoneNumber: '',
  password: '',
  companyName: '',
  cacRegistrationNumber: '',
  companyEmail: '',
  companyContact: '',
  companyAddress: '',
  interestedInHardware: false,
  state: '',
};

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {...state, loading: true};
    case ActionType.STOP_LOADING:
      return {...state, loading: false};
    case ActionType.PROFILE_PAGE_ONE:
      return {...state, ...action.payload};
    case ActionType.PROFILE_PAGE_TWO:
      return {...state, ...action.payload};
    default:
      return {...state};
  }
};
