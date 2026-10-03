/* ===================================
   ADMIN DASHBOARD JAVASCRIPT
   Version 1.0
   =================================== */

// ===== ADMIN DATA =====
const ADMIN_PRODUCTS = [
    { id: 1, name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', category: 'face', price: 35, stock: 150, rating: 4.8, sales: 2345 },
    { id: 2, name: 'Black Opal Moisturizer', brand: 'Black Opal', category: 'face', price: 28, stock: 89, rating: 4.6, sales: 1200 },
    { id: 3, name: 'Raw Shea Butter Shampoo', brand: 'SheaMoisture', category: 'haircare', price: 12, stock: 200, rating: 4.7, sales: 1890 },
    { id: 4, name: 'Pro Glow Highlighter', brand: 'Fenty Beauty', category: 'face', price: 30, stock: 120, rating: 4.7, sales: 892 },
    { id: 5, name: 'Coconut & Hibiscus Curl Cream', brand: 'SheaMoisture', category: 'haircare', price: 14, stock: 175, rating: 4.5, sales: 756 },
];

const ADMIN_ORDERS = [
    { id: 'ORD-001', customer: 'Zainab M.', amount: 125.50, status: 'delivered', items: 3, date: '2026-01-10' },
    { id: 'ORD-002', customer: 'Amara K.', amount: 87.30, status: 'shipped', items: 2, date: '2026-01-11' },
    { id: 'ORD-003', customer: 'Tasha L.', amount: 156.80, status: 'processing', items: 4, date: '2026-01-12' },
    { id: 'ORD-004', customer: 'Sarah M.', amount: 92.15, status: 'pending', items: 2, date: '2026-01-13' },
];

const ADMIN_USERS = [
    { id: 1, name: 'Zainab M.', email: 'zainab@example.com', tier: 'gold', orders: 12, spent: 1250, joined: '2025-06-15' },
    { id: 2, name: 'Amara K.', email: 'amara@example.com', tier: 'silver', orders: 8, spent: 820, joined: '2025-07-20' },
    { id: 3, name: 'Tasha L.', email: 'tasha@example.com', tier: 'diamond', orders: 25, spent: 2850, joined: '2025-03-10' },
];

const ADMIN_CATEGORIES = [
    { name: 'Face', icon: '💄', products: 650, subcategories: 9, status: 'active' },
    { name: 'Eyes', icon: '👁️', products: 520, subcategories: 7, status: 'active' },
    { name: 'Lips', icon: '💋', products: 480, subcategories: 6, status: 'active' },
    { name: 'Skincare', icon: '✨', products: 420, subcategories: 8, status: 'active' },
    { name: 'Haircare', icon: '💇', products: 280, subcategories: 6, status: 'active' },
];

// ===== ADMIN MANAGER =====
class AdminManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboard();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const page = link.getAttribute('data-page');
                if (page) {
                    e.preventDefault();
                    this.switchPage(page);
                }
            });
        });

        // Sidebar toggle (mobile)
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                const sidebar = document.getElementById('adminSidebar');
                sidebar.classList.toggle('open');
            });
        }

        // Menu toggle (mobile)
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                const sidebar = document.getElementById('adminSidebar');
                sidebar.classList.toggle('open');
            });
        }

        // Notification button
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', () => {
                notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
            });

            document.addEventListener('click', (e) => {
                if (!notificationBtn.contains(e.target) && !notificationPanel.contains(e.target)) {
                    notificationPanel.style.display = 'none';
                }
            });
        }

        // Profile menu
        const profileBtn = document.getElementById('profileBtn');
        const profileMenu = document.getElementById('profileMenu');
        if (profileBtn && profileMenu) {
            profileBtn.addEventListener('click', () => {
                profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
            });

            document.addEventListener('click', (e) => {
                if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                    profileMenu.style.display = 'none';
                }
            });
        }

        // Logout buttons
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        document.getElementById('logoutMenuBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Add buttons
        if (document.getElementById('addProductBtn')) {
            document.getElementById('addProductBtn').addEventListener('click', () => {
                alert('Add product form - Coming soon!');
            });
        }

        if (document.getElementById('addUserBtn')) {
            document.getElementById('addUserBtn').addEventListener('click', () => {
                alert('Add user form - Coming soon!');
            });
        }

        if (document.getElementById('addBrandBtn')) {
            document.getElementById('addBrandBtn').addEventListener('click', () => {
                alert('Add brand form - Coming soon!');
            });
        }

        if (document.getElementById('addCategoryBtn')) {
            document.getElementById('addCategoryBtn').addEventListener('click', () => {
                alert('Add category form - Coming soon!');
            });
        }

        // Modal close
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                document.getElementById('editModal').style.display = 'none';
            });
        }

        // Search
        const adminSearch = document.getElementById('adminSearch');
        if (adminSearch) {
            adminSearch.addEventListener('input', () => {
                // Search functionality
            });
        }
    }

    switchPage(page) {
        // Hide all pages
        document.querySelectorAll('.admin-page').forEach(p => {
            p.classList.remove('active');
        });

        // Remove active from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected page
        const pageElement = document.getElementById(page + 'Page');
        if (pageElement) {
            pageElement.classList.add('active');
        }

        // Mark nav link as active
        const navLink = document.querySelector(`[data-page="${page}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }

        // Update breadcrumb
        const pageNames = {
            'dashboard': 'Dashboard',
            'products': 'Products',
            'orders': 'Orders',
            'users': 'Users',
            'brands': 'Brands',
            'categories': 'Categories',
            'settings': 'Settings'
        };

        document.getElementById('breadcrumb').textContent = pageNames[page] || page;

        // Load page content
        if (page === 'dashboard') {
            this.loadDashboard();
        } else if (page === 'products') {
            this.loadProducts();
        } else if (page === 'orders') {
            this.loadOrders();
        } else if (page === 'users') {
            this.loadUsers();
        } else if (page === 'categories') {
            this.loadCategories();
        }

        this.currentPage = page;
    }

    loadDashboard() {
        // Update KPI cards
        document.getElementById('totalOrdersKPI').textContent = ADMIN_ORDERS.length;
        document.getElementById('totalUsersKPI').textContent = ADMIN_USERS.length;
        document.getElementById('productBadge').textContent = ADMIN_PRODUCTS.length;
        document.getElementById('orderBadge').textContent = ADMIN_ORDERS.length;
        document.getElementById('userBadge').textContent = ADMIN_USERS.length;

        // Load recent orders
        this.loadRecentOrders();

        // Load top products
        this.loadTopProducts();
    }

    loadRecentOrders() {
        const table = document.getElementById('recentOrdersTable');
        let html = '';

        ADMIN_ORDERS.slice(0, 5).forEach(order => {
            const statusClass = `status-${order.status}`;
            html += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>€${order.amount}</td>
                    <td><span class="status-badge ${statusClass}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                    <td>${order.date}</td>
                    <td><button class="btn btn-sm btn-outline">View</button></td>
                </tr>
            `;
        });

        table.innerHTML = html;
    }

    loadTopProducts() {
        const table = document.getElementById('topProductsTable');
        let html = '';

        ADMIN_PRODUCTS.slice(0, 5).forEach(product => {
            html += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.brand}</td>
                    <td>${product.sales}</td>
                    <td>€${(product.price * product.sales).toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td><button class="btn btn-sm btn-outline">Edit</button></td>
                </tr>
            `;
        });

        table.innerHTML = html;
    }

    loadProducts() {
        const table = document.getElementById('productsTable');
        let html = '';

        ADMIN_PRODUCTS.forEach(product => {
            const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
            html += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.brand}</td>
                    <td>${product.category}</td>
                    <td>€${product.price}</td>
                    <td>${product.stock}
                                        <td>${product.stock}</td>
                    <td>${stars}</td>
                    <td>
                        <button class="btn btn-sm btn-outline" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-sm btn-outline" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `;
        });

        table.innerHTML = html;
    }

    loadOrders() {
        const table = document.getElementById('ordersTable');
        let html = '';

        ADMIN_ORDERS.forEach(order => {
            const statusClass = `status-${order.status}`;
            html += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>€${order.amount.toFixed(2)}</td>
                    <td><span class="status-badge ${statusClass}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                    <td>${order.items}</td>
                    <td>${order.date}</td>
                    <td>
                        <button class="btn btn-sm btn-outline" onclick="viewOrder('${order.id}')">View</button>
                        <button class="btn btn-sm btn-outline" onclick="updateOrderStatus('${order.id}')">Update</button>
                    </td>
                </tr>
            `;
        });

        table.innerHTML = html;
    }

    loadUsers() {
        const table = document.getElementById('usersTable');
        let html = '';

        ADMIN_USERS.forEach(user => {
            html += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><span class="status-badge status-${user.tier.toLowerCase()}">${user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}</span></td>
                    <td>${user.orders}</td>
                    <td>€${user.spent.toFixed(2)}</td>
                    <td>${user.joined}</td>
                    <td>
                        <button class="btn btn-sm btn-outline" onclick="viewUser(${user.id})">View</button>
                        <button class="btn btn-sm btn-outline" onclick="editUser(${user.id})">Edit</button>
                    </td>
                </tr>
            `;
        });

        table.innerHTML = html;
    }

    loadCategories() {
        const table = document.getElementById('categoriesTable');
        let html = '';

        ADMIN_CATEGORIES.forEach(category => {
            html += `
                <tr>
                    <td>${category.name}</td>
                    <td>${category.icon}</td>
                    <td>${category.products}</td>
                    <td>${category.subcategories}</td>
                    <td><span class="status-badge status-${category.status.toLowerCase()}">${category.status.charAt(0).toUpperCase() + category.status.slice(1)}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline" onclick="editCategory('${category.name}')">Edit</button>
                        <button class="btn btn-sm btn-outline" onclick="deleteCategory('${category.name}')">Delete</button>
                    </td>
                </tr>
            `;
        });

        table.innerHTML = html;
    }

    handleLogout() {
        localStorage.removeItem('userProfile');
        alert('Logged out successfully!');
        window.location.href = '/login.html';
    }
}

// ===== HELPER FUNCTIONS =====
function editProduct(productId) {
    alert(`Edit product ${productId}`);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        alert(`Product ${productId} deleted`);
    }
}

function viewOrder(orderId) {
    alert(`View order ${orderId}`);
}

function updateOrderStatus(orderId) {
    alert(`Update status for ${orderId}`);
}

function viewUser(userId) {
    alert(`View user ${userId}`);
}

function editUser(userId) {
    alert(`Edit user ${userId}`);
}

function editCategory(categoryName) {
    alert(`Edit category ${categoryName}`);
}

function deleteCategory(categoryName) {
    if (confirm('Are you sure you want to delete this category?')) {
        alert(`Category ${categoryName} deleted`);
    }
}

// ===== INITIALIZATION =====
let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (!user.id || user.role !== 'admin') {
        alert('Unauthorized access. Redirecting to login.');
        window.location.href = '/login.html';
        return;
    }

    adminManager = new AdminManager();
});
