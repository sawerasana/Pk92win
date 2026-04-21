/**
 * PK92win - Universal Configuration & Utilities
 * ==============================================
 * This file acts as the SINGLE SOURCE OF TRUTH for all site‑wide settings.
 * Editing a value here instantly updates every page that includes this script.
 * 
 * Usage: Include this file BEFORE any page‑specific JavaScript.
 */

'use strict';

// -----------------------------------------------------------------------------
// 1. Global Configuration Object (PK92_CONFIG)
//    All placeholders can be edited directly below.
// -----------------------------------------------------------------------------
const PK92_CONFIG = {
    // --- Core Identity ---
    siteName: 'PK92win',                           // Displayed in headers and footers
    ownerWhatsApp: '+92 300 1234567',              // Display format for contact sections
    ownerContactRaw: '923001234567',               // URL‑safe format (no '+' or spaces)
    peshoXIntelligenceChannel: 'https://whatsapp.com/channel/0029Va...', // Educational channel link
    supportEmail: 'help@pk92win.sim',              // Email for support inquiries

    // --- Deposit Simulation (Educational Only) ---
    easyPaisaDepositNumber: '923001234567',        // Fake deposit number shown to users
    easyPaisaAccountTitle: 'PESHO X INTELLIGENCE', // Account title for verification step

    // --- Financial Simulation Defaults ---
    defaultDemoBalance: 10000,                     // Starting fake cash for Demo Mode
    currencySymbol: '₨',                           // Pakistani Rupee symbol
    minDepositAmount: 500,                         // Minimum fake deposit
    maxDepositAmount: 50000                        // Maximum fake deposit
};

// -----------------------------------------------------------------------------
// 2. Helper Functions
// -----------------------------------------------------------------------------

/**
 * Formats a number into a currency string using the configured symbol.
 * @param {number} amount - The amount to format.
 * @returns {string} Formatted currency (e.g., "₨ 1,500").
 */
function formatCurrency(amount) {
    if (isNaN(amount)) return `${PK92_CONFIG.currencySymbol} 0`;
    return `${PK92_CONFIG.currencySymbol} ${amount.toLocaleString('en-PK')}`;
}

/**
 * Retrieves the current user's balance based on the active mode.
 * - Demo Mode: Reads from localStorage.
 * - Real Mode: Returns a placeholder (will be overridden by Firebase fetch).
 * @returns {number} The current balance.
 */
function getCurrentUserBalance() {
    const isDemoMode = localStorage.getItem('pk92_demo_mode') === 'true';
    if (isDemoMode) {
        const demoBalance = localStorage.getItem('pk92_demo_balance');
        return demoBalance ? parseInt(demoBalance, 10) : PK92_CONFIG.defaultDemoBalance;
    }
    // Real mode placeholder – actual page logic will replace this with Firestore data.
    return 0;
}

/**
 * Dynamically injects the configuration values into all designated DOM elements.
 * Call this function after the DOM is fully loaded.
 *
 * Elements with the following classes will be updated:
 *   .js-site-name               -> textContent = siteName
 *   .js-footer-contact          -> textContent = ownerWhatsApp
 *   .js-whatsapp-channel-link   -> href = peshoXIntelligenceChannel
 *   .js-deposit-number          -> textContent = easyPaisaDepositNumber
 */
function updateGlobalFooter() {
    // Update all site name placeholders
    document.querySelectorAll('.js-site-name').forEach(el => {
        el.textContent = PK92_CONFIG.siteName;
    });

    // Update footer contact number displays
    document.querySelectorAll('.js-footer-contact').forEach(el => {
        el.textContent = PK92_CONFIG.ownerWhatsApp;
    });

    // Update WhatsApp Channel links (href attribute)
    document.querySelectorAll('.js-whatsapp-channel-link').forEach(el => {
        if (el.tagName === 'A') {
            el.href = PK92_CONFIG.peshoXIntelligenceChannel;
        }
    });

    // Update deposit number displays (used on Deposit page)
    document.querySelectorAll('.js-deposit-number').forEach(el => {
        el.textContent = PK92_CONFIG.easyPaisaDepositNumber;
    });
}

/**
 * Ensures a Demo Mode balance exists in localStorage.
 * If not present, it initializes with the default value.
 */
function initializeDemoBalance() {
    if (localStorage.getItem('pk92_demo_balance') === null) {
        localStorage.setItem('pk92_demo_balance', PK92_CONFIG.defaultDemoBalance);
    }
}

// -----------------------------------------------------------------------------
// 3. DOM Ready Execution
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalFooter();
    initializeDemoBalance();
});

// -----------------------------------------------------------------------------
// 4. Global Exposure (attach to window)
//    This makes the configuration and helpers accessible to all other scripts.
// -----------------------------------------------------------------------------
window.PK92_CONFIG = PK92_CONFIG;
window.formatCurrency = formatCurrency;
window.getCurrentUserBalance = getCurrentUserBalance;
window.updateGlobalFooter = updateGlobalFooter;
