// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkCh-V6n_JvQcdMZ3qUmOUIXJb9AN2L3Q",
  authDomain: "biz-finder-40066.firebaseapp.com",
  projectId: "biz-finder-40066",
  storageBucket: "biz-finder-40066.appspot.com",
  messagingSenderId: "72675833775",
  appId: "1:72675833775:web:35c84466e63fc32d6b615a",
  measurementId: "G-2Q9J29EM1X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage =getStorage(app)
// const analytics = getAnalytics(app);