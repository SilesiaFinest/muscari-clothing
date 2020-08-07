import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyApFxTtE2lqrLE-9xXIv7v_InwfKaJ_fIo",
  authDomain: "mscr-db.firebaseapp.com",
  databaseURL: "https://mscr-db.firebaseio.com",
  projectId: "mscr-db",
  storageBucket: "mscr-db.appspot.com",
  messagingSenderId: "820795289441",
  appId: "1:820795289441:web:9fe1dd319ccb30e91e9f20",
  measurementId: "G-DN13LPZ0R4",
};

// creating user profile from Auth to be stored in the DB
// reminder: in Firebase snapshot represents data only; info, path and methods are on refs (CRUD)
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // first checking if object is not null (like when signing out)
  if (!userAuth) return;

  // create documentRef with user ID
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // .get() method on useRef to check if data exists in DB (snapShot.exists is true)
  const snapShot = await userRef.get();

  // if it doesn't exist in the DB we create a new user
  if (!snapShot.exists) {
    // we are choosing the data from userAuth object we want to store + createdAt time
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // creating new entry using try-catch block for async request; method .set() (on the ref not snapshot!)
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // code above is creating a new user in the DB if needed
  // the function will always return userRef so it can be reused in App.js
  return userRef;
};

//code belowa was used to batch add SHOP_DATA to the FirebaseDB
/*
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}; */

firebase.initializeApp(config);

// this is a functions which would take collections snapshot from Firestore
// and then transform it to
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
