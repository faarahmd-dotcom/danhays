/* ===================================
   ORDER CONFIRMATION PAGE JAVASCRIPT
   Version 3.0
   =================================== */

// ===== RECOMMENDED PRODUCTS FOR FOLLOW-UP =====
const RECOMMENDED_PRODUCTS = [
    {
        id: 20,
        name: "DANHAYS Premium Brush Set",
        brand: "DANHAYS",
        price: 45.00,
        image: "https://via.placeholder.com/300x300?text=Brush+Set",
        rating: 4.9,
        reviews: 520
    },
    {
        id: 21,
        name: "Fenty Beauty Matchstix Concealer",
        brand: "Fenty Beauty",
        price: 25.00,
        image: "https://via.placeholder.com/300x300?text=Concealer",
        rating: 4.8,
        reviews: 1200
    },
    {
        id: 22,
        name: "Black Opal Moisturizing Eye Cream",
        brand: "Black Opal",
        price: 18.99,
        image: "https://via.placeholder.com/300x300?text=Eye+Cream",
        rating: 4.7,
        reviews: 340
    },
    {
        id: 23,
        name: "MAC Setting Spray",
        brand: "MAC",
        price: 27.00,
        image: "https://via.placeholder.com/300x300?text=Setting+Spray",
        rating: 4.9,
        reviews: 1450
    }
];

// ===== ORDER CONFIRMATION MANAGER CLASS =====
class OrderConfirmationManager {
    constructor() {
        this.order = this.loadOrderData();
        this.init();
    }

    init() {
        if (!this.order) {
            window.location.href = '/shop';
            return;
        }

        this.renderOrderConfirmation();
        this.renderRecommendations();
    }

    loadOrderData() {
        // Get order from session storage
        const orderData = sessionStorage.getItem('lastOrder');
        if (orderData) {
            return JSON.parse(orderData);
        }

        // Fallback: create sample order
        return {
            orderId: 'ORD-' + Date.now(),
            shipping: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                address: '123 Rue de la Beauté',
                city: 'Brussels',
                postalCode: '1000',
                country: 'Belgium',
                phone: '+32 2 123 4567'
            },
            items: [
                {
                    id: 1,
                    name: 'Fenty Beauty Pro Filt\'r Foundation',
                    brand: 'Fenty Beauty',
                    price: 34.99,
                    image: 'https://via.placeholder.com/300x300?text=Foundation',
                    quantity: 1
                }
            ],
            subtotal: 34.99,
            shipping: 4.95,
            total: 39.94,
            orderDate: new Date().toISOString()
        };
    }

    renderOrderConfirmation() {
        // Order number
        document.getElementById('orderNumber').textContent = this.order.orderId;

        // Shipping information
        const shipping = this.order.shipping;
        document.getElementById('shippingName').textContent = `${shipping.firstName} ${shipping.lastName}`;
        document.getElementById('shippingEmail').textContent = shipping.email;
        document.getElementById('shippingAddress').innerHTML = `
            ${shipping.address}<br>
            ${shipping.city}, ${shipping.postalCode}<br>
            ${shipping.country}
        `;
        document.getElementById('shippingPhone').textContent = shipping.phone;

        // Billing information
        document.getElementById('billingAddress').textContent = 'Same as shipping address';

        // Order items in table
        this.renderOrderItems();

        // Summary
        this.renderOrderSummary();

        // Tracking date
        const orderDate = new Date(this.order.orderDate);
        document.getElementById('trackingDate1').textContent = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Earned points
        const points = Math.floor(this.order.subtotal);
        document.getElementById('earnedPoints').textContent = points;
    }

    renderOrderItems() {
        const tableBody = document.getElementById('orderItemsTable');
        const summaryItems = document.getElementById('summaryItems');

        // Table rows
        tableBody.innerHTML = this.order.items.map(item => `
            <div class="table-row">
                <div class="col-product">
                    <strong>${item.name}</strong><br>
                    <small>${item.brand}</small>
                </div>
                <div class="col-qty">${item.quantity}</div>
                <div class="col-price">€${item.price.toFixed(2)}</div>
                <div class="col-total">€${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        // Summary items
        summaryItems.innerHTML = this.order.items.map(item => `
            <div class="summary-item">
                <div class="summary-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="summary-item-info">
                    <p class="summary-item-name">${item.name}</p>
                    <p class="summary-item-qty">Qty: ${item.quantity}</p>
                </div>
                <div class="summary-item-price">€${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }

    renderOrderSummary() {
        document.getElementById('summarySubtotal').textContent = `€${this.order.subtotal.toFixed(2)}`;
        document.getElementById('summaryShipping').textContent = `€${this.order.shipping.toFixed(2)}`;
        document.getElementById('summaryTotal').textContent = `€${this.order.total.toFixed(2)}`;
    }

    renderRecommendations() {
        const container = document.getElementById('recommendedProducts');
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

    downloadInvoice() {
        // In a real app, this would generate a PDF
        NotificationManager.success('Invoice download starting...');
        
        // Simulate download
        const invoiceContent = `
DANHAYS INVOICE
Order Number: ${this.order.orderId}
Date: ${new Date(this.order.orderDate).toLocaleDateString()}

CUSTOMER INFORMATION
Name: ${this.order.shipping.firstName} ${this.order.shipping.lastName}
Email: ${this.order.shipping.email}
Phone: ${this.order.shipping.phone}

SHIPPING ADDRESS
${this.order.shipping.address}
${this.order.shipping.city}, ${this.order.shipping.postalCode}
${this.order.shipping.country}

ORDER ITEMS
${this.order.items.map(item => `
${item.name} (${item.brand})
Quantity: ${item.quantity}
Price: €${item.price.toFixed(2)} x ${item.quantity} = €${(item.price * item.quantity).toFixed(2)}
`).join('\n')}

TOTAL
Subtotal: €${this.order.subtotal.toFixed(2)}
Shipping: €${this.order.shipping.toFixed(2)}
TOTAL: €${this.order.total.toFixed(2)}

Thank you for your purchase!
        `;

        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${this.order.orderId}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// ===== INITIALIZATION =====
let orderConfirmation;
document.addEventListener('DOMContentLoaded', () => {
    orderConfirmation = new OrderConfirmationManager();
    PreloaderManager.hide();
});
