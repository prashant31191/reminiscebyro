/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html } from '@polymer/polymer/polymer-element.js';
import { PageViewElement } from "../../components/page-view-element";
import { connect } from 'pwa-helpers/connect-mixin.js';
import { MDCRipple } from '@material/ripple';

import { store } from '../../store.js';
import template from './template.html';
import '../../components/remi-checkout.js';
import '../../components/remi-cart-item.js';
import { removeFromCart, checkout, setCheckout } from '../../actions/cart.js';
import { updateLoading} from '../../actions/app.js';
import { InjectGlobalStyle } from '../../core/utils.js';

//Imports lazy global styles
InjectGlobalStyle({ name: 'remi-cart' }, () => import('./style.html'));
InjectGlobalStyle({ name: 'material-button' }, () => import('../../components/material/button.html'));
InjectGlobalStyle({ name: 'material-textfield' }, () => import('../../components/material/textfield.html'));

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class RemiCart extends connect(store)(PageViewElement) {


    static get template() {
        return html([
            template
        ]);
    }

    static get properties(){
        return {
            loading: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        }
    }

    _delete(e){
        let product = e.target.data;
        if (product){
            store.dispatch(removeFromCart(product, this.user != null))
        }
        //handle it
    }
    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    _checkout(){

        this.loading = true;
        store.dispatch(updateLoading(true));

        if(!this.checkout){
            store.dispatch(checkout(this.items, (data) => this._onCheckoutCreated(data)))
        }else{
            this._onCheckoutCreated(this.checkout)
        }
    }

    _onCheckoutCreated(checkout){
        store.dispatch(setCheckout(checkout));
        window.location.replace(checkout.webUrl);
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        const buttonRipple = new MDCRipple(this.querySelector('.mdc-button'));
    }

    _stateChanged(state){
        this.total = state.shop.cart.total;
        this.numItems = state.shop.cart.numItems;
        this.items = state.shop.cart.items;
        this.user = state.app.user;
        this.checkout = state.shop.checkout;

    }
}

customElements.define('remi-cart', RemiCart);