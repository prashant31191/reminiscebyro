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
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
export const SET_FETCHING = 'SET_FETCHING';
export const SET_UPDATING = 'SET_UPDATING';
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';
export const SET_EDITING_PRODUCT = 'SET_EDITING_PRODUCT';
export const GET_LATEST_PRODUCTS = 'GET_LATEST_PRODUCTS';

export const getProductListing = () => async (dispatch) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)
  const data = await Shop.products;

  // You could reformat the data in the right format as well:
  const products = data;

  dispatch({
    type: GET_PRODUCTS,
    products: products
  });
};

export const getLatestProducts = () => async (dispatch) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)
  const data = await Shop.products;

  // You could reformat the data in the right format as well:
  const products = data.slice(0, 6);

  dispatch({
    type: GET_LATEST_PRODUCTS,
    products: products
  });
};

export const publishProduct = (data) => async (dispatch) => {
  
  //Set loading to true
  dispatch(setUpdating(true))

  try {
    await Shop.publishProduct(data);
    dispatch(setUpdating(false))
  } catch (error) {
    dispatch(setUpdating(false))
  }
  
}

export const setActiveProduct = (activeProduct) => {
  return {
    type: SET_ACTIVE_PRODUCT,
    activeProduct
  }
}

export const productWasViewed = (product) => async(dispatch) => {
  const done = await Shop.incrementProductView(product);
  //We can update the local state here if we want
}

export const setEditingProduct = (editingProduct) => {
  return {
    type: SET_EDITING_PRODUCT,
    editingProduct
  }
}

export const getProductBySlug = (slug, callback) => async (dispatch) => {

  const product = await Shop.getProductBySlug(slug);
  callback(Shop.transform(product));
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