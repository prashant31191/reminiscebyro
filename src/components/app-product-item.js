/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement  } from '@polymer/lit-element';
import '@polymer/iron-image';
import buttonStyles from "./material/button.html";
import '@polymer/iron-icon';

class $ProductItem extends LitElement {
    _render(props) {
        return html`
        ${html([buttonStyles])}
        <style>
            :host{
                display: block;
                background: #eee;
                height: 375px;
                position: relative;
                overflow: hidden;
            }
            :host([shadow]){
                box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
            }
            :host(:not([featured]))
             .cart-icon{
                display:none;
            }
            iron-image, .product-media, .wrapper{
                width: 100%;
                height: 100%;
            }
            footer{
                position: absolute;
                bottom: 0px;
                width:100%;
                background: #e3ecebb0;
            }
            .title{
                font-size: 18px;
                font-weight: 500;
                color: #000000db;
                padding-bottom: 8px;
                margin: 0;
            }
            .price-tag{
                color: #d80b6d;
                font-size: 16px;
            }
            .flexed{
                display: flex;
            }
            .pad{
                padding: 1em;
            }
        </style>
            
        <div class="wrapper">
            <header></header>
            <div class="product-media">
                <iron-image 
                    style="background-color: lightgray;" 
                    sizing="cover" preload fade 
                    src="/images/cosmetics-1543271_960_720.jpg">
                </iron-image>
            </div>
            <footer>
                <div class="pad">
                    <h4 class="title">Chocolate is so cool</h4>
                    <div class="flexed">
                        <span class="price-tag">$60.00</span>
                        <span style="flex:1"></span>
                        <button class="mdc-button"> 
                            <iron-icon icon="bn-icons:cart" class="cart-icon"></iron-icon> Add to Cart</button>
                    </div>
                </div>
                
            </footer>
        </div>
        
    `;
    }

    static get properties() {
        return {
            title: String,
        }
    }

    constructor() {
        super();

    }

    _firstRendered() {

    }

    _didRender(properties, changeList) {

    }
}

window.customElements.define('app-product-item', $ProductItem);