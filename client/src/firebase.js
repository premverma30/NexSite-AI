// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nexsiteai-c65c9.firebaseapp.com",
  projectId: "nexsiteai-c65c9",
  storageBucket: "nexsiteai-c65c9.firebasestorage.app",
  messagingSenderId: "696395467360",
  appId: "1:696395467360:web:f49973fa2ab1c1f4539105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}