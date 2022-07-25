import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9LLcPFboPmuJNXHi98mf8KqaL2gG-aYg",
  authDomain: "myprofile-634ab.firebaseapp.com",
  projectId: "myprofile-634ab",
  storageBucket: "myprofile-634ab.appspot.com",
  messagingSenderId: "823925765520",
  appId: "1:823925765520:web:41144729dd22fd503faf15",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export const storage = getStorage(app);
export { app, db };
