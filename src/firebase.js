// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhLWHMOYZeYfClCBAn4U5tOxOU7VFvDtI",
  authDomain: "authentication-98d0a.firebaseapp.com",
  projectId: "authentication-98d0a",
  storageBucket: "authentication-98d0a.appspot.com",
  messagingSenderId: "951032755011",
  appId: "1:951032755011:web:aa11f68b4e6ebf7fd575f6",
  measurementId: "G-GT484XGRCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase.auth()