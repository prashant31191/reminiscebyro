import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';
import { setCart } from '../actions/shop.js';
import { shop} from '../reducers/shop.js';

store.addReducers({
    shop
})

customElements.define('remi-cart-data', class RemiCartData extends connect(store)(PolymerElement) {
    static get template() {
        return html`
            <app-localstorage-document key="remi-cart-data" data="{{_cart}}"></app-localstorage-document>
        `;
    }

    static get is() { return 'shop-cart-data'; }

    static get properties() {
        return {

            cart: {
                type: Array,
                value: {},
                observer: '_cartChanged'
            }

        }
    }

    static get observers(){
        return [
            '_localCartChanged(_cart)'
        ]
    }

    _localCartChanged(cart){
        if(cart.numItems != this.cart.numItems){
            store.dispatch(setCart(cart));
        }
        
    }

    _cartChanged(cart){
        this._cart = cart;
    }

    _stateChanged(state){
        this.cart = state.shop.cart;
    }

    ready(){
        super.ready();
    }
});