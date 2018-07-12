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
import buttonStyles from "../../components/material/button.html";

import { store } from '../../store.js';
import template from './template.html';
import SharedStyles from '../../components/shared-styles.html';
import '../../components/remi-cart-item.js';
import { removeFromCart } from '../../actions/shop.js';

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class RemiCart extends connect(store)(PageViewElement) {
    static get properties() {
        return {

        }
    }

    static get template() {
        return html([
            template +
            buttonStyles +
            SharedStyles
        ]);
    }

    /**
            * Object describing property-related metadata used by Polymer features
            */
    static get properties() {
        return {}
    }

    _delete(e){
        let product = e.target.data;
        if (product){
            store.dispatch(removeFromCart(product))
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

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        const buttonRipple = new MDCRipple(this.shadowRoot.querySelector('.mdc-button'));
    }

    _stateChanged(state){
        this.total = state.shop.cart.total;
        this.numItems = state.shop.cart.numItems;
        this.items = state.shop.cart.items;
    }
}

customElements.define('remi-cart', RemiCart);