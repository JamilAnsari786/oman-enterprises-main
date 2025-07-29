// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQivMLpB_d_9hOWvku9W2f8CbxvLdaDG8",
  authDomain: "oman-enterprises.firebaseapp.com",
  projectId: "oman-enterprises",
  storageBucket: "oman-enterprises.appspot.com", // ❗ corrected URL here
  messagingSenderId: "402655721935",
  appId: "1:402655721935:web:84c47f827b50592d52faba",
  measurementId: "G-T95RY3385B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Export Firestore only
