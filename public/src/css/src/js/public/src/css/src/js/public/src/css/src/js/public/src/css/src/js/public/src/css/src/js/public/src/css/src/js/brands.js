/* ===================================
   BRANDS PAGE JAVASCRIPT
   Version 3.0
   =================================== */

// ===== SAMPLE BRANDS DATA =====
const SAMPLE_BRANDS = [
    {
        id: 1,
        name: 'Fenty Beauty',
        tagline: 'Rihanna\'s Beauty Revolution',
        description: 'Redefining beauty with 50+ shades for all skin tones',
        logo: '🎨',
        rating: 4.9,
        reviews: 5200,
        products: 180,
        founded: 2017,
        badges: [],
        type: ['inclusive', 'luxury'],
        specialty: ['makeup'],
        priceRange: 'premium'
    },
    {
        id: 2,
        name: 'Black Opal',
        tagline: 'Since 1983',
        description: 'Premium skincare formulated for melanin-rich skin',
        logo: '✨',
        rating: 4.7,
        reviews: 2150,
        products: 120,
        founded: 1983,
        badges: ['Black-Owned', 'Cruelty-Free'],
        type: ['black-owned', 'women-owned'],
        specialty: ['skincare'],
        priceRange: 'mid'
    },
    {
        id: 3,
        name: 'SheaMoisture',
        tagline: 'Natural Hair Care',
        description: 'Celebrating natural hair with premium natural ingredients',
        logo: '🌿',
        rating: 4.8,
        reviews: 4500,
        products: 95,
        founded: 1991,
        badges: ['Natural', 'Cruelty-Free'],
        type: ['black-owned', 'women-owned'],
        specialty: ['haircare'],
        priceRange: 'mid'
    },
    {
        id: 4,
        name: 'Beautyy',
        tagline: 'Afro-Centric Beauty',
        description: 'Beauty products designed specifically for Black beauty',
        logo: '👑',
        rating: 4.6,
        reviews: 890,
        products: 65,
        founded: 2015,
        badges: ['Black-Owned', 'Vegan'],
        type: ['black-owned', 'indie'],
        specialty: ['makeup'],
        priceRange: 'budget'
    },
    {
        id: 5,
        name: 'Black Up Cosmetics',
        tagline: 'Makeup for Dark Skin',
        description: 'Makeup specially formulated for deep skin tones',
        logo: '💄',
        rating: 4.7,
        reviews: 1200,
        products: 85,
        founded: 2008,
        badges: ['Black-Owned'],
        type: ['black-owned', 'african'],
        specialty: ['makeup'],
        priceRange: 'mid'
    },
    {
        id: 6,
        name: 'MAC',
        tagline: 'Professional Makeup',
        description: 'Professional-grade makeup trusted by artists worldwide',
        logo: '🎭',
        rating: 4.8,
        reviews: 6800,
        products: 200,
        founded: 1984,
        badges: [],
        type: ['luxury'],
        specialty: ['makeup'],
        priceRange: 'premium'
    },
    {
        id: 7,
        name: 'NYX Professional Makeup',
        tagline: 'Professional Quality Affordable',
        description: 'Professional makeup at affordable prices',
        logo: '✏️',
        rating: 4.6,
        reviews: 3200,
        products: 150,
        founded: 1999,
        badges: ['Cruelty-Free'],
        type: ['indie'],
        specialty: ['makeup'],
        priceRange: 'budget'
    },
    {
        id: 8,
        name: 'Cantu',
        tagline: 'Natural Hair Care Leader',
        description: 'Shea butter-based haircare for all curl types',
        logo: '🧴',
        rating: 4.9,
        reviews: 4200,
        products: 78,
        founded: 2007,
        badges: ['Natural', 'Vegan'],
        type: ['black-owned', 'women-owned'],
        specialty: ['haircare'],
        priceRange: 'budget'
    }
];

// ===== BRANDS PAGE MANAGER CLASS =====
class BrandsPageManager {
    constructor() {
        this.allBrands = [...SAMPLE_BRANDS];
        this.filteredBrands = [...SAMPLE_BRANDS];
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.filters = {
            type: [],
            category: [],
            price: [],
            values: []
        };
        this.sortBy = 'popular';
        this.viewMode = 'grid-3';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyFilters();
        this.render();
    }

    setupEventListeners() {
        // Type filters
        document.querySelectorAll('input[name="type"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleTypeFilter(e));
        });

