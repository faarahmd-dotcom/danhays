/* ===================================
   PRODUCT DETAIL PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== EXTENDED PRODUCTS DATA =====
const DETAILED_PRODUCTS = {
    1: {
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
        description: 'Full-coverage foundation with 40+ inclusive shades designed to match every skin tone perfectly.',
        badge: null,
        stock: 150,
        size: '30ml',
        details: 'The Pro Filt\'r Foundation is engineered with an innovative technology that ensures seamless blending and a flawless, photogenic finish. Available in 40+ shades that celebrate all skin tones and undertones.',
        ingredients: 'Water, Glycerin, Silica, Calcium Carbonate, Mica, CI 77891 (Titanium Dioxide), and more...',
        howToUse: '1. Apply a small amount to the center of your face\n2. Blend outward with a brush or sponge\n3. Build coverage as needed\n4. Set with powder if desired',
        reviews: [
            {
                author: 'Sarah M.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Finally found my perfect shade! The coverage is amazing and lasts all day.'
            },
            {
                author: 'Jessica T.',
                rating: 5,
                date: '1 month ago',
                text: 'Love the inclusive shade range. Blends beautifully and doesn\'t feel heavy on the skin.'
            },
            {
                author: 'Maria G.',
                rating: 4,
                date: '2 months ago',
                text: 'Great foundation overall. Perfect for all skin types and long-lasting.'
            }
        ],
        relatedProducts: [4, 10, 6]
    },
    2: {
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
        description: 'Premium moisturizer specifically formulated for melanin-rich skin with natural ingredients.',
        badge: 'new',
        stock: 200,
        size: '100ml',
        details: 'Black Opal Moisturizer is a luxurious blend of natural oils and butters that deeply hydrate and nourish melanin-rich skin. Formulated to address hyperpigmentation and uneven skin tone.',
        ingredients: 'Shea Butter, Coconut Oil, Vitamin E, Aloe Vera, and botanical extracts...',
        howToUse: '1. Cleanse your face thoroughly\n2. Apply a small amount to face and neck\n3. Massage gently in upward motions\n4. Use morning and night for best results',
        reviews: [
            {
                author: 'Aisha K.',
                rating: 5,
                date: '3 weeks ago',
                text: 'My skin has never looked better! This moisturizer is truly made for our skin.'
            },
            {
                author: 'Tasha L.',
                rating: 5,
                date: '1 month ago',
                text: 'Hydrating without being greasy. Perfect for combination skin.'
            },
            {
                author: 'Diamond M.',
                rating: 4,
                date: '2 months ago',
                text: 'Love the brand and quality. A bit pricey but worth it.'
            }
        ],
        relatedProducts: [7, 12, 2]
    },
    3: {
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
        description: 'Restorative shampoo with raw shea butter and other natural ingredients for healthy, nourished hair.',
        badge: 'new',
        stock: 300,
        size: '237ml',
        details: 'SheaMoisture Raw Shea Butter Restorative Shampoo gently cleanses while providing deep moisture. Formulated with raw shea butter, coconut oil, and argan oil to nourish all hair types.',
        ingredients: 'Water, Sodium Lauryl Sulfate, Coconut Oil, Raw Shea Butter, Argan Oil, and botanical extracts...',
        howToUse: '1. Wet hair with warm water\n2. Apply shampoo to scalp\n3. Massage gently for 1-2 minutes\n4. Rinse thoroughly with water\n5. Follow with conditioner',
        reviews: [
            {
                author: 'Keisha P.',
                rating: 5,
                date: '1 week ago',
                text: 'My natural curls have never felt better. This shampoo is essential to my routine.'
            },
            {
                author: 'Maya L.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Leaves my hair soft and hydrated. Love supporting a Black-owned brand!'
            },
            {
                author: 'Nia G.',
                rating: 4,
                date: '1 month ago',
                text: 'Great quality but a bit pricey. Still a good product.'
            }
        ],
        relatedProducts: [5, 9, 3]
    },
    4: {
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
        description: 'Stunning liquid highlighter that gives you an instant glow in multiple shades.',
        badge: null,
        stock: 120,
        size: '15ml',
        details: 'Pro Glow Highlighter delivers an instant luminous glow with a lightweight liquid formula. Available in 5 universally flattering shades that complement all skin tones.',
        ingredients: 'Water, Glycerin, Mica, CI 77891 (Titanium Dioxide), and natural colorants...',
        howToUse: '1. Apply to high points of the face\n2. Blend with brush or fingertips\n3. Build coverage for more intense glow\n4. Can be mixed with foundation for a glowing base',
        reviews: [
            {
                author: 'Lisa R.',
                rating: 5,
                date: '1 week ago',
                text: 'The glow is absolutely stunning! Lasts all day without looking patchy.'
            },
            {
                author: 'Amanda K.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Perfect highlighter for all skin tones. Blends beautifully.'
            },
            {
                author: 'Nicole S.',
                rating: 4,
                date: '1 month ago',
                text: 'Great product. A bit goes a long way.'
            }
        ],
        relatedProducts: [1, 6, 10]
    },
    5: {
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
        description: 'Curl-enhancing smoothie that defines and moisturizes curls without crunchiness.',
        badge: 'sale',
        stock: 180,
        size: '340g',
        details: 'Coconut & Hibiscus Curl Enhancing Smoothie combines coconut oil, hibiscus, and silk proteins to define, enhance, and moisturize curls naturally. Perfect for all curl types.',
        ingredients: 'Water, Coconut Oil, Hibiscus Flower, Silk Amino Acids, and natural botanicals...',
        howToUse: '1. Apply to damp hair\n2. Work through curls from root to tip\n3. Style as desired\n4. Use on damp or dry hair for maintenance',
        reviews: [
            {
                author: 'Zara M.',
                rating: 5,
                date: '5 days ago',
                text: 'Best curl cream! Defines my curls perfectly without flaking.'
            },
            {
                author: 'Brittany T.',
                rating: 5,
                date: '2 weeks ago',
                text: 'My curls have so much definition now. Highly recommend!'
            },
            {
                author: 'Tanya K.',
                rating: 4,
                date: '1 month ago',
                text: 'Great product. A little goes a long way.'
            }
        ],
        relatedProducts: [3, 9, 8]
    },
    6: {
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
        description: 'Long-lasting liquid lipstick with a glossy finish that lasts all day.',
        badge: null,
        stock: 250,
        size: '5.5ml',
        details: 'Gloss Bomb Liquid Lipstick combines pigmentation with a glossy finish. Available in 10+ universally flattering shades that work beautifully on all skin tones.',
        ingredients: 'Water, Glycerin, CI 45410 (Red colorant), and film formers...',
        howToUse: '1. Apply to clean lips\n2. Use the wand applicator for precise application\n3. Build coverage as needed\n4. Allow to dry for long-lasting wear',
        reviews: [
            {
                author: 'Monica P.',
                rating: 5,
                date: '1 week ago',
                text: 'Gorgeous color and formula! Stays on all day.'
            },
            {
                author: 'Rachel H.',
                rating: 4,
                date: '2 weeks ago',
                text: 'Love the glossy finish. Reapply occasionally for best results.'
            },
            {
                author: 'Sophie J.',
                rating: 4,
                date: '1 month ago',
                text: 'Beautiful colors available. Great quality.'
            }
        ],
        relatedProducts: [1, 4, 10]
    },
    7: {
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
        description: 'Intensive nighttime treatment serum for deep skin rejuvenation.',
        badge: null,
        stock: 90,
        size: '50ml',
        details: 'Black Opal Night Treatment is an intensive serum formulated with potent ingredients to target hyperpigmentation and promote even skin tone while you sleep.',
        ingredients: 'Niacinamide, Vitamin C, Retinol, Shea Butter, and antioxidants...',
        howToUse: '1. Cleanse and pat dry\n2. Apply serum to face and neck\n3. Follow with night moisturizer\n4. Use 4-5 times per week for best results',
        reviews: [
            {
                author: 'Grace L.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Skin looks so much brighter and more even. Love this serum!'
            },
            {
                author: 'Amber K.',
                rating: 4,
                date: '1 month ago',
                text: 'Good product. Results show after consistent use.'
            }
        ],
        relatedProducts: [2, 12, 7]
    },
    8: {
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
        description: 'Professional-quality lip gloss in 20+ shades at an affordable price.',
        badge: 'new',
        stock: 500,
        size: '3ml',
        details: 'NYX Lip Gloss offers professional-quality formulation at an affordable price. Available in 20+ flattering shades with a smooth, non-sticky formula.',
        ingredients: 'Water, Glycerin, CI 45410, and natural oils...',
        howToUse: '1. Apply directly to lips or use with lip brush\n2. Build coverage as desired\n3. Can be layered over lipstick',
        reviews: [
            {
                author: 'Jennifer M.',
                rating: 5,
                date: '1 week ago',
                text: 'Amazing quality for the price! Beautiful colors.'
            },
            {
                author: 'Ashley T.',
                rating: 4,
                date: '2 weeks ago',
                text: 'Good lip gloss. Slight stickiness but it passes quickly.'
            }
        ],
        relatedProducts: [6, 1, 4]
    },
    9: {
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
        description: 'Lightweight leave-in conditioner with shea butter for all curl types.',
        badge: null,
        stock: 400,
        size: '473ml',
        details: 'Cantu Shea Butter Leave-In Conditioning Repair Cream is a lightweight formula that moisturizes curls without weighing them down. Perfect for daily use on all curl patterns.',
        ingredients: 'Water, Shea Butter, Coconut Oil, Aloe Vera, and conditioning agents...',
        howToUse: '1. Apply to damp hair after shampooing\n2. Distribute evenly through curls\n3. Style as desired\n4. Can also be used on dry hair for refreshing',
        reviews: [
            {
                author: 'Monique D.',
                rating: 5,
                date: '1 week ago',
                text: 'Best affordable leave-in conditioner! My curls are so hydrated.'
            },
            {
                author: 'Shanice R.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Lightweight and effective. Doesn\'t make curls crunchy.'
            }
        ],
        relatedProducts: [3, 5, 9]
    },
    10: {
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
        description: 'Professional makeup fixing spray that sets makeup and extends wear time.',
        badge: null,
        stock: 200,
        size: '100ml',
        details: 'MAC Fix+ is a professional makeup setting spray used by makeup artists worldwide. It sets makeup and creates a luminous, natural-looking finish.',
        ingredients: 'Water, Glycerin, Panthenol, and humectants...',
        howToUse: '1. After completing makeup\n2. Spray in an X motion across the face\n3. Set with 4-5 spritzes\n4. Allow to dry naturally',
        reviews: [
            {
                author: 'Olivia S.',
                rating: 5,
                date: '1 week ago',
                text: 'Professional-grade spray! My makeup lasts all day.'
            },
            {
                author: 'Sophia M.',
                rating: 5,
                date: '2 weeks ago',
                text: 'A must-have for makeup lovers. Worth every penny!'
            }
        ],
        relatedProducts: [1, 4, 6]
    }
};

// ===== PRODUCT DETAIL PAGE MANAGER =====
class ProductDetailManager {
    constructor() {
        this.productId = this.getProductIdFromUrl();
        this.product = DETAILED_PRODUCTS[this.productId];

        if (!this.product) {
            this.showNotFound();
            return;
        }

        this.quantity = 1;
        this.init();
    }

    getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')) || 1;
    }

    init() {
        this.renderProductHeader();
        this.renderProductPricing();
        this.renderProductDetails();
        this.renderProductTabs();
        this.renderReviews();
        this.renderRelatedProducts();
        this.setupEventListeners();
        this.updateMetaTags();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    renderProductHeader() {
        document.getElementById('breadcrumbProduct').textContent = this.product.name;
        document.getElementById('breadcrumbBrand').textContent = this.product.brand;
        document.getElementById('breadcrumbBrand').href = `brand-detail.html?id=${this.product.brandId}`;

        document.getElementById('productName').textContent = this.product.name;
        document.getElementById('brandLink').textContent = this.product.brand;
        document.getElementById('brandLink').href = `brand-detail.html?id=${this.product.brandId}`;

        const stars = '⭐'.repeat(Math.round(this.product.rating));
        document.getElementById('ratingStars').textContent = stars;
        document.getElementById('productRating').textContent = this.product.rating;
        document.getElementById('productReviews').textContent = this.product.reviews.toLocaleString();

        if (this.product.badge) {
            const badge = document.getElementById('productBadge');
            badge.textContent = this.product.badge.toUpperCase();
            badge.className = `gallery-badge badge-${this.product.badge}`;
        }

        document.getElementById('productDescription').textContent = this.product.description;
    }

    renderProductPricing() {
        document.getElementById('productPrice').textContent = `€${this.product.price}`;

        if (this.product.originalPrice !== this.product.price) {
            document.getElementById('productPriceOriginal').textContent = `€${this.product.originalPrice}`;
            document.getElementById('productPriceOriginal').style.display = 'block';
            const discount = Math.round((1 - this.product.price / this.product.originalPrice) * 100);
            document.getElementById('priceDiscount').textContent = `-${discount}%`;
            document.getElementById('priceDiscount').style.display = 'block';
        }

        const stockStatus = document.getElementById('stockStatus');
        if (this.product.stock > 0) {
            stockStatus.textContent = this.product.stock > 10 ? 'In Stock' : `Only ${this.product.stock} left!`;
            if (this.product.stock < 10) {
                stockStatus.className = 'stock-status low';
            }
        } else {
            stockStatus.textContent = 'Out of Stock';
            stockStatus.className = 'stock-status low';
        }
    }

    renderProductDetails() {
        document.getElementById('brandName').textContent = this.product.brand;
        document.getElementById('productCategory').textContent = this.product.category.charAt(0).toUpperCase() + this.product.category.slice(1);
        document.getElementById('stockCount').textContent = this.product.stock > 0 ? `${this.product.stock} in stock` : 'Out of Stock';
        document.getElementById('productSize').textContent = this.product.size;
    }

    renderProductTabs() {
        document.getElementById('detailsContent').textContent = this.product.details;
        document.getElementById('ingredientsContent').textContent = this.product.ingredients;
        document.getElementById('howToUseContent').textContent = this.product.howToUse;
    }

    renderReviews() {
        const ratingNumber = this.product.rating;
        document.getElementById('reviewsRating').textContent = ratingNumber;

        const stars = '⭐'.repeat(Math.round(ratingNumber));
        document.getElementById('reviewsStars').textContent = stars;

        document.getElementById('reviewsCount').textContent = `Based on ${this.product.reviews.toLocaleString()} reviews`;

        const breakdown = document.getElementById('ratingBreakdown');
        const breakdownData = [
            { stars: 5, percentage: 65 },
            { stars: 4, percentage: 20 },
            { stars: 3, percentage: 10 },
            { stars: 2, percentage: 3 },
            { stars: 1, percentage: 2 }
        ];

        breakdown.innerHTML = breakdownData.map(item => `
            <div class="breakdown-item">
                <span class="breakdown-label">${item.stars}★</span>
                <div class="breakdown-bar">
                    <div class="breakdown-fill" style="width: ${item.percentage}%"></div>
                </div>
                <span class="breakdown-count">${Math.round(this.product.reviews * item.percentage / 100)}</span>
            </div>
        `).join('');

        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = this.product.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div>
                        <div class="review-author">${review.author}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                </div>
                <div class="review-text">${review.text}</div>
                <div class="review-helpful">
                    <button>👍 Helpful</button>
                    <button>👎 Not Helpful</button>
                </div>
            </div>
        `).join('');
    }

    renderRelatedProducts() {
        const grid = document.getElementById('relatedGrid');
        const relatedIds = this.product.relatedProducts || [];
        const relatedProducts = relatedIds.map(id => DETAILED_PRODUCTS[id]).filter(p => p);

        grid.innerHTML = relatedProducts.map(product => `
            <div class="related-product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="related-image">${product.image}</div>
                <div class="related-info">
                    <div class="related-brand">${product.brand}</div>
                    <div class="related-name">${product.name}</div>
                    <div class="related-price">€${product.price}</div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Quantity buttons
        document.getElementById('qtyMinus').addEventListener('click', () => {
            if (this.quantity > 1) {
              /* ===================================
   PRODUCT DETAIL PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== EXTENDED PRODUCTS DATA =====
const DETAILED_PRODUCTS = {
    1: {
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
        description: 'Full-coverage foundation with 40+ inclusive shades designed to match every skin tone perfectly.',
        badge: null,
        stock: 150,
        size: '30ml',
        details: 'The Pro Filt\'r Foundation is engineered with an innovative technology that ensures seamless blending and a flawless, photogenic finish. Available in 40+ shades that celebrate all skin tones and undertones.',
        ingredients: 'Water, Glycerin, Silica, Calcium Carbonate, Mica, CI 77891 (Titanium Dioxide), and more...',
        howToUse: '1. Apply a small amount to the center of your face\n2. Blend outward with a brush or sponge\n3. Build coverage as needed\n4. Set with powder if desired',
        reviews: [
            {
                author: 'Sarah M.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Finally found my perfect shade! The coverage is amazing and lasts all day.'
            },
            {
                author: 'Jessica T.',
                rating: 5,
                date: '1 month ago',
                text: 'Love the inclusive shade range. Blends beautifully and doesn\'t feel heavy on the skin.'
            },
            {
                author: 'Maria G.',
                rating: 4,
                date: '2 months ago',
                text: 'Great foundation overall. Perfect for all skin types and long-lasting.'
            }
        ],
        relatedProducts: [4, 10, 6]
    },
    2: {
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
        description: 'Premium moisturizer specifically formulated for melanin-rich skin with natural ingredients.',
        badge: 'new',
        stock: 200,
        size: '100ml',
        details: 'Black Opal Moisturizer is a luxurious blend of natural oils and butters that deeply hydrate and nourish melanin-rich skin. Formulated to address hyperpigmentation and uneven skin tone.',
        ingredients: 'Shea Butter, Coconut Oil, Vitamin E, Aloe Vera, and botanical extracts...',
        howToUse: '1. Cleanse your face thoroughly\n2. Apply a small amount to face and neck\n3. Massage gently in upward motions\n4. Use morning and night for best results',
        reviews: [
            {
                author: 'Aisha K.',
                rating: 5,
                date: '3 weeks ago',
                text: 'My skin has never looked better! This moisturizer is truly made for our skin.'
            },
            {
                author: 'Tasha L.',
                rating: 5,
                date: '1 month ago',
                text: 'Hydrating without being greasy. Perfect for combination skin.'
            },
            {
                author: 'Diamond M.',
                rating: 4,
                date: '2 months ago',
                text: 'Love the brand and quality. A bit pricey but worth it.'
            }
        ],
        relatedProducts: [7, 12, 2]
    },
    3: {
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
        description: 'Restorative shampoo with raw shea butter and other natural ingredients for healthy, nourished hair.',
        badge: 'new',
        stock: 300,
        size: '237ml',
        details: 'SheaMoisture Raw Shea Butter Restorative Shampoo gently cleanses while providing deep moisture. Formulated with raw shea butter, coconut oil, and argan oil to nourish all hair types.',
        ingredients: 'Water, Sodium Lauryl Sulfate, Coconut Oil, Raw Shea Butter, Argan Oil, and botanical extracts...',
        howToUse: '1. Wet hair with warm water\n2. Apply shampoo to scalp\n3. Massage gently for 1-2 minutes\n4. Rinse thoroughly with water\n5. Follow with conditioner',
        reviews: [
            {
                author: 'Keisha P.',
                rating: 5,
                date: '1 week ago',
                text: 'My natural curls have never felt better. This shampoo is essential to my routine.'
            },
            {
                author: 'Maya L.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Leaves my hair soft and hydrated. Love supporting a Black-owned brand!'
            },
            {
                author: 'Nia G.',
                rating: 4,
                date: '1 month ago',
                text: 'Great quality but a bit pricey. Still a good product.'
            }
        ],
        relatedProducts: [5, 9, 3]
    },
    4: {
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
        description: 'Stunning liquid highlighter that gives you an instant glow in multiple shades.',
        badge: null,
        stock: 120,
        size: '15ml',
        details: 'Pro Glow Highlighter delivers an instant luminous glow with a lightweight liquid formula. Available in 5 universally flattering shades that complement all skin tones.',
        ingredients: 'Water, Glycerin, Mica, CI 77891 (Titanium Dioxide), and natural colorants...',
        howToUse: '1. Apply to high points of the face\n2. Blend with brush or fingertips\n3. Build coverage for more intense glow\n4. Can be mixed with foundation for a glowing base',
        reviews: [
            {
                author: 'Lisa R.',
                rating: 5,
                date: '1 week ago',
                text: 'The glow is absolutely stunning! Lasts all day without looking patchy.'
            },
            {
                author: 'Amanda K.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Perfect highlighter for all skin tones. Blends beautifully.'
            },
            {
                author: 'Nicole S.',
                rating: 4,
                date: '1 month ago',
                text: 'Great product. A bit goes a long way.'
            }
        ],
        relatedProducts: [1, 6, 10]
    },
    5: {
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
        description: 'Curl-enhancing smoothie that defines and moisturizes curls without crunchiness.',
        badge: 'sale',
        stock: 180,
        size: '340g',
        details: 'Coconut & Hibiscus Curl Enhancing Smoothie combines coconut oil, hibiscus, and silk proteins to define, enhance, and moisturize curls naturally. Perfect for all curl types.',
        ingredients: 'Water, Coconut Oil, Hibiscus Flower, Silk Amino Acids, and natural botanicals...',
        howToUse: '1. Apply to damp hair\n2. Work through curls from root to tip\n3. Style as desired\n4. Use on damp or dry hair for maintenance',
        reviews: [
            {
                author: 'Zara M.',
                rating: 5,
                date: '5 days ago',
                text: 'Best curl cream! Defines my curls perfectly without flaking.'
            },
            {
                author: 'Brittany T.',
                rating: 5,
                date: '2 weeks ago',
                text: 'My curls have so much definition now. Highly recommend!'
            },
            {
                author: 'Tanya K.',
                rating: 4,
                date: '1 month ago',
                text: 'Great product. A little goes a long way.'
            }
        ],
        relatedProducts: [3, 9, 8]
    },
    6: {
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
        description: 'Long-lasting liquid lipstick with a glossy finish that lasts all day.',
        badge: null,
        stock: 250,
        size: '5.5ml',
        details: 'Gloss Bomb Liquid Lipstick combines pigmentation with a glossy finish. Available in 10+ universally flattering shades that work beautifully on all skin tones.',
        ingredients: 'Water, Glycerin, CI 45410 (Red colorant), and film formers...',
        howToUse: '1. Apply to clean lips\n2. Use the wand applicator for precise application\n3. Build coverage as needed\n4. Allow to dry for long-lasting wear',
        reviews: [
            {
                author: 'Monica P.',
                rating: 5,
                date: '1 week ago',
                text: 'Gorgeous color and formula! Stays on all day.'
            },
            {
                author: 'Rachel H.',
                rating: 4,
                date: '2 weeks ago',
                text: 'Love the glossy finish. Reapply occasionally for best results.'
            },
            {
                author: 'Sophie J.',
                rating: 4,
                date: '1 month ago',
                text: 'Beautiful colors available. Great quality.'
            }
        ],
        relatedProducts: [1, 4, 10]
    },
    7: {
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
        description: 'Intensive nighttime treatment serum for deep skin rejuvenation.',
        badge: null,
        stock: 90,
        size: '50ml',
        details: 'Black Opal Night Treatment is an intensive serum formulated with potent ingredients to target hyperpigmentation and promote even skin tone while you sleep.',
        ingredients: 'Niacinamide, Vitamin C, Retinol, Shea Butter, and antioxidants...',
        howToUse: '1. Cleanse and pat dry\n2. Apply serum to face and neck\n3. Follow with night moisturizer\n4. Use 4-5 times per week for best results',
        reviews: [
            {
                author: 'Grace L.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Skin looks so much brighter and more even. Love this serum!'
            },
            {
                author: 'Amber K.',
                rating: 4,
                date: '1 month ago',
                text: 'Good product. Results show after consistent use.'
            }
        ],
        relatedProducts: [2, 12, 7]
    },
    8: {
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
        description: 'Professional-quality lip gloss in 20+ shades at an affordable price.',
        badge: 'new',
        stock: 500,
        size: '3ml',
        details: 'NYX Lip Gloss offers professional-quality formulation at an affordable price. Available in 20+ flattering shades with a smooth, non-sticky formula.',
        ingredients: 'Water, Glycerin, CI 45410, and natural oils...',
        howToUse: '1. Apply directly to lips or use with lip brush\n2. Build coverage as desired\n3. Can be layered over lipstick',
        reviews: [
            {
                author: 'Jennifer M.',
                rating: 5,
                date: '1 week ago',
                text: 'Amazing quality for the price! Beautiful colors.'
            },
            {
                author: 'Ashley T.',
                rating: 4,
                date: '2 weeks ago',
                text: 'Good lip gloss. Slight stickiness but it passes quickly.'
            }
        ],
        relatedProducts: [6, 1, 4]
    },
    9: {
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
        description: 'Lightweight leave-in conditioner with shea butter for all curl types.',
        badge: null,
        stock: 400,
        size: '473ml',
        details: 'Cantu Shea Butter Leave-In Conditioning Repair Cream is a lightweight formula that moisturizes curls without weighing them down. Perfect for daily use on all curl patterns.',
        ingredients: 'Water, Shea Butter, Coconut Oil, Aloe Vera, and conditioning agents...',
        howToUse: '1. Apply to damp hair after shampooing\n2. Distribute evenly through curls\n3. Style as desired\n4. Can also be used on dry hair for refreshing',
        reviews: [
            {
                author: 'Monique D.',
                rating: 5,
                date: '1 week ago',
                text: 'Best affordable leave-in conditioner! My curls are so hydrated.'
            },
            {
                author: 'Shanice R.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Lightweight and effective. Doesn\'t make curls crunchy.'
            }
        ],
        relatedProducts: [3, 5, 9]
    },
    10: {
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
        description: 'Professional makeup fixing spray that sets makeup and extends wear time.',
        badge: null,
        stock: 200,
        size: '100ml',
        details: 'MAC Fix+ is a professional makeup setting spray used by makeup artists worldwide. It sets makeup and creates a luminous, natural-looking finish.',
        ingredients: 'Water, Glycerin, Panthenol, and humectants...',
        howToUse: '1. After completing makeup\n2. Spray in an X motion across the face\n3. Set with 4-5 spritzes\n4. Allow to dry naturally',
        reviews: [
            {
                author: 'Olivia S.',
                rating: 5,
                date: '1 week ago',
                text: 'Professional-grade spray! My makeup lasts all day.'
            },
            {
                author: 'Sophia M.',
                rating: 5,
                date: '2 weeks ago',
                text: 'A must-have for makeup lovers. Worth every penny!'
            }
        ],
        relatedProducts: [1, 4, 6]
    },
    11: {
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
        description: 'Lightweight translucent loose powder for setting makeup.',
        badge: null,
        stock: 160,
        size: '10g',
        details: 'Powder Me Loose is a translucent, finely-milled loose powder that sets makeup with a luminous finish. Available in multiple shades for all skin tones.',
        ingredients: 'Mica, Talc, Magnesium Stearate, and pigments...',
        howToUse: '1. Use a large fluffy brush\n2. Swirl into the powder\n3. Apply all over face to set makeup\n4. Use light hand for natural finish',
        reviews: [
            {
                author: 'Heather K.',
                rating: 5,
                date: '1 week ago',
                text: 'Perfect powder! Gives a luminous finish without looking chalky.'
            }
        ],
        relatedProducts: [1, 4, 6]
    },
    12: {
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
        description: 'Luxurious body oil for silky smooth skin.',
        badge: null,
        stock: 220,
        size: '200ml',
        details: 'Black Opal Body Oil is a luxurious blend of oils and butters that moisturize and nourish the entire body. Perfect for melanin-rich skin.',
        ingredients: 'Coconut Oil, Argan Oil, Shea Butter, Vitamin E, and essential oils...',
        howToUse: '1. Apply to damp skin after shower\n2. Massage gently\n3. Can be used daily\n4. Also great for massage',
        reviews: [
            {
                author: 'Tiffany R.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Skin feels so soft and hydrated. Love the scent!'
            }
        ],
        relatedProducts: [2, 7, 12]
    }
};

// ===== PRODUCT DETAIL PAGE MANAGER =====
class ProductDetailManager {
    constructor() {
        this.productId = this.getProductIdFromUrl();
        this.product = DETAILED_PRODUCTS[this.productId];

        if (!this.product) {
            this.showNotFound();
            return;
        }

        this.quantity = 1;
        this.init();
    }

    getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')) || 1;
    }

    init() {
        this.renderProductHeader();
        this.renderProductPricing();
        this.renderProductDetails();
        this.renderProductTabs();
        this.renderReviews();
        this.renderRelatedProducts();
        this.setupEventListeners();
        this.updateMetaTags();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    renderProductHeader() {
        document.getElementById('breadcrumbProduct').textContent = this.product.name;
        document.getElementById('breadcrumbBrand').textContent = this.product.brand;
        document.getElementById('breadcrumbBrand').href = `brand-detail.html?id=${this.product.brandId}`;

        document.getElementById('productName').textContent = this.product.name;
        document.getElementById('brandLink').textContent = this.product.brand;
        document.getElementById('brandLink').href = `brand-detail.html?id=${this.product.brandId}`;

        const stars = '⭐'.repeat(Math.round(this.product.rating));
        document.getElementById('ratingStars').textContent = stars;
        document.getElementById('productRating').textContent = this.product.rating;
        document.getElementById('productReviews').textContent = this.product.reviews.toLocaleString();

        if (this.product.badge) {
            const badge = document.getElementById('productBadge');
            badge.textContent = this.product.badge.toUpperCase();
            badge.className = `gallery-badge badge-${this.product.badge}`;
        }

        document.getElementById('productDescription').textContent = this.product.description;
    }

    renderProductPricing() {
        document.getElementById('productPrice').textContent = `€${this.product.price}`;

        if (this.product.originalPrice !== this.product.price) {
            document.getElementById('productPriceOriginal').textContent = `€${this.product.originalPrice}`;
            document.getElementById('productPriceOriginal').style.display = 'block';
            const discount = Math.round((1 - this.product.price / this.product.originalPrice) * 100);
            document.getElementById('priceDiscount').textContent = `-${discount}%`;
            document.getElementById('priceDiscount').style.display = 'block';
        }

        const stockStatus = document.getElementById('stockStatus');
        if (this.product.stock > 0) {
            stockStatus.textContent = this.product.stock > 10 ? 'In Stock' : `Only ${this.product.stock} left!`;
            if (this.product.stock < 10) {
                stockStatus.className = 'stock-status low';
            }
        } else {
            stockStatus.textContent = 'Out of Stock';
            stockStatus.className = 'stock-status low';
        }
    }

    renderProductDetails() {
        document.getElementById('brandName').textContent = this.product.brand;
        document.getElementById('productCategory').textContent = this.product.category.charAt(0).toUpperCase() + this.product.category.slice(1);
        document.getElementById('stockCount').textContent = this.product.stock > 0 ? `${this.product.stock} in stock` : 'Out of Stock';
        document.getElementById('productSize').textContent = this.product.size;
    }

    renderProductTabs() {
        document.getElementById('detailsContent').textContent = this.product.details;
        document.getElementById('ingredientsContent').textContent = this.product.ingredients;
        document.getElementById('howToUseContent').textContent = this.product.howToUse;

        // Tab click handlers
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                e.target.classList.add('active');
                document.querySelector(`[data-tab="${tabName}"]`).closest('.tab-content')?.classList.add('active') ||
                document.getElementById(tabName + 'Tab')?.classList.add('active');
            });
        });
    }

    renderReviews() {
        const ratingNumber = this.product.rating;
        document.getElementById('reviewsRating').textContent = ratingNumber;

        const stars = '⭐'.repeat(Math.round(ratingNumber));
        document.getElementById('reviewsStars').textContent = stars;

        document.getElementById('reviewsCount').textContent = `Based on ${this.product.reviews.toLocaleString()} reviews`;

        const breakdown = document.getElementById('ratingBreakdown');
        const breakdownData = [
            { stars: 5, percentage: 65 },
            { stars: 4, percentage: 20 },
            { stars: 3, percentage: 10 },
            { stars: 2, percentage: 3 },
            { stars: 1, percentage: 2 }
        ];

        breakdown.innerHTML = breakdownData.map(item => `
            <div class="breakdown-item">
                <span class="breakdown-label">${item.stars}★</span>
                <div class="breakdown-bar">
                    <div class="breakdown-fill" style="width: ${item.percentage}%"></div>
                </div>
                <span class="breakdown-count">${Math.round(this.product.reviews * item.percentage / 100)}</span>
            </div>
        `).join('');

        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = this.product.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div>
                        <div class="review-author">${review.author}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                </div>
                <div class="review-text">${review.text}</div>
                <div class="review-helpful">
                    <button>👍 Helpful</button>
                    <button>👎 Not Helpful</button>
                </div>
            </div>
        `).join('');
    }

    renderRelatedProducts() {
        const grid = document.getElementById('relatedGrid');
        const relatedIds = this.product.relatedProducts || [];
        const relatedProducts = relatedIds.map(id => DETAILED_PRODUCTS[id]).filter(p => p);

        grid.innerHTML = relatedProducts.map(product => `
            <div class="related-product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="related-image">${product.image}</div>
                <div class="related-info">
                    <div class="related-brand">${product.brand}</div>
                    <div class="related-name">${product.name}</div>
                    <div class="related-price">€${product.price}</div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Quantity buttons
        document.getElementById('qtyMinus').addEventListener('click', () => {
            if (this.quantity > 1) {
                this.quantity--;
                document.getElementById('quantity').value = this.quantity;
            }
        });

        document.getElementById('qtyPlus').addEventListener('click', () => {
            if (this.quantity < this.product.stock) {
                this.quantity++;
                document.getElementById('quantity').value = this.quantity;
            }
        });

        document.getElementById('quantity').addEventListener('change', (e) => {
            const val = parseInt(e.target.value);
            if (val > 0 && val <= this.product.stock) {
                this.quantity = val;
            } else {
                e.target.value = this.quantity;
            }
        });

        // Add to cart button
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            this.addToCart();
        });

        // Wishlist button
        document.getElementById('wishlistBtn').addEventListener('click', () => {
            this.toggleWishlist();
        });

        // Write review button
        document.getElementById('writeReviewBtn').addEventListener('click', () => {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.success('Review form coming soon!');
            } else {
                alert('Review form coming soon!');
            }
        });
    }

    addToCart() {
        if (this.product.stock <= 0) {
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.error('Product is out of stock');
            } else {
                alert('Product is out of stock');
            }
            return;
        }

        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.success(`Added ${this.quantity} ${this.product.name} to cart!`);
        } else {
            alert(`Added ${this.quantity} item(s) to cart!`);
        }
    }

    toggleWishlist() {
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.success(`${this.product.name} added to wishlist!`);
        } else {
            alert('Added to wishlist!');
        }
    }

    updateMetaTags() {
        document.title = `${this.product.name} | DANHAYS`;
        document.getElementById('pageDescription').content = this.product.description;
        document.getElementById('pageTitle').textContent = this.product.name;
        document.getElementById('ogTitle').content = this.product.name;
        document.getElementById('ogDescription').content = this.product.description;
    }

    showNotFound() {
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h1>Product Not Found</h1>
                <p>The product you're looking for doesn't exist.</p>
                <a href="products.html" class="btn btn-primary">Back to Products</a>
            </div>
        `;
    }
}

// ===== INITIALIZATION =====
let productDetail;
document.addEventListener('DOMContentLoaded', () => {
    productDetail = new ProductDetailManager();
});
