/**
 * AquaTrack Global Header Component v5.0
 * DNA: Reference-Matched Structure, Horizontal Split, and Kinetic Controls.
 */
import { logout } from './auth.js';
import { setTheme } from './utils.js';

export const injectHeader = (roleName) => {
    const header = document.querySelector('header');
    if (!header) return;

    // Fixed width and glass effect matching your working project structure
    header.className = "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-[100] w-full transition-all duration-300";
    
    header.innerHTML = `
        <div class="flex items-center gap-2">
            <div class="w-10 h-8 bg-water rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-water/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
            </div>
            <div class="flex flex-col leading-none">
                <h1 class="text-lg font-bold tracking-tighter dark:text-white">
                    Aqua<span class="text-water">Track</span>
                </h1>
                <span class="text-[8px] uppercase tracking-[0.2em] text-slate-400 font-black">${roleName}</span>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <button id="theme-toggle" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
                <svg id="sun-icon" class="w-5 h-5 hidden text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <svg id="moon-icon" class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            </button>
            <button id="logout-btn" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-500/10 transition-all active:scale-95 group">
                <svg class="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
    `;

    // 1. Sync Icon Initial State
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const isDark = document.documentElement.classList.contains('dark');
    sunIcon.classList.toggle('hidden', !isDark);
    moonIcon.classList.toggle('hidden', isDark);

    // 2. Integrated Toggle Logic
    document.getElementById('theme-toggle').onclick = () => {
        const currentMode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const nextMode = currentMode === 'dark' ? 'light' : 'dark';
        
        // Use the global bridge in utils.js
        window.toggleDarkMode(nextMode);
        
        // Sync these local icons
        sunIcon.classList.toggle('hidden', nextMode !== 'dark');
        moonIcon.classList.toggle('hidden', nextMode === 'dark');
    };

    // 3. Logout Logic
    document.getElementById('logout-btn').onclick = () => logout();
};
