import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userDocRef;
};
