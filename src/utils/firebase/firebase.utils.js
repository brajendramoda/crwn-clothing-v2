import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDVJemgX39R8jJdvTF37V8nmO5Bhdz9bOg",
  authDomain: "clothstoredb.firebaseapp.com",
  projectId: "clothstoredb",
  storageBucket: "clothstoredb.appspot.com",
  messagingSenderId: "416511724955",
  appId: "1:416511724955:web:b25ff502da1703e99e653e",
};

const firebaseApp = initializeApp(firebaseConfig);

const Googleprovider = new GoogleAuthProvider();
Googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, Googleprovider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, Googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSn = await getDoc(userDocRef);
  console.log(userSn);
  console.log(userSn.exists());
  if (!userSn.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
