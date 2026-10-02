/* ===================================
   ACCOUNT PAGES JAVASCRIPT
   Version 3.0
   =================================== */

// ===== SAMPLE USER DATA =====
const SAMPLE_USER = {
    id: 'user-123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+32 2 123 4567',
    skinType: 'combination',
    favoriteShade: 'G8',
    birthday: '1990-01-15',
    rewardsPoints: 1250,
    rewardsTier: 'Silver',
    totalOrders: 8,
    totalSpent: 450.50
};

const SAMPLE_ORDERS = [
    {
        id: 'ORD-001',
        date: '2026-01-10',
        status: 'delivered',
        total: 95.50,
        items: 3
    },
    {
        id: 'ORD-002',
        date: '2026-01-05',
        status: 'shipped',
        total: 150.00,
        items: 5
    },
    {
        id: 'ORD-003',
        date: '2025-12-28',
        status: 'delivered',
        total: 75.00,
        items: 2
    },
    {
        id: 'ORD-004',
        date: '2025-12-20',
        status: 'delivered',
        total: 130.00,
        items: 4
    }
];

const SAMPLE_WISHLIST = [
    {
        id: 1,
        name: 'Fenty Beauty Pro Filt\'r Foundation',
        brand: 'Fenty Beauty',
        price: 34.99,
        image: 'https://via.placeholder.com/300x300?text=Wishlist+1',
        rating: 4.8,
        reviews: 1250
    },
    {
        id: 5,
        name: 'Beautyy Eyeshadow Palette',
        brand: 'Beautyy',
        price: 22.99,
        image: 'https://via.placeholder.com/300x300?text=Wishlist+2',
        rating: 4.9,
        reviews: 1450
    },
    {
        id: 10,
        name: 'Fenty Skin Hydrating Serum',
        brand: 'Fenty Beauty',
        price: 65.00,
        image: 'https://via.placeholder.com/300x300?text=Wishlist+3',
        rating: 4.9,
        reviews: 980
    },
    {
        id: 11,
        name: 'Cantu Shea Butter Leave-In Conditioner',
        brand: 'Cantu',
        price: 6.99,
        image: 'https://via.placeholder.com/300x300?text=Wishlist+4',
        rating: 4.7,
        reviews: 1650
    }
];

const SAMPLE_ADDRESSES = [
    {
        id: 'addr-1',
        label: 'Home',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Rue de la Beauté',
        city: 'Brussels',
        postalCode: '1000',
        country: 'Belgium',
        phone: '+32 2 123 4567',
        default: true
    },
    {
        id: 'addr-2',
        label: 'Work',
        firstName: 'John',
        lastName: 'Doe',
        address: '456 Business Street',
        city: 'Brussels',
        postalCode: '1010',
        country: 'Belgium',
        phone: '+32 2 987 6543',
        default: false
    }
];

const POINTS_HISTORY = [
    { description: 'Order ORD-001 completed', date: '2026-01-10', points: 95, type: 'plus' },
    { description: 'Birthday bonus', date: '2026-01-05', points: 200, type: 'plus' },
    { description: 'Product review', date: '2026-01-03', points: 50, type: 'plus' },
    { description: 'Order ORD-002 completed', date: '2025-12-28', points: 150, type: 'plus' },
    { description: 'Points redemption', date: '2025-12-20', points: 100, type: 'minus' }
];

// ===== ACCOUNT MANAGER CLASS =====
class AccountManager {
    constructor() {
        this.user = { ...SAMPLE_USER };
        this.orders = [...SAMPLE_ORDERS];
        this.wishlist = window.wishlist || { items: [...SAMPLE_WISHLIST] };

        this.init();
    }

