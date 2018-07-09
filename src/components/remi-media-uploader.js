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
import '@polymer/iron-icon';

class MediaUploader extends PolymerElement {

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
      .main{
        width: 100%;
        height: 360px;
        background-color: black;
        cursor: pointer
      }
      .main>div{
          background-color: #eee;
          width: 100%;
          height: 100%;
      }
      .placeholder{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
      iron-icon{
        --iron-icon-height: 85px;
        --iron-icon-width: 85px;
        
      }
      .main:hover>div{
          opacity: .9;
      }
    </style>
    <div class="inner">
      <div class="main">
          <div>
              <div class="placeholder">
                  <iron-icon src="/assets/icons/media.svg"></iron-icon>
              </div>
          </div>
      </div>
      <div class="list">

      </div>
    </div>
    `;
  }

  
}

window.customElements.define('remi-media-uploader', MediaUploader);
