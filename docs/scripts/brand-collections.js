/* ===================================
   BRAND COLLECTIONS PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== COLLECTIONS DATA =====
const COLLECTIONS_DATA = {
    1: {
        brandId: 1,
        brandName: 'Fenty Beauty',
        brandLogo: '🎨',
        brandTagline: "Rihanna's Beauty Revolution",
        rating: 4.9,
        reviews: 5200,
        totalProducts: 180,
        collections: [
            {
                id: 101,
                name: 'Pro Filt\'r Foundation',
                description: 'Full-coverage foundation in 40+ shades for all skin tones',
                icon: '🎨',
                productCount: 42,
                rating: 4.9,
                reviews: 2100,
                badge: 'Bestseller',
                avgPrice: 35
            },
            {
                id: 102,
                name: 'Eye Collection',
                description: 'Eyeshadows, eyeliners, and eye primers for bold looks',
                icon: '👁️',
                productCount: 28,
                rating: 4.8,
                reviews: 1650,
                badge: 'New',
                avgPrice: 28
            },
            {
                id: 103,
                name: 'Lip Collection',
                description: 'Liquid lipsticks, lip glosses, and lip liners in vibrant shades',
                icon: '💋',
                productCount: 42,
                rating: 4.7,
                reviews: 1890,
                badge: '',
                avgPrice: 26
            },
            {
                id: 104,
                name: 'Glow & Highlight',
                description: 'Highlighters and setting sprays for radiant skin',
                icon: '✨',
                productCount: 15,
                rating: 4.9,
                reviews: 2450,
                badge: 'Bestseller',
                avgPrice: 30
            },
            {
                id: 105,
                name: 'Skin Prep',
                description: 'Primers, setting sprays, and skincare for a perfect base',
                icon: '🧴',
                productCount: 18,
                rating: 4.8,
                reviews: 1320,
                badge: '',
                avgPrice: 32
            },
            {
                id: 106,
                name: 'Pro Brush Collection',
                description: 'Professional makeup brushes for flawless application',
                icon: '🎨',
                productCount: 12,
                rating: 4.7,
                reviews: 890,
                badge: 'Limited',
                avgPrice: 45
            }
        ],
        mission: 'Fenty Beauty exists to serve all beauty. We believe beauty should be fun, expressive, and most importantly, inclusive.',
        whyShop: [
            'Inclusive 40+ shade range',
            'Professional-grade quality',
            'Cruelty-free formulations',
            'Fast and free shipping',
            ' 30-day returns'
        ]
    },
    2: {
        brandId: 2,
        brandName: 'Black Opal',
        brandLogo: '✨',
        brandTagline: 'Since 1983',
        rating: 4.7,
        reviews: 2150,
        totalProducts: 120,
        collections: [
            {
                id: 201,
                name: 'Daily Skincare',
                description: 'Essential daily care products for healthy melanin-rich skin',
                icon: '🧴',
                productCount: 12,
                rating: 4.8,
                reviews: 890,
                badge: 'Bestseller',
                avgPrice: 28
            },
            {
                id: 202,
                name: 'Moisturizers',
                description: 'Rich moisturizers and hydrating creams for deep nourishment',
                icon: '💧',
                productCount: 18,
                rating: 4.7,
                reviews: 950,
                badge: '',
                avgPrice: 32
            },
            {
                id: 203,
                name: 'Serums & Treatments',
                description: 'Targeted serums addressing hyperpigmentation and skin tone',
                icon: '✨',
                productCount: 15,
                rating: 4.9,
                reviews: 1200,
                badge: 'New',
                avgPrice: 38
            },
            {
                id: 204,
                name: 'Body Care',
                description: 'Luxurious body lotions and oils for silky smooth skin',
                icon: '🧼',
                productCount: 20,
                rating: 4.6,
                reviews: 780,
                badge: '',
                avgPrice: 18
            },
            {
                id: 205,
                name: 'Cleansers',
                description: 'Gentle yet effective cleansers for daily use',
                icon: '🧴',
                productCount: 10,
                rating: 4.7,
                reviews: 650,
                badge: '',
                avgPrice: 16
            },
            {
                id: 206,
                name: 'Night Treatment',
                description: 'Intensive nighttime treatments and sleeping masks',
                icon: '🌙',
                productCount: 8,
                rating: 4.8,
                reviews: 720,
                badge: 'Limited',
                avgPrice: 35
            }
        ],
        mission: 'Black Opal is dedicated to creating premium skincare products specifically formulated for melanin-rich skin. We believe every woman deserves products designed for her unique beauty.',
        whyShop: [
            'Formulated for melanin skin',
            'Black-owned since 1983',
            '100% cruelty-free',
            'Natural ingredients',
            'Trusted by millions'
        ]
    },
    3: {
        brandId: 3,
        brandName: 'SheaMoisture',
        brandLogo: '🌿',
        brandTagline: 'Natural Hair Care',
        rating: 4.8,
        reviews: 4500,
        totalProducts: 95,
        collections: [
            {
                id: 301,
                name: 'Raw Shea Butter',
                description: 'Signature shea butter-enriched haircare line',
                icon: '🧴',
                productCount: 28,
                rating: 4.9,
                reviews: 3200,
                badge: 'Bestseller',
                avgPrice: 12
            },
            {
                id: 302,
                name: 'Coconut & Hibiscus',
                description: 'Moisturizing curl-enhancing collection',
                icon: '🌿',
                productCount: 18,
                rating: 4.8,
                reviews: 2150,
                badge: '',
                avgPrice: 14
            },
            {
                id: 303,
                name: 'Hair Treatments',
                description: 'Deep conditioning masks and intensive treatments',
                icon: '✨',
                productCount: 12,
                rating: 4.9,
                reviews: 1890,
                badge: 'New',
                avgPrice: 16
            },
            {
                id: 304,
                name: 'Styling Products',
                description: 'Creams, gels, and sprays for defined curls',
                icon: '💇',
                productCount: 15,
                rating: 4.7,
                reviews: 1420,
                badge: '',
                avgPrice: 10
            },
            {
                id: 305,
                name: 'Body & Bath',
                description: 'Luxurious body washes and bath products',
                icon: '🧼',
                productCount: 12,
                rating: 4.6,
                reviews: 850,
                badge: '',
                avgPrice: 8
            },
            {
                id: 306,
                name: 'Travel Size',
                description: 'Perfect for testing or on-the-go use',
                icon: '✈️',
                productCount: 10,
                rating: 4.7,
                reviews: 650,
                badge: 'Limited',
                avgPrice: 6
            }
        ],
        mission: 'SheaMoisture celebrates natural hair and honors the women who wear it. We create products using fair-trade ingredients and sustainable practices.',
        whyShop: [
            'Fair-trade natural ingredients',
            'Black-owned and operated',
            'All hair types welcome',
            'Eco-friendly packaging',
            'Community-driven brand'
        ]
    }
};

// ===== COLLECTIONS PAGE MANAGER CLASS =====
class CollectionsPageManager {
    constructor() {
        this.brandId = this.getBrandIdFromUrl();
        this.data = COLLECTIONS_DATA[this.brandId];

        if (!this.data) {
            this.showNotFound();
            return;
        }

        this.allCollections = [...this.data.collections];
        this.filteredCollections = [...this.data.collections];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.filters = {
            price: [],
            rating: [],
            type: []
        };
        this.sortBy = 'popular';
        this.viewMode = 'grid-3';

        this.init();
    }

    getBrandIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')) || 1;
    }

    init() {
        this.renderBrandHeader();
        this.setupEventListeners();
        this.applyFilters();
        this.renderCarousel();
        this.renderAboutSection();
        this.render();
        this.updateMetaTags();
        PreloaderManager.hide();
    }

    renderBrandHeader() {
        document.getElementById('breadcrumbBrand').textContent = this.data.brandName;
        document.getElementById('breadcrumbBrand').href = `brand-detail.html?id=${this.brandId}`;
        document.getElementById('brandHeaderLogo').textContent = this.data.brandLogo;
        document.getElementById('brandHeaderName').textContent = this.data.brandName;
        document.getElementById('brandHeaderTagline').textContent = this.data.brandTagline;
        document.getElementById('collectionCount').textContent = this.data.collections.length;
        document.getElementById('productCount').textContent = this.data.totalProducts;
        document.getElementById('brandHeaderRating').textContent = this.data.rating;
        document.getElementById('viewBrandBtn').href = `brand-detail.html?id=${this.brandId}`;
    }

    setupEventListeners() {
        // Price filters
        document.querySelectorAll('input[name="price"]').forEach(input => {
            input.addEventListener('change', (e) => this.handlePriceFilter(e));
        });

        // Rating filters
        document.querySelectorAll('input[name="rating"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleRatingFilter(e));
        });

        // Type filters
        document.querySelectorAll('input[name="type"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleTypeFilter(e));
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

        // Quick links
        document.getElementById('viewBrandLink').href = `brand-detail.html?id=${this.brandId}`;
        document.getElementById('shopAllLink').href = `/shop?brand=${this.brandId}`;
        document.getElementById('readReviewsLink').href = `brand-detail.html?id=${this.brandId}#reviews`;
    }

    handlePriceFilter(e) {
        if (e.target.checked) {
            this.filters.price.push(e.target.value);
        } else {
            this.filters.price = this.filters.price.filter(p => p !== e.target.value);
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

    handleTypeFilter(e) {
        if (e.target.checked) {
            this.filters.type.push(e.target.value);
        } else {
            this.filters.type = this.filters.type.filter(t => t !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    applyFilters() {
        this.filteredCollections = this.allCollections.filter(collection => {
            // Price filter
            if (this.filters.price.length > 0) {
                const matches = this.filters.price.some(range => {
                    switch(range) {
                        case 'under-20':
                            return collection.avgPrice < 20;
                        case '20-50':
                            return collection.avgPrice >= 20 && collection.avgPrice <= 50;
                        case '50-100':
                            return collection.avgPrice > 50 && collection.avgPrice <= 100;
                        case 'over-100':
                            return collection.avgPrice > 100;
                        default:
                            return true;
                    }
                });
                if (!matches) return false;
            }

            // Rating filter
            if (this.filters.rating.length > 0) {
                const matches = this.filters.rating.some(rating => collection.rating >= rating);
                if (!matches) return false;
            }

            // Type filter
            if (this.filters.type.length > 0) {
                const badgeLower = collection.badge.toLowerCase();
                const matches = this.filters.type.some(type => badgeLower.includes(type));
                if (!matches) return false;
            }

            return true;
        });

        this.applySort();
    }

    applySort() {
        switch (this.sortBy) {
            case 'newest':
                this.filteredCollections.reverse();
                break;
            case 'name':
                this.filteredCollections.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'products':
                this.filteredCollections.sort((a, b) => b.productCount - a.productCount);
                break;
            case 'popular':
            default:
                this.filteredCollections.sort((a, b) => b.reviews - a.reviews);
        }
    }

    clearAllFilters() {
        this.filters = {
            price: [],
            rating: [],
            type: []
        };
        this.sortBy = 'popular';

        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });

        this.currentPage = 1;
        this.applyFilters();
        this.render();
        NotificationManager.success('Filters cleared');
    }

    updateViewMode() {
        const grid = document.getElementById('collectionsGrid');
        grid.classList.remove('grid-2', 'grid-3');
        grid.classList.add(this.viewMode);
    }

    render() {
        this.renderCollections();
        this.renderPagination();
        this.updateResultCount();
    }

    renderCollections() {
        const grid = document.getElementById('collectionsGrid');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedCollections = this.filteredCollections.slice(start, end);

        if (paginatedCollections.length === 0) {
            grid.innerHTML = '<div class="loading-skeleton" style="grid-column: 1 / -1;"><p>No collections found. Try adjusting your filters.</p></div>';
            return;
        }

        grid.innerHTML = paginatedCollections.map(collection => `
            <div class="collection-item" onclick="window.location.href='/collection/${collection.id}'">
                ${collection.badge ? `<div class="collection-badge">${collection.badge}</div>` : ''}
                <div class="collection-header">${collection.icon}</div>
                <div class="collection-info">
                    <h3 class="collection-name">${collection.name}</h3>
                    <p class="collection-description">${collection.description}</p>
                    <div class="collection-meta">
                        <div class="collection-count">
                            <div class="count-label">Products</div>
                            <div class="count-value">${collection.productCount}</div>
                        </div>
                        <div class="collection-rating">
                            <div class="rating-stars">${'⭐'.repeat(Math.round(collection.rating))}</div>
                            <div class="rating-text">${collection.reviews} reviews</div>
                        </div>
                    </div>
                </div>
                <div class="collection-actions" onclick="event.stopPropagation()">
                    <button onclick="window.location.href='/collection/${collection.id}'">View Collection</button>
                    <button onclick="window.location.href='/shop?collection=${collection.id}'">Shop</button>
                </div>
            </div>
        `).join('');

        this.updateViewMode();
    }

    renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredCollections.length / this.itemsPerPage);

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '';

        if (this.currentPage > 1) {
            html += `<button onclick="collections.goToPage(${this.currentPage - 1})">← Previous</button>`;
        } else {
            html += `<button disabled class="disabled">← Previous</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                html += `<button class="active">${i}</button>`;
            } else if (i <= 3 || i >= totalPages - 2 || Math.abs(i - this.currentPage) <= 1) {
                html += `<button onclick="collections.goToPage(${i})">${i}</button>`;
            } else if (i === 4 || i === totalPages - 3) {
                html += `<span>...</span>`;
            }
        }

        if (this.currentPage < totalPages) {
            html += `<button onclick="collections.goToPage(${this.currentPage + 1})">Next →</button>`;
        } else {
            html += `<button disabled class="disabled">Next →</button>`;
        }

        paginationContainer.innerHTML = html;
    }

    updateResultCount() {
        const count = this.filteredCollections.length;
        const text = count === 1 ? 'Showing 1 collection' : `Showing ${count} collections`;
        document.getElementById('resultCount').textContent = text;
    }

    goToPage(page) {
        this.currentPage = page;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderCarousel() {
        const carousel = document.getElementById('carouselGrid');
        const topCollections = this.allCollections
            .sort((a, b) => b.reviews - a.reviews)
            .slice(0, 3);

        carousel.innerHTML = topCollections.map(collection => `
            <div class="carousel-card" onclick="window.location.href='/collection/${collection.id}'">
                <div class="carousel-image">${collection.icon}</div>
                <div class="carousel-content">
                    <h3 class="carousel-title">${collection.name}</h3>
                    <p class="carousel-subtitle">⭐ ${collection.rating} (${collection.reviews} reviews)</p>
                    <a href="/collection/${collection.id}" class="carousel-link">Explore →</a>
                </div>
            </div>
        `).join('');
    }

    renderAboutSection() {
        document.getElementById('brandMission').textContent = this.data.mission;
        const whyShopList = document.getElementById('whyShopList');
        whyShopList.innerHTML = this.data.whyShop.map(item => `<li>${item}</li>`).join('');
    }

    updateMetaTags() {
        document.title = `${this.data.brandName} Collections | DANHAYS`;
        document.getElementById('pageDescription').content = `Explore ${this.data.collections.length} curated collections from ${this.data.brandName}`;
        document.getElementById('pageTitle').textContent = `${this.data.brandName} Collections`;
        document.getElementById('ogTitle').content = `${this.data.brandName} Collections | DANHAYS`;
        document.getElementById('ogDescription').content = `Browse ${this.data.totalProducts}+ products across ${this.data.collections.length} collections`;
    }

    showNotFound() {
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h1>Brand Collections Not Found</h1>
                <p>The brand collections you're looking for don't exist.</p>
                <a href="/brands.html" class="btn btn-primary">Back to Brands</a>
            </div>
        `;
    }
}

// ===== INITIALIZATION =====
let collections;
document.addEventListener('DOMContentLoaded', () => {
    collections = new CollectionsPageManager();
});
