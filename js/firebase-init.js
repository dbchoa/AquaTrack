/**
 * AquaTrack Firebase Configuration & Initialization
 * This file establishes the connection to Auth and the Realtime Database.
 */

// 1. Your unique Firebase project configuration
// IMPORTANT: Replace these placeholders with your actual Firebase project settings!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 3. Create easy-to-use references for the rest of your app
export const auth = firebase.auth();
export const db = firebase.database();

// 4. Optimization: Set up a persistence check
// This helps handle the "Offline Queue" requirement by detecting connection status.
export const checkConnection = (callback) => {
  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    const isOnline = snap.val() === true;
    callback(isOnline);
  });
};

/** * Beginner Tip: 
 * We do not use persistent listeners (.on) for everything. 
 * Per Section 7 of the Project Context, we use .once('value') 
 * for standard page loads to keep database costs low.
 */
