// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBDrlovrULiticJ1ogQBkRvkcXpJxrWDws",
  authDomain: "aitrip-dfbe5.firebaseapp.com",
  projectId: "aitrip-dfbe5",
  storageBucket: "aitrip-dfbe5.appspot.com",
  messagingSenderId: "427766090910",
  appId: "1:427766090910:web:7e70a6cfff16867e7d3f8f",
  measurementId: "G-4B8C64QKD3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
