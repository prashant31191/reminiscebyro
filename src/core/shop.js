
import {shopify, RemiApp} from './app.js';

export const Shop = RemiApp.Shop = RemiApp.Shop || new class {
    
    constructor() {
        this.products = shopify().product.fetchAll();
        this.collections = shopify().collection.fetchAllWithProducts();
    }

    checkout(cart){
        return new Promise(async (resolve, reject) => {
            try {
                const checkout = await shopify().checkout.create();
                await shopify().checkout.addLineItems(checkout.id, cart.map(
                    item => {
                        return {
                            variantId: item.id, 
                            quantity: item.quantity
                        }
                    })
                )
                resolve(await shopify().checkout.fetch(checkout.id));
            } catch (error) {
                reject(error);
            }
        })
        
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