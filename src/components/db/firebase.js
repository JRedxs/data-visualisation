import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB0md9zEMu3UFXFxktwvWqUYK7ODvqhaQ0",
    authDomain: "data-visu-5ecf7.firebaseapp.com",
    projectId: "data-visu-5ecf7",
    storageBucket: "data-visu-5ecf7.appspot.com",
    messagingSenderId: "940116619456",
    appId: "1:940116619456:web:833f4e3cdf1d249a00bd25",
    measurementId: "G-RTQ7XZ0CTH"
  };
  

const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

export default db;