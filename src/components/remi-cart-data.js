import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';
import { setCart } from '../actions/cart.js';
import { shop} from '../reducers/shop.js';

store.addReducers({
    shop
})

customElements.define('remi-cart-data', class RemiCartData extends connect(store)(PolymerElement) {
    static get template() {
        return html`
            <app-localstorage-document key="remi-cart-data" id="storage" data="{{_cart}}"></app-localstorage-document>
        `;
    }

    static get is() { return 'shop-cart-data'; }

    static get properties() {
        return {

            _cart: {
                type: Object,
                observer: '_cartChanged'
            },
            cart: {
                type: Object,
                observer: 'cartChanged'
            }

        }
    }

    _cartChanged(cart){
        if(cart != this.cart){
            store.dispatch(setCart(cart));
        }
        
    }

    cartChanged(){
        this.$.storage.set('data', this.cart);
    }

    _stateChanged(state){
        this.cart = state.shop.cart;
    }

    ready(){
        super.ready();
    }
});