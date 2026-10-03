/* ===================================
   DANHAYS - MAIN JAVASCRIPT
   Core functionality and utilities
   =================================== */

// ===== UTILITY FUNCTIONS =====

// Local Storage Management
const Storage = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  }
};

// Cart Management
const Cart = {
  items: Storage.get('cart') || [],

  add: (product) => {
    const existing = Cart.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      Cart.items.push({ ...product, quantity: product.quantity || 1 });
    }
    Cart.save();
    Cart.updateBadge();
  },

  remove: (productId) => {
    Cart.items = Cart.items.filter(item => item.id !== productId);
    Cart.save();
    Cart.updateBadge();
  },

  clear: () => {
    Cart.items = [];
    Cart.save();
    Cart.updateBadge();
  },

  save: () => {
    Storage.set('cart', Cart.items);
  },

  updateBadge: () => {
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = Cart.items.length;
    }
  },

  getTotal: () => {
    return Cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};

// Wishlist Management
const Wishlist = {
  items: Storage.get('wishlist') || [],

  add: (product) => {
    if (!Wishlist.items.find(item => item.id === product.id)) {
      Wishlist.items.push(product);
      Wishlist.save();
      Wishlist.updateBadge();
    }
  },

  remove: (productId) => {
    Wishlist.items = Wishlist.items.filter(item => item.id !== productId);
    Wishlist.save();
    Wishlist.updateBadge();
  },

  clear: () => {
    Wishlist.items = [];
    Wishlist.save();
    Wishlist.updateBadge();
  },

  save: () => {
    Storage.set('wishlist', Wishlist.items);
  },

  updateBadge: () => {
    const badge = document.getElementById('wishlistBadge');
    if (badge) {
      badge.textContent = Wishlist.items.length;
    }
  }
};

// User Authentication
const Auth = {
  user: Storage.get('userProfile'),

  login: (email, password) => {
    const user = {
      id: Math.random(),
      email: email,
      name: email.split('@')[0],
      role: 'customer',
      loginTime: new Date().toISOString()
    };
    Auth.user = user;
    Storage.set('userProfile', user);
    return user;
  },

  logout: () => {
    Auth.user = null;
    Storage.remove('userProfile');
    window.location.href = 'user/login.html';
  },

  isLoggedIn: () => {
    return !!Auth.user;
  },

  checkAuth: () => {
    if (!Auth.isLoggedIn()) {
      window.location.href = 'user/login.html';
    }
  }
};

// Product Filtering
const ProductFilter = {
  filters: {
    category: null,
    brand: null,
    priceMin: 0,
    priceMax: 1000,
    rating: 0,
    search: ''
  },

  setFilter: (filterName, value) => {
    ProductFilter.filters[filterName] = value;
  },

  apply: (products) => {
    return products.filter(product => {
      const categoryMatch = !ProductFilter.filters.category || 
        product.category === ProductFilter.filters.category;
      const brandMatch = !ProductFilter.filters.brand || 
        product.brand === ProductFilter.filters.brand;
      const priceMatch = product.price >= ProductFilter.filters.priceMin && 
        product.price <= ProductFilter.filters.priceMax;
      const ratingMatch = !ProductFilter.filters.rating || 
        product.rating >= ProductFilter.filters.rating;
      const searchMatch = !ProductFilter.filters.search || 
        product.name.toLowerCase().includes(ProductFilter.filters.search.toLowerCase());

      return categoryMatch && brandMatch && priceMatch && ratingMatch && searchMatch;
    });
  }
};

// Notifications
const Notify = {
  show: (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background-color: ${type === 'success' ? '#28A745' : '#DC3545'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  },

  success: (message) => Notify.show(message, 'success'),
  error: (message) => Notify.show(message, 'error')
};

// Utilities
const Utils = {
  formatPrice: (price) => {
    return '€' + price.toFixed(2);
  },

  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  debounce: (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Update cart and wishlist badges
  Cart.updateBadge();
  Wishlist.updateBadge();

  // Check if preloader exists and hide after load
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }

  // Initialize smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Error:', event.error);
  Notify.error('An error occurred. Please try again.');
});

// Log application initialized
console.log('🎉 DANHAYS Application Initialized');
