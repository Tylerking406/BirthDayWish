// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCgsHR5Retg_zRrdw9rKsdyNnQjdsZNkRE",
    authDomain: "guestbooking-c6a83.firebaseapp.com",
    projectId: "guestbooking-c6a83",
    storageBucket: "guestbooking-c6a83.appspot.com",
    messagingSenderId: "958458834751",
    appId: "1:958458834751:web:c2760462961458f4c16d8a",
    measurementId: "G-NHE3Q62DF0"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
