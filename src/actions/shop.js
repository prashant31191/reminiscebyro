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

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
export const SET_FETCHING = 'SET_FETCHING';
export const SET_UPDATING = 'SET_UPDATING';
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';


export const getProductListing = () => async (dispatch) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)
  dispatch(setFetching(true))
  const data = await Shop.getAllProduct();
  dispatch(setFetching(false))

  // You could reformat the data in the right format as well:
  const products = data;

  dispatch({
    type: GET_PRODUCTS,
    products: products
  });
};

export const publishProduct = (data) => async (dispatch) => {
  
  //Set loading to true
  dispatch(setUpdating(true))

  try {
    const snapshot = await Shop.publishProduct(data);
    console.log(snapshot);
    //dispatch(setActiveProduct(product))
    dispatch(setUpdating(false))
  } catch (error) {
    console.error(error);
    dispatch(setUpdating(false))
  }
  
}

export const setActiveProduct = (activeProduct) => {
  return {
    type: SET_ACTIVE_PRODUCT,
    activeProduct
  }
}

export const getProductBySlug = (slug) => async (dispatch) => {

  const product = await Shop.getProductBySlug(slug);
  dispatch(setActiveProduct(product))
}

export const checkout = (productId) => (dispatch) => {
  // Here you could do things like credit card validation, etc.
  // If that fails, dispatch CHECKOUT_FAILURE. We're simulating that
  // by flipping a coin :)
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    dispatch({
      type: CHECKOUT_FAILURE
    });
  } else {
    dispatch({
      type: CHECKOUT_SUCCESS
    });
  }
};

export const addToCart = (productId) => (dispatch, getState) =>{
  const state = getState();
  // Just because the UI thinks you can add this to the cart
  // doesn't mean it's in the inventory (user could've fixed it);
  if (state.shop.products[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId
  };
};

export const addToCartUnsafe = (productId) => {
  return {
    type: ADD_TO_CART,
    productId
  };
}

export const setUpdating = (value) => {
  return {
    type: SET_UPDATING,
    value
  }
}

export const setFetching = (value) => {
  return {
    type: SET_FETCHING,
    value
  }
}