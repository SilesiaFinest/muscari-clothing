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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
