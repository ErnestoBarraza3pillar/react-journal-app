import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc  } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 
const firebaseConfig = {
    apiKey: "AIzaSyDq3U8aace3K5SlA0PnoKBNnrSjdGOGo6s",
    authDomain: "react-app-60437.firebaseapp.com",
    projectId: "react-app-60437",
    storageBucket: "react-app-60437.appspot.com",
    messagingSenderId: "739636722212",
    appId: "1:739636722212:web:1065c4b622c0061cac76b1"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider

}
