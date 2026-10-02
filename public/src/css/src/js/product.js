/* ===================================
   PRODUCT DETAIL PAGE JAVASCRIPT
   Version 3.0
   =================================== */

// ===== SAMPLE PRODUCT DATA =====
const SAMPLE_PRODUCT_DETAILS = {
    id: 1,
    name: "Fenty Beauty Pro Filt'r Foundation",
    brand: "Fenty Beauty",
    price: 34.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 1250,
    category: "face",
    inStock: true,
    images: [
        "https://via.placeholder.com/600x600?text=Product+Image+1",
        "https://via.placeholder.com/600x600?text=Product+Image+2",
        "https://via.placeholder.com/600x600?text=Product+Image+3",
        "https://via.placeholder.com/600x600?text=Product+Image+4"
    ],
    description: "The world's most inclusive foundation. With 50+ shades, Pro Filt'r is designed to match a wide range of skin tones and undertones. This weightless, long-wearing, sweat- and humidity-resistant liquid foundation provides buildable medium to full coverage.",
    ingredients: [
        "Water",
        "Cyclopentasiloxane",
        "Glycerin",
        "Dimethicone",
        "Natural Extracts",
        "SPF Benefits"
    ],
    shades: [
        "Shade 100",
        "Shade 110",
        "Shade 120",
        "Shade 130",
        "Shade 140",
        "Shade 150"
    ],
    sizes: [
        "30ml",
        "50ml",
        "100ml"
    ],
    onSale: false,
    badge: null,
    relatedProducts: [
        {
            id: 2,
            name: "Fenty Beauty Pro Filt'r Powder",
            brand: "Fenty Beauty",
            price: 32.00,
            image: "https://via.placeholder.com/300x300?text=Related+1",
            rating: 4.7,
            reviews: 890
        },
        {
            id: 3,
            name: "Fenty Beauty Match Stix Concealer",
            brand: "Fenty Beauty",
            price: 25.00,
            image: "https://via.placeholder.com/300x300?text=Related+2",
            rating: 4.8,
            reviews: 650
        },
        {
            id: 4,
            name: "Black Opal True Color Skin Perfector",
            brand: "Black Opal",
            price: 12.99,
            image: "https://via.placeholder.com/300x300?text=Related+3",
            rating: 4.6,
            reviews: 520
        },
        {
            id: 5,
            name: "MAC Fix+",
            brand: "MAC",
            price: 27.00,
            image: "https://via.placeholder.com/300x300?text=Related+4",
            rating: 4.7,
            reviews: 1450
        }
    ]
};

// ===== PRODUCT MANAGER CLASS =====
class ProductManager {
    constructor() {
        this.product = { ...SAMPLE_PRODUCT_DETAILS };
        this.selectedShade = this.product.shades[0];
        this.selectedSize = this.product.sizes[0];
        this.quantity = 1;

        this.init();
    }

    init() {
        this.loadProductFromURL();
        this.renderProduct();
        this.setupEventListeners();
        this.renderRelatedProducts();
    }

    loadProductFromURL() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id') || 1;
        // In a real app, fetch product data from API based on productId
        // For now, using sample data
    }

    renderProduct() {
        // Update page title and meta tags
        document.title = `${this.product.name} | ${this.product.brand} | DANHAYS`;
        document.getElementById('productTitle').textContent = this.product.name;
        document.getElementById('productDescription').content = this.product.description;
        document.getElementById('ogTitle').content = this.product.name;
        document.getElementById('ogDescription').content = this.product.description;
        document.getElementById('ogImage').content = this.product.images[0];
        document.getElementById('ogUrl').content = window.location.href;

        // Update breadcrumb
        document.getElementById('breadcrumbCategory').textContent = this.product.name;

        // Update images
        document.getElementById('mainImage').src = this.product.images[0];

        // Update product info
        document.getElementById('productBrand').textContent = this.product.brand;
        document.getElementById('productName').textContent = this.product.name;
        document.getElementById('productPrice').textContent = `€${this.product.price.toFixed(2)}`;
        document.getElementById('productStars').textContent = '★'.repeat(Math.round(this.product.rating)) + '☆'.repeat(5 - Math.round(this.product.rating));
        document.getElementById('productReviews').textContent = `(${this.product.reviews} reviews)`;

        // Update rating display
        document.getElementById('ratingNumber').textContent = this.product.rating.toFixed(1);
        document.getElementById('summarystars').textContent = '★'.repeat(Math.round(this.product.rating)) + '☆'.repeat(5 - Math.round(this.product.rating));
        document.getElementById('totalReviews').textContent = `${this.product.reviews} reviews`;

        // Update description and ingredients
        document.getElementById('productDescriptionContent').innerHTML = `<p>${this.product.description}</p>`;
        document.getElementById('ingredientsContent').innerHTML = `<ul>${this.product.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>`;

        // Update shade options
        this.renderShadeOptions();

        // Stock status
        if (this.product.inStock) {
            document.getElementById('stockStatus').innerHTML = '<span class="in-stock">✓ In Stock</span>';
        } else {
            document.getElementById('stockStatus').innerHTML = '<span class="out-of-stock">✗ Out of Stock</span>';
        }
    }

    renderShadeOptions() {
        const container = document.getElementById('shadeOptions');
        container.innerHTML = this.product.shades.map((shade, index) => `
            <button class="option-value ${index === 0 ? 'active' : ''}" onclick="product.selectShade('${shade}', this)">
                ${shade}
            </button>
        `).join('');
    }

    renderRelatedProducts() {
        const container = document.getElementById('relatedProducts');
        container.innerHTML = this.product.relatedProducts.map(p => `
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

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });
    }

    changeImage(thumbnailEl) {
        const img = thumbnailEl.querySelector('img');
        document.getElementById('mainImage').src = img.src;

        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbnailEl.classList.add('active');
    }

    selectShade(shade, element) {
        this.selectedShade = shade;
        document.querySelectorAll('.option-value').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
    }

    selectOption(element) {
        element.parentElement.querySelectorAll('.option-value').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
    }

    increaseQty() {
        const input = document.getElementById('quantity');
        if (parseInt(input.value) < 99) {
            input.value = parseInt(input.value) + 1;
        }
    }

    decreaseQty() {
        const input = document.getElementById('quantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }

    addToCart() {
        const quantity = parseInt(document.getElementById('quantity').value);
        window.cart.addItem({
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            image: this.product.images[0],
            shade: this.selectedShade,
            quantity: quantity
        });

        // Visual feedback
        const btn = document.getElementById('addToCartBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Added to Cart!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }

    addToWishlist() {
        window.wishlist.addItem({
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            image: this.product.images[0]
        });

        const btn = document.getElementById('addToWishlistBtn');
        btn.classList.add('active');
        setTimeout(() => {
            btn.classList.remove('active');
        }, 2000);
    }

    switchTab(e) {
        const tabName = e.target.dataset.tab;

        // Update active button
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Smooth scroll
        window.scrollTo({ top: document.querySelector('.product-tabs-section').offsetTop - 100, behavior: 'smooth' });
    }

    openReviewForm() {
        NotificationManager.info('Review form would open here');
    }

    openQAForm() {
        NotificationManager.info('Q&A form would open here');
    }
}

// ===== INITIALIZATION =====
let product;
document.addEventListener('DOMContentLoaded', () => {
    product = new ProductManager();
    PreloaderManager.hide();

    // Set first tab as active
    document.querySelector('.tab-btn').classList.add('active');
    document.querySelector('.tab-content').classList.add('active');
});
