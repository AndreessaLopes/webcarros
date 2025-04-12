import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqxO8saZujn0bh8QWqdTgOkid9-PZ5whk",
  authDomain: "webcarros-80723.firebaseapp.com",
  projectId: "webcarros-80723",
  storageBucket: "webcarros-80723.firebasestorage.app",
  messagingSenderId: "315019390183",
  appId: "1:315019390183:web:fdafd36bcf27a219e78642",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
