import "firebase/firestore";
import { firebase } from '../core/app.js';

export const Shop = new class {
    
    constructor() {
        const settings = {timestampsInSnapshots: true };
        firebase().firestore().settings(settings);
    }

    publishProduct(data){
        return !data.key ? firebase().firestore().collection('products').add(data)
        : this.updateProduct(data);
    }

    getProduct(key){
        return firebase().firestore().collection("products").doc(key).get()
    }

    getProductBySlug(slug){
        return new Promise(async (resolve, reject) => {
            try {
                const querySnapshot = await firebase().firestore().collection("products").where("slug", "==", slug).get()
                resolve(this._formatProducts(querySnapshot));
            } catch (error) {
                reject(error);
            }
        })
    }

    getAllProduct(){
        return new Promise(async (resolve, reject) => {
            try {
                const querySnapshot = await firebase().firestore().collection("products").get();
                resolve(this._formatProducts(querySnapshot));
            } catch (error) {
                reject(error);
            }
        })
        
    }

    _formatProducts(querySnapshot){
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                key: doc.id
            })
        });
        return data.length > 2 ? data : data[0];
    }

    deleteProduct(key){

    }

    updateProduct(data){
        return firebase().firestore().collection('products').doc(data.key)
                .set(data);
    }

    _makeUpdate(data){
        
        
    }
   

}();