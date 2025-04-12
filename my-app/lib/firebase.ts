import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0r7w5VblpZw7dKxiz025zBLutqs-CXFo",
  authDomain: "kuriftu-8b575.firebaseapp.com",
  databaseURL: "https://kuriftu-8b575-default-rtdb.firebaseio.com",
  projectId: "kuriftu-8b575",
  storageBucket: "kuriftu-8b575.firebasestorage.app",
  messagingSenderId: "244379447955",
  appId: "1:244379447955:web:44dcde733eb0522d435366",
  measurementId: "G-9PZ5ZG88WH",
}

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
