// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "schoolsync-16ed1.firebaseapp.com",
  projectId: "schoolsync-16ed1",
  storageBucket: "schoolsync-16ed1.firebasestorage.app",
  messagingSenderId: "390686593823",
  appId: "1:390686593823:web:4c0c6f6de3d42a9a5d562a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
