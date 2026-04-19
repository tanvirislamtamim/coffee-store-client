// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVO7QqAYuE4LFx_-ioTIt0qybkthXTQfE",
  authDomain: "coffee-store-app-86da9.firebaseapp.com",
  projectId: "coffee-store-app-86da9",
  storageBucket: "coffee-store-app-86da9.firebasestorage.app",
  messagingSenderId: "814975140407",
  appId: "1:814975140407:web:d51ac1120360b15b4cb5b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);