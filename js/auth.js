/**
 * AquaTrack Authentication Logic
 * Handles login, logout, and session persistence.
 */

import { auth, db } from './firebase-init.js';
import { toast, debug, setTheme } from './utils.js';

/**
 * 1. User Login
 * Authenticates with Firebase and caches user data.
 */
export const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Fetch the user's role and preference from the database
    // We use .once('value') to keep database costs low 
    const snapshot = await db.ref(`users/${user.uid}`).once('value');
    const userData = snapshot.val();

    if (userData) {
      // Store role and settings in session for quick access [cite: 518]
      sessionStorage.setItem('aqt_role', userData.role);
      sessionStorage.setItem('aqt_user_name', userData.name);
      
      // Apply saved theme preference
      if (userData.theme) setTheme(userData.theme);

      toast(`Welcome back, ${userData.name}!`, 'success');
      
      // Redirect based on the role assigned in the database
      redirectByRole(userData.role);
    } else {
      throw new Error("User profile not found.");
    }
  } catch (error) {
    debug("Login Error", error.message);
    toast(error.message, 'error');
  }
};

/**
 * 2. Role-Based Redirector
 * Sends users to their specific starting page.
 */
const redirectByRole = (role) => {
  switch (role) {
    case 'reader':
      window.location.href = 'reader/dashboard.html';
      break;
    case 'billing':
      window.location.href = 'billing/dashboard.html';
      break;
    case 'homeowner':
      window.location.href = 'homeowner/dashboard.html';
      break;
    case 'admin':
      window.location.href = 'admin/dashboard.html';
      break;
    default:
      window.location.href = 'index.html';
  }
};

/**
 * 3. Logout
 * Clears local data and ends the Firebase session.
 */
export const logout = async () => {
  try {
    await auth.signOut();
    sessionStorage.clear(); // Important: Remove role and sensitive data
    window.location.href = '../index.html';
  } catch (error) {
    toast("Logout failed", 'error');
  }
};

/**
 * 4. Auth State Observer
 * This runs automatically to check if a user is still logged in.
 */
auth.onAuthStateChanged((user) => {
  if (user) {
    debug("User is active:", user.email);
  } else {
    debug("No active session.");
  }
});
