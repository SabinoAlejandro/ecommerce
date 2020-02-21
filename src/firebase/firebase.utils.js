import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBvbzs-E-6jxeB1nq-lByal9xNIY-qZPSE',
  authDomain: 'ecommerce-db-2addb.firebaseapp.com',
  databaseURL: 'https://ecommerce-db-2addb.firebaseio.com',
  projectId: 'ecommerce-db-2addb',
  storageBucket: 'ecommerce-db-2addb.appspot.com',
  messagingSenderId: '575046769256',
  appId: '1:575046769256:web:6d3791057468a8465db9dd',
  measurementId: 'G-KXTDVDV27Q'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
