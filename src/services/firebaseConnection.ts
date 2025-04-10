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
  appId: "1:315019390183:web:23711e1373930e4ae78642",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