        // Category filters
        document.querySelectorAll('input[name="category"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleCategoryFilter(e));
        });

        // Price filters
        document.querySelectorAll('input[name="price"]').forEach(input => {
            input.addEventListener('change', (e) => this.handlePriceFilter(e));
        });

        // Values filters
        document.querySelectorAll('input[name="values"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleValuesFilter(e));
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

    handleValuesFilter(e) {
        if (e.target.checked) {
            this.filters.values.push(e.target.value);
        } else {
            this.filters.values = this.filters.values.filter(v => v !== e.target.value);
        }
        this.currentPage = 1;
        this.applyFilters();
        this.render();
    }

    applyFilters() {
        this.filteredBrands = this.allBrands.filter(brand => {
            // Type filter
            if (this.filters.type.length > 0) {
                const hasType = this.filters.type.some(type => brand.type.includes(type));
                if (!hasType) return false;
            }

            // Category filter
            if (this.filters.category.length > 0) {
                const hasCategory = this.filters.category.some(cat => brand.specialty.includes(cat));
                if (!hasCategory) return false;
            }

            // Price filter
            if (this.filters.price.length > 0) {
                if (!this.filters.price.includes(brand.priceRange)) return false;
            }

            // Values filter
            if (this.filters.values.length > 0) {
                const badgeLower = brand.badges.map(b => b.toLowerCase());
                const hasValue = this.filters.values.some(val => badgeLower.includes(val));
                if (!hasValue) return false;
            }

            return true;
        });

        this.applySort();
    }

    applySort() {
        switch (this.sortBy) {
            case 'newest':
                this.filteredBrands.sort((a, b) => b.founded - a.founded);
                break;
            case 'name':
                this.filteredBrands.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                this.filteredBrands.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
            default:
                this.filteredBrands.sort((a, b) => b.reviews - a.reviews);
        }
    }

    clearAllFilters() {
        this.filters = {
            type: [],
            category: [],
            price: [],
            values: []
        };
        this.sortBy = 'popular';

        // Uncheck all inputs
        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });

        this.currentPage = 1;
        this.applyFilters();
        this.render();
        NotificationManager.success('Filters cleared');
    }

    updateViewMode() {
        const grid = document.getElementById('brandsGrid');
        grid.classList.remove('grid-2', 'grid-3');
        grid.classList.add(this.viewMode);
    }

    render() {
        this.renderBrands();
        this.renderPagination();
        this.updateResultCount();
    }

    renderBrands() {
        const grid = document.getElementById('brandsGrid');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedBrands = this.filteredBrands.slice(start, end);

        if (paginatedBrands.length === 0) {
            grid.innerHTML = '<div class="loading-skeleton" style="grid-column: 1 / -1;"><p>No brands found. Try adjusting your filters.</p></div>';
            return;
        }

        grid.innerHTML = paginatedBrands.map(brand => `
            <div class="brand-card" onclick="window.location.href='/brand/${brand.id}'">
                <div class="brand-logo">${brand.logo}</div>
                <div class="brand-info">
                    <h3 class="brand-name">${brand.name}</h3>
                    <p class="brand-tagline">${brand.tagline}</p>
                    <p class="brand-description">${brand.description}</p>
                    <div class="brand-badges">
                        ${brand.badges.map(badge => `<span class="brand-badge ${badge.toLowerCase().replace(/\s+/g, '-')}">${badge}</span>`).join('')}
                    </div>
                    <div class="brand-stats">
                        <div class="stat">
                            <div class="stat-value">⭐ ${brand.rating}</div>
                            <div class="stat-label">${brand.reviews} reviews</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${brand.products}</div>
                            <div class="stat-label">Products</div>
                        </div>
                    </div>
                </div>
                <div class="brand-actions" onclick="event.stopPropagation()">
                    <button onclick="window.location.href='/brand/${brand.id}'">View Brand</button>
                    <button onclick="window.location.href='/shop?brand=${brand.id}'">Shop</button>
                </div>
            </div>
        `).join('');

        this.updateViewMode();
    }

    renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredBrands.length / this.itemsPerPage);

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '';

        // Previous button
        if (this.currentPage > 1) {
            html += `<button onclick="brands.goToPage(${this.currentPage - 1})">← Previous</button>`;
        } else {
            html += `<button disabled class="disabled">← Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                html += `<button class="active">${i}</button>`;
            } else if (i <= 3 || i >= totalPages - 2 || Math.abs(i - this.currentPage) <= 1) {
                html += `<button onclick="brands.goToPage(${i})">${i}</button>`;
            } else if (i === 4 || i === totalPages - 3) {
                html += `<span>...</span>`;
            }
        }

        // Next button
        if (this.currentPage < totalPages) {
            html += `<button onclick="brands.goToPage(${this.currentPage + 1})">Next →</button>`;
        } else {
            html += `<button disabled class="disabled">Next →</button>`;
        }

        paginationContainer.innerHTML = html;
    }

    updateResultCount() {
        const count = this.filteredBrands.length;
        const text = count === 1 ? 'Showing 1 brand' : `Showing ${count} brands`;
        document.getElementById('resultCount').textContent = text;
    }

    goToPage(page) {
        this.currentPage = page;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ===== INITIALIZATION =====
let brands;
document.addEventListener('DOMContentLoaded', () => {
    brands = new BrandsPageManager();
    PreloaderManager.hide();
});
