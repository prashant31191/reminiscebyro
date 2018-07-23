/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { Shop } from "../core/shop.js";
import {RemiApp} from '../core/app.js';

export const SET_CART = 'SET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_CHECKOUT = 'SET_CHECKOUT';

export const addToCart = (product) => async (dispatch, getState) => {

    await Shop.addToCart(product, getState().shop.checkout)

    RemiApp.element.dispatchEvent(new CustomEvent('added-to-cart', { detail: product }))
    dispatch(_addToCart(product));
};

const _addToCart = (product) => {
    
    return {
        type: ADD_TO_CART,
        product
    }
}

export const removeFromCart = (product) => async (dispatch, getState) => {

    setCheckout(null)(dispatch);
    dispatch(_removeFromCart(product));
};

const _removeFromCart = (product) =>{
    return {
        type: REMOVE_FROM_CART,
        product
    }
}

export const setCart = (cart) => async (dispatch) => {

    dispatch({
        type: SET_CART,
        cart
    })
};

export const setCheckout = (checkout) => async (dispatch) => {

    dispatch({
        type: SET_CHECKOUT,
        checkout
    })
};

export const checkout = (cart, whenDone) => async (dispatch, getState) => {

    let checkout =  getState().shop.checkout;
    const updatedCheckout = await Shop.checkout(cart, checkout);
    whenDone(updatedCheckout);


    // if (flip === 0) {
    //   dispatch({
    //     type: CHECKOUT_FAILURE
    //   });
    // } else {
    //   dispatch({
    //     type: CHECKOUT_SUCCESS
    //   });
    // }
};

const addToCartFailed = () => {

}

const addToCartSuccess = () => {

}