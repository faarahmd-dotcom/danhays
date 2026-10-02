/* ===================================
   SHOP PAGE JAVASCRIPT
   Version 3.0
   =================================== */

// ===== SAMPLE PRODUCTS DATA =====
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "Fenty Beauty Pro Filt'r Foundation",
        brand: "Fenty Beauty",
        price: 34.99,
        originalPrice: 34.99,
        image: "https://via.placeholder.com/300x300?text=Product+1",
        category: "face",
        rating: 4.8,
        reviews: 1250,
        inStock: true,
        badge: null,
        onSale: false
    },
    {
        id: 2,
        name: "Black Opal True Color Skin Perfector",
        brand: "Black Opal",
        price: 12.99,
        originalPrice: 12.99,
        image: "https://via.placeholder.com/300x300?text=Product+2",
        category: "face",
        rating: 4.6,
        reviews: 890,
        inStock: true,
        badge: "New",
        onSale: false
    },
    {
        id: 3,
        name: "MAC Fix+",
        brand: "MAC",
        price: 27.00,
        originalPrice: 27.00,
        image: "https://via.placeholder.com/300x300?text=Product+3",
        category: "face",
        rating: 4.7,
        reviews: 2100,
        inStock: true,
        badge: null,
        onSale: false
    },
    {
        id: 4,
        name: "NYX Born to Glow Liquid Highlighter",
        brand: "NYX",
        price: 8.99,
        originalPrice: 11.99,
        image: "https://via.placeholder.com/300x300?text=Product+4",
        category: "face",
        rating: 4.5,
        reviews: 650,
        inStock: true,
        badge: "Sale",
        onSale: true
    },
    {
        id: 5,
        name: "Beautyy Eyeshadow Palette",
        brand: "Beautyy",
        price: 22.99,
        originalPrice: 22.99,
        image: "https://via.placeholder.com/300x300?text=Product+5",
        category: "eyes",
        rating: 4.9,
        reviews: 1450,
        inStock: true,
        badge: "Best Seller",
        onSale: false
    },
    {
        id: 6,
        name: "Black Up Cosmetics Eye Kohl",
        brand: "Black Up",
        price: 15.99,
        originalPrice: 15.99,
        image: "https://via.placeholder.com/300x300?text=Product+6",
        category: "eyes",
        rating: 4.7,
        reviews: 520,
        inStock: true,
        badge: null,
        onSale: false
    },
    {
        id: 7,
        name: "Fenty Beauty Slip Shine Lipstick",
        brand: "Fenty Beauty",
        price: 21.99,
        originalPrice: 21.99,
        image: "https://via.placeholder.com/300x300?text=Product+7",
        category: "lips",
        rating: 4.8,
        reviews: 1890,
        inStock: true,
        badge: null,
        onSale: false
    },
    {
        id: 8,
        name: "MAC Lipstick",
        brand: "MAC",
        price: 19.50,
        originalPrice: 19.50,
        image: "https://via.placeholder.com/300x300?text=Product+8",
        category: "lips",
        rating: 4.6,
        reviews: 2230,
        inStock: true,
        badge: null,
        onSale: false
    },
    {
        id: 9,
        name: "Black Opal Facial Cleanser",
        brand: "Black Opal",
        price: 9.99,
        originalPrice: 9.99,
        image: "https://via.placeholder.com/300x300?text=Product+9",
        category: "skincare",
        rating: 4.4,
        reviews: 420,
        inStock: true,
        badge: null,
        onSale: false
    },
    {
        id: 10,
        name: "Fenty Skin Hydrating Serum",
        brand: "Fenty Beauty",
        price: 65.00,
        originalPrice: 65.00,
        image: "https://via.placeholder.com/300x300?text=Product+10",
        category: "skincare",
        rating: 4.9,
        reviews: 980,
        inStock: true,
        badge: "New",
        onSale: false
    },
    {
        id: 11,
        name: "Cantu Shea Butter Leave-In Conditioner",
        brand: "Cantu",
        price: 6.99,
        originalPrice: 6.99,
        image: "https://via.placeholder.com/300x300?text=Product+11",
        category: "haircare",
        rating: 4.7,
        reviews: 1650,
        inStock: true,
        badge: "Best Seller",
        onSale: false
    },
    {
        id: 12,
        name: "SheaMoisture Raw Shea Butter Restorative Shampoo",
        brand: "SheaMoisture",
        price: 10.99,
        originalPrice: 10.99,
        image: "https://via.placeholder.com/300x300?text=Product+12",
        category: "haircare",
        rating: 4.8,
        reviews: 2340,
        inStock: true,
        badge: null,
        onSale: false
    }
];

