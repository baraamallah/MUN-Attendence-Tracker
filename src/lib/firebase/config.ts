
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Optional: if you need analytics

// Attempt to read Firebase config from environment variables
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID; // Optional

// Check if essential placeholder values (or missing values) are being used
const isMissingConfig =
  !apiKey || apiKey === "YOUR_API_KEY" || apiKey.startsWith("AIzaSy") === false ||
  !authDomain || authDomain === "YOUR_AUTH_DOMAIN" ||
  !projectId || projectId === "YOUR_PROJECT_ID" ||
  !storageBucket || storageBucket === "YOUR_STORAGE_BUCKET" ||
  !messagingSenderId || messagingSenderId === "YOUR_MESSAGING_SENDER_ID" ||
  !appId || appId === "YOUR_APP_ID";

if (isMissingConfig) {
  const errorMessage = `
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!! FIREBASE IS NOT CONFIGURED !!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

It looks like your Firebase project credentials are not set up correctly via environment variables.
This can happen if the NEXT_PUBLIC_FIREBASE_... variables are missing or using placeholder values
in your deployment environment (e.g., Vercel project settings) or local .env.local file.

To fix this:
1. Ensure you have a Firebase project created at https://console.firebase.google.com/
2. Find your project's web app configuration settings.
3. For local development: Create a file named '.env.local' in the root directory of this project (if it doesn't exist).
   Add your Firebase credentials to '.env.local' like this:
     NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain_here
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id_here
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket_here
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id_here
     NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id_here
     NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_optional_measurement_id_here (if you use Analytics)
4. For deployments (e.g., Vercel): Ensure these NEXT_PUBLIC_... variables are correctly set in your project's environment settings.
5. IMPORTANT: Restart your Next.js development server after creating/modifying .env.local. Builds on deployment platforms will use the environment variables set there.

Detected values (these might be undefined or placeholders if not set):
  API Key: ${apiKey || 'NOT SET'}
  Auth Domain: ${authDomain || 'NOT SET'}
  Project ID: ${projectId || 'NOT SET'}
  Storage Bucket: ${storageBucket || 'NOT SET'}
  Messaging Sender ID: ${messagingSenderId || 'NOT SET'}
  App ID: ${appId || 'NOT SET'}

The application will not function correctly until Firebase is properly configured via environment variables.
If you previously saw an 'auth/api-key-not-valid' error, it was likely due to this misconfiguration.
A build failure might still occur if initializeApp receives invalid or incomplete configuration.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`;
  console.error(errorMessage);
  // We log the detailed error above for build diagnostics.
  // We will NOT throw a custom error here that could prematurely halt the build.
  // If the firebaseConfig object assembled from (potentially missing/invalid) env vars is truly invalid,
  // the initializeApp call below should fail with a Firebase SDK error, which is standard.
}

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  ...(measurementId && { measurementId }), // Conditionally add measurementId
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
// let analytics; // Optional: if you need analytics

// Initialize Firebase
// Ensure Firebase is initialized only once, important for Next.js environments.
// If firebaseConfig is incomplete due to missing env vars, initializeApp will throw an error.
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);
// if (typeof window !== 'undefined' && measurementId) { // Initialize analytics only on client side if needed and configured
//   analytics = getAnalytics(app);
// }

export { app, auth, db };
