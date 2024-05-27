import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAy7yFpgKYeHM7A3PFQq3FK7TBfPya_qOA",
    authDomain: "chat-app-0987.firebaseapp.com",
    projectId: "chat-app-0987",
    storageBucket: "chat-app-0987.appspot.com",
    messagingSenderId: "153534918873",
    appId: "1:153534918873:web:232ef56f07060761624ec8",
    measurementId: "G-9RRCZKYRE0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

