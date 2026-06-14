import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhWhfzkInLNqLCjMUPjn1EcFoi-e8RNik",
  authDomain: "chtech-v2.firebaseapp.com",
  projectId: "chtech-v2",
  storageBucket: "chtech-v2.firebasestorage.app",
  messagingSenderId: "547489290028",
  appId: "1:547489290028:web:3f8cd6c1356fd5c1fdfe89",
  measurementId: "G-CNE6B4ELE1"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const firebaseEnabled = true;
