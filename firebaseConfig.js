// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB0md9zEMu3UFXFxktwvWqUYK7ODvqhaQ0",
  authDomain: "data-visu-5ecf7.firebaseapp.com",
  projectId: "data-visu-5ecf7",
  storageBucket: "data-visu-5ecf7.appspot.com",
  messagingSenderId: "940116619456",
  appId: "1:940116619456:web:833f4e3cdf1d249a00bd25",
  measurementId: "G-RTQ7XZ0CTH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);