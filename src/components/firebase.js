import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

export async function publishCharacter(characterJSON, uid) {
  const ref = await addDoc(collection(db, "public_characters"), {
    characterJSON,
    ownerUID: uid,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getPublicCharacter(shareId) {
  const snap = await getDoc(doc(db, "public_characters", shareId));
  if (!snap.exists()) return null;
  return JSON.parse(snap.data().characterJSON);
}