import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';
import { setCart, setCheckout } from '../actions/cart.js';
import { shop} from '../reducers/shop.js';

store.addReducers({
    shop
})

customElements.define('remi-cart-data', class RemiCartData extends connect(store)(PolymerElement) {
    static get template() {
        return html`
            <app-localstorage-document key="remi-cart-data" id="storage" data="{{_cart}}"></app-localstorage-document>
            <app-localstorage-document key="remi-checkout" id="checkoutStorage" data="{{_checkout}}"></app-localstorage-document>
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

    static get observers(){
        return [
            '_cartChanged(_cart)',
            'cartChanged(cart)',
            '_checkoutChanged(_checkout)',
            'checkoutChanged(checkout)'
        ]
    }

    _cartChanged(cart){
        if(cart != this.cart){
            store.dispatch(setCart(cart));
        }
    }
    _checkoutChanged(checkout) {
        if (checkout != this.checkout) {
            store.dispatch(setCheckout(checkout));
        }
    }

    cartChanged(cart){
        this.$.storage.set('data', this.cart);
    }
    checkoutChanged(checkout){
        this.$.checkoutStorage.set('data', this.checkout)
    }

    _stateChanged(state){
        this.cart = state.shop.cart;
        this.checkout = state.shop.checkout;
        this.app = state.app.meta;
    }

    ready(){
        super.ready();
        
        //TODO
        //check if there is pending checkout
        //if complete dispatch empty cart
        //
    }
});