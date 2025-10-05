// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔐 Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2C2fTIv6dzjr_PRBV2-whiOBRLehcI80",
  authDomain: "jahidportfolio-89255.firebaseapp.com",
  projectId: "jahidportfolio-89255",
  storageBucket: "jahidportfolio-89255.firebasestorage.app",
  messagingSenderId: "745831592331",
  appId: "1:745831592331:web:f8f622f8c2ae64ffe47f8e",
  measurementId: "G-0DEHP8EX8R",
};


// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// ✅ Initialize analytics only in browser environment
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// ✅ Export all initialized Firebase services
export { auth, db, storage, provider, analytics };
