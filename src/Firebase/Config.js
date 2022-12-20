import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDo-YUFmNpdYQagQvP3k90va7HmaU16yAE",
  authDomain: "olx-clone-a0eb7.firebaseapp.com",
  projectId: "olx-clone-a0eb7",
  storageBucket: "olx-clone-a0eb7.appspot.com",
  messagingSenderId: "1096518402459",
  appId: "1:1096518402459:web:21f4a6f51ba37102d0a13e"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;