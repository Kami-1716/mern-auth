// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c9e14.firebaseapp.com",
  projectId: "mern-auth-c9e14",
  storageBucket: "mern-auth-c9e14.appspot.com",
  messagingSenderId: "59619928827",
  appId: "1:59619928827:web:230fd9f64c1222e17ede5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
