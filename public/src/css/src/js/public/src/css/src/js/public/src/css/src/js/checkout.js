/* ===================================
   CHECKOUT PAGE JAVASCRIPT
   Version 3.0
   =================================== */

// ===== CHECKOUT MANAGER CLASS =====
class CheckoutManager {
    constructor() {
        this.cart = window.cart;
        this.shippingCost = 4.95;
        this.discount = 0;
        this.formData = {};

        this.init();
    }

    init() {
        if (this.cart.items.length === 0) {
            window.location.href = '/cart';
            return;
        }

        this.renderOrderSummary();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Billing address toggle
        const sameAsBilling = document.getElementById('sameAsBilling');
        sameAsBilling.addEventListener('change', (e) => {
            this.toggleBillingSection(e.target.checked);
        });

        // Payment method change
        const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
        paymentOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                this.updatePaymentSection(e.target.value);
            });
        });
    }

    renderOrderSummary() {
        const container = document.getElementById('orderItems');
        const subtotal = this.cart.getTotal();

        // Render items
        container.innerHTML = this.cart.items.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="order-item-info">
                    <p class="order-item-name">${item.name}</p>
                    <p class="order-item-details">${item.brand || 'Brand'}</p>
                    ${item.shade ? `<p class="order-item-details">Shade: ${item.shade}</p>` : ''}
                    <p class="order-item-qty">Qty: ${item.quantity}</p>
                </div>
                <div class="order-item-price">€${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        // Update totals
        const total = subtotal + this.shippingCost - this.discount;

        document.getElementById('summarySubtotal').textContent = `€${subtotal.toFixed(2)}`;
        document.getElementById('summaryShipping').textContent = `€${this.shippingCost.toFixed(2)}`;
        document.getElementById('summaryTotal').textContent = `€${total.toFixed(2)}`;

        if (this.discount > 0) {
            document.getElementById('summaryDiscountRow').style.display = 'flex';
            document.getElementById('summaryDiscount').textContent = `-€${this.discount.toFixed(2)}`;
        }
    }

    toggleBillingSection(isSame) {
        const billingSection = document.getElementById('billingSection');
        billingSection.style.display = isSame ? 'none' : 'block';
    }

    updatePaymentSection(method) {
        const cardSection = document.getElementById('cardSection');
        
        if (method === 'card') {
            cardSection.style.display = 'block';
        } else {
            cardSection.style.display = 'none';
        }
    }

    validateForm() {
        // Shipping info
        const requiredFields = [
            'firstName', 'lastName', 'email', 'address',
            'city', 'postalCode', 'country', 'phone'
        ];

        for (let field of requiredFields) {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                NotificationManager.error(`Please fill in ${field}`);
                return false;
            }
        }

        // Billing info
        const sameAsBilling = document.getElementById('sameAsBilling');
        if (!sameAsBilling.checked) {
            const billingFields = [
                'billingFirstName', 'billingLastName', 'billingAddress',
                'billingCity', 'billingPostalCode', 'billingCountry'
            ];

            for (let field of billingFields) {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    NotificationManager.error(`Please fill in billing ${field}`);
                    return false;
                }
            }
        }

        // Payment method
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!paymentMethod) {
            NotificationManager.error('Please select a payment method');
            return false;
        }

        // Card validation
        if (paymentMethod.value === 'card') {
            const cardNumber = document.getElementById('cardNumber');
            const cardExpiry = document.getElementById('cardExpiry');
            const cardCVV = document.getElementById('cardCVV');

            if (!cardNumber.value.trim()) {
                NotificationManager.error('Please enter card number');
                return false;
            }

            if (!cardExpiry.value.trim()) {
                NotificationManager.error('Please enter card expiry');
                return false;
            }

            if (!cardCVV.value.trim()) {
                NotificationManager.error('Please enter CVV');
                return false;
            }
        }

        // Terms and conditions
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            NotificationManager.error('Please agree to Terms and Conditions');
            return false;
        }

        return true;
    }

    collectFormData() {
        const sameAsBilling = document.getElementById('sameAsBilling').checked;

        this.formData = {
            shipping: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
                phone: document.getElementById('phone').value
            },
            billing: sameAsBilling ? null : {
                firstName: document.getElementById('billingFirstName').value,
                lastName: document.getElementById('billingLastName').value,
                address: document.getElementById('billingAddress').value,
                city: document.getElementById('billingCity').value,
                postalCode: document.getElementById('billingPostalCode').value,
                country: document.getElementById('billingCountry').value
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            items: this.cart.items,
            subtotal: this.cart.getTotal(),
            shipping: this.shippingCost,
            total: this.cart.getTotal() + this.shippingCost - this.discount,
            discount: this.discount
        };

        if (this.formData.paymentMethod === 'card') {
            this.formData.card = {
                holderName: document.getElementById('cardholderName').value,
                number: document.getElementById('cardNumber').value,
                expiry: document.getElementById('cardExpiry').value,
                cvv: document.getElementById('cardCVV').value,
                saveCard: document.getElementById('saveCard').checked
            };
        }

        return this.formData;
    }

    placeOrder() {
        // Validate form
        if (!this.validateForm()) {
            return;
        }

        // Collect data
        this.collectFormData();

        // Show loading
        const btn = document.getElementById('placeOrderBtn');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Processing...';

        // Simulate API call
        setTimeout(() => {
            // In a real app, send this.formData to backend API
            const orderId = 'ORD-' + Date.now();

            // Save order to session/localStorage
            sessionStorage.setItem('lastOrder', JSON.stringify({
                orderId: orderId,
                ...this.formData,
                orderDate: new Date().toISOString()
            }));

            // Clear cart
            this.cart.clear();

            // Redirect to confirmation
            window.location.href = `/order-confirmation?order=${orderId}`;
        }, 2000);
    }
}

// ===== INITIALIZATION =====
let checkout;
document.addEventListener('DOMContentLoaded', () => {
    checkout = new CheckoutManager();
    PreloaderManager.hide();
});
