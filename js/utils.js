/**
 * AquaTrack Shared Utilities v4.4
 * DNA: High-Fidelity Feedback, Persistent Theming, and Spark-Plan Optimization.
 */

// 1. Debugging Utility
window.DEV_MODE = true; 
export const debug = (msg, data = '') => { 
    if (window.DEV_MODE) { console.log(`[DEBUG] ${msg}`, data); } 
};

// 2. User Feedback (Toast System)
export const toast = (msg, type = 'info') => { 
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toastElement = document.createElement('div');
    toastElement.className = 'glass-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 mb-4 rounded-2xl shadow-xl flex items-center border-l-4 z-50 transition-all duration-400 transform translate-x-0';
    
    let accentColor = '#4facfe'; 
    if (type === 'success') accentColor = '#10b981';
    if (type === 'error') accentColor = '#ef4444';
    if (type === 'warning') accentColor = '#f59e0b';

    toastElement.style.borderColor = accentColor;
    toastElement.style.minWidth = '280px';
    toastElement.innerHTML = `<span class="text-sm font-medium dark:text-white">${msg}</span>`;
    
    container.appendChild(toastElement);

    setTimeout(() => { 
        toastElement.style.opacity = '0'; 
        toastElement.style.transform = 'translateX(20px)'; 
        setTimeout(() => toastElement.remove(), 400); 
    }, 3500);
};

// 3. Custom Confirmation Modal
export const confirmModal = (title, message) => { 
    return new Promise((resolve) => { 
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 w-full h-full flex items-center justify-center bg-slate-900/40 backdrop-blur-sm z-[100] p-6';
        
        overlay.innerHTML = `
            <div class="bg-white dark:bg-slate-900 w-full max-w-sm rounded-32 p-8 shadow-2xl border border-white dark:border-slate-800 transform scale-100 transition-transform">
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center">${title}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm text-center mb-8">${message}</p>
                <div class="flex gap-3">
                    <button id="modal-cancel" class="flex-1 py-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-widest haptic">Cancel</button>
                    <button id="modal-confirm" class="flex-1 py-4 rounded-full bg-water text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-water/30 haptic">Confirm</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById('modal-cancel').onclick = () => { overlay.remove(); resolve(false); };
        document.getElementById('modal-confirm').onclick = () => { overlay.remove(); resolve(true); };
    }); 
};

// 4. Cache Management (Spark Plan Optimization)
export const setCache = (key, data, ttlMinutes = 60) => {
    const expiry = new Date().getTime() + (ttlMinutes * 60 * 1000);
    const cacheObj = { data, expiry };
    sessionStorage.setItem(key, JSON.stringify(cacheObj));
};

export const getCache = (key) => {
    const cached = sessionStorage.getItem(key);
    if (!cached) return null;
    const { data, expiry } = JSON.parse(cached);
    if (new Date().getTime() > expiry) {
        sessionStorage.removeItem(key);
        return null;
    }
    return data;
};

// 5. Formatting Utilities
export const formatCurrency = (amount) => { 
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount); 
};

export const formatDate = (timestamp) => { 
    if (!timestamp) return 'N/A'; 
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }); 
};

export const formatMonth = (yyyy_mm) => { 
    if (!yyyy_mm) return ''; 
    const [year, month] = yyyy_mm.split('_'); 
    return new Date(year, parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); 
};

// 6. Theme Management (Tailwind + Vanilla Hybrid)
export const setTheme = (theme) => { 
    document.documentElement.dataset.theme = theme;
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('aqt_theme', theme); 
    debug(`Theme set to: ${theme}`); 
};

export const initTheme = () => { 
    const savedTheme = localStorage.getItem('aqt_theme') || 'dark'; 
    setTheme(savedTheme); 
};

/**
 * GLOBAL BRIDGE: Exposes theme switching to HTML onclick events.
 * DNA: Direct mapping to window object to bypass module scoping.
 */
window.toggleDarkMode = (mode) => {
    setTheme(mode);
    // Login-specific indicator handling
    const indicator = document.getElementById('toggle-indicator');
    if (indicator) {
        indicator.style.transform = mode === 'dark' ? 'translateX(81px)' : 'translateX(0px)';
    }
};

// 7. Role-Based Access Control
export const getRole = () => sessionStorage.getItem('aqt_role');

export const requireRole = (...allowedRoles) => { 
    const currentRole = getRole(); 
    if (!allowedRoles.includes(currentRole)) { 
        window.location.href = '../index.html'; 
    } 
};

// Initialize immediately on load
initTheme();
