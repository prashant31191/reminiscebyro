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
import '@polymer/iron-image';
import './remi-color-swatch-input.js';
import './quantity-input.js';

class CartItem extends PolymerElement {

  static get properties() { return {
    _items: Array,
    _total: Number
  }}

  static get template(){
    return html`
    <style>
      :host{
        display: block;
        padding: 16px;
      }

      .inner{
        display: flex;
      }
      .media{
        width: 275px;
        height: 200px;
      }
      iron-image{
          width: 100%;
          height: 100%;
      }
      .info{
        padding: 024px;
      }
      .info>*{
        display: flex;
        margin: 12px 0;
      }
      .flex{
        flex: 1;
      }
      .center{
        align-items: center;
        justify-content: center;
      }
      .name{
        font-weight: 500;
        font-size: .5rem;
        color: #393433;
        text-decoration:none;
      }
      .price{
        font-weight: 600;
      }
    </style>
    <div class="inner">
      <div class="media">
        <iron-image 
              style="background-color: lightgray;" 
              sizing="cover" preload fade 
              src="/assets/images/cosmetics-1543271_960_720.jpg">
          </iron-image>
      </div>
      <div class="info flex">
        <div class="center">
          <a class="name" href="/product/matte-latte">
            <h1>Matte Latte Lipstick</h1>
          </a>
          <span class="flex"></span>
          <span class="price">$59.99</span>
        </div>
        <div>
            <!-- Color -->
            <remi-color-swatch-input readonly></remi-color-swatch-input>
            <!-- Quantity -->
            <quantity-input min="1" max="7"></quantity-input>
          <span class="flex"></span>
          <paper-icon-button icon="bn-icons:close"></paper-icon-button>
        </div>
      </div>
    </div>
    `;
  }

  
}

window.customElements.define('remi-cart-item', CartItem);
