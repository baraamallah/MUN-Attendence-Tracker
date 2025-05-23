import { 
  Auth,
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  UserCredential,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./config";

export const signInWithEmail = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = (): Promise<void> => {
  return firebaseSignOut(auth);
};

export const observeAuthState = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Helper to get current user (can be null)
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
