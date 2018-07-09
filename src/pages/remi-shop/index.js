/**
    @license
    Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import template from './template.html'
import SharedStyles  from '../../components/shared-styles.html';
import '@polymer/iron-image';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store.js';
import "../../components/remi-product-item";
import buttonStyles from "../../components/material/button.html";
import { PageViewElement } from '../../components/page-view-element.js';
import { fadeIn, fadeOut } from '../../components/animation.js';

/**
 * `ts-home` Description
 *
 * @customElement
 * @polymer
 * @demo 
 * 
 */
class RemiShop extends connect(store)(PageViewElement) {
    

    static get template() {
        return html([
            template
            + SharedStyles 
            + buttonStyles
        ])

    }

    static get observers(){
        return [
        ]
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {
            
        }
    }

    hide() {
        return new Promise(async (resolve, reject) => {
          const animation = await fadeOut(this).finished;
          this.active = false;
          resolve();
        })

    }

    show() {
        return new Promise(async (resolve, reject) => {
          const animation = await fadeIn(this).finished;
          this.active = true;
          resolve();
        })

    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
        this.bestSellers = [{},{},{},{}]
    }

    connectedCallback(){
        super.connectedCallback();
    }

    _stateChanged(state){
        this.user = state.app.user;
    }
    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    async ready() {
        super.ready();
        
    }
}

customElements.define('remi-shop', RemiShop);