
import {shopify, RemiApp} from './app.js';

export const Shop = RemiApp.Shop = RemiApp.Shop || new class {
    
    constructor() {
        this.products = shopify().product.fetchAll();
        this.collections = shopify().collection.fetchAllWithProducts();
    }

    createCheckout(){
        return shopify().checkout.create();
    }

    incrementProductView(product){

    }


    //Cart ====================

    addToCart(product){
        return new Promise(async (resolve, reject) => {
            try {
                //const querySnapshot = await firebase().firestore().collection("products").get();
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    removeFromCart(product){
        return new Promise(async (resolve, reject) => {
            try {
                //const querySnapshot = await firebase().firestore().collection("products").get();
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

   

}();