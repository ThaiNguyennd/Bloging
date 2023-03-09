import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA2056KFEoCTgQLJ5U4aQmEH9CD-ONpk4w",
  authDomain: "my-blogging-2d72c.firebaseapp.com",
  projectId: "my-blogging-2d72c",
  storageBucket: "my-blogging-2d72c.appspot.com",
  messagingSenderId: "362047302032",
  appId: "1:362047302032:web:15252653e1966ff1ac6b15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)