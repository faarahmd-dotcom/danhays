/* ===================================
   SHOPPING CART PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== SAMPLE CART DATA =====
const CART_PRODUCTS = {
    1: {
        id: 1,
        name: 'Pro Filt\'r Foundation',
        brand: 'Fenty Beauty',
        price: 35,
        image: '🎨',
        rating: 4.9,
        reviews: 2100
    },
    2: {
        id: 2,
        name: 'Black Opal Moisturizer',
        brand: 'Black Opal',
        price: 28,
        image: '✨',
        rating: 4.7,
        reviews: 890
    },
    3: {
        id: 3,
        name: 'Raw Shea Butter Shampoo',
        brand: 'SheaMoisture',
        price: 12,
        image: '🌿',
        rating: 4.8,
        reviews: 3200
    },
    4: {
        id: 4,
        name: 'Pro Glow Highlighter',
        brand: 'Fenty Beauty',
        price: 30,
        image: '🎨',
        rating: 4.9,
        reviews: 2500
    },
    5: {
        id: 5,
        name: 'Coconut & Hibiscus Curl Cream',
        brand: 'SheaMoisture',
        price: 14,
        image: '🌿',
        rating: 4.7,
        reviews: 2800
    },
    6: {
        id: 6,
        name: 'Gloss Bomb Liquid Lipstick',
        brand: 'Fenty Beauty',
        price: 26,
        image: '🎨',
        rating: 4.6,
        reviews: 1600
    },
    7: {
        id: 7,
        name: 'Black Opal Night Treatment',
        brand: 'Black Opal',
        price: 35,
        image: '✨',
        rating: 4.6,
        reviews: 650
    },
    8: {
        id: 8,
        name: 'NYX Lip Gloss',
        brand: 'NYX Professional Makeup',
        price: 8,
        image: '💄',
        rating: 4.5,
        reviews: 1200
    },
    9: {
        id: 9,
        name: 'Cantu Shea Butter Leave-In',
        brand: 'Cantu',
        price: 6.99,
        image: '🧴',
        rating: 4.8,
        reviews: 2200
    },
    10: {
        id: 10,
        name: 'MAC Fix+',
        brand: 'MAC',
        price: 22,
        image: '🎭',
        rating: 4.7,
        reviews: 1800
    }
};

// ===== PROMO CODES =====
const PROMO_CODES = {
    'WELCOME10': { discount: 0.10, type: 'percentage' },
    'SAVE15': { discount: 0.15, type: 'percentage' },
    'SUMMER20': { discount: 0.20, type: 'percentage' },
    'FLAT10': { discount: 10, type: 'fixed' }
};

// ===== SHOPPING CART MANAGER =====
class ShoppingCartManager {
    constructor() {
        this.cartItems = this.loadCart();
        this.discount = 0;
        this.discountType = null;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    loadCart() {
        // For demo purposes, load sample cart
        // In production, this would come from localStorage or server
        const sampleCart = {
            1: { productId: 1, quantity: 1 },
            4: { productId: 4, quantity: 2 },
            3: { productId: 3, quantity: 1 }
        };
        return sampleCart;
    }

    saveCart() {
        // Save to localStorage in production
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    render() {
        if (Object.keys(this.cartItems).length === 0) {
            this.renderEmptyCart();
        } else {
            this.renderCart();
        }
        this.updateCartCount();
    }

    renderEmptyCart() {
        document.getElementById('emptyCart').style.display = 'block';
        document.getElementById('cartItems').style.display = 'none';
        this.updateSummary();
    }

    renderCart() {
        document.getElementById('emptyCart').style.display = 'none';
        document.getElementById('cartItems').style.display = 'block';

        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = Object.entries(this.cartItems).map(([key, cartItem]) => {
            const product = CART_PRODUCTS[cartItem.productId];
            const itemTotal = product.price * cartItem.quantity;

            return `
                <div class="cart-item" data-cart-key="${key}">
                    <div class="cart-item-image" onclick="goToProduct(${product.id})">
                        ${product.image}
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-brand">${product.brand}</div>
                        <h3 class="cart-item-name">${product.name}</h3>
                        <div class="cart-item-price">€${product.price}</div>
                        <div class="cart-item-rating">⭐ ${product.rating} (${product.reviews})</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="qty-btn-small" onclick="cart.updateQuantity('${key}', ${cartItem.quantity - 1})">−</button>
                            <input type="number" class="qty-input-small" value="${cartItem.quantity}" min="1" data-key="${key}">
                            <button class="qty-btn-small" onclick="cart.updateQuantity('${key}', ${cartItem.quantity + 1})">+</button>
                        </div>
                        <div class="item-total">€${itemTotal.toFixed(2)}</div>
                        <button class="remove-btn" onclick="cart.removeItem('${key}')">Remove</button>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to quantity inputs
        document.querySelectorAll('.qty-input-small').forEach(input => {
            input.addEventListener('change', (e) => {
                const key = e.target.dataset.key;
                const qty = parseInt(e.target.value);
                if (qty > 0) {
                    this.updateQuantity(key, qty);
                }
            });
        });

        this.updateSummary();
        this.renderRecommendedProducts();
    }

    updateQuantity(cartKey, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(cartKey);
            return;
        }

        if (this.cartItems[cartKey]) {
            this.cartItems[cartKey].quantity = newQuantity;
            this.saveCart();
            this.renderCart();

            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.success('Cart updated');
            }
        }
    }

    removeItem(cartKey) {
        delete this.cartItems[cartKey];
        this.saveCart();
        this.render();

        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.success('Item removed from cart');
        }
    }

    updateSummary() {
        let subtotal = 0;

        Object.values(this.cartItems).forEach(cartItem => {
            const product = CART_PRODUCTS[cartItem.productId];
            if (product) {
                subtotal += product.price * cartItem.quantity;
            }
        });

        // Calculate shipping
        let shipping = 0;
        if (subtotal > 0 && subtotal < 50) {
            shipping = 5.99;
        }

        // Calculate discount
        let discountAmount = 0;
        if (this.discountType === 'percentage') {
            discountAmount = subtotal * this.discount;
        } else if (this.discountType === 'fixed') {
            discountAmount = this.discount;
        }

        const total = subtotal + shipping - discountAmount;

        document.getElementById('subtotal').textContent = `€${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = shipping > 0 ? `€${shipping.toFixed(2)}` : 'Free';
        document.getElementById('total').textContent = `€${total.toFixed(2)}`;

        if (discountAmount > 0) {
            document.getElementById('discountRow').style.display = 'flex';
            document.getElementById('discountAmount').textContent = `-€${discountAmount.toFixed(2)}`;
        } else {
            document.getElementById('discountRow').style.display = 'none';
        }
    }

    applyPromo() {
        const promoCode = document.getElementById('promoCode').value.toUpperCase().trim();

        if (!promoCode) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Please enter a promo code');
            }
            return;
        }

        if (PROMO_CODES[promoCode]) {
            const promo = PROMO_CODES[promoCode];
            this.discount = promo.discount;
            this.discountType = promo.type;
            this.updateSummary();

            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.success(`Promo code "${promoCode}" applied!`);
            }
        } else {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Invalid promo code');
            }
            this.discount = 0;
            this.discountType = null;
            this.updateSummary();
        }

        document.getElementById('promoCode').value = '';
    }

    renderRecommendedProducts() {
        const recommendedGrid = document.getElementById('recommendedGrid');
        const cartProductIds = Object.values(this.cartItems).map(item => item.productId);
        
        const recommendedProducts = Object.values(CART_PRODUCTS)
            .filter(p => !cartProductIds.includes(p.id))
            .slice(0, 3);

        recommendedGrid.innerHTML = recommendedProducts.map(product => `
            <div class="recommended-item" onclick="goToProduct(${product.id})">
                <div class="recommended-image">${product.image}</div>
                <div class="recommended-info">
                    <div class="recommended-name">${product.name}</div>
                    <div class="recommended-price">€${product.price}</div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.getElementById('applyPromo').addEventListener('click', () => {
            this.applyPromo();
        });

        document.getElementById('promoCode').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.applyPromo();
            }
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (Object.keys(this.cartItems).length === 0) {
                if (typeof NotificationManager !== 'undefined') {
                    NotificationManager.error('Cart is empty');
                }
                return;
            }
            window.location.href = 'checkout.html';
        });

        document.getElementById('continueShoppingBtn').addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }

    updateCartCount() {
        const count = Object.values(this.cartItems).reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartCount').textContent = count;
    }
}

// ===== HELPER FUNCTIONS =====
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// ===== INITIALIZATION =====
let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCartManager();
});