    init() {
        this.renderUserProfile();
        this.renderDashboard();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });
    }

    renderUserProfile() {
        document.getElementById('userName').textContent = `${this.user.firstName} ${this.user.lastName}`;
        document.getElementById('userEmail').textContent = this.user.email;
    }

    renderDashboard() {
        // Stats
        document.getElementById('totalOrders').textContent = this.orders.length;
        document.getElementById('totalSpent').textContent = `€${this.user.totalSpent.toFixed(2)}`;
        document.getElementById('wishlistCount').textContent = this.wishlist.items.length;
        document.getElementById('rewardPoints').textContent = this.user.rewardsPoints;

        // Recent orders
        this.renderRecentOrders();
    }

    renderRecentOrders() {
        const container = document.getElementById('recentOrdersList');
        const recentOrders = this.orders.slice(0, 3);

        container.innerHTML = recentOrders.map(order => `
            <div class="order-item">
                <div class="order-number">
                    ${order.id}<br>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div>${order.items} items</div>
                <div class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
                <div class="order-total">€${order.total.toFixed(2)}</div>
            </div>
        `).join('');
    }

    switchSection(section) {
        // Hide all sections
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        
        // Remove active class from nav items
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

        // Show selected section
        const sectionElement = document.getElementById(`${section}-section`);
        if (sectionElement) {
            sectionElement.classList.add('active');
        }

        // Set active nav item
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Render section-specific content
        if (section === 'orders') {
            this.renderOrders();
        } else if (section === 'wishlist') {
            this.renderWishlist();
        } else if (section === 'addresses') {
            this.renderAddresses();
        } else if (section === 'rewards') {
            this.renderRewards();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderOrders() {
        const container = document.getElementById('ordersList');
        container.innerHTML = this.orders.map(order => `
            <div class="order-item">
                <div class="order-number">
                    ${order.id}<br>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div>${order.items} items</div>
                <div class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
                <div class="order-total">€${order.total.toFixed(2)}</div>
                <div class="order-actions">
                    <a href="/order-confirmation" class="link">View Details</a>
                </div>
            </div>
        `).join('');
    }

    renderWishlist() {
        const container = document.getElementById('wishlistItems');
        container.innerHTML = this.wishlist.items.map(item => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <p class="product-brand">${item.brand}</p>
                    <h3 class="product-name">${item.name}</h3>
                    <div class="product-rating">
                        <span class="stars">★★★★★</span>
                        <span class="count">(${item.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current">€${item.price.toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button onclick="window.cart.addItem({id: ${item.id}, name: '${item.name}', price: ${item.price}, image: '${item.image}', quantity: 1})">Add to Cart</button>
                        <button onclick="account.removeFromWishlist(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderAddresses() {
        const container = document.getElementById('addressesList');
        container.innerHTML = SAMPLE_ADDRESSES.map(addr => `
            <div class="address-card ${addr.default ? 'default' : ''}">
                <div class="address-header">
                    <span class="address-label">${addr.label}</span>
                    ${addr.default ? '<span class="address-default">DEFAULT</span>' : ''}
                </div>
                <div class="address-content">
                    <p>${addr.firstName} ${addr.lastName}</p>
                    <p>${addr.address}</p>
                    <p>${addr.city}, ${addr.postalCode}</p>
                    <p>${addr.country}</p>
                    <p>Phone: ${addr.phone}</p>
                </div>
                <div class="address-actions">
                    <a href="#" class="link" onclick="account.editAddress('${addr.id}')">Edit</a>
                    <span>|</span>
                    <a href="#" class="link" onclick="account.deleteAddress('${addr.id}')">Delete</a>
                </div>
            </div>
        `).join('');
    }

    renderRewards() {
        // Update rewards info
        document.getElementById('rewardsPointsDisplay').textContent = this.user.rewardsPoints;
        document.getElementById('rewardsTier').textContent = this.user.rewardsTier;

        // Update tier progress
        const pointsForNextTier = {
            'Bronze': 200,
            'Silver': 500,
            'Gold': 1000,
            'Diamond': 2000
        };

        const nextTierPoints = pointsForNextTier[this.user.rewardsTier] || 2000;
        const progress = (this.user.rewardsPoints / nextTierPoints) * 100;
        document.getElementById('tierProgress').style.width = Math.min(progress, 100) + '%';

        // Points history
        const historyContainer = document.getElementById('pointsHistory');
        historyContainer.innerHTML = POINTS_HISTORY.map(item => `
            <div class="history-item">
                <div class="history-description">
                    <p>${item.description}</p>
                    <p class="history-date">${new Date(item.date).toLocaleDateString()}</p>
                </div>
                <div class="history-points ${item.type}">
                    ${item.type === 'plus' ? '+' : '-'}${item.points}
                </div>
            </div>
        `).join('');
    }

    saveProfile() {
        this.user.firstName = document.getElementById('firstName').value;
        this.user.lastName = document.getElementById('lastName').value;
        this.user.email = document.getElementById('profileEmail').value;
        this.user.phone = document.getElementById('phone').value;
        this.user.skinType = document.getElementById('skinType').value;
        this.user.favoriteShade = document.getElementById('favoriteShade').value;
        this.user.birthday = document.getElementById('birthday').value;

        this.renderUserProfile();
        NotificationManager.success('Profile updated successfully!');
    }

    changePassword() {
        const current = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (!current || !newPass || !confirm) {
            NotificationManager.error('Please fill all password fields');
            return;
        }

        if (newPass !== confirm) {
            NotificationManager.error('New passwords do not match');
            return;
        }

        if (newPass.length < 8) {
            NotificationManager.error('Password must be at least 8 characters');
            return;
        }

        // Clear form
        document.getElementById('passwordForm').reset();
        NotificationManager.success('Password changed successfully!');
    }

    removeFromWishlist(productId) {
        this.wishlist.items = this.wishlist.items.filter(item => item.id !== productId);
        this.renderWishlist();
        NotificationManager.success('Removed from wishlist');
    }

    addNewAddress() {
        NotificationManager.info('Add new address feature would open a form');
    }

    editAddress(addressId) {
        NotificationManager.info('Edit address feature would open a form');
    }

    deleteAddress(addressId) {
        if (confirm('Are you sure you want to delete this address?')) {
            NotificationManager.success('Address deleted');
            this.renderAddresses();
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '/';
            NotificationManager.success('Logged out successfully');
        }
    }
}

// ===== INITIALIZATION =====
let account;
document.addEventListener('DOMContentLoaded', () => {
    account = new AccountManager();
    PreloaderManager.hide();
});
