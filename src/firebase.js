// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBmtECgQXpFNoF3ehOduT1qu0M0WPIeBN4",
  authDomain: "model-leap.firebaseapp.com",
  projectId: "model-leap",
  storageBucket: "model-leap.firebasestorage.app",
  messagingSenderId: "571089248941",
  appId: "1:571089248941:web:f57fb57539be67061e9c24",
  measurementId: "G-C8K7RMCNB4"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBOMPkSpa-L2HJ8birqKGwoerxnI1Syph0",
//   authDomain: "llms-d6b5b.firebaseapp.com",
//   projectId: "llms-d6b5b",
//   storageBucket: "llms-d6b5b.appspot.com",
//   messagingSenderId: "42614629750",
//   appId: "1:42614629750:web:5b924bfc7e2eb4f1c9c657"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export default app;