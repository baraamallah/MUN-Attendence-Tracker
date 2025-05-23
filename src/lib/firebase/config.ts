// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration using the values you provided.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM0XzHEGBOJ5whvPrhaikF_DRxV1w--yY",
  authDomain: "mun-attendence-tracker.firebaseapp.com",
  projectId: "mun-attendence-tracker",
  storageBucket: "mun-attendence-tracker.firebasestorage.app",
  messagingSenderId: "761446280192",
  appId: "1:761446280192:web:e20526dd18230b97affce5",
  measurementId: "G-0E5E8B3CM8"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Initialize Firebase
// Ensure Firebase is initialized only once, important for Next.js environments
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
