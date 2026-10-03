/* ===================================
   ORDER CONFIRMATION PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== PRODUCTS REFERENCE =====
const CONFIRMATION_PRODUCTS = {
    1: { name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', price: 35 },
    2: { name: 'Black Opal Moisturizer', brand: 'Black Opal', price: 28 },
    3: { name: 'Raw Shea Butter Shampoo', brand: 'SheaMoisture', price: 12 },
    4: { name: 'Pro Glow Highlighter', brand: 'Fenty Beauty', price: 30 },
    5: { name: 'Coconut & Hibiscus Curl Cream', brand: 'SheaMoisture', price: 14 },
    6: { name: 'Gloss Bomb Liquid Lipstick', brand: 'Fenty Beauty', price: 26 },
    7: { name: 'Black Opal Night Treatment', brand: 'Black Opal', price: 35 },
    8: { name: 'NYX Lip Gloss', brand: 'NYX Professional Makeup', price: 8 },
    9: { name: 'Cantu Shea Butter Leave-In', brand: 'Cantu', price: 6.99 },
    10: { name: 'MAC Fix+', brand: 'MAC', price: 22 }
};

// ===== RECOMMENDED PRODUCTS (EXCLUDE ORDERED ITEMS) =====
const ALL_PRODUCTS = [
    { id: 1, name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', price: 35 },
    { id: 2, name: 'Black Opal Moisturizer', brand: 'Black Opal', price: 28 },
    { id: 3, name: 'Raw Shea Butter Shampoo', brand: 'SheaMoisture', price: 12 },
    { id: 4, name: 'Pro Glow Highlighter', brand: 'Fenty Beauty', price: 30 },
    { id: 5, name: 'Coconut & Hibiscus Curl Cream', brand: 'SheaMoisture', price: 14 },
    { id: 6, name: 'Gloss Bomb Liquid Lipstick', brand: 'Fenty Beauty', price: 26 },
    { id: 7, name: 'Black Opal Night Treatment', brand: 'Black Opal', price: 35 },
    { id: 8, name: 'NYX Lip Gloss', brand: 'NYX Professional Makeup', price: 8 },
    { id: 9, name: 'Cantu Shea Butter Leave-In', brand: 'Cantu', price: 6.99 },
    { id: 10, name: 'MAC Fix+', brand: 'MAC', price: 22 }
];

// ===== ORDER CONFIRMATION MANAGER =====
class OrderConfirmationManager {
    constructor() {
        this.order = this.loadOrder();
        if (!this.order) {
            this.showNoOrder();
            return;
        }
        this.init();
    }

    init() {
        this.renderOrderDetails();
        this.renderOrderItems();
        this.renderOrderSummary();
        this.renderRecommendedProducts();
        this.setupEventListeners();
        this.generateReferralLink();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    loadOrder() {
        const order = localStorage.getItem('lastOrder');
        return order ? JSON.parse(order) : null;
    }

    renderOrderDetails() {
        // Order ID
        document.getElementById('orderId').textContent = this.order.orderId;

        // Confirmed Time
        const date = new Date(this.order.timestamp);
        document.getElementById('confirmedTime').textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Estimated Delivery
        const deliveryDate = new Date(date);
        deliveryDate.setDate(deliveryDate.getDate() + (this.order.shippingMethod === 'standard' ? 7 : this.order.shippingMethod === 'express' ? 3 : 1));
        document.getElementById('estimatedDelivery').textContent = deliveryDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Shipping Address
        document.getElementById('shippingName').textContent = `${this.order.firstName} ${this.order.lastName}`;
        document.getElementById('shippingAddress').textContent = this.order.address;
        document.getElementById('shippingCity').textContent = `${this.order.city}, ${this.order.state} ${this.order.postalCode}`;
        document.getElementById('shippingCountry').textContent = this.order.country;

        // Confirmation Email
        document.getElementById('confirmationEmail').textContent = this.order.email;
    }

    renderOrderItems() {
        const itemsList = document.getElementById('orderItemsList');
        let html = '';

        Object.values(this.order.items).forEach(cartItem => {
            const product = CONFIRMATION_PRODUCTS[cartItem.productId];
            if (product) {
                const itemTotal = product.price * cartItem.quantity;
                html += `
                    <div class="item-row">
                        <div>
                            <div class="item-name">${product.name}</div>
                            <div class="item-details">${product.brand}</div>
                        </div>
                        <div class="item-qty">Qty: ${cartItem.quantity}</div>
                        <div class="item-price">€${itemTotal.toFixed(2)}</div>
                    </div>
                `;
            }
        });

        itemsList.innerHTML = html;
    }

    renderOrderSummary() {
        document.getElementById('summarySubtotal').textContent = `€${this.order.subtotal.toFixed(2)}`;
        document.getElementById('summaryShipping').textContent = this.order.shipping > 0 ? `€${this.order.shipping.toFixed(2)}` : 'Free';
        document.getElementById('summaryTax').textContent = `€${this.order.tax.toFixed(2)}`;
        document.getElementById('summaryTotal').textContent = `€${this.order.total.toFixed(2)}`;
    }

    renderRecommendedProducts() {
        const recommendedGrid = document.getElementById('recommendedGrid');
        const orderedProductIds = Object.values(this.order.items).map(item => item.productId);
        
        const recommendedProducts = ALL_PRODUCTS
            .filter(p => !orderedProductIds.includes(p.id))
            .slice(0, 4);

        const html = recommendedProducts.map(product => `
            <div class="recommended-product" onclick="goToProduct(${product.id})">
                <div class="product-image">🛍️</div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">€${product.price}</div>
                </div>
            </div>
        `).join('');

        recommendedGrid.innerHTML = html;
    }

    setupEventListeners() {
        // Print button
        document.getElementById('printBtn').addEventListener('click', () => {
            window.print();
        });

        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadReceipt();
        });

        // Track button
        document.getElementById('trackBtn').addEventListener('click', () => {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.success('Tracking page coming soon!');
            } else {
                alert('Tracking page coming soon!');
            }
        });

        // Share buttons
        document.getElementById('shareInstagram').addEventListener('click', () => {
            this.share('instagram');
        });

        document.getElementById('shareFacebook').addEventListener('click', () => {
            this.share('facebook');
        });

        document.getElementById('shareTwitter').addEventListener('click', () => {
            this.share('twitter');
        });

        document.getElementById('shareEmail').addEventListener('click', () => {
            this.share('email');
        });

        // Copy referral link
        document.getElementById('copyReferralBtn').addEventListener('click', () => {
            const referralLink = document.getElementById('referralLink');
            referralLink.select();
            document.execCommand('copy');
            
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.success('Referral link copied!');
            } else {
                alert('Referral link copied!');
            }
        });
    }

    downloadReceipt() {
        const receiptContent = `
ORDER CONFIRMATION - DANHAYS
================================

Order ID: ${this.order.orderId}
Date: ${new Date(this.order.timestamp).toLocaleDateString()}
Email: ${this.order.email}

SHIPPING ADDRESS
================
${this.order.firstName} ${this.order.lastName}
${this.order.address}
${this.order.city}, ${this.order.state} ${this.order.postalCode}
${this.order.country}

ORDER ITEMS
===========
${Object.values(this.order.items).map(cartItem => {
    const product = CONFIRMATION_PRODUCTS[cartItem.productId];
    return `${product.name} x${cartItem.quantity} - €${(product.price * cartItem.quantity).toFixed(2)}`;
}).join('\n')}

ORDER SUMMARY
=============
Subtotal: €${this.order.subtotal.toFixed(2)}
Shipping: ${this.order.shipping > 0 ? `€${this.order.shipping.toFixed(2)}` : 'Free'}
Tax: €${this.order.tax.toFixed(2)}
================
Total: €${this.order.total.toFixed(2)}

Shipping Method: ${this.order.shippingMethod.charAt(0).toUpperCase() + this.order.shippingMethod.slice(1)}
Payment Method: ${this.order.paymentMethod.charAt(0).toUpperCase() + this.order.paymentMethod.slice(1)}

Thank you for your purchase!
DANHAYS - The Home of Melanin Beauty
        `;

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Receipt_${this.order.orderId}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    share(platform) {
        const text = `Just purchased from DANHAYS! 🛍️ Check out their amazing beauty products for melanin-rich skin!`;
        const url = window.location.href;

        const shareUrls = {
            instagram: `https://instagram.com/danhaysbeauty`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
            email: `mailto:?subject=DANHAYS%20Beauty&body=${encodeURIComponent(text)}%0A%0A${url}`
        };

        if (platform === 'email') {
            window.location.href = shareUrls.email;
        } else {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }

    generateReferralLink() {
        const referralCode = 'REF' + this.order.orderId.replace('ORD-', '');
        const referralLink = `${window.location.origin}/shop?ref=${referralCode}`;
        document.getElementById('referralLink').value = referralLink;
    }

    showNoOrder() {
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h1>No Order Found</h1>
                <p>No order details available. Please complete a purchase first.</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
    }
}

// ===== HELPER FUNCTIONS =====
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// ===== INITIALIZATION =====
let orderConfirmation;
document.addEventListener('DOMContentLoaded', () => {
    orderConfirmation = new OrderConfirmationManager();
});
