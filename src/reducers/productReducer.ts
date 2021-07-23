import {Action} from '../actions';
import {ActionType} from '../actions/type';

const INITIAL_STATE = {
  products: [],
  cart: [],
  services: [],
  customers: [],
};

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.GET_PRODUCTS:
      return {...state, products: action.payload};
    case ActionType.GET_SERVICES:
      return {...state, services: action.payload};
    case ActionType.LOAD_CART:
      return {...state, cart: action.payload};
    case ActionType.GET_CUSTOMERS:
      return {...state, customers: action.payload};
    default:
      return {...state};
  }
};
