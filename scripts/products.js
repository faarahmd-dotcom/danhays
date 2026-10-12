/* ===================================
   PRODUCTS LISTING PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== SAMPLE PRODUCTS DATA =====
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: 'Pro Filt\'r Foundation',
        brand: 'Fenty Beauty',
        brandId: 1,
        price: 35,
        originalPrice: 35,
        rating: 4.9,
        reviews: 2100,
        category: 'makeup',
        image: '🎨',
        description: 'Full-coverage foundation with 40+ inclusive shades',
        badge: null,
        stock: 150,
        isNew: false,
        onSale: false
    },
    {
        id: 2,
        name: 'Black Opal Moisturizer',
        brand: 'Black Opal',
        brandId: 2,
        price: 28,
        originalPrice: 28,
        rating: 4.7,
        reviews: 890,
        category: 'skincare',
        image: '✨',
        description: 'Premium moisturizer for melanin-rich skin',
        badge: null,
        stock: 200,
        isNew: true,
        onSale: false
    },
    {
        id: 3,
        name: 'Raw Shea Butter Shampoo',
        brand: 'SheaMoisture',
        brandId: 3,
        price: 12,
        originalPrice: 12,
        rating: 4.8,
        reviews: 3200,
        category: 'haircare',
        image: '🌿',
        description: 'Restorative shampoo with raw shea butter',
        badge: 'new',
        stock: 300,
        isNew: true,
        onSale: false
    },
    {
        id: 4,
        name: 'Pro Glow Highlighter',
        brand: 'Fenty Beauty',
        brandId: 1,
        price: 30,
        originalPrice: 30,
        rating: 4.9,
        reviews: 2500,
        category: 'makeup',
        image: '🎨',
        description: 'Stunning highlighter in multiple shades',
        badge: null,
        stock: 120,
        isNew: false,
        onSale: true
    },
    {
        id: 5,
        name: 'Coconut & Hibiscus Curl Cream',
        brand: 'SheaMoisture',
        brandId: 3,
        price: 14,
        originalPrice: 18,
        rating: 4.7,
        reviews: 2800,
        category: 'haircare',
        image: '🌿',
        description: 'Curl-enhancing smoothie for defined curls',
        badge: 'sale',
        stock: 180,
        isNew: false,
        onSale: true
    },
    {
        id: 6,
        name: 'Gloss Bomb Liquid Lipstick',
        brand: 'Fenty Beauty',
        brandId: 1,
        price: 26,
        originalPrice: 26,
        rating: 4.6,
        reviews: 1600,
        category: 'makeup',
        image: '🎨',
        description: 'Long-lasting liquid lipstick with glossy finish',
        badge: null,
        stock: 250,
        isNew: false,
        onSale: false
    },
    {
        id: 7,
        name: 'Black Opal Night Treatment',
        brand: 'Black Opal',
        brandId: 2,
        price: 35,
        originalPrice: 35,
        rating: 4.6,
        reviews: 650,
        category: 'skincare',
        image: '✨',
        description: 'Intensive nighttime treatment serum',
        badge: null,
        stock: 90,
        isNew: true,
        onSale: false
    },
    {
        id: 8,
        name: 'NYX Lip Gloss',
        brand: 'NYX Professional Makeup',
        brandId: 4,
        price: 8,
        originalPrice: 8,
        rating: 4.5,
        reviews: 1200,
        category: 'makeup',
        image: '💄',
        description: 'Professional-quality lip gloss in 20+ shades',
        badge: 'new',
        stock: 500,
        isNew: true,
        onSale: false
    },
    {
        id: 9,
        name: 'Cantu Shea Butter Leave-In',
        brand: 'Cantu',
        brandId: 5,
        price: 6.99,
        originalPrice: 6.99,
        rating: 4.8,
        reviews: 2200,
        category: 'haircare',
        image: '🧴',
        description: 'Lightweight leave-in conditioner for all curls',
        badge: null,
        stock: 400,
        isNew: false,
        onSale: false
    },
    {
        id: 10,
        name: 'MAC Fix+',
        brand: 'MAC',
        brandId: 6,
        price: 22,
        originalPrice: 22,
        rating: 4.7,
        reviews: 1800,
        category: 'makeup',
        image: '🎭',
        description: 'Professional makeup fixing spray',
        badge: null,
        stock: 200,
        isNew: false,
        onSale: false
    },
    {
        id: 11,
        name: 'Powder Me Loose Powder',
        brand: 'Fenty Beauty',
        brandId: 1,
        price: 32,
        originalPrice: 32,
        rating: 4.7,
        reviews: 1800,
        category: 'makeup',
        image: '🎨',
        description: 'Lightweight translucent loose powder',
        badge: null,
        stock: 160,
        isNew: false,
        onSale: false
    },
    {
        id: 12,
        name: 'Black Opal Body Oil',
        brand: 'Black Opal',
        brandId: 2,
        price: 18,
        originalPrice: 18,
        rating: 4.7,
        reviews: 740,
        category: 'skincare',
        image: '✨',
        description: 'Luxurious body oil for silky smooth skin',
        badge: null,
        stock: 220,
        isNew: false,
        onSale: false
    }
];

// ===== PRODUCTS PAGE MANAGER CLASS =====
class ProductsPageManager {
    constructor() {
        this.allProducts = [...SAMPLE_PRODUCTS];
        this.filteredProducts = [...SAMPLE_PRODUCTS];
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.filters = {
            search: '',
            brand: [],
            category: [],
            price: { min: 0, max: 500 },
            rating: [],
            availability: []
        };
        this.sortBy = 'popular';
        this.viewMode = 'grid-3';

        this.init();
    }

    init() {
        this.populateBrandFilters();
        this.setupEventListeners();
        this.applyFilters();
        this.renderTrending();
        this.render();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    populateBrandFilters() {
        const brands = [...new Set(this.allProducts.map(p => p.brand))];
        const brandFilterContainer = document.getElementById('brandFilterOptions');
        
        brandFilterContainer.innerHTML = brands.map(brand => `
            <label class="filter-option">
                <input type="checkbox" name="brand" value="${brand}">
                <span>${brand}</span>
            </label>
        `).join('');

        // Add event listeners to newly created brand checkboxes
        document.querySelectorAll('input[name="brand"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleBrandFilter(e));
        });
    }

    setupEventListeners() {
        // Search input
        document.getElementById('searchInput').addEventListener('keyup', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.applyFilters();
            this.render();
        });

        // Category filters
        document.querySelectorAll('input[name="category"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleCategoryFilter(e));
        });

        // Price range filters
        document.getElementById('priceMin').addEventListener('change', (e) => {
            this.filters.price.min = parseInt(e.target.value);
            document.getElementById('minPriceDisplay').textContent = this.filters.price.min;
            this.currentPage = 1;
            this.applyFilters();
            this.render();
        });

        document.getElementById('priceMax').addEventListener('change', (e) => {
            this.filters.price.max = parseInt(e.target.value);
            document.getElementById('maxPriceDisplay').textContent = this.filters.price.max;
            this.currentPage = 1;
            this.applyFilters();
            this.render();
        });

        // Rating filters
        document.querySelectorAll('input[name="rating"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleRatingFilter(e));
        });

        // Availability filters
        document.querySelectorAll('input[name="availability"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleAvailabilityFilter(e));
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
                e.target.classList.add('active');
                this.viewMode = e.target.dataset.view;
                this.updateViewMode();
            });
        });

        // Clear filters
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });
    }

    handleBrandFilter(e) {
        if (e.target.checked) {
            this.filters.brand.push(e.target.value);
        } else {
            this.filters.brand = this.filters.brand.filter(b => b !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    handleCategoryFilter(e) {
        if (e.target.checked) {
            this.filters.category.push(e.target.value);
        } else {
            this.filters.category = this.filters.category.filter(c => c !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    handleRatingFilter(e) {
        if (e.target.checked) {
            this.filters.rating.push(parseFloat(e.target.value));
        } else {
            this.filters.rating = this.filters.rating.filter(r => r !== parseFloat(e.target.value));
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    handleAvailabilityFilter(e) {
        if (e.target.checked) {
            this.filters.availability.push(e.target.value);
        } else {
            this.filters.availability = this.filters.availability.filter(a => a !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    applyFilters() {
        this.filteredProducts = this.allProducts.filter(product => {
            // Search filter
            if (this.filters.search) {
                const searchMatch = product.name.toLowerCase().includes(this.filters.search) ||
                                  product.brand.toLowerCase().includes(this.filters.search);
                if (!searchMatch) return false;
            }

            // Brand filter
            if (this.filters.brand.length > 0) {
                if (!this.filters.brand.includes(product.brand)) return false;
            }

            // Category filter
            if (this.filters.category.length > 0) {
                if (!this.filters.category.includes(product.category)) return false;
            }

            // Price filter
            if (product.price < this.filters.price.min || product.price > this.filters.price.max) {
                return false;
            }

            // Rating filter
            if (this.filters.rating.length > 0) {
                const matches = this.filters.rating.some(rating => product.rating >= rating);
                if (!matches) return false;
            }

            // Availability filter
            if (this.filters.availability.length > 0) {
                const availabilityMatch = this.filters.availability.some(availability => {
                    switch(availability) {
                        case 'in-stock':
                            return product.stock > 0;
                        case 'on-sale':
                            return product.onSale;
                        case 'new':
                            return product.isNew;
                        default:
                            return true;
                    }
                });
                if (!availabilityMatch) return false;
            }

            return true;
        });

        this.applySort();
    }

    applySort() {
        switch (this.sortBy) {
            case 'newest':
                this.filteredProducts.sort((a, b) => b.isNew - a.isNew);
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
            case 'best-sellers':
                this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'popular':
            default:
                this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
        }
    }

    clearAllFilters() {
        this.filters = {
            search: '',
            brand: [],
            category: [],
            price: { min: 0, max: 500 },
            rating: [],
            availability: []
        };
        this.sortBy = 'popular';

        document.getElementById('searchInput').value = '';
        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        document.getElementById('priceMin').value = 0;
        document.getElementById('priceMax').value = 500;
        document.getElementById('minPriceDisplay').textContent = '0';
        document.getElementById('maxPriceDisplay').textContent = '500';

        this.currentPage = 1;
        this.applyFilters();
        this.render();
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.success('Filters cleared');
        }
    }

    updateViewMode() {
        const grid = document.getElementById('productsGrid');
        grid.classList.remove('grid-2', 'grid-3', 'list');
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
            <div class="product-item" onclick="window.location.href='product-detail.html?id=${product.id}'">
                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge.toUpperCase()}</div>` : ''}
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <span class="product-rating-stars">${'⭐'.repeat(Math.round(product.rating))}</span>
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price-section">
                        <div class="product-price">€${product.price}</div>
                        ${product.originalPrice !== product.price ? `<div class="product-price-original">€${product.originalPrice}</div>` : ''}
                        ${product.onSale ? `<div class="product-discount">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</div>` : ''}
                        <div class="product-stock ${product.stock < 10 ? 'low' : ''}">
                            ${product.stock > 0 ? (product.stock < 10 ? 'Only ' + product.stock + ' left!' : 'In Stock') : 'Out of Stock'}
                        </div>
                    </div>
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                    <button onclick="toggleWishlist(${product.id})">♡</button>
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

        if (this.currentPage > 1) {
            html += `<button onclick="products.goToPage(${this.currentPage - 1})">← Previous</button>`;
        } else {
            html += `<button disabled class="disabled">← Previous</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                html += `<button class="active">${i}</button>`;
            } else if (i <= 3 || i >= totalPages - 2 || Math.abs(i - this.currentPage) <= 1) {
                html += `<button onclick="products.goToPage(${i})">${i}</button>`;
            } else if (i === 4 || i === totalPages - 3) {
                html += `<span>...</span>`;
            }
        }

        if (this.currentPage < totalPages) {
            html += `<button onclick="products.goToPage(${this.currentPage + 1})">Next →</button>`;
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

    renderTrending() {
        const carousel = document.getElementById('trendingGrid');
        const trendingProducts = this.allProducts
            .sort((a, b) => b.reviews - a.reviews)
            .slice(0, 4);

        carousel.innerHTML = trendingProducts.map(product => `
            <div class="trending-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="trending-image">${product.image}</div>
                <div class="trending-content">
                    <div class="trending-title">${product.name}</div>
                    <div class="trending-price">€${product.price}</div>
                </div>
            </div>
        `).join('');
    }
}

// ===== HELPER FUNCTIONS =====
function addToCart(productId) {
    if (typeof NotificationManager !== 'undefined') {
        NotificationManager.success('Added to cart!');
    } else {
        alert('Added to cart!');
    }
}

function toggleWishlist(productId) {
    if (typeof NotificationManager !== 'undefined') {
        NotificationManager.success('Added to wishlist!');
    } else {
        alert('Added to wishlist!');
    }
}

// ===== INITIALIZATION =====
let products;
document.addEventListener('DOMContentLoaded', () => {
    products = new ProductsPageManager();
});
