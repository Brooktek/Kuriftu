// lib/firebase.ts
import { initializeApp } from "firebase/app"
import { getAuth,signInWithEmailAndPassword  } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// Don't import getAnalytics yet

const firebaseConfig = {
    apiKey: "AIzaSyDIjyrXtC3yd-7Qyq_ajOoMLGIgLEZ-ehA",
    authDomain: "kuriftu-b32b6.firebaseapp.com",
    projectId: "kuriftu-b32b6",
    storageBucket: "kuriftu-b32b6.firebasestorage.app",
    messagingSenderId: "596198177911",
    appId: "1:596198177911:web:9842ad3c2f0d2485b95a72",
    measurementId: "G-JZP3FPXQ24"
  };

const app = initializeApp(firebaseConfig)

// ✅ Only run analytics on the client side
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app)
  })
}

 const auth = getAuth(app)
 export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export { auth, signInWithEmailAndPassword };
