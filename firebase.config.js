import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDb8nbXqEiwKWsYq00jcRGZDkTSyQIHp34",
    authDomain: "keylism.firebaseapp.com",
    projectId: "keylism",
    storageBucket: "keylism.appspot.com",
    messagingSenderId: "803164682477",
    appId: "1:803164682477:web:064bba1a11afb3cb06b4e4",
};

// const app = initializeApp(firebaseConfig);
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };