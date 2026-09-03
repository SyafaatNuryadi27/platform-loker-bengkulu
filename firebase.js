// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Import Cloud Firestore SDK
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwc-W77xFztHROZEpvfK0nWZC2P9bNGOQ",
  authDomain: "platform-loker-bengkulu.firebaseapp.com",
  projectId: "platform-loker-bengkulu",
  storageBucket: "platform-loker-bengkulu.firebasestorage.app",
  messagingSenderId: "522033003669",
  appId: "1:522033003669:web:4ff46c3f27a8df48eeaf9c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export async function registerEmail(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export async function logoutUser() {
  return await signOut(auth);
}

export function listenAuthStatus(callback) {
  onAuthStateChanged(auth, callback);
}

// --- FUNGSI FIRESTORE ---

// Simpan Data
export async function tambahData(namaKoleksi, data) {
  return await addDoc(collection(db, namaKoleksi), {
    ...data,
    createdAt: serverTimestamp()
  });
}

// Dengarkan Perubahan Data secara Real-Time
export function listenCollection(namaKoleksi, callback) {
  const q = query(collection(db, namaKoleksi), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    callback(items);
  });
}
