// import firebaseApp from "firebase/app";
import Shopify from 'shopify-buy';
import {CONFIG} from '../../config.js';

window.__REMI_APP__ = window.__REMI_APP__ || new class {

    get config() {
        return CONFIG;
    }

    constructor() {
        this.shopify = Shopify.buildClient({
            domain: this.config.SHOPIFY.DOMAIN,
            storefrontAccessToken: this.config.SHOPIFY.STORE_FRONT_TOKEN
        });
        this.element = document.querySelector('remi-app');
    }

}();

// We are exporting firebase app
export const shopify = () => {
    return window.__REMI_APP__.shopify;
}


//Export remi app or something
//this is one useless comment
export const RemiApp = window.__REMI_APP__;