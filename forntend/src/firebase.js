import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm0NLOw...",
  authDomain: "portfolio-a851b.firebaseapp.com",
  projectId: "portfolio-a851b",
  storageBucket: "portfolio-a851b.appspot.com",
  messagingSenderId: "18132745539",
  appId: "1:18132745539:web:ae95aa3d2cb7cdf52b03f6",
  measurementId: "G-DYPMV3TZNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance

export { db };
