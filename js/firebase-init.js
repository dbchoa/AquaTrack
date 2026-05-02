/**
 * AquaTrack Firebase Configuration & Initialization
 */

const firebaseConfig = {
  apiKey: "AIzaSyBxnQXgKO0K5qC522nrecoQsAb1G9uBwFU",
  authDomain: "dbc-aquatrack.firebaseapp.com",
  databaseURL: "https://dbc-aquatrack-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "dbc-aquatrack",
  storageBucket: "dbc-aquatrack.firebasestorage.app",
  messagingSenderId: "656106085568",
  appId: "1:656106085568:web:bf80ba725e6df317d66125"
};

// 1. Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 2. [Surgical Fix]: Realtime Database Persistence
// In RTDB (v9 compat), the method is setPersistenceEnabled(true)
firebase.database().setPersistenceEnabled(true)
  .then(() => {
    console.log("%c[AQUATRACK] Offline Persistence Active", "color: #10b981; font-weight: bold;");
  })
  .catch((err) => {
    console.warn("[AQUATRACK] Persistence Error:", err.message);
  });

// 3. Create easy-to-use references
export const auth = firebase.auth();
export const db = firebase.database();

// 4. Connection check utility
export const checkConnection = (callback) => {
  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    const isOnline = snap.val() === true;
    callback(isOnline);
  });
};
