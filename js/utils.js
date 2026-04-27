/**
 * AquaTrack Shared Utilities
 * Contains global functions for all roles (Reader, Billing, Homeowner).
 * Handles formatting, feedback, security, and theme management.
 */

// 1. Debugging Utility
// Set to 'false' for production to hide all console logs.
window.DEV_MODE = true; 
export const debug = (msg, data = '') => {
  if (window.DEV_MODE) {
    console.log(`[DEBUG] ${msg}`, data);
  }
};

// 2. User Feedback (Toast System)
// Replaces browser alert() with smooth notifications.
export const toast = (msg, type = 'info') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toastElement = document.createElement('div');
  toastElement.className = `toast toast-${type}`; // types: success, error, info, warning
  toastElement.textContent = msg;

  container.appendChild(toastElement);

  // Automatically fade out and remove after 3 seconds
  setTimeout(() => {
    toastElement.style.opacity = '0';
    setTimeout(() => toastElement.remove(), 300);
  }, 3000);
};

// 3. Custom Confirmation Modal
// A themed pop-up for confirming important actions like deleting or saving.
export const confirmModal = (title, message) => {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay'; // Defined in styles.css Section 7

    overlay.innerHTML = `
      <div class="modal-content">
        <h3>${title}</h3>
        <p class="mt-1">${message}</p>
        <div class="modal-actions">
          <button id="modal-cancel" class="btn btn-secondary">Cancel</button>
          <button id="modal-confirm" class="btn btn-primary">Confirm</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Button click logic
    overlay.querySelector('#modal-confirm').onclick = () => {
      overlay.remove();
      resolve(true); // Tells the app the user clicked "Confirm"
    };

    overlay.querySelector('#modal-cancel').onclick = () => {
      overlay.remove();
      resolve(false); // Tells the app the user clicked "Cancel"
    };
  });
};

// 4. Formatting Utilities
// Formats numbers as Philippine Pesos (e.g., ₱1,325.00).
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

// Returns date as "Nov 01, 2025".
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  });
};

// Returns time as "2:30 PM".
export const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Converts database format "2025_11" to "November 2025".
export const formatMonth = (yyyy_mm) => {
  if (!yyyy_mm) return '';
  const [year, month] = yyyy_mm.split('_');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// 5. Theme Management
export const setTheme = (theme) => {
  // Apply to the <html> tag so all CSS variables update
  document.documentElement.dataset.theme = theme;
  // Save to browser memory
  localStorage.setItem('aqt_theme', theme);
  debug(`Theme set to: ${theme}`);
};

// Automatically apply theme on page load
export const initTheme = () => {
  const savedTheme = localStorage.getItem('aqt_theme') || 'light';
  setTheme(savedTheme);
};

// 6. Role-Based Access Control (Security)
// Ensures users can't access unauthorized screens.
export const getRole = () => sessionStorage.getItem('aqt_role');

export const requireRole = (...allowedRoles) => {
  const currentRole = getRole();
  if (!allowedRoles.includes(currentRole)) {
    // Redirect to login if user role isn't in the allowed list
    window.location.href = '../index.html'; 
  }
};
