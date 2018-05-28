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
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { typography } from '../../components/typo.js';
import buttonStyles from "../../components/material/button.html";
import { MDCRipple } from '@material/ripple';
import '@polymer/iron-image';
import { PageViewElement } from '../../components/page-view-element.js';
import { fadeIn, fadeOut } from '../../components/animation.js';
import "../../components/app-product-item.js";

/**
 * `ts-home` Description
 *
 * @customElement
 * @polymer
 * @demo 
 * 
 */
class TsHome extends PageViewElement {
    

    static get template() {
        return html`
            ${typography}
            ${html([template])}
            ${html([buttonStyles])}
            ${html([SharedStyles])}
        `;
    }

    static get observers(){
        return [
            '_onSelectedChange(selected)'
        ]
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {
            swiper: {
                type: Object,
                value: {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'progressbar',
                    },
                    slidesPerView: 3,
                    spaceBetween: 38,
                    centeredSlides: true
                }
            },
        }
    }

    show(){
        fadeIn(this);
        
    }

    hide(){
        fadeOut(this);
    }

    _onSelectedChange(selected){
        
        selected ? this.show() : this.hide()  
        this.active = selected;
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

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    async ready() {
        super.ready();
        const buttonRipple = new MDCRipple(this.shadowRoot.querySelector('.mdc-button'));
        await import('iron-swiper-3/iron-swiper.js');
        
    }
}

customElements.define('ts-home', TsHome);