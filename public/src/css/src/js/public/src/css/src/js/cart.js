/* ===================================
   SHOPPING CART PAGE JAVASCRIPT
   Version 3.0
   =================================== */

// ===== RECOMMENDED PRODUCTS =====
const RECOMMENDED_PRODUCTS = [
    {
        id: 10,
        name: "Fenty Skin Hydrating Serum",
        brand: "Fenty Beauty",
        price: 65.00,
        image: "https://via.placeholder.com/300x300?text=Recommended+1",
        rating: 4.9,
        reviews: 980
    },
    {
        id: 11,
        name: "Cantu Shea Butter Leave-In Conditioner",
        brand: "Cantu",
        price: 6.99,
        image: "https://via.placeholder.com/300x300?text=Recommended+2",
        rating: 4.7,
        reviews: 1650
    },
    {
        id: 12,
        name: "SheaMoisture Raw Shea Butter Shampoo",
        brand: "SheaMoisture",
        price: 10.99,
        image: "https://via.placeholder.com/300x300?text=Recommended+3",
        rating: 4.8,
        reviews: 2340
    },
    {
        id: 13,
        name: "MAC Fix+",
        brand: "MAC",
        price: 27.00,
        image: "https://via.placeholder.com/300x300?text=Recommended+4",
        rating: 4.7,
        reviews: 1450
    }
];

// ===== CART PAGE MANAGER CLASS =====
class CartPageManager {
    constructor() {
        this.cart = window.cart;
        this.shippingCost = 0;
        this.discount = 0;
        this.promoCode = '';

        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        if (this.cart.items.length === 0) {
            this.renderEmptyCart();
        } else {
            this.renderCartItems();
            this.renderSummary();
            this.renderRecommendations();
        }
    }

    renderEmptyCart() {
        document.getElementById('emptyCart').style.display = 'block';
        document.querySelector('.cart-items').style.display = 'none';
        document.querySelector('.cart-summary').style.display = 'none';
        document.getElementById('recommendationsSection').style.display = 'none';
    }

    renderCartItems() {
        const container = document.getElementById('cartItems');
        document.getElementById('emptyCart').style.display = 'none';
        document.querySelector('.cart-summary').style.display = 'flex';

        container.innerHTML = this.cart.items.map((item, index) => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <p class="cart-item-brand">${item.brand || 'Brand'}</p>
                    <h4 class="cart-item-name">${item.name}</h4>
                    ${item.shade ? `<div class="cart-item-options">Shade: ${item.shade}</div>` : ''}
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn-small" onclick="cartPage.updateQty(${item.id}, ${item.quantity - 1})">−</button>
                        <input type="number" class="qty-input-small" value="${item.quantity}" min="1" max="99" onchange="cartPage.updateQty(${item.id}, this.value)">
                        <button class="qty-btn-small" onclick="cartPage.updateQty(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-btn" onclick="cartPage.removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

        document.getElementById('itemCount').textContent = `(${this.cart.items.length})`;
    }

    renderSummary() {
        const subtotal = this.cart.getTotal();
        const shippingSelect = document.getElementById('shippingMethod');
        const selectedShipping = shippingSelect.options[shippingSelect.selectedIndex];
        this.shippingCost = parseFloat(selectedShipping.getAttribute('data-price'));

        // Auto-select free shipping if over €75
        if (subtotal >= 75 && this.shippingCost > 0) {
            shippingSelect.value = 'free';
            this.shippingCost = 0;
            document.getElementById('freeShippingNotice').style.display = 'block';
        } else {
            document.getElementById('freeShippingNotice').style.display = 'none';
        }

        const total = subtotal + this.shippingCost - this.discount;

        // Update display
        document.getElementById('subtotal').textContent = `€${subtotal.toFixed(2)}`;

        if (this.discount > 0) {
            document.getElementById('discountRow').style.display = 'flex';
            document.getElementById('discount').textContent = `-€${this.discount.toFixed(2)}`;
        } else {
            document.getElementById('discountRow').style.display = 'none';
        }

        document.getElementById('total').textContent = `€${total.toFixed(2)}`;

        // Update rewards points
        const points = Math.floor(subtotal);
        document.getElementById('rewardsPoints').textContent = points;
    }

    renderRecommendations() {
        const container = document.getElementById('recommendedProducts');
        const section = document.getElementById('recommendationsSection');

        if (this.cart.items.length > 0) {
            section.style.display = 'block';
            container.innerHTML = RECOMMENDED_PRODUCTS.map(p => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${p.image}" alt="${p.name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <p class="product-brand">${p.brand}</p>
                        <h3 class="product-name">${p.name}</h3>
                        <div class="product-rating">
                            <span class="stars">★★★★★</span>
                            <span class="count">(${p.reviews})</span>
                        </div>
                        <div class="product-price">
                            <span class="current">€${p.price.toFixed(2)}</span>
                        </div>
                        <div class="product-actions">
                            <button onclick="window.cart.addItem({id: ${p.id}, name: '${p.name}', price: ${p.price}, image: '${p.image}', quantity: 1})">Add to Cart</button>
                            <button onclick="window.wishlist.addItem({id: ${p.id}, name: '${p.name}', price: ${p.price}, image: '${p.image}'})">♡</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    setupEventListeners() {
        // Quantity updates
        document.querySelectorAll('.qty-input-small').forEach(input => {
            input.addEventListener('change', (e) => {
                const itemId = parseInt(e.target.closest('.cart-item').dataset.itemId);
                const quantity = parseInt(e.target.value);
                this.updateQty(itemId, quantity);
            });
        });
    }

    updateQty(itemId, quantity) {
        quantity = parseInt(quantity);

        if (quantity < 1) {
            this.removeItem(itemId);
            return;
        }

        if (quantity > 99) {
            quantity = 99;
        }

        this.cart.updateQuantity(itemId, quantity);
        this.render();
        NotificationManager.success('Quantity updated');
    }

    removeItem(itemId) {
        this.cart.removeItem(itemId);
        this.render();
        NotificationManager.success('Item removed from cart');
    }

    calculateShipping() {
        this.renderSummary();
    }

    applyPromo() {
        const code = document.getElementById('promoCode').value.trim().toUpperCase();

        if (!code) {
            NotificationManager.warning('Please enter a promo code');
            return;
        }

        // Sample promo codes
        const promoCodes = {
            'WELCOME10': 0.10,
            'SAVE15': 0.15,
            'MELANIN20': 0.20
        };

        if (promoCodes[code]) {
            const discountPercent = promoCodes[code];
            this.discount = this.cart.getTotal() * discountPercent;
            this.promoCode = code;
            this.renderSummary();
            NotificationManager.success(`Promo code "${code}" applied! You save €${this.discount.toFixed(2)}`);
        } else {
            this.discount = 0;
            this.promoCode = '';
            NotificationManager.error('Invalid promo code');
        }
    }
}

// ===== INITIALIZATION =====
let cartPage;
document.addEventListener('DOMContentLoaded', () => {
    cartPage = new CartPageManager();
    PreloaderManager.hide();
});
