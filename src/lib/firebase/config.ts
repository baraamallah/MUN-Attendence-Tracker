// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// IMPORTANT: Replace these with your actual Firebase project configuration values
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Check if critical Firebase config values are placeholders or missing
if (
  !firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY" ||
  !firebaseConfig.authDomain || firebaseConfig.authDomain === "YOUR_AUTH_DOMAIN" ||
  !firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID"
) {
  const errorMessage = `
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!! FIREBASE IS NOT CONFIGURED !!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

It looks like your Firebase project credentials are not set up correctly.
You're likely using placeholder values (e.g., "YOUR_API_KEY").

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

5. IMPORTANT: Restart your Next.js development server after creating/modifying .env.local.

Currently detected values:
  API Key: ${firebaseConfig.apiKey}
  Auth Domain: ${firebaseConfig.authDomain}
  Project ID: ${firebaseConfig.projectId}

The application will not function correctly until Firebase is properly configured.
The original error you saw (auth/api-key-not-valid) was a symptom of this.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`;
  console.error(errorMessage);
  // Throw a specific error to halt execution and make the problem very clear.
  throw new Error("Firebase configuration error: Placeholder or missing API key/config. Please see the detailed message in your server console and configure your .env.local file.");
} else {
  // Initialize Firebase
  const currentAppInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  app = currentAppInstance;
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
