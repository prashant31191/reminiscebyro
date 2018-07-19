import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import dropin from 'braintree-web-drop-in';

import { hideAppOverflow } from '../actions/app.js';


customElements.define('remi-checkout', class extends mixinBehaviors(
    [IronOverlayBehavior], PolymerElement) {
    static get template() {
        return html`
            <style>
            remi-checkout {
                display: -webkit-box;
                display: -moz-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: box;
                display: flex;
                min-height: 100vh;
                -webkit-box-orient: vertical;
                -moz-box-orient: vertical;
                -o-box-orient: vertical;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 0;
                overflow-x: hidden;
                background-color: white;
                width: 100%;
                margin-left: auto;
                max-width: 1172px;
                padding: 0;
                visibility: hidden;
                will-change: transform;
                -webkit-transform: translate3d(calc(100% + 16px), 0, 0);
                transform: translate3d(calc(100% + 16px), 0, 0);
                transition-property: visibility, -webkit-transform;
                transition-property: visibility, transform;
                transition-duration: 0.2s;
                transition-delay: 0.1s;
            }
            remi-checkout.opened {
                z-index: 4;
                visibility: visible;
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            remi-checkout .toolbar{
                /* border-bottom: 1px solid #b4c3ca;
                border-top: 1px solid #b4c3ca; */
                display: -webkit-box;
                display: -moz-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: box;
                display: flex;
                -webkit-box-orient: horizontal;
                -moz-box-orient: horizontal;
                -o-box-orient: horizontal;
                -webkit-flex-direction: row;
                -ms-flex-direction: row;
                flex-direction: row;
                -webkit-box-align: center;
                -moz-box-align: center;
                -o-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
                background-color: white;
                padding-left: 2em;
                padding-right: 2em;
                position: relative;
                z-index: 6;
                min-height: 66px;
                -webkit-flex-shrink: 0;
                flex-shrink: 0;
            }
            .title{
                font-size: 1.5rem;
                color: var(--app-primary-color);
            }
            remi-checkout .row{
                margin-bottom: 2em;
            }
            remi-checkout main{
                max-width: 800px;
                margin: 1em auto;
                
                padding: 1em;
            }
            remi-checkout .wrapper{
                /* box-shadow: 5px 5px 10px 0 rgba(46,61,73,.2); */
                padding: 2em;
            }
            remi-checkout h2{
                font-size: 14px;
            }
            .actions{
                margin-top: 3em;
            }
            @media (max-width: 767px) {
                remi-checkout {
                    /* top: auto;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: auto;*/
                    -webkit-transform: translate3d(0, 100%, 0);
                    transform: translate3d(0, 100%, 0); 
                }
                remi-checkout .wrapper{
                    padding: 0;
                }
            }
            </style>
            <div>
                <header class="toolbar">
                    <h1 class="title">Checkout</h1>
                    <span class="flex"></span>
                    <button class="mdc-button" dialog-dismiss>
                        <iron-icon icon="bn-icons:close"></iron-icon>
                    </button>
                </header>
                <main>
                    <div class="layout horizontal center">
                        <p>If you have any troubles please contact our support.</p>
                         <span class="flex"></span>
                        <div>
                            <iron-icon icon="bn-icons:phone"></iron-icon>
                            8 800 505 04 83
                        </div>
                    </div>
                    <div class="wrapper">
                        <h2>General Information</h2>
                        <section class="row">
                            <div class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon">
                                <iron-icon class="mdc-text-field__icon" icon="bn-icons:email"></iron-icon>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="name"
                                    required
                                    value="{{data.name::change}}" 
                                    class="mdc-text-field__input">
                                <label class="mdc-floating-label" for="name">Email</label>
                                <div class="mdc-line-ripple"></div>
                            </div>
                            <div class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon">
                                <iron-icon class="mdc-text-field__icon" icon="bn-icons:email"></iron-icon>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="name"
                                    required
                                    value="{{data.name::change}}" 
                                    class="mdc-text-field__input">
                                <label class="mdc-floating-label" for="name">Phone Number</label>
                                <div class="mdc-line-ripple"></div>
                            </div>
                        </section>
                        
                        <h2>Shipping Address</h2>
                        <section class="row">
                            <div class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon">
                                <iron-icon class="mdc-text-field__icon" icon="bn-icons:email"></iron-icon>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="name"
                                    required
                                    value="{{data.name::change}}" 
                                    class="mdc-text-field__input">
                                <label class="mdc-floating-label" for="name">Address</label>
                                <div class="mdc-line-ripple"></div>
                            </div>
                            <div class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon">
                                <iron-icon class="mdc-text-field__icon" icon="bn-icons:email"></iron-icon>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="name"
                                    required
                                    value="{{data.name::change}}" 
                                    class="mdc-text-field__input">
                                <label class="mdc-floating-label" for="name">City</label>
                                <div class="mdc-line-ripple"></div>
                            </div>
                        </section>
                        <section class="row">
                            <div class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon">
                                <iron-icon class="mdc-text-field__icon" icon="bn-icons:email"></iron-icon>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="name"
                                    required
                                    value="{{data.name::change}}" 
                                    class="mdc-text-field__input">
                                <label class="mdc-floating-label" for="name">State/Province</label>
                                <div class="mdc-line-ripple"></div>
                            </div>
                            <div class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon">
                                <iron-icon class="mdc-text-field__icon" icon="bn-icons:email"></iron-icon>
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="name"
                                    required
                                    value="{{data.name::change}}" 
                                    class="mdc-text-field__input">
                                <label class="mdc-floating-label" for="name">Zip/Postal Code</label>
                                <div class="mdc-line-ripple"></div>
                            </div>
                        </section>
                        <h2>Payment Options</h2>
                        <section>
                            <div id="dropin-container"></div>
                        </section>
                        <section class="actions layout horizontal center-center">
                            <button class="mdc-button bn-green" hidden$="[[!showButton]]" id="submit-button">Place Order</button>
                        </section>
                    </div>
                </main>
            </div>
`;
    }

    static get properties() {
        return {
            withBackdrop: {
                type: Boolean,
                value: true
            }
        }
    }

    ready() {
        super.ready();
        this.setAttribute('role', 'dialog');
        this.setAttribute('aria-modal', 'true');
        this.addEventListener('transitionend', (e) => this._transitionEnd(e));
        this.addEventListener('iron-overlay-canceled', (e) => this._onCancel(e));
        this.querySelectorAll('.mdc-button').forEach(elem => new MDCRipple(elem));
        this.querySelectorAll('.mdc-text-field').forEach((node) => new MDCTextField(node));
        this.showButton = false;
        this._initializeBraintree()
    }

    _initializeBraintree(){
        let submitButton = this.querySelector('#submit-button');

        dropin.create({
            authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
            selector: '#dropin-container',
            paypal: {
                flow: 'vault',
                amount: '10.00',
                currency: 'USD'
            }
        })
        .then((instance) =>  {
            submitButton.addEventListener('click', (e) => this._sendPayment(instance))
            this.showButton = true;
        })
        .catch((err) => {
            console.log(err)
        });
    }

    async _sendPayment(instance){
        console.log(instance);
        try {
            const payload = await instance.requestPaymentMethod
        } catch (error) {
            console.log(error)
        }
    }

    _renderOpened() {
        hideAppOverflow(true);
        this.restoreFocusOnClose = true;
        this.classList.add('opened');

    }

    _renderClosed() {
        hideAppOverflow();
        this.classList.remove('opened');
    }

    _onCancel(e) {
        // Don't restore focus when the overlay is closed after a mouse event
        if (e.detail instanceof MouseEvent) {
            this.restoreFocusOnClose = false;
        }
    }

    _attachDom(node) {
        dom(this).appendChild(node);
    }

    _transitionEnd(e) {
        if (e.target !== this || e.propertyName !== 'transform') {
            return;
        }
        if (this.opened) {
            this._finishRenderOpened();
            this.fire('announce', 'Item added to the cart');
        } else {
            this._finishRenderClosed();
            this.backdropElement.style.display = '';
        }
    }

    // get _focusableNodes() {
    //     return [this.$.viewCartAnchor, this.$.closeBtn];
    // }

    refit() { }

    notifyResize() { }
});