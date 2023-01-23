
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { accountreducer } from "./redux/reducers";

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
export const app = initializeApp(firebaseConfig);
export const prov=new GoogleAuthProvider()
export const auth = getAuth(app);


//export default firebase.auth()