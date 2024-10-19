import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-6b9e9.firebaseapp.com",
  projectId: "blog-app-6b9e9",
  storageBucket: "blog-app-6b9e9.appspot.com",
  messagingSenderId: "697394534084",
  appId: "1:697394534084:web:6e1e434c9bf4bb3d2b9b91",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
