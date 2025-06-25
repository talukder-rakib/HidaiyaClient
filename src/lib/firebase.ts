// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRSc2MKEIPlEz2iE6OlvoIyZhb4m2SpBY",
  authDomain: "hidaya-3c2f4.firebaseapp.com",
  projectId: "hidaya-3c2f4",
  storageBucket: "hidaya-3c2f4.appspot.com", // FIX: storageBucket URL was incorrect
  messagingSenderId: "1060835857966",
  appId: "1:1060835857966:web:cbe00c48db816c3cbd31bf",
  measurementId: "G-3QK29V328Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
