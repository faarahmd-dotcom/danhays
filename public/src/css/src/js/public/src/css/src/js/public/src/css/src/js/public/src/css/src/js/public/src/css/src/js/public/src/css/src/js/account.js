/* ===================================
   ACCOUNT/DASHBOARD PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== PRODUCTS REFERENCE =====
const ACCOUNT_PRODUCTS = {
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

// ===== ACCOUNT MANAGER =====
class AccountManager {
    constructor() {
        this.user = this.loadUser();
        this.orders = this.loadOrders();
        this.wishlist = this.loadWishlist();
        this.recentlyViewed = this.loadRecentlyViewed();
        this.preferences = this.loadPreferences();
        this.init();
    }

    init() {
        this.renderProfile();
        this.renderOverview();
        this.setupSectionNavigation();
        this.setupEventListeners();
        this.renderAllSections();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    // ===== DATA LOADING =====
    loadUser() {
        const user = localStorage.getItem('userProfile');
        return user ? JSON.parse(user) : {
            id: 'user_123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+32 2 123 45 67',
            avatar: 'JD',
            tier: 'silver',
            points: 245,
            dateOfBirth: '1990-05-15',
            skinTone: 'medium-tan'
        };
    }

    loadOrders() {
        const orders = localStorage.getItem('userOrders');
        return orders ? JSON.parse(orders) : [
            {
                id: 'ORD-001',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                items: [1, 2],
                total: 63,
                status: 'delivered'
            },
            {
                id: 'ORD-002',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                items: [4, 6],
                total: 56,
                status: 'shipped'
            },
            {
                id: 'ORD-003',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                items: [7, 9],
                total: 41.99,
                status: 'processing'
            }
        ];
    }

    loadWishlist() {
        const wishlist = localStorage.getItem('userWishlist');
        return wishlist ? JSON.parse(wishlist) : [1, 3, 5, 8];
    }

    loadRecentlyViewed() {
        const viewed = localStorage.getItem('recentlyViewed');
        return viewed ? JSON.parse(viewed) : [2, 4, 6, 10];
    }

    loadPreferences() {
        const prefs = localStorage.getItem('userPreferences');
        return prefs ? JSON.parse(prefs) : {
            language: 'en',
            currency: 'EUR',
            darkMode: false,
            emailMarketing: true,
            emailNews: true,
            smsNotif: false,
            whatsappNotif: false,
            productRecs: true,
            restockNotif: true,
            priceAlert: true,
            reducedMotion: false,
            highContrast: false
        };
    }

    // ===== PROFILE RENDERING =====
    renderProfile() {
        document.getElementById('profileName').textContent = `${this.user.firstName} ${this.user.lastName}`;
        document.getElementById('profileEmail').textContent = this.user.email;
        document.getElementById('profileAvatar').textContent = this.user.avatar;
        document.getElementById('tierPoints').textContent = `${this.user.points} points`;

        // Update greeting
        const hour = new Date().getHours();
        let greeting = 'Good morning';
        if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
        if (hour >= 18) greeting = 'Good evening';
        document.getElementById('greetingTime').textContent = `${greeting}, ${this.user.firstName}`;

        // Fill profile form
        document.getElementById('firstName').value = this.user.firstName;
        document.getElementById('lastName').value = this.user.lastName;
        document.getElementById('email').value = this.user.email;
        document.getElementById('phone').value = this.user.phone || '';
        document.getElementById('dateOfBirth').value = this.user.dateOfBirth || '';
        document.getElementById('skinTone').value = this.user.skinTone || '';
    }

    // ===== OVERVIEW RENDERING =====
    renderOverview() {
        // KPI Cards
        document.getElementById('totalOrders').textContent = this.orders.length;
        document.getElementById('wishlistItems').textContent = this.wishlist.length;
        document.getElementById('rewardsPoints').textContent = this.user.points;
        document.getElementById('memberTier').textContent = this.user.tier.charAt(0).toUpperCase() + this.user.tier.slice(1);

        // Recent Orders
        this.renderRecentOrders();

        // Recent Reviews (mock data)
        this.renderRecentReviews();
    }

    renderRecentOrders() {
        const container = document.getElementById('recentOrders');
        const recentOrders = this.orders.slice(0, 3);

        let html = '';
        recentOrders.forEach(order => {
            const statusClass = `status-${order.status}`;
            html += `
                <div class="order-item-mini">
                    <div class="order-item-details">
                        <h4>${order.id}</h4>
                        <div class="order-item-meta">
                            <span>${order.date.toLocaleDateString()}</span>
                            <span>${order.items.length} items</span>
                        </div>
                    </div>
                    <div>
                        <span class="order-status-badge ${statusClass}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                        <div class="order-amount">€${order.total.toFixed(2)}</div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html || '<p>No orders yet.</p>';
    }

    renderRecentReviews() {
        const container = document.getElementById('recentReviews');
        const reviews = [
            {
                product: 'Pro Filt\'r Foundation',
                rating: 5,
                title: 'Perfect shade match!',
                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                text: 'Finally found my perfect shade. The coverage is amazing!'
            },
            {
                product: 'Black Opal Moisturizer',
                rating: 4,
                title: 'Great texture',
                date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                text: 'Love how this moisturizer feels on my skin.'
            }
        ];

        let html = '';
        reviews.forEach(review => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            html += `
                <div class="review-item">
                    <div class="review-header">
                        <h4 class="review-title">${review.product}</h4>
                        <span class="review-date">${review.date.toLocaleDateString()}</span>
                    </div>
                    <p class="review-rating">${stars} ${review.rating}/5</p>
                    <p class="review-text">${review.text}</p>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // ===== ORDERS RENDERING =====
    renderOrders() {
        const container = document.getElementById('ordersList');
        let html = '';

        this.orders.forEach(order => {
            const itemNames = order.items.map(id => ACCOUNT_PRODUCTS[id]?.name).join(', ');
            const statusClass = `status-${order.status}`;

            html += `
                <div class="order-card">
                    <div class="order-card-header">
                        <div>
                            <p class="order-card-id">${order.id}</p>
                            <p class="order-card-date">${order.date.toLocaleDateString()}</p>
                        </div>
                        <span class="order-status-badge ${statusClass}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </div>
                    <div class="order-card-items">
                        <p>${itemNames}</p>
                    </div>
                    <div class="order-card-total">
                        <span>Total:</span>
                        <span>€${order.total.toFixed(2)}</span>
                    </div>
                    <div class="order-card-actions">
                        <button onclick="viewOrder('${order.id}')">View Details</button>
                        <button onclick="trackOrder('${order.id}')">Track</button>
                        <button onclick="reorderItems('${order.id}')">Reorder</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html || '<p>No orders found.</p>';
    }

    // ===== WISHLIST RENDERING =====
    renderWishlist() {
        const container = document.getElementById('wishlistGrid');
        let html = '';
        let totalValue = 0;

        this.wishlist.forEach(productId => {
            const product = ACCOUNT_PRODUCTS[productId];
            if (product) {
                totalValue += product.price;
                html += `
                    <div class="wishlist-item">
                        <div class="product-image-placeholder">🛍️</div>
                        <div class="product-info">
                            <div class="product-brand">${product.brand}</div>
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">€${product.price}</div>
                        </div>
                        <div class="wishlist-actions">
                            <button class="wishlist-btn" onclick="addToCart(${productId})">Add to Cart</button>
                            <button class="quick-view-btn" onclick="removeFromWishlist(${productId})">Remove</button>
                        </div>
                    </div>
                `;
            }
        });

        document.getElementById('wishlistGrid').innerHTML = html || '<p>Your wishlist is empty.</p>';
        document.getElementById('wishlistTotal').textContent = `${this.wishlist.length} items`;
        document.getElementById('wishlistTotalValue').textContent = `€${totalValue.toFixed(2)} total value`;
    }

    // ===== RECENTLY VIEWED RENDERING =====
    renderRecentlyViewed() {
        const container = document.getElementById('recentlyViewedGrid');
        let html = '';

        this.recentlyViewed.forEach(productId => {
            const product = ACCOUNT_PRODUCTS[productId];
            if (product) {
                html += `
                    <div class="product-card">
                        <div class="product-image-placeholder">🛍️</div>
                        <div class="product-info">
                            <div class="product-brand">${product.brand}</div>
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">€${product.price}</div>
                        </div>
                    </div>
                `;
            }
        });

        container.innerHTML = html || '<p>No recently viewed items.</p>';
    }

    // ===== REWARDS RENDERING =====
    renderRewards() {
        const tierInfo = {
            bronze: { name: 'Bronze', multiplier: 1, nextThreshold: 200, benefits: ['Earn 1 point per €1', 'Birthday gift', 'Early access to sales'] },
            silver: { name: 'Silver', multiplier: 1.25, nextThreshold: 300, benefits: ['Earn 1.25 points per €1', 'Free standard shipping', 'Exclusive samples'] },
            gold: { name: 'Gold', multiplier: 1.5, nextThreshold: 500, benefits: ['Earn 1.5 points per €1', 'Free express shipping', 'Early access to launches'] },
            diamond: { name: 'Diamond', multiplier: 2, nextThreshold: 0, benefits: ['Earn 2 points per €1', 'Free same-day delivery', 'Personal beauty advisor'] }
        };

        const current = tierInfo[this.user.tier];
        document.getElementById('currentTierName').textContent = `${current.name} Member`;
        document.getElementById('currentTierDescription').textContent = `You're earning ${current.multiplier}x points on every purchase`;
        document.getElementById('tierProgressPoints').textContent = `${current.nextThreshold} points`;

        // Tier benefits
        let benefitsHtml = '';
        current.benefits.forEach(benefit => {
            benefitsHtml += `<li>${benefit}</li>`;
        });
        document.getElementById('tierBenefitsList').innerHTML = benefitsHtml;

        // Points display
        document.getElementById('totalPointsDisplay').textContent = this.user.points;
        document.getElementById('pointsValueEuro').textContent = `€${(this.user.points * 0.01).toFixed(2)}`;

        // Rewards catalog
        this.renderRewardsCatalog();
    }

    renderRewardsCatalog() {
        const rewards = [
            { icon: '💄', name: 'Free Shipping', cost: 50 },
            { icon: '🎁', name: 'Beauty Box Sample', cost: 100 },
            { icon: '🎟️', name: '€10 Discount', cost: 1000 },
            { icon: '👑', name: 'Premium Member Month', cost: 500 },
            { icon: '💎', name: 'Exclusive Product', cost: 1500 },
            { icon: '🎉', name: 'Birthday Surprise', cost: 200 }
        ];

        let html = '';
        rewards.forEach(reward => {
            const canRedeem = this.user.points >= reward.cost;
            html += `
                <div class="reward-item">
                    <div class="reward-icon">${reward.icon}</div>
                    <div class="reward-name">${reward.name}</div>
                    <div class="reward-cost">${reward.cost} pts</div>
                    <button class="reward-btn" ${!canRedeem ? 'disabled' : ''} onclick="redeemReward('${reward.name}', ${reward.cost})">
                        ${canRedeem ? 'Redeem' : 'Not Enough'}
                    </button>
                </div>
            `;
        });

        document.getElementById('rewardsCatalog').innerHTML = html;
    }

    // ===== REFERRALS RENDERING =====
    renderReferrals() {
        const referralCode = `REF${this.user.id.slice(-6).toUpperCase()}`;
        const referralLink = `${window.location.origin}/?ref=${referralCode}`;
        document.getElementById('referralLink').value = referralLink;

        // Mock referral data
        document.getElementById('friendsReferred').textContent = '3';
        document.getElementById('referralEarnings').textContent = '€30.00';
        document.getElementById('referralPending').textContent = '€15.00';

        // Referral history
        this.renderReferralHistory();
    }

    renderReferralHistory() {
        const history = [
            { friend: 'Sarah M.', date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), status: 'completed', earnings: '€15.00' },
            { friend: 'Ahmed L.', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), status: 'completed', earnings: '€15.00' },
            { friend: 'Emma K.', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), status: 'pending', earnings: 'Pending' }
        ];

        let html = `
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Friend</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Earnings</th>
                    </tr>
                </thead>
                <tbody>
        `;

        history.forEach(item => {
            const statusClass = `referral-status status-${item.status}`;
            html += `
                <tr>
                    <td>${item.friend}</td>
                    <td>${item.date.toLocaleDateString()}</td>
                    <td><span class="${statusClass}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
                    <td>${item.earnings}</td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        document.getElementById('referralHistoryTable').innerHTML = html;
    }

    // ===== SECTION NAVIGATION =====
    setupSectionNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.switchSection(section);
            });
        });
    }

    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.account-section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Show selected section
        const section = document.getElementById(sectionName);
        if (section) {
            section.classList.add('active');
        }

        // Mark nav item as active
        const navItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
    }

    // ===== RENDER ALL SECTIONS =====
    renderAllSections() {
        this.renderOrders();
        this.renderWishlist();
        this.renderRecentlyViewed();
        this.renderRewards();
        this.renderReferrals();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Profile Form
        document.getElementById('profileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to sign out?')) {
                localStorage.removeItem('userProfile');
                window.location.href = '/';
            }
        });

        // Quick Actions
        document.getElementById('continueShoppingBtn').addEventListener('click', () => {
            window.location.href = '/products.html';
        });

        document.getElementById('trackOrderBtn').addEventListener('click', () => {
            this.switchSection('orders');
        });

        document.getElementById('browseWishlistBtn').addEventListener('click', () => {
            this.switchSection('wishlist');
        });

        document.getElementById('contactSupportBtn').addEventListener('click', () => {
            this.switchSection('support');
        });

        // Wishlist Clear
        document.getElementById('clearWishlistBtn').addEventListener('click', () => {
            if (confirm('Clear your entire wishlist?')) {
                this.wishlist = [];
                localStorage.setItem('userWishlist', JSON.stringify(this.wishlist));
                this.renderWishlist();
            }
        });

        // Referral Copy
        document.getElementById('copyReferralBtn').addEventListener('click', () => {
            const input = document.getElementById('referralLink');
            input.select();
            document.execCommand('copy');
            alert('Referral link copied!');
        });

        // Share buttons
        document.getElementById('shareInstagram').addEventListener('click', () => {
            window.open('https://instagram.com/danhaysbeauty', '_blank');
        });

        document.getElementById('shareFacebook').addEventListener('click', () => {
            const text = 'Join me on DANHAYS - The Home of Melanin Beauty! Get €15 off with my referral link!';
            window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
        });

        document.getElementById('shareTwitter').addEventListener('click', () => {
            const text = 'Just discovered DANHAYS - The perfect beauty platform for melanin skin! Use my referral link for €15 off 🛍️';
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        });

        document.getElementById('shareEmail').addEventListener('click', () => {
            const subject = 'Join me on DANHAYS Beauty';
            const body = 'Check out DANHAYS - The Home of Melanin Beauty. Use my referral link for €15 off your first order!';
            window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
        });

        document.getElementById('shareWhatsapp').addEventListener('click', () => {
            const text = 'Hey! Check out DANHAYS - The perfect beauty platform for us! Use my referral link for €15 off 🛍️';
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        });

        // Preferences
        document.getElementById('savePreferencesBtn').addEventListener('click', () => {
            this.savePreferences();
        });

        // Buttons
        document.getElementById('addAddressBtn').addEventListener('click', () => {
            alert('Add Address form - Coming soon!');
        });

        document.getElementById('addPaymentBtn').addEventListener('click', () => {
            alert('Add Payment Method form - Coming soon!');
        });

        document.getElementById('createTicketBtn').addEventListener('click', () => {
            alert('Create Support Ticket form - Coming soon!');
        });

        document.getElementById('changePasswordBtn').addEventListener('click', () => {
            alert('Change Password form - Coming soon!');
        });

        document.getElementById('two-factorBtn').addEventListener('click', () => {
            alert('2FA Setup - Coming soon!');
        });
    }

    // ===== SAVE FUNCTIONS =====
    saveProfile() {
        this.user.firstName = document.getElementById('firstName').value;
        this.user.lastName = document.getElementById('lastName').value;
        this.user.email = document.getElementById('email').value;
        this.user.phone = document.getElementById('phone').value;
        this.user.dateOfBirth = document.getElementById('dateOfBirth').value;
        this.user.skinTone = document.getElementById('skinTone').value;

        localStorage.setItem('userProfile', JSON.stringify(this.user));
        this.renderProfile();
        alert('Profile updated successfully!');
    }

    savePreferences() {
        this.preferences.emailMarketing = document.getElementById('prefEmailMarketing').checked;
        this.preferences.emailNews = document.getElementById('prefEmailNews').checked;
        this.preferences.smsNotif = document.getElementById('prefSmsNotif').checked;
        this.preferences.whatsappNotif = document.getElementById('prefWhatsappNotif').checked;
        this.preferences.productRecs = document.getElementById('prefProductRecs').checked;
        this.preferences.restockNotif = document.getElementById('prefRestockNotif').checked;
        this.preferences.priceAlert = document.getElementById('prefPriceAlert').checked;
        this.preferences.language = document.getElementById('prefLanguage').value;
        this.preferences.currency = document.getElementById('prefCurrency').value;
        this.preferences.darkMode = document.getElementById('prefDarkMode').checked;
        this.preferences.reducedMotion = document.getElementById('prefReducedMotion').checked;
        this.preferences.highContrast = document.getElementById('prefHighContrast').checked;

        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
        alert('Preferences saved successfully!');
    }
}

// ===== GLOBAL HELPER FUNCTIONS =====
function viewOrder(orderId) {
    alert(`Viewing order: ${orderId}`);
}

function trackOrder(orderId) {
    alert(`Tracking order: ${orderId}`);
}

function reorderItems(orderId) {
    alert(`Reordering items from: ${orderId}`);
}

function addToCart(productId) {
    alert(`Added ${ACCOUNT_PRODUCTS[productId]?.name} to cart!`);
}

function removeFromWishlist(productId) {
    if (accountManager) {
        accountManager.wishlist = accountManager.wishlist.filter(id => id !== productId);
        localStorage.setItem('userWishlist', JSON.stringify(accountManager.wishlist));
        accountManager.renderWishlist();
    }
}

function redeemReward(rewardName, cost) {
    if (accountManager && accountManager.user.points >= cost) {
        accountManager.user.points -= cost;
        localStorage.setItem('userProfile', JSON.stringify(accountManager.user));
        accountManager.renderRewards();
        alert(`Reward "${rewardName}" redeemed successfully!`);
    }
}

// ===== INITIALIZATION =====
let accountManager;
document.addEventListener('DOMContentLoaded', () => {
    accountManager = new AccountManager();
});
