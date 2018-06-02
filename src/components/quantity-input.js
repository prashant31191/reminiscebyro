/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { LitElement, html } from '@polymer/lit-element';

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class QuantityInput extends LitElement {
    static get properties() {
        return {

        }
    }

    _render(props){
        return html `
        <style>
            :host { 
                display: block;
                max-width: 125px;
                background: #eee;
            }
            input{
                border: 0px;
                outline: 0px;
                background: transparent;
            }
            .quantity>*{
                display: inline-block;
            }
            input[type=text]{
                width: calc(100% - 110px);
                vertical-align:baseline;
            }
            input[type=button]{
                width: 50px;
                height: 44px;
                cursor: pointer;
            }
        </style>
        <div class="quantity">
            <input type="button" value="—" on-click="${(e) => {this.minus(e)}}" class="qtyminus">
            <input type="text" name="Quantity" value="${props.value}" class="qty" readonly>
            <input type="button" value="+" class="qtyplus" on-click="${(e) => { this.plus(e) }}">
        </div>
        `;
    }

    /**
            * Object describing property-related metadata used by Polymer features
            */
    static get properties() {
        return {
            value: Number
        }
    }

    minus(e){
        this.value--;
        this.valueChange();
    }
    
    plus(e){
        this.value++;
        this.valueChange();
    }

    valueChange(){
        this.dispatchEvent(new CustomEvent('value-change', {detail: this.value}))
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
        this.value = 1;
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
    }
}

customElements.define('quantity-input', QuantityInput);