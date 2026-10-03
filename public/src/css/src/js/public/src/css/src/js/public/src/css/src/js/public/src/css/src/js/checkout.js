/* ===================================
   CHECKOUT PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== CART PRODUCTS REFERENCE =====
const CHECKOUT_PRODUCTS = {
    1: { name: 'Pro Filt\'r Foundation', price: 35 },
    2: { name: 'Black Opal Moisturizer', price: 28 },
    3: { name: 'Raw Shea Butter Shampoo', price: 12 },
    4: { name: 'Pro Glow Highlighter', price: 30 },
    5: { name: 'Coconut & Hibiscus Curl Cream', price: 14 },
    6: { name: 'Gloss Bomb Liquid Lipstick', price: 26 },
    7: { name: 'Black Opal Night Treatment', price: 35 },
    8: { name: 'NYX Lip Gloss', price: 8 },
    9: { name: 'Cantu Shea Butter Leave-In', price: 6.99 },
    10: { name: 'MAC Fix+', price: 22 }
};

// ===== TAX RATES BY COUNTRY =====
const TAX_RATES = {
    'US': 0.08,
    'CA': 0.05,
    'UK': 0.20,
    'AU': 0.10,
    'NL': 0.21,
    'DE': 0.19,
    'FR': 0.20,
    'ES': 0.21,
    'IT': 0.22,
    'Other': 0.10
};

// ===== SHIPPING COSTS =====
const SHIPPING_COSTS = {
    'standard': 0,
    'express': 10,
    'overnight': 25
};

// ===== CHECKOUT MANAGER =====
class CheckoutManager {
    constructor() {
        this.cart = this.loadCart();
        this.shippingCost = 0;
        this.taxRate = 0.10;
        this.discount = 0;
        this.init();
    }

    init() {
        this.renderOrderSummary();
        this.setupEventListeners();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    loadCart() {
        // For demo, use sample cart
        const sampleCart = {
            1: { productId: 1, quantity: 1 },
            4: { productId: 4, quantity: 2 },
            3: { productId: 3, quantity: 1 }
        };
        return sampleCart;
    }

    renderOrderSummary() {
        const summaryItems = document.getElementById('summaryItems');
        let subtotal = 0;

        const itemsHTML = Object.values(this.cart).map(cartItem => {
            const product = CHECKOUT_PRODUCTS[cartItem.productId];
            const itemTotal = product.price * cartItem.quantity;
            subtotal += itemTotal;

            return `
                <div class="summary-item">
                    <span class="summary-item-name">${product.name}</span>
                    <span class="summary-item-qty">x${cartItem.quantity}</span>
                    <span class="summary-item-price">€${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }).join('');

        summaryItems.innerHTML = itemsHTML;

        // Calculate totals
        this.updateOrderTotals(subtotal);
    }

    updateOrderTotals(subtotal) {
        const country = document.getElementById('country').value;
        this.taxRate = TAX_RATES[country] || 0.10;

        const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked');
        this.shippingCost = SHIPPING_COSTS[shippingMethod?.value || 'standard'] || 0;

        const tax = subtotal * this.taxRate;
        const total = subtotal + this.shippingCost + tax - this.discount;

        document.getElementById('summarySubtotal').textContent = `€${subtotal.toFixed(2)}`;
        document.getElementById('summaryShipping').textContent = this.shippingCost > 0 ? `€${this.shippingCost.toFixed(2)}` : 'Free';
        document.getElementById('summaryTax').textContent = `€${tax.toFixed(2)}`;
        document.getElementById('summaryTotal').textContent = `€${total.toFixed(2)}`;
    }

    setupEventListeners() {
        // Shipping method change
        document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const subtotal = this.getSubtotal();
                this.updateOrderTotals(subtotal);
            });
        });

        // Country change
        document.getElementById('country').addEventListener('change', () => {
            const subtotal = this.getSubtotal();
            this.updateOrderTotals(subtotal);
            this.updateShippingDisplay();
        });

        // Payment method change
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.handlePaymentMethodChange(e.target.value);
            });
        });

        // Card number formatting
        document.getElementById('cardNumber')?.addEventListener('input', (e) => {
            this.formatCardNumber(e.target);
        });

        // Expiry date formatting
        document.getElementById('cardExpiry')?.addEventListener('input', (e) => {
            this.formatExpiryDate(e.target);
        });

        // CVV only numbers
        document.getElementById('cardCVV')?.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });

        // Place order button
        document.getElementById('placeOrderBtn').addEventListener('click', () => {
            this.placeOrder();
        });

        // Same as billing checkbox
        document.getElementById('sameAsBilling')?.addEventListener('change', () => {
            // In production, would show/hide billing form
        });
    }

    handlePaymentMethodChange(method) {
        const cardSection = document.getElementById('cardSection');
        if (method === 'card') {
            cardSection.style.display = 'block';
        } else {
            cardSection.style.display = 'none';
        }
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';

        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }

        input.value = formattedValue.slice(0, 19);
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        input.value = value.slice(0, 5);
    }

    validateForm() {
        // Validate shipping form
        const requiredFields = [
            'firstName', 'lastName', 'email', 'address',
            'city', 'state', 'postalCode', 'country'
        ];

        for (let field of requiredFields) {
            const element = document.getElementById(field);
            if (!element.value.trim()) {
                if (typeof NotificationManager !== 'undefined') {
                    NotificationManager.error(`Please fill in ${field}`);
                }
                element.focus();
                return false;
            }
        }

        // Validate terms checkbox
        if (!document.getElementById('termsCheckbox').checked) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Please accept Terms & Conditions');
            }
            return false;
        }

        // Validate payment method
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        if (paymentMethod === 'card') {
            return this.validateCardForm();
        }

        return true;
    }

    validateCardForm() {
        const cardName = document.getElementById('cardName');
        const cardNumber = document.getElementById('cardNumber');
        const cardExpiry = document.getElementById('cardExpiry');
        const cardCVV = document.getElementById('cardCVV');

        if (!cardName.value.trim()) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Please enter cardholder name');
            }
            return false;
        }

        const cardDigits = cardNumber.value.replace(/\s/g, '');
        if (cardDigits.length !== 16) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Please enter a valid card number');
            }
            return false;
        }

        if (!cardExpiry.value.match(/^\d{2}\/\d{2}$/)) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Please enter expiry date as MM/YY');
            }
            return false;
        }

        if (cardCVV.value.length !== 3 && cardCVV.value.length !== 4) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Please enter a valid CVV');
            }
            return false;
        }

        return true;
    }

    getSubtotal() {
        let subtotal = 0;
        Object.values(this.cart).forEach(cartItem => {
            const product = CHECKOUT_PRODUCTS[cartItem.productId];
            if (product) {
                subtotal += product.price * cartItem.quantity;
            }
        });
        return subtotal;
    }

    updateShippingDisplay() {
        const country = document.getElementById('country').value;
        const standardPrice = document.getElementById('standardPrice');
        
        // Free shipping on orders over €50 in certain countries
        const subtotal = this.getSubtotal();
        if (subtotal > 50 && ['US', 'CA', 'UK', 'NL'].includes(country)) {
            standardPrice.textContent = 'Free';
        } else {
            standardPrice.textContent = 'Free';
        }
    }

    placeOrder() {
        // Validate form
        if (!this.validateForm()) {
            return;
        }

        const placeOrderBtn = document.getElementById('placeOrderBtn');
        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Processing...';

        // Simulate order processing
        setTimeout(() => {
            // Collect order data
            const orderData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
                shippingMethod: document.querySelector('input[name="shippingMethod"]:checked').value,
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
                items: this.cart,
                subtotal: this.getSubtotal(),
                shipping: this.shippingCost,
                tax: this.getSubtotal() * this.taxRate,
                total: this.getSubtotal() + this.shippingCost + (this.getSubtotal() * this.taxRate),
                orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                timestamp: new Date().toISOString()
            };

            // Save order to localStorage
            localStorage.setItem('lastOrder', JSON.stringify(orderData));

            // Clear cart
            localStorage.removeItem('cart');

            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.success('Order placed successfully!');
            }

            // Redirect to confirmation page
            setTimeout(() => {
                window.location.href = `order-confirmation.html?orderId=${orderData.orderId}`;
            }, 1000);
        }, 2000);
    }
}

// ===== INITIALIZATION =====
let checkout;
document.addEventListener('DOMContentLoaded', () => {
    checkout = new CheckoutManager();
});
