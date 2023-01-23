
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { accountreducer } from "./redux/reducers";
import {getFirestore} from "@firebase/firestore";
import 'firebase/firestore';
import firebase from 'firebase/app';

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

export const db= getFirestore(app)

app.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Create a new Firestore collection for the user
    const userRef = db.collection('users').doc(user.uid);
    userRef.set({
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL
    })
    .then(() => {
      console.log("User added to Firebase collection successfully");
    })
    .catch((error) => {
      console.error("Error adding user to Firebase collection: ", error);
    });
  }
});



//export default firebase.auth()