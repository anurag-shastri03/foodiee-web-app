// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0jNi94KY8IvW85TW3eNDmUeHHZQVUrAw",
  authDomain: "foodiee-bb540.firebaseapp.com",
  projectId: "foodiee-bb540",
  storageBucket: "foodiee-bb540.firebasestorage.app",
  messagingSenderId: "65949391620",
  appId: "1:65949391620:web:261a6629368f9c107b0e51",
  measurementId: "G-G7VX7HBCJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);