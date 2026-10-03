/* ===================================
   SEARCH PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== SEARCH DATA =====
const ALL_PRODUCTS = [
    { id: 1, name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', price: 35, rating: 4.8, reviews: 2345, category: 'face', type: 'product', icon: '💄', description: 'Full coverage foundation with 40+ shades' },
    { id: 2, name: 'Black Opal Moisturizer', brand: 'Black Opal', price: 28, rating: 4.6, reviews: 1200, category: 'face', type: 'product', icon: '✨', description: 'Nourishing moisturizer for all skin types' },
    { id: 3, name: 'Raw Shea Butter Shampoo', brand: 'SheaMoisture', price: 12, rating: 4.7, reviews: 1890, category: 'haircare', type: 'product', icon: '💇', description: 'Cleansing shampoo with natural shea butter' },
    { id: 4, name: 'Pro Glow Highlighter', brand: 'Fenty Beauty', price: 30, rating: 4.7, reviews: 892, category: 'face', type: 'product', icon: '💄', description: 'Luminous highlighter for radiant glow' },
    { id: 5, name: 'Coconut & Hibiscus Curl Cream', brand: 'SheaMoisture', price: 14, rating: 4.5, reviews: 756, category: 'haircare', type: 'product', icon: '💇', description: 'Curl-defining cream with coconut oil' },
    { id: 6, name: 'Gloss Bomb Liquid Lipstick', brand: 'Fenty Beauty', price: 26, rating: 4.6, reviews: 2134, category: 'lips', type: 'product', icon: '💋', description: 'High-shine liquid lipstick in multiple shades' },
    { id: 7, name: 'Black Opal Night Treatment', brand: 'Black Opal', price: 35, rating: 4.7, reviews: 1023, category: 'face', type: 'product', icon: '✨', description: 'Night cream for deep moisturization' },
    { id: 8, name: 'NYX Lip Gloss', brand: 'NYX Professional Makeup', price: 8, rating: 4.3, reviews: 567, category: 'lips', type: 'product', icon: '💋', description: 'Ultra-glossy lip gloss with long wear' },
    { id: 9, name: 'Cantu Shea Butter Leave-In', brand: 'Cantu', price: 6.99, rating: 4.5, reviews: 1345, category: 'haircare', type: 'product', icon: '💇', description: 'Leave-in conditioner for curl maintenance' },
    { id: 10, name: 'MAC Fix+', brand: 'MAC', price: 22, rating: 4.6, reviews: 2456, category: 'face', type: 'product', icon: '💄', description: 'Setting spray for long-lasting makeup' }
];

const ALL_BRANDS = [
    { id: 'b1', name: 'Fenty Beauty', type: 'brand', icon: '👑', description: 'Luxury beauty brand by Rihanna with 40+ foundation shades', productCount: 145 },
    { id: 'b2', name: 'SheaMoisture', type: 'brand', icon: '🌿', description: 'Natural haircare and skincare for textured hair', productCount: 89 },
    { id: 'b3', name: 'Black Opal', type: 'brand', icon: '💎', description: 'Skincare brand specifically formulated for melanin-rich skin', productCount: 56 },
    { id: 'b4', name: 'MAC', type: 'brand', icon: '💄', description: 'Professional makeup brand with extensive shade range', productCount: 234 },
    { id: 'b5', name: 'NYX Professional Makeup', type: 'brand', icon: '✨', description: 'Affordable professional makeup for all skin tones', productCount: 178 },
    { id: 'b6', name: 'Cantu', type: 'brand', icon: '🌿', description: 'Curly hair care brand with natural ingredients', productCount: 67 }
];

const ALL_CATEGORIES = [
    { id: 'c1', name: 'Face', type: 'category', icon: '💄', description: 'Foundation, concealer, blush & more' },
    { id: 'c2', name: 'Eyes', type: 'category', icon: '👁️', description: 'Eyeshadow, mascara, eyeliner & brows' },
    { id: 'c3', name: 'Lips', type: 'category', icon: '💋', description: 'Lipstick, lip gloss & lip liner' },
    { id: 'c4', name: 'Skincare', type: 'category', icon: '✨', description: 'Cleansers, moisturizers, serums & masks' },
    { id: 'c5', name: 'Haircare', type: 'category', icon: '💇', description: 'Shampoo, conditioner & styling products' }
];

// ===== SEARCH MANAGER =====
class SearchManager {
    constructor() {
        this.searchQuery = this.getSearchQuery();
        this.results = [];
        this.filteredResults = [];
        this.filters = {
            type: '',
            category: null,
            priceMin: 0,
            priceMax: 200,
            rating: []
        };
        this.currentSort = 'relevance';
        this.init();
    }

    init() {
        this.updateSearchInfo();
        this.performSearch();
        this.renderFilters();
        this.renderResults();
        this.setupEventListeners();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    getSearchQuery() {
        const params = new URLSearchParams(window.location.search);
        return params.get('q') || '';
    }

    updateSearchInfo() {
        document.getElementById('searchQuery').textContent = this.searchQuery || 'beauty';
        document.getElementById('searchInput').value = this.searchQuery;
    }

    performSearch() {
        if (!this.searchQuery) {
            this.results = [];
            return;
        }

        const query = this.searchQuery.toLowerCase();
        this.results = [];

        // Search products
        ALL_PRODUCTS.forEach(product => {
            const score = this.calculateRelevance(product, query);
            if (score > 0) {
                this.results.push({ ...product, relevanceScore: score });
            }
        });

        // Search brands
        ALL_BRANDS.forEach(brand => {
            const score = this.calculateRelevance(brand, query);
            if (score > 0) {
                this.results.push({ ...brand, relevanceScore: score });
            }
        });

        // Search categories
        ALL_CATEGORIES.forEach(category => {
            const score = this.calculateRelevance(category, query);
            if (score > 0) {
                this.results.push({ ...category, relevanceScore: score });
            }
        });

        this.applyFilters();
    }

    calculateRelevance(item, query) {
        let score = 0;

        // Exact match in name
        if (item.name.toLowerCase() === query) score += 100;
        // Name starts with query
        else if (item.name.toLowerCase().startsWith(query)) score += 50;
        // Name contains query
        else if (item.name.toLowerCase().includes(query)) score += 25;

        // Description contains query
        if (item.description && item.description.toLowerCase().includes(query)) score += 10;

        // Brand match (for products)
        if (item.brand && item.brand.toLowerCase().includes(query)) score += 20;

        return score;
    }

    renderFilters() {
        // Categories
        const categoryContainer = document.getElementById('categoryFilterList');
        let categoryHtml = '<label class="filter-option"><input type="radio" name="filterCategory" value="" checked><span>All Categories</span></label>';

        ALL_CATEGORIES.forEach(cat => {
            categoryHtml += `
                <label class="filter-option">
                    <input type="radio" name="filterCategory" value="${cat.id}">
                    <span>${cat.name}</span>
                </label>
            `;
        });

        categoryContainer.innerHTML = categoryHtml;
    }

    applyFilters() {
        this.filteredResults = this.results.filter(item => {
            // Type filter
            if (this.filters.type && item.type !== this.filters.type) {
                return false;
            }

            // Category filter
            if (this.filters.category && item.category !== this.filters.category) {
                return false;
            }

            // Price filter (only for products)
            if (item.price) {
                if (item.price < this.filters.priceMin || item.price > this.filters.priceMax) {
                    return false;
                }
            }

            // Rating filter (only for products)
            if (this.filters.rating.length > 0 && item.rating) {
                const hasRating = this.filters.rating.some(r => item.rating >= r);
                if (!hasRating) return false;
            }

            return true;
        });

        this.sortResults();
        this.renderResults();
    }

    sortResults() {
        switch(this.currentSort) {
            case 'newest':
                this.filteredResults.sort((a, b) => b.id - a.id);
                break;
            case 'price-low':
                this.filteredResults.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case 'price-high':
                this.filteredResults.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case 'rating':
                this.filteredResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                // relevance
                this.filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
        }
    }

    renderResults() {
        const container = document.getElementById('searchResults');
        const noResultsContainer = document.getElementById('noResults');

        if (this.filteredResults.length === 0) {
            container.innerHTML = '';
            noResultsContainer.style.display = 'block';
            document.getElementById('noResultsMessage').textContent = this.searchQuery 
                ? `No results found for "${this.searchQuery}". Try different keywords or browse by category.`
                : 'Enter a search term to get started.';
            return;
        }

        noResultsContainer.style.display = 'none';
        let html = '';

        this.filteredResults.forEach(item => {
            if (item.type === 'product') {
                const stars = '★'.repeat(Math.floor(item.rating)) + '☆'.repeat(5 - Math.floor(item.rating));
                html += `
                    <div class="search-result-item" onclick="goToProduct(${item.id})">
                        <div class="search-result-image">${item.icon}</div>
                        <div class="search-result-info">
                            <div class="search-result-type">Product</div>
                            <h3 class="search-result-title">${item.name}</h3>
                            <p class="search-result-subtitle">${item.brand}</p>
                            <p class="search-result-description">${item.description}</p>
                            <div class="search-result-meta">
                                <span>${item.reviews} reviews</span>
                                <span>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                            </div>
                        </div>
                        <div class="search-result-actions">
                            <div class="search-result-price">€${item.price}</div>
                            <div class="search-result-rating">${stars} ${item.rating}/5</div>
                            <button class="search-result-btn" onclick="event.stopPropagation(); addToCart(${item.id})">Add to Cart</button>
                        </div>
                    </div>
                `;
            } else if (item.type === 'brand') {
                html += `
                    <div class="search-result-item" onclick="goToBrand('${item.name}')">
                        <div class="search-result-image">${item.icon}</div>
                        <div class="search-result-info">
                            <div class="search-result-type">Brand</div>
                            <h3 class="search-result-title">${item.name}</h3>
                            <p class="search-result-description">${item.description}</p>
                            <div class="search-result-meta">
                                <span>${item.productCount} products</span>
                            </div>
                        </div>
                        <div class="search-result-actions">
                            <button class="search-result-btn" onclick="event.stopPropagation(); goToBrand('${item.name}')">View Brand</button>
                        </div>
                    </div>
                `;
            } else if (item.type === 'category') {
                html += `
                    <div class="search-result-item" onclick="goToCategory('${item.id}')">
                        <div class="search-result-image">${item.icon}</div>
                        <div class="search-result-info">
                            <div class="search-result-type">Category</div>
                            <h3 class="search-result-title">${item.name}</h3>
                            <p class="search-result-description">${item.description}</p>
                        </div>
                        <div class="search-result-actions">
                            <button class="search-result-btn" onclick="event.stopPropagation(); goToCategory('${item.id}')">Browse Category</button>
                        </div>
                    </div>
                `;
            }
        });

        container.innerHTML = html;
        document.getElementById('resultsCount').textContent = `${this.filteredResults.length} results found`;
    }

    setupEventListeners() {
        // New search
        document.getElementById('searchSubmitBtn').addEventListener('click', () => {
            const query = document.getElementById('searchInput').value;
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = document.getElementById('searchInput').value;
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });

        // Type filter
        document.querySelectorAll('input[name="filterType"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.filters.type = e.target.value;
                this.applyFilters();
            });
        });

        // Category filter
        document.querySelectorAll('input[name="filterCategory"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.filters.category = e.target.value || null;
                this.applyFilters();
            });
        });

        // Price filter
        document.getElementById('priceMin').addEventListener('input', (e) => {
            this.filters.priceMin = parseInt(e.target.value);
            document.getElementById('priceMinDisplay').textContent = `€${this.filters.priceMin}`;
            this.applyFilters();
        });

        document.getElementById('priceMax').addEventListener('input', (e) => {
            this.filters.priceMax = parseInt(e.target.value);
            document.getElementById('priceMaxDisplay').textContent = `€${this.filters.priceMax}`;
            this.applyFilters();
        });

        // Rating filter
        document.querySelectorAll('.rating-filter').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.filters.rating = Array.from(document.querySelectorAll('.rating-filter:checked'))
                    .map(c => parseInt(c.value));
                this.applyFilters();
            });
        });

        // Sort
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.sortResults();
            this.renderResults();
        });

        // Clear filters
        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.filters = {
                type: '',
                category: null,
                priceMin: 0,
                priceMax: 200,
                rating: []
            };
            this.currentSort = 'relevance';
            document.querySelectorAll('input[name="filterType"], input[name="filterCategory"], .rating-filter').forEach(input => {
                input.checked = false;
            });
            document.querySelector('input[name="filterType"][value=""]').checked = true;
            document.querySelector('input[name="filterCategory"][value=""]').checked = true;
            document.getElementById('priceMin').value = 0;
            document.getElementById('priceMax').value = 200;
            document.getElementById('priceMinDisplay').textContent = '€0';
            document.getElementById('priceMaxDisplay').textContent = '€200';
            document.getElementById('sortBy').value = 'relevance';
            this.applyFilters();
        });
    }
}

// ===== HELPER FUNCTIONS =====
function goToProduct(productId) {
    window.location.href = `/product-detail.html?id=${productId}`;
}

function goToBrand(brandName) {
    window.location.href = `/brands.html?brand=${encodeURIComponent(brandName)}`;
}

function goToCategory(categoryId) {
    const categoryMap = {
        'c1': 'face',
        'c2': 'eyes',
        'c3': 'lips',
        'c4': 'skincare',
        'c5': 'haircare'
    };
    window.location.href = `/category.html?category=${categoryMap[categoryId] || 'face'}`;
}

function addToCart(productId) {
    alert(`Added product ${productId} to cart!`);
}

// ===== INITIALIZATION =====
let searchManager;
document.addEventListener('DOMContentLoaded', () => {
    searchManager = new SearchManager();
});
