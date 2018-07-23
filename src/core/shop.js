
import {shopify, RemiApp} from './app.js';

export const Shop = RemiApp.Shop = RemiApp.Shop || new class {
    
    constructor() {
        this.products = shopify().product.fetchAll();
        this.collections = shopify().collection.fetchAllWithProducts();
    }

    checkout(cart, checkout = null){
        return new Promise(async (resolve, reject) => {
            try {
                (checkout != null) 
                ? resolve(await shopify().checkout.fetch(checkout.id))
                : resolve(await this._createCheckout(cart))
            } catch (error) {
                reject(error);
            }
        })
    }

    async _createCheckout(cart){
        const checkout = await shopify().checkout.create();
        await shopify().checkout.addLineItems(checkout.id, cart.map(
            item => {
                return {
                    variantId: item.id,
                    quantity: item.quantity
                }
            })
        )
        return await shopify().checkout.fetch(checkout.id);
    }

    incrementProductView(product){

    }


    //Cart ====================

    /**
    * @desc Adds a product to shopify cart
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async addToCart(product, checkout=null){
        if(checkout == null){
            return;
        }

        return await shopify().checkout.addLineItems(checkout.id, [
            {
                variantId: product.id,
                quantity: product.quantity
            }
        ])
    }

    async removeFromCart(product, checkout=null){
        if (checkout == null) {
            return;
        }

        return await shopify().checkout.removeLineItems(checkout.id, [
            /**
             * TODO remove line item
             */
            //we need the id
            //hmm
        ])
    }

    async getProductBySlug(slug){
        return await shopify().product.fetchByHandle(slug);
    }

    transform(data){
        return {
            name: data.title,
            key: data.id,
            image: data.images[0] && data.images[0].src,
            price: data.variants[0] && data.variants[0].price,
            description: data.description,
            created_at: data.createdAt,
            published_at: data.publishedAt,
            variants: data.variants,
            tags: data.tags,
            link: data.onlineStoreUrl,
            slug: data.handle
        }
    }

   

}();