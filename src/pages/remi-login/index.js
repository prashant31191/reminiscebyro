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
import { MDCTextField } from '@material/textfield';

import { fadeIn, fadeOut } from '../../components/animation.js';
import { store } from '../../store.js';
import template from './template.html';
import textfield from '../../components/material/textfield.html';
import SharedStyles from '../../components/shared-styles.html';
import buttonStyles from "../../components/material/button.html";

import { login } from '../../actions/app.js';


/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class RemiLogin extends connect(store)(PageViewElement) {
    static get properties() {
        return {
            _user: Object,
        }
    }

    static get template() {
        return html([
            template +
            buttonStyles +
            SharedStyles +
            textfield
        ]);
    }

    /**
            * Object describing property-related metadata used by Polymer features
            */
    static get observers() {
        return [
            '_userChanged(_user, active)'
        ]
    }

    _userChanged(user){
        if(user && this.active){
            this.$.back.click();
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


    submit(e) {
        e.preventDefault();
        let node = e.target;

        let data = {
            email: this.email,
            password: this.password
        }
        if(this._formIsValid()){
            this._login(data)
        }else{
            console.log('form is invalid')
        }
    }

    _formIsValid() {
        return this.shadowRoot.querySelector('form').checkValidity();
    }

    _login(data) {
        return store.dispatch(login(data))
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
        this.shadowRoot.querySelectorAll('.mdc-text-field').forEach((node) => new MDCTextField(node));
    }

    _stateChanged(state){
        this._user = state.app.user
    }
}

customElements.define('remi-login', RemiLogin);