import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "flick-the-show.firebaseapp.com",
    projectId: "flick-the-show",
    storageBucket: "flick-the-show.firebasestorage.app",
    messagingSenderId: "23703474134",
    appId: "1:23703474134:web:79fb52ec698c59e9ba5e77",
    measurementId: "G-W1KGEK22FT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };

export const doSignOut = () => {
    console.log("worked");
    return auth.signOut();
};