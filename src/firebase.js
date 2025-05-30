// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "project-821748542791",
  authDomain: "task-management.firebaseapp.com",
  projectId: "task-management-id",
  storageBucket: "task-management.appspot.com",
  messagingSenderId: "xxxxxx",
  appId: "1:xxxx:web:xxxxxx"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
