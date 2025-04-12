import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDIjyrXtC3yd-7Qyq_ajOoMLGIgLEZ-ehA",
  authDomain: "kuriftu-b32b6.firebaseapp.com",
  projectId: "kuriftu-b32b6",
  storageBucket: "kuriftu-b32b6.firebasestorage.app",
  messagingSenderId: "596198177911",
  appId: "1:596198177911:web:9842ad3c2f0d2485b95a72",
  measurementId: "G-JZP3FPXQ24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Analytics - only in browser environment
let analytics = null
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

// Initialize Firestore
const db = getFirestore(app)

// Add a registration to Firestore
export async function addRegistration(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    console.log("Document written with ID: ", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
    throw error
  }
}

export { app, analytics }
