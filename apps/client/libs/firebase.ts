// lib/firebase.ts
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnu6RjJ590LXibggfB1YM2oHhbPJ0LxuE",
  authDomain: "kb-refit.firebaseapp.com",
  projectId: "kb-refit",
  storageBucket: "kb-refit.firebasestorage.app",
  messagingSenderId: "289583572319",
  appId: "1:289583572319:web:6920aa2a5986aff45bc2ea",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