// ===== SHOP MANAGER CLASS =====
class ShopManager {
    constructor() {
        this.allProducts = [...SAMPLE_PRODUCTS];
        this.filteredProducts = [...SAMPLE_PRODUCTS];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filters = {
            categories: [],
            brands: [],
            ratings: [],
            special: [],
            minPrice: 0,
            maxPrice: 500
        };
        this.sortBy = 'popular';
        this.viewMode = 'grid-4';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCategory();
        this.applyFilters();
        this.render();
    }

    setupEventListeners() {
        // Category filters
        document.querySelectorAll('input[name="category"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleCategoryFilter(e));
        });

        // Brand filters
        document.querySelectorAll('input[name="brand"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleBrandFilter(e));
        });

        // Rating filters
        document.querySelectorAll('input[name="rating"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleRatingFilter(e));
        });

        // Special filters
        document.querySelectorAll('input[name="special"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleSpecialFilter(e));
        });

        // Price range
        document.getElementById('priceMin').addEventListener('input', (e) => {
            this.filters.minPrice = parseInt(e.target.value);
            this.applyFilters();
            this.updatePriceDisplay();
            this.render();
        });

        document.getElementById('priceMax').addEventListener('input', (e) => {
            this.filters.maxPrice = parseInt(e.target.value);
            this.applyFilters();
            this.updatePriceDisplay();
            this.render();
        });

        // Clear filters
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });

        // Sort
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applySort();
            this.render();
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.view-btn').classList.add('active');
                this.viewMode = e.target.closest('.view-btn').dataset.view;
                this.updateViewMode();
            });
        });
    }

    loadCategory() {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');

        if (category) {
            const checkbox = document.querySelector(`input[name="category"][value="${category}"]`);
            if (checkbox) {
                checkbox.checked = true;
                this.filters.categories = [category];
            }

            // Update page title
            const categoryNames = {
                'face': 'Face',
                'eyes': 'Eyes',
                'lips': 'Lips',
                'skincare': 'Skincare',
                'haircare': 'Haircare',
                'bodycare': 'Bodycare'
            };

            document.getElementById('pageTitle').textContent = `Shop ${categoryNames[category] || 'Products'}`;
            document.getElementById('breadcrumbCategory').textContent = categoryNames[category] || 'All Products';
        }
    }

    handleCategoryFilter(e) {
        if (e.target.checked) {
            this.filters.categories.push(e.target.value);
        } else {
            this.filters.categories = this.filters.categories.filter(c => c !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    handleBrandFilter(e) {
        if (e.target.checked) {
            this.filters.brands.push(e.target.value);
        } else {
            this.filters.brands = this.filters.brands.filter(b => b !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    handleRatingFilter(e) {
        if (e.target.checked) {
            this.filters.ratings.push(parseInt(e.target.value));
        } else {
            this.filters.ratings = this.filters.ratings.filter(r => r !== parseInt(e.target.value));
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    handleSpecialFilter(e) {
        if (e.target.checked) {
            this.filters.special.push(e.target.value);
        } else {
            this.filters.special = this.filters.special.filter(s => s !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    applyFilters() {
        this.filteredProducts = this.allProducts.filter(product => {
            // Category filter
            if (this.filters.categories.length > 0 && !this.filters.categories.includes(product.category)) {
                return false;
            }

            // Brand filter
            if (this.filters.brands.length > 0 && !this.filters.brands.includes(product.brand.toLowerCase().replace(/\s+/g, '-'))) {
                return false;
            }

            // Price filter
            if (product.price < this.filters.minPrice || product.price > this.filters.maxPrice) {
                return false;
            }

            // Rating filter
            if (this.filters.ratings.length > 0) {
                const meetsRating = this.filters.ratings.some(minRating => product.rating >= minRating);
                if (!meetsRating) return false;
            }

            // Special filter
            if (this.filters.special.length > 0) {
                const hasSpecial = this.filters.special.some(special => {
                    if (special === 'sale' && product.onSale) return true;
                    if (special === 'new' && product.badge === 'New') return true;
                    if (special === 'bestseller' && product.badge === 'Best Seller') return true;
                    return false;
                });
                if (!hasSpecial) return false;
            }

            return true;
        });

        this.applySort();
    }

    applySort() {
        switch (this.sortBy) {
            case 'newest':
                // Simulate by reversing
                this.filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
            default:
                this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
        }
    }

    updatePriceDisplay() {
        document.getElementById('minPrice').textContent = `€${this.filters.minPrice}`;
        document.getElementById('maxPrice').textContent = `€${this.filters.maxPrice}`;
    }

    clearAllFilters() {
        this.filters = {
            categories: [],
            brands: [],
            ratings: [],
            special: [],
            minPrice: 0,
            maxPrice: 500
        };
        this.sortBy = 'popular';

        // Uncheck all inputs
        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });

        // Reset sliders
        document.getElementById('priceMin').value = 0;
        document.getElementById('priceMax').value = 500;
        this.updatePriceDisplay();

        this.currentPage = 1;
        this.applyFilters();
        this.render();
        this.showNotification('Filters cleared');
    }

    updateViewMode() {
        const grid = document.getElementById('productsGrid');
        grid.classList.remove('grid-3', 'grid-4');
        grid.classList.add(this.viewMode);
    }

    render() {
        this.renderProducts();
        this.renderPagination();
        this.updateResultCount();
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedProducts = this.filteredProducts.slice(start, end);

        if (paginatedProducts.length === 0) {
            grid.innerHTML = '<div class="loading-skeleton" style="grid-column: 1 / -1;"><p>No products found. Try adjusting your filters.</p></div>';
            return;
        }

        grid.innerHTML = paginatedProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <p class="product-brand">${product.brand}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">★★★★★</span>
                        <span class="count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current">€${product.price.toFixed(2)}</span>
                        ${product.onSale ? `<span class="original">€${product.originalPrice.toFixed(2)}</span>` : ''}
                        ${product.onSale ? `<span class="discount">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button onclick="window.cart.addItem({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image}', quantity: 1})">Add to Cart</button>
                        <button onclick="window.wishlist.addItem({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image}'})">♡</button>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateViewMode();
    }

    renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '';

        // Previous button
        if (this.currentPage > 1) {
            html += `<button onclick="shop.goToPage(${this.currentPage - 1})">← Previous</button>`;
        } else {
            html += `<button disabled class="disabled">← Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                html += `<button class="active">${i}</button>`;
            } else if (i <= 3 || i >= totalPages - 2 || Math.abs(i - this.currentPage) <= 1) {
                html += `<button onclick="shop.goToPage(${i})">${i}</button>`;
            } else if (i === 4 || i === totalPages - 3) {
                html += `<span>...</span>`;
            }
        }

        // Next button
        if (this.currentPage < totalPages) {
            html += `<button onclick="shop.goToPage(${this.currentPage + 1})">Next →</button>`;
        } else {
            html += `<button disabled class="disabled">Next →</button>`;
        }

        paginationContainer.innerHTML = html;
    }

    updateResultCount() {
        const count = this.filteredProducts.length;
        const text = count === 1 ? 'Showing 1 product' : `Showing ${count} products`;
        document.getElementById('resultCount').textContent = text;
    }

    goToPage(page) {
        this.currentPage = page;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showNotification(message) {
        NotificationManager.info(message);
    }
}

// ===== INITIALIZATION =====
let shop;
document.addEventListener('DOMContentLoaded', () => {
    shop = new ShopManager();
    PreloaderManager.hide();
});
