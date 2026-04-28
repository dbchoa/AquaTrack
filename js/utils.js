/**
 * AquaTrack Shared Utilities v4.3
 * Professional documentation: Core functions for feedback, formatting, and security.
 * Integrated with the Liquid Control Framework.
 */

// 1. Debugging Utility
window.DEV_MODE = true; 
export const debug = (msg, data = '') => {
  if (window.DEV_MODE) {
    console.log(`[DEBUG] ${msg}`, data);
  }
};

// 2. User Feedback (Toast System)
// Generates floating glass notifications using atomic utilities.
export const toast = (msg, type = 'info') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Master, notice the haptic-press class for that tactile feel on tap
  const toastElement = document.createElement('div');
  toastElement.className = `glass-card glass-blur p-4 mb-4 haptic-press-light flex items-center z-max`;
  
  // Dynamic color coding based on framework status tokens
  let accentColor = 'var(--accent)';
  if (type === 'success') accentColor = 'var(--success)';
  if (type === 'error') accentColor = 'var(--error)';
  if (type === 'warning') accentColor = 'var(--warning)';

  toastElement.style.borderLeft = `4px solid ${accentColor}`;
  toastElement.style.minWidth = '280px';
  toastElement.style.transition = 'all 0.4s var(--ease-kinetic)';
  
  toastElement.innerHTML = `
    <div class="flex items-center gap-4">
      <div class="w-2 h-2 rounded-full" style="background: ${accentColor}; box-shadow: 0 0 8px ${accentColor};"></div>
      <span class="text-sm font-bold text-main">${msg}</span>
    </div>
  `;

  container.appendChild(toastElement);

  // Automatically fade out and remove
  setTimeout(() => {
    toastElement.style.opacity = '0';
    toastElement.style.transform = 'translateX(20px)';
    setTimeout(() => toastElement.remove(), 400);
  }, 3500);
};

// 3. Custom Confirmation Modal
// A flagship glass component for high-stakes user decisions.
export const confirmModal = (title, message) => {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    // Using z-max and fixed positioning from our framework
    overlay.className = 'fixed inset-0 w-full h-full flex items-center justify-center glass-blur z-max';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.2)';
    overlay.style.top = '0';
    overlay.style.left = '0';

    overlay.innerHTML = `
      <div class="glass-card p-8 max-w-md w-full mx-4 haptic-press-light" style="animation: modalPop 0.3s var(--ease-kinetic);">
        <h3 class="text-xl font-black tracking-tight text-main mb-2">${title}</h3>
        <p class="text-muted font-medium mb-8">${message}</p>
        <div class="flex gap-4">
          <button id="modal-cancel" class="btn btn-secondary flex-1">Cancel</button>
          <button id="modal-confirm" class="btn btn-primary flex-1">Confirm</button>
        </div>
      </div>
      <style>
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      </style>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#modal-confirm').onclick = () => {
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.remove(); resolve(true); }, 200);
    };

    overlay.querySelector('#modal-cancel').onclick = () => {
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.remove(); resolve(false); }, 200);
    };
  });
};

// 4. Formatting Utilities
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

export const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

export const formatMonth = (yyyy_mm) => {
  if (!yyyy_mm) return '';
  const [year, month] = yyyy_mm.split('_');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// 5. Theme Management
export const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('aqt_theme', theme);
  debug(`Theme set to: ${theme}`);
};

export const initTheme = () => {
  const savedTheme = localStorage.getItem('aqt_theme') || 'light';
  setTheme(savedTheme);
};

// 6. Role-Based Access Control
export const getRole = () => sessionStorage.getItem('aqt_role');

export const requireRole = (...allowedRoles) => {
  const currentRole = getRole();
  if (!allowedRoles.includes(currentRole)) {
    window.location.href = '../index.html'; 
  }
};
