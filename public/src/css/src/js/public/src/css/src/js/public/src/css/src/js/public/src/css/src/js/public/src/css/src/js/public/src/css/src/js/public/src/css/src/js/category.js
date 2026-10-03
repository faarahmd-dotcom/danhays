/* ===================================
   CATEGORY PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== CATEGORY DATA =====
const CATEGORIES = {
    face: {
        id: 'face',
        name: 'Face',
        description: 'Foundation, concealer, blush, bronzer, highlighter & more',
        icon: '💄',
        color: '#E8D4B8',
        productCount: 650,
        subcategories: ['foundation', 'concealer', 'powder', 'blush', 'bronzer', 'highlighter', 'contour', 'primer'],
        brands: ['Fenty Beauty', 'Black Opal', 'SheaMoisture', 'MAC', 'NYX']
    },
    eyes: {
        id: 'eyes',
        name: 'Eyes',
        description: 'Eyeshadow, mascara, eyeliner, brows & more',
        icon: '👁️',
        color: '#C9A86C',
        productCount: 520,
        subcategories: ['eyeshadow', 'mascara', 'eyeliner', 'brows', 'false-lashes'],
        brands: ['Fenty Beauty', 'MAC', 'NYX', 'Urban Decay', 'Anastasia Beverly Hills']
    },
    lips: {
        id: 'lips',
        name: 'Lips',
        description: 'Lipstick, lip gloss, lip liner & more',
        icon: '💋',
        color: '#B85C5C',
        productCount: 480,
        subcategories: ['lipstick', 'liquid-lipstick', 'lip-gloss', 'lip-liner'],
        brands: ['Fenty Beauty', 'MAC', 'NYX', 'Charlotte Tilbury']
    },
    skincare: {
        id: 'skincare',
        name: 'Skincare',
        description: 'Cleansers, moisturizers, serums, masks & more',
        icon: '✨',
        color: '#A8D5BA',
        productCount: 420,
        subcategories: ['cleansers', 'moisturizers', 'serums', 'masks', 'sunscreen'],
        brands: ['Black Opal', 'SheaMoisture', 'Olay', 'CeraVe', 'The Ordinary']
    },
    haircare: {
        id: 'haircare',
        name: 'Haircare',
        description: 'Shampoo, conditioner, styling, treatments & more',
        icon: '💇',
        color: '#8B7355',
        productCount: 280,
        subcategories: ['shampoo', 'conditioner', 'hair-masks', 'styling', 'oils'],
        brands: ['SheaMoisture', 'Cantu', 'Carol\'s Daughter', 'Aunt Jackie\'s']
    }
};

const PRODUCTS_DB = {
    face: [
        { id: 1, name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', price: 35, rating: 4.8, reviews: 2345, image: '💄', category: 'face', subcategory: 'foundation' },
        { id: 2, name: 'Black Opal Moisturizer', brand: 'Black Opal', price: 28, rating: 4.6, reviews: 1200, image: '✨', category: 'face', subcategory: 'moisturizers' },
        { id: 3, name: 'Pro Glow Highlighter', brand: 'Fenty Beauty', price: 30, rating: 4.7, reviews: 892, image: '💄', category: 'face', subcategory: 'highlighter' },
        { id: 4, name: 'Full Coverage Concealer', brand: 'MAC', price: 32, rating: 4.5, reviews: 1567, image: '💄', category: 'face', subcategory: 'concealer' },
        { id: 5, name: 'Blush Palette', brand: 'NYX', price: 18, rating: 4.4, reviews: 890, image: '💄', category: 'face', subcategory: 'blush' },
        { id: 6, name: 'Bronzer Powder', brand: 'Fenty Beauty', price: 32, rating: 4.7, reviews: 1234, image: '💄', category: 'face', subcategory: 'bronzer' },
        { id: 7, name: 'Primer Base', brand: 'MAC', price: 28, rating: 4.6, reviews: 756, image: '💄', category: 'face', subcategory: 'primer' },
        { id: 8, name: 'Setting Spray', brand: 'NYX', price: 8.99, rating: 4.3, reviews: 567, image: '💄', category: 'face', subcategory: 'setting-spray' }
    ],
    eyes: [
        { id: 9, name: 'Eyeshadow Palette Pro', brand: 'Urban Decay', price: 54, rating: 4.9, reviews: 3456, image: '👁️', category: 'eyes', subcategory: 'eyeshadow' },
        { id: 10, name: 'Mascara Black', brand: 'Fenty Beauty', price: 26, rating: 4.7, reviews: 2123, image: '👁️', category: 'eyes', subcategory: 'mascara' },
        { id: 11, name: 'Liquid Eyeliner', brand: 'MAC', price: 22, rating: 4.6, reviews: 1345, image: '👁️', category: 'eyes', subcategory: 'eyeliner' },
        { id: 12, name: 'Eyebrow Pencil', brand: 'Anastasia Beverly Hills', price: 24, rating: 4.8, reviews: 1890, image: '👁️', category: 'eyes', subcategory: 'brows' },
        { id: 13, name: 'False Lashes Set', brand: 'NYX', price: 12, rating: 4.4, reviews: 678, image: '👁️', category: 'eyes', subcategory: 'false-lashes' }
    ],
    lips: [
        { id: 14, name: 'Lipstick Satin', brand: 'Fenty Beauty', price: 20, rating: 4.8, reviews: 2567, image: '💋', category: 'lips', subcategory: 'lipstick' },
        { id: 15, name: 'Liquid Lipstick', brand: 'NYX', price: 16, rating: 4.5, reviews: 1234, image: '💋', category: 'lips', subcategory: 'liquid-lipstick' },
        { id: 16, name: 'Lip Gloss Shine', brand: 'MAC', price: 20, rating: 4.6, reviews: 890, image: '💋', category: 'lips', subcategory: 'lip-gloss' },
        { id: 17, name: 'Lip Liner Precision', brand: 'Charlotte Tilbury', price: 22, rating: 4.7, reviews: 1123, image: '💋', category: 'lips', subcategory: 'lip-liner' }
    ],
    skincare: [
        { id: 18, name: 'Gentle Cleanser', brand: 'CeraVe', price: 15, rating: 4.7, reviews: 2345, image: '✨', category: 'skincare', subcategory: 'cleansers' },
        { id: 19, name: 'Hydrating Moisturizer', brand: 'Black Opal', price: 28, rating: 4.6, reviews: 1567, image: '✨', category: 'skincare', subcategory: 'moisturizers' },
        { id: 20, name: 'Vitamin C Serum', brand: 'The Ordinary', price: 12, rating: 4.5, reviews: 2123, image: '✨', category: 'skincare', subcategory: 'serums' },
        { id: 21, name: 'Clay Face Mask', brand: 'Olay', price: 18, rating: 4.4, reviews: 890, image: '✨', category: 'skincare', subcategory: 'masks' },
        { id: 22, name: 'SPF 50 Sunscreen', brand: 'CeraVe', price: 22, rating: 4.8, reviews: 1456, image: '✨', category: 'skincare', subcategory: 'sunscreen' }
    ],
    haircare: [
        { id: 23, name: 'Shea Butter Shampoo', brand: 'SheaMoisture', price: 12, rating: 4.7, reviews: 1890, image: '💇', category: 'haircare', subcategory: 'shampoo' },
        { id: 24, name: 'Moisturizing Conditioner', brand: 'Cantu', price: 8, rating: 4.6, reviews: 1234, image: '💇', category: 'haircare', subcategory: 'conditioner' },
        { id: 25, name: 'Deep Hair Mask', brand: 'SheaMoisture', price: 14, rating: 4.8, reviews: 1567, image: '💇', category: 'haircare', subcategory: 'hair-masks' },
        { id: 26, name: 'Styling Gel', brand: 'Aunt Jackie\'s', price: 6.99, rating: 4.3, reviews: 678, image: '💇', category: 'haircare', subcategory: 'styling' },
        { id: 27, name: 'Argan Oil', brand: 'Carol\'s Daughter', price: 16, rating: 4.7, reviews: 1234, image: '💇', category: 'haircare', subcategory: 'oils' }
    ]
};

// ===== CATEGORY MANAGER =====
class CategoryManager {
    constructor() {
        this.currentCategory = this.getCategory();
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.products = [];
        this.filteredProducts = [];
        this.filters = {
            search: '',
            subcategory: null,
            brand: null,
            priceMin: 0,
            priceMax: 200,
            rating: []
        };
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.renderCategoryInfo();
        this.loadProducts();
        this.renderFilters();
        this.renderProducts();
        this.setupEventListeners();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    getCategory() {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category') || 'face';
        return CATEGORIES[cat] || CATEGORIES.face;
    }

    renderCategoryInfo() {
        document.getElementById('categoryTitle').textContent = this.currentCategory.name;
        document.getElementById('categoryDescription').textContent = this.currentCategory.description;
        document.getElementById('productCount').textContent = `${this.currentCategory.productCount} products`;
        document.getElementById('brandCount').textContent = `${this.currentCategory.brands.length} brands`;
        document.getElementById('categoryImage').textContent = this.currentCategory.icon;
        document.getElementById('categoryBreadcrumb').textContent = this.currentCategory.name;

        // Update page title
        document.title = `${this.currentCategory.name} | DANHAYS - The Home of Melanin Beauty`;
    }

    loadProducts() {
        this.products = PRODUCTS_DB[this.currentCategory.id] || [];
        this.applyFilters();
    }

    renderFilters() {
        this.renderSubcategories();
        this.renderBrands();
        this.renderShades();
    }

    renderSubcategories() {
        const container = document.getElementById('subcategoriesList');
        let html = `<label class="filter-option">
            <input type="radio" name="subcategory" value="" checked data-filter="subcategory">
            <span>All ${this.currentCategory.name}</span>
        </label>`;

        this.currentCategory.subcategories.forEach(sub => {
            const label = sub.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `
                <label class="filter-option">
                    <input type="radio" name="subcategory" value="${sub}" data-filter="subcategory">
                    <span>${label}</span>
                </label>
            `;
        });

        container.innerHTML = html;
    }

    renderBrands() {
        const container = document.getElementById('brandsList');
        let html = '';

        this.currentCategory.brands.forEach(brand => {
            html += `
                <label class="filter-option">
                    <input type="checkbox" value="${brand}" data-filter="brand">
                    <span>${brand}</span>
                </label>
            `;
        });

        container.innerHTML = html;
    }

    renderShades() {
        if (this.currentCategory.id !== 'face') {
            document.getElementById('shadeFilterGroup').style.display = 'none';
            return;
        }

        document.getElementById('shadeFilterGroup').style.display = 'block';
        const shades = ['Fair', 'Light', 'Light Medium', 'Medium', 'Medium Tan', 'Tan', 'Deep', 'Rich'];
        const shadeColors = ['#F5DEB3', '#F0E6D2', '#EEDDCC', '#D4A574', '#CA8A54', '#BC6C25', '#8B4513', '#654321'];

        let html = '';
        shades.forEach((shade, index) => {
            html += `
                <button class="shade-btn" title="${shade}" style="background-color: ${shadeColors[index]}" data-shade="${shade}"></button>
            `;
        });

        document.getElementById('shadeList').innerHTML = html;
    }

    renderProducts() {
        const container = document.getElementById('productsGrid');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageProducts = this.filteredProducts.slice(start, end);

        let html = '';
        pageProducts.forEach(product => {
            const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
            html += `
                <div class="product-card ${this.currentView === 'list' ? 'list-view' : ''}">
                    <div class="product-image-placeholder">${product.image}</div>
                    <div class="product-info">
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">${stars} (${product.reviews})</div>
                        <div class="product-price">€${product.price}</div>
                        <div class="product-actions">
                            <button class="product-btn" onclick="viewProduct(${product.id})">View</button>
                            <button class="product-btn" onclick="addToCart(${product.id})">Cart</button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html || '<p>No products found.</p>';
        document.getElementById('resultsCount').textContent = `${this.filteredProducts.length} products found`;

        this.renderPagination();
    }

    renderPagination() {
        const container = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let html = '';

        if (this.currentPage > 1) {
            html += `<button onclick="categoryManager.goToPage(${this.currentPage - 1})">← Previous</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                html += `<button class="active">${i}</button>`;
            } else if (i <= 3 || i > totalPages - 3 || Math.abs(i - this.currentPage) <= 1) {
                html += `<button onclick="categoryManager.goToPage(${i})">${i}</button>`;
            } else if (i === 4 || i === totalPages - 3) {
                html += `<span>...</span>`;
            }
        }

        if (this.currentPage < totalPages) {
            html += `<button onclick="categoryManager.goToPage(${this.currentPage + 1})">Next →</button>`;
        }

        container.innerHTML = html;
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            if (this.filters.search) {
                const search = this.filters.search.toLowerCase();
                if (!product.name.toLowerCase().includes(search) && 
                    !product.brand.toLowerCase().includes(search)) {
                    return false;
                }
            }

            // Subcategory filter
            if (this.filters.subcategory && product.subcategory !== this.filters.subcategory) {
                return false;
            }

            // Brand filter
            if (this.filters.brand.length > 0 && !this.filters.brand.includes(product.brand)) {
                return false;
            }

            // Price filter
            if (product.price < this.filters.priceMin || product.price > this.filters.priceMax) {
                return false;
            }

            // Rating filter
            if (this.filters.rating.length > 0) {
                const hasRating = this.filters.rating.some(r => product.rating >= r);
                if (!hasRating) return false;
            }

            return true;
        });

        this.currentPage = 1;
        this.renderProducts();
    }

    sortProducts(sortBy) {
        switch(sortBy) {
            case 'newest':
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
                this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                // relevance (no change)
        }
        this.currentPage = 1;
        this.renderProducts();
    }

    setupEventListeners() {
        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        // Subcategory filter
        document.querySelectorAll('input[data-filter="subcategory"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.filters.subcategory = e.target.value || null;
                this.applyFilters();
            });
        });

        // Brand filter
        document.querySelectorAll('input[data-filter="brand"]').forEach(input => {
            input.addEventListener('change', () => {
                this.filters.brand = Array.from(document.querySelectorAll('input[data-filter="brand"]:checked'))
                    .map(i => i.value);
                this.applyFilters();
            });
        });

        // Price filter
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');

        priceMin.addEventListener('input', (e) => {
            this.filters.priceMin = parseInt(e.target.value);
            document.getElementById('priceMinDisplay').textContent = `€${this.filters.priceMin}`;
            this.applyFilters();
        });

        priceMax.addEventListener('input', (e) => {
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
            this.sortProducts(e.target.value);
        });

        // View toggle
        document.getElementById('viewGrid').addEventListener('click', () => {
            this.currentView = 'grid';
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            this.renderProducts();
        });

        document.getElementById('viewList').addEventListener('click', () => {
            this.currentView = 'list';
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            this.renderProducts();
        });

        // Clear filters
        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.filters = {
                search: '',
                subcategory: null,
                brand: null,
                priceMin: 0,
                priceMax: 200,
                rating: []
            };
            document.getElementById('searchInput').value = '';
            document.querySelectorAll('input[data-filter], .rating-filter').forEach(input => {
                input.checked = false;
            });
            document.querySelector('input[value=""]').checked = true;
            document.getElementById('priceMin').value = 0;
            document.getElementById('priceMax').value = 200;
            document.getElementById('priceMinDisplay').textContent = '€0';
            document.getElementById('priceMaxDisplay').textContent = '€200';
            this.applyFilters();
        });
    }

    goToPage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ===== HELPER FUNCTIONS =====
function viewProduct(productId) {
    window.location.href = `/product-detail.html?id=${productId}`;
}

function addToCart(productId) {
    alert(`Added product ${productId} to cart!`);
}

// ===== INITIALIZATION =====
let categoryManager;
document.addEventListener('DOMContentLoaded', () => {
    categoryManager = new CategoryManager();
});
