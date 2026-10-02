/* ===================================
   DANHAYS MAIN JAVASCRIPT
   Version 3.0
   =================================== */

// ===== CONFIGURATION =====
const CONFIG = {
    apiBaseUrl: 'https://api.danhays.com/v2',
    cdnUrl: 'https://cdn.danhays.com',
    cartStorageKey: 'danhays_cart',
    wishlistStorageKey: 'danhays_wishlist',
    userPreferencesKey: 'danhays_preferences',
    cartCountElement: '#cartCount',
    preloaderId: 'preloader',
};

// ===== CART MANAGEMENT =====
class CartManager {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const cart = localStorage.getItem(CONFIG.cartStorageKey);
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem(CONFIG.cartStorageKey, JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartCount() {
        const countElement = document.querySelector(CONFIG.cartCountElement);
        if (countElement) {
            const count = this.getItemCount();
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification-success';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }
}

// ===== WISHLIST MANAGEMENT =====
class WishlistManager {
    constructor() {
        this.items = this.loadWishlist();
    }

    loadWishlist() {
        const wishlist = localStorage.getItem(CONFIG.wishlistStorageKey);
        return wishlist ? JSON.parse(wishlist) : [];
    }

    saveWishlist() {
        localStorage.setItem(CONFIG.wishlistStorageKey, JSON.stringify(this.items));
    }

    addItem(product) {
        if (!this.items.find(item => item.id === product.id)) {
            this.items.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                addedAt: new Date().toISOString()
            });
            this.saveWishlist();
            return true;
        }
        return false;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveWishlist();
    }

    isInWishlist(productId) {
        return this.items.some(item => item.id === productId);
    }

    getItems() {
        return this.items;
    }

    clear() {
        this.items = [];
        this.saveWishlist();
    }
}

// ===== API SERVICE =====
class APIService {
    static async fetch(endpoint, options = {}) {
        const url = `${CONFIG.apiBaseUrl}${endpoint}`;
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }

    static getProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.fetch(`/products?${queryString}`);
    }

    static getProductById(id) {
        return this.fetch(`/products/${id}`);
    }

    static getBrands() {
        return this.fetch('/brands');
    }

    static getCategories() {
        return this.fetch('/categories');
    }

    static searchProducts(query) {
        return this.fetch(`/search?q=${encodeURIComponent(query)}`);
    }
}

// ===== SEARCH FUNCTIONALITY =====
class SearchManager {
    constructor() {
        this.searchBtn = document.getElementById('searchBtn');
        this.setupSearchListeners();
    }

    setupSearchListeners() {
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.openSearch());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && e.ctrlKey) {
                e.preventDefault();
                this.openSearch();
            }
        });
    }

    openSearch() {
        const searchModal = document.createElement('div');
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-modal-content">
                <input type="text" placeholder="Search products, brands..." class="search-input" autofocus>
                <div class="search-results"></div>
            </div>
        `;
        
        document.body.appendChild(searchModal);
        
        const input = searchModal.querySelector('.search-input');
        const results = searchModal.querySelector('.search-results');
        
        input.addEventListener('input', async (e) => {
            const query = e.target.value;
            if (query.length > 2) {
                const data = await APIService.searchProducts(query);
                this.displayResults(results, data);
            }
        });
        
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.remove();
            }
        });
    }

    displayResults(container, results) {
        container.innerHTML = '';
        if (results && results.products) {
            results.products.forEach(product => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h4>${product.name}</h4>
                        <p>${product.brand}</p>
                        <p class="price">€${product.price.toFixed(2)}</p>
                    </div>
                `;
                item.addEventListener('click', () => {
                    window.location.href = `/product/${product.id}`;
                });
                container.appendChild(item);
            });
        }
    }
}

// ===== NOTIFICATION SYSTEM =====
class NotificationManager {
    static show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    static success(message) {
        this.show(message, 'success');
    }

    static error(message) {
        this.show(message, 'error');
    }

    static info(message) {
        this.show(message, 'info');
    }

    static warning(message) {
        this.show(message, 'warning');
    }
}

// ===== PRELOADER ===== 
class PreloaderManager {
    static hide() {
        const preloader = document.getElementById(CONFIG.preloaderId);
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => preloader.style.display = 'none', 300);
        }
    }

    static show() {
        const preloader = document.getElementById(CONFIG.preloaderId);
        if (preloader) {
            preloader.style.display = 'flex';
            preloader.style.opacity = '1';
            preloader.style.pointerEvents = 'auto';
        }
    }
}

// ===== USER PREFERENCES =====
class PreferencesManager {
    static getPreferences() {
        const prefs = localStorage.getItem(CONFIG.userPreferencesKey);
        return prefs ? JSON.parse(prefs) : this.getDefaults();
    }

    static getDefaults() {
        return {
            theme: 'light',
            language: 'en',
            currency: 'EUR',
            notifications: true,
            reducedMotion: false,
        };
    }

    static setPreference(key, value) {
        const prefs = this.getPreferences();
        prefs[key] = value;
        localStorage.setItem(CONFIG.userPreferencesKey, JSON.stringify(prefs));
        return prefs;
    }

    static applyTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        this.setPreference('theme', theme);
    }
}

// ===== LAZY LOADING IMAGES =====
class LazyLoadManager {
    static init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// ===== SMOOTH SCROLL =====
class SmoothScrollManager {
    static init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ===== ANALYTICS =====
class AnalyticsManager {
    static trackPageView(page) {
        if (window.gtag) {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: page,
            });
        }
    }

    static trackEvent(category, action, label = '', value = 0) {
        if (window.gtag) {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }
    }

    static trackAddToCart(productId, productName, price) {
        this.trackEvent('ecommerce', 'add_to_cart', productName, price);
    }

    static trackPurchase(orderId, total, items) {
        this.trackEvent('ecommerce', 'purchase', orderId, total);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    window.cart = new CartManager();
    window.wishlist = new WishlistManager();
    window.search = new SearchManager();
    window.preferences = new PreferencesManager();

    // Apply saved preferences
    const prefs = PreferencesManager.getPreferences();
    PreferencesManager.applyTheme(prefs.theme);

    // Initialize features
    LazyLoadManager.init();
    SmoothScrollManager.init();

    // Hide preloader
    setTimeout(() => {
        PreloaderManager.hide();
    }, 500);

    // Track page view
    AnalyticsManager.trackPageView(window.location.pathname);

    console.log('✨ DANHAYS Platform loaded successfully!');
});

// ===== UTILITY FUNCTIONS =====

// Format currency
function formatCurrency(amount, currency = 'EUR') {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });
    return formatter.format(amount);
}

// Get URL parameters
function getURLParams() {
    const params = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Generate unique ID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Log for debugging
function log(...args) {
    if (CONFIG.debug) {
        console.log('[DANHAYS]', ...args);
    }
}

// Error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    NotificationManager.error('An unexpected error occurred');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    NotificationManager.error('An unexpected error occurred');
});
