/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  SET_ACTIVE_PRODUCT,
  GET_PRODUCTS,
  ADD_TO_CART,
  SET_EDITING_PRODUCT,
  REMOVE_FROM_CART,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  SET_CART
} from '../actions/shop.js';

const INITIAL_CART = {
  items: [],
  total: 0,
  numItems: 0,
};

const INITIAL_PRODUCT = {
  views: 0
}

const INITIAL_STATE = {
  products: [], 
  activeProduct: null,
  editingProduct: INITIAL_PRODUCT, 
  cart: INITIAL_CART
}

export const shop = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
    case SET_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: action.activeProduct
      }
    case SET_EDITING_PRODUCT:
      return {
        ...state,
        editingProduct: action.editingProduct
      }
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case SET_CART:
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        // products: products(state.products, action),
        cart: cart(state.cart, action),
        error: ''
      };
    case CHECKOUT_FAILURE:
      return {
        ...state,
        error: 'Checkout failed. Please try again'
      };
    default:
      return state;
  }
};

const cart = (state = INITIAL_CART, action) => {
  switch (action.type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      return {
        items: getItems(state.items, action),
        total: getTotal(state.total, action),
        numItems: getNumItems(state.numItems, action)
      };
    case SET_CART:
      return action.cart;
    case CHECKOUT_SUCCESS:
      return INITIAL_CART;
    default:
      return state;
  }
};

const getItems = (state = INITIAL_CART.items, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let i = _indexOf(action.product, state);
      if(i != -1){
        return updateQuantity(i, action.product.quantity, state)
      }
      return [
        ...state,
        action.product
      ]
    case REMOVE_FROM_CART:
        return state.filter(e => e.key !== action.product.key);

    default:
      return state;
  }
};

const getTotal = (state = INITIAL_CART.total, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state + (action.product.price * action.product.quantity)
    case REMOVE_FROM_CART:
      return state + (action.product.price - action.product.quantity)

    default:
      return state;
  }
}

const getNumItems = (state = INITIAL_CART.numItems, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state + (1 * action.product.quantity)
    case REMOVE_FROM_CART:
      return state - (1 * action.product.quantity)

    default:
      return state;
  }
}

const updateQuantity = (index, quantity, state) =>{
  let newState = [
    ...state
  ]
  newState[index].quantity += quantity;
  return newState;
}

const _indexOf = (product, cart) => {
  if (cart) {
      for (let i = 0; i < cart.length; ++i) {
          let entry = cart[i];
        if (entry.key === product.key && entry.selectedColor === product.selectedColor) {
            return i;
        }
      }
  }
  return -1;
}

// Slice reducer: it only reduces the bit of the state it's concerned about.
// const products = (state, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//     case REMOVE_FROM_CART:
//       const productId = action.productId;
//       return {
//         ...state,
//         [productId]: product(state[productId], action)
//       };
//     default:
//       return state;
//   }
// };

// const product = (state, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return {
//         ...state,
//         inventory: state.inventory - 1
//       };
//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         inventory: state.inventory + 1
//       };
//     default:
//       return state;
//   }
// };