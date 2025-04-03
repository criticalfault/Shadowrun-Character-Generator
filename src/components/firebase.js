import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8ENt2n9h-Xn3f4mMfEfdVHrKO9l6Oe68",
    authDomain: "charactergeneratordb.firebaseapp.com",
    projectId: "charactergeneratordb",
    storageBucket: "charactergeneratordb.firebasestorage.app",
    messagingSenderId: "163713762253",
    appId: "1:163713762253:web:13c30aae130d1b69c1ba84",
    measurementId: "G-6K5NKQLHBJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence);

export { auth, provider, signInWithPopup, onAuthStateChanged, db, doc, setDoc, getDoc };