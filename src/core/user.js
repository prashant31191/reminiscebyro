import "firebase/firestore";
import { firebase } from '../core/app.js';

export const User = new class {

    constructor() {
        const settings = { timestampsInSnapshots: true };
        firebase().firestore().settings(settings);
    }

    async onChanged(auth, whenDone){

        whenDone(await this._getRealUser(auth));
        
        //check if the user exits in our system
        //if not then we create it
        //then we return the new user object
    }

    _getRealUser(auth) {
        return new Promise(async (resolve, reject) => {

            let ref = firebase().firestore().doc(`/users/${auth.uid}`);
            try {
                const doc = await ref.get();
                if(doc && doc.exists){
                    resolve(doc.data())
                }else{
                    await ref.set(this._makeUserFromAuth(auth))
                    ref.get();
                    resolve(doc.data())
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    _makeUserFromAuth(auth){
        return {
            roles: {
                customer: true,
                
            },
            fullname: '',
            address: ''
        }
    }

}();