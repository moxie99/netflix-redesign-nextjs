// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpodbPlBOCvT52_tlXcjg1cLZo6pE_6jI",
  authDomain: "movie-app-netflix-redesign.firebaseapp.com",
  projectId: "movie-app-netflix-redesign",
  storageBucket: "movie-app-netflix-redesign.appspot.com",
  messagingSenderId: "149540419419",
  appId: "1:149540419419:web:db0bad67bcd538d8260c7e",
  measurementId: "G-JNVQZ23SCK"
};

// Initialize Firebase

// checking if app has been initialized, if yes, dont initialize otherwise initialize
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export {auth, db};
