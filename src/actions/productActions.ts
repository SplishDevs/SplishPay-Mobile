import helpers from '../helpers';
import {ActionType} from './type';

export const setProducts = (products: any) => {
  return {type: ActionType.GET_PRODUCTS, payload: products};
};

export const setService = (services: any) => {
  return {type: ActionType.GET_SERVICES, payload: services};
};

export const addToCart = (item: any) => {
  return async (dispatch: any) => {
    const localCart: any = await helpers.getItem('cart');
    item.quantity = 1;
    if (!localCart) {
      const cart = [item];
      await helpers.setItem('cart', JSON.stringify(cart));
      return dispatch({type: ActionType.LOAD_CART, payload: cart});
    }
    const cart = JSON.parse(localCart);
    const index = cart.findIndex((product: any) => product.id === item.id);
    if (index === -1) {
      cart.push(item);
    } else {
      cart[index].quantity = cart[index].quantity
        ? cart[index].quantity + 1
        : 1;
    }

    await helpers.setItem('cart', JSON.stringify(cart));
    return dispatch({type: ActionType.LOAD_CART, payload: cart});
  };
};

export const getCart = () => {
  return async (dispatch: any) => {
    const localCart: any = await helpers.getItem('cart');
    let cart: any[] = [];
    console.log('cart: ', cart);
    if (!localCart) {
      helpers.setItem('cart', JSON.stringify(cart));
      return dispatch({type: ActionType.LOAD_CART, payload: cart});
    }
    cart = JSON.parse(localCart);
    return dispatch({type: ActionType.LOAD_CART, payload: cart});
  };
};
