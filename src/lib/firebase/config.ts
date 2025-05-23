
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Attempt to read Firebase config from environment variables
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID; // Optional

// Check if essential placeholder values (or missing values) are being used
if (
  !apiKey || apiKey === "YOUR_API_KEY" || apiKey.startsWith("AIzaSy") === false || // General check for valid-looking key start
  !authDomain || authDomain === "YOUR_AUTH_DOMAIN" ||
  !projectId || projectId === "YOUR_PROJECT_ID" ||
  !storageBucket || storageBucket === "YOUR_STORAGE_BUCKET" ||
  !messagingSenderId || messagingSenderId === "YOUR_MESSAGING_SENDER_ID" ||
  !appId || appId === "YOUR_APP_ID"
) {
  const errorMessage = `
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!! FIREBASE IS NOT CONFIGURED !!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

It looks like your Firebase project credentials are not set up correctly in your .env.local file.
You might be using placeholder values, or the environment variables are missing.

To fix this:
1. Ensure you have a Firebase project created at https://console.firebase.google.com/
2. Find your project's web app configuration settings.
3. Create a file named '.env.local' in the root directory of this project (if it doesn't exist).
4. Add your Firebase credentials to '.env.local' like this:

   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain_here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket_here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id_here
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_optional_measurement_id_here (if you use Analytics)

5. IMPORTANT: Restart your Next.js development server after creating/modifying .env.local.

Detected values (these might be undefined or placeholders if not set):
  API Key: ${apiKey || 'NOT SET'}
  Auth Domain: ${authDomain || 'NOT SET'}
  Project ID: ${projectId || 'NOT SET'}
  Storage Bucket: ${storageBucket || 'NOT SET'}
  Messaging Sender ID: ${messagingSenderId || 'NOT SET'}
  App ID: ${appId || 'NOT SET'}

The application will not function correctly until Firebase is properly configured via environment variables.
If you previously saw an 'auth/api-key-not-valid' error, it was likely due to this misconfiguration.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`;
  console.error(errorMessage);
  // Throw a specific error to halt execution and make the problem very clear.
  throw new Error("Firebase configuration error: Missing or invalid Firebase credentials in .env.local. Please see the detailed message in your server console and configure your .env.local file.");
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
