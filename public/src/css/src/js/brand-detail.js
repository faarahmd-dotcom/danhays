/* ===================================
   BRAND DETAIL PAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== EXTENDED BRANDS DATA =====
const BRANDS_DATA = {
    1: {
        id: 1,
        name: 'Fenty Beauty',
        tagline: "Rihanna's Beauty Revolution",
        description: 'Redefining beauty with 50+ shades for all skin tones',
        logo: '🎨',
        rating: 4.9,
        reviews: 5200,
        products: 180,
        founded: 2017,
        badges: [],
        type: ['inclusive', 'luxury'],
        specialty: ['makeup'],
        priceRange: 'premium',
        storyText: `Fenty Beauty was founded by Rihanna in 2017 as a beauty line to celebrate the diversity of all beauty. 
            The brand is known for its inclusive range of shades designed for all skin tones. With products like the PRO FILT'R 
            foundation available in 40+ shades and the Pro Glow Highlighter collection, Fenty Beauty revolutionized the makeup industry 
            by proving that inclusive beauty is both profitable and necessary.`,
        values: [
            { icon: '🌍', text: 'Inclusive beauty for all skin tones' },
            { icon: '✨', text: 'High-quality luxury formulations' },
            { icon: '💚', text: 'Cruelty-free and vegan options' }
        ],
        collections: [
            { name: 'Foundations & Base', icon: '🎨', count: 35 },
            { name: 'Eyes', icon: '👁️', count: 28 },
            { name: 'Lips', icon: '💋', count: 42 },
            { name: 'Skincare', icon: '✨', count: 15 }
        ],
        featuredProducts: [
            { name: 'Pro Filt\'r Foundation', price: '€35', rating: 4.8, reviews: 2100 },
            { name: 'Powder Me Loose Powder', price: '€32', rating: 4.7, reviews: 1800 },
            { name: 'Pro Glow Highlighter', price: '€30', rating: 4.9, reviews: 2500 },
            { name: 'Gloss Bomb Liquid Lipstick', price: '€26', rating: 4.6, reviews: 1600 }
        ],
        faqs: [
            {
                q: 'Are Fenty Beauty products cruelty-free?',
                a: 'Fenty Beauty is 100% cruelty-free. We do not test on animals and do not commission others to test on animals.'
            },
            {
                q: 'What shade should I choose?',
                a: 'Use our online shade finder tool or visit a beauty counter for professional shade matching. We have 40+ foundation shades.'
            },
            {
                q: 'Do you offer international shipping?',
                a: 'Yes, we ship to most countries worldwide. Check our shipping policy for details.'
            },
            {
                q: 'What is your return policy?',
                a: 'We offer 30-day returns on unused, unopened products with original packaging.'
            }
        ],
        reviews: [
            {
                author: 'Sarah M.',
                rating: 5,
                date: '2 weeks ago',
                text: 'The foundation is absolutely amazing! Finally found my perfect shade and the formula is flawless.'
            },
            {
                author: 'Jessica T.',
                rating: 5,
                date: '1 month ago',
                text: 'Love the inclusivity of this brand. The shade range is incredible and the quality is premium.'
            },
            {
                author: 'Maria G.',
                rating: 4,
                date: '2 months ago',
                text: 'Great products overall. The highlighter is stunning but a bit pricey.'
            }
        ]
    },
    2: {
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
        priceRange: 'mid',
        storyText: `Black Opal was founded in 1983 with a mission to create premium skincare products specifically formulated 
            for melanin-rich skin. For over 40 years, Black Opal has been trusted by millions of women to deliver results. 
            Our unique formula blends natural ingredients with advanced skincare science to address the specific needs of 
            dark and deeply pigmented skin.`,
        values: [
            { icon: '👩🏾', text: 'Black-owned and operated' },
            { icon: '🌿', text: 'Natural ingredients' },
            { icon: '💎', text: 'Formulated for melanin-rich skin' }
        ],
        collections: [
            { name: 'Daily Skincare', icon: '🧴', count: 12 },
            { name: 'Moisturizers', icon: '💧', count: 18 },
            { name: 'Serums & Treatments', icon: '✨', count: 15 },
            { name: 'Body Care', icon: '🧼', count: 20 }
        ],
        featuredProducts: [
            { name: 'Oil of Olay Moisturizer', price: '€28', rating: 4.7, reviews: 890 },
            { name: 'Black Opal Soap', price: '€12', rating: 4.8, reviews: 1200 },
            { name: 'Night Treatment', price: '€35', rating: 4.6, reviews: 650 },
            { name: 'Body Oil', price: '€18', rating: 4.7, reviews: 740 }
        ],
        faqs: [
            {
                q: 'Is Black Opal tested on animals?',
                a: 'No, Black Opal is 100% cruelty-free. We do not test on animals.'
            },
            {
                q: 'What makes Black Opal different?',
                a: 'Our products are specifically formulated for melanin-rich skin with ingredients that address hyperpigmentation and uneven skin tone.'
            },
            {
                q: 'Can I use Black Opal products with other brands?',
                a: 'Yes, our products work well with other skincare brands. We recommend patch testing first.'
            },
            {
                q: 'How long until I see results?',
                a: 'Most customers notice results within 4-6 weeks of consistent use.'
            }
        ],
        reviews: [
            {
                author: 'Aisha K.',
                rating: 5,
                date: '3 weeks ago',
                text: 'Been using Black Opal for 20 years. The quality and dedication to our skin is unmatched.'
            },
            {
                author: 'Tasha L.',
                rating: 5,
                date: '1 month ago',
                text: 'This brand understands melanin skin like no other. My skin has never looked better.'
            },
            {
                author: 'Diamond M.',
                rating: 4,
                date: '2 months ago',
                text: 'Love the brand and mission. A bit pricey but the quality justifies it.'
            }
        ]
    },
    3: {
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
        priceRange: 'mid',
        storyText: `SheaMoisture started in 1991 with a simple mission: to create hair care products that celebrate natural hair. 
            From humble beginnings in Jamaica, SheaMoisture has grown into a global phenomenon trusted by millions of people 
            who love their natural hair. Every product is crafted with premium natural ingredients like shea butter, coconut oil, 
            and argan oil to provide moisture and nourishment.`,
        values: [
            { icon: '🌍', text: 'Fair-trade natural ingredients' },
            { icon: '👩🏾', text: 'Black-owned beauty company' },
            { icon: '💚', text: 'Celebrates natural hair' }
        ],
        collections: [
            { name: 'Shampoos & Conditioners', icon: '🧴', count: 28 },
            { name: 'Hair Treatments', icon: '✨', count: 22 },
            { name: 'Styling Products', icon: '💇', count: 18 },
            { name: 'Body & Bath', icon: '🧼', count: 15 }
        ],
        featuredProducts: [
            { name: 'Raw Shea Butter Restorative Shampoo', price: '€12', rating: 4.8, reviews: 3200 },
            { name: 'Raw Shea Butter Restorative Conditioner', price: '€12', rating: 4.9, reviews: 3100 },
            { name: 'Coconut & Hibiscus Curl Enhancing Smoothie', price: '€14', rating: 4.7, reviews: 2800 },
            { name: 'Raw Shea Butter Restorative Masque', price: '€16', rating: 4.8, reviews: 2950 }
        ],
        faqs: [
            {
                q: 'Are SheaMoisture products all-natural?',
                a: 'Most SheaMoisture products contain predominantly natural ingredients. Check individual product labels for specific ingredient lists.'
            },
            {
                q: 'Is SheaMoisture good for all hair types?',
                a: 'Yes! We have products for all hair types and textures, from wavy to coily to textured hair.'
            },
            {
                q: 'Do you test on animals?',
                a: 'No, SheaMoisture is 100% cruelty-free and we never test on animals.'
            },
            {
                q: 'Where can I buy SheaMoisture?',
                a: 'SheaMoisture is available at major retailers, online stores, and directly from our website.'
            }
        ],
        reviews: [
            {
                author: 'Keisha P.',
                rating: 5,
                date: '1 week ago',
                text: 'My natural hair has never felt better! SheaMoisture is the best investment for healthy curls.'
            },
            {
                author: 'Maya L.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Love supporting a Black-owned company that truly cares about natural hair. Quality is top-notch!'
            },
            {
                author: 'Nia G.',
                rating: 4,
                date: '1 month ago',
                text: 'Great products but can be a bit heavy for my hair type. Still love the brand though!'
            }
        ]
    }
};

// ===== BRAND DETAIL PAGE MANAGER =====
class BrandDetailManager {
    constructor() {
        this.brandId = this.getBrandIdFromUrl();
        this.brand = BRANDS_DATA[this.brandId];
        
        if (!this.brand) {
            this.showNotFound();
            return;
        }
        
        this.init();
    }

    getBrandIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')) || 1;
    }

    init() {
        this.renderBrandHero();
        this.renderBrandOverview();
        this.renderCollections();
        this.renderFeaturedProducts();
        this.renderStory();
        this.renderReviews();
        this.renderFAQ();
        this.renderRelatedBrands();
        this.setupEventListeners();
        this.updateMetaTags();
        PreloaderManager.hide();
    }

    renderBrandHero() {
        document.getElementById('breadcrumbBrand').textContent = this.brand.name;
        document.getElementById('heroLogo').textContent = this.brand.logo;
        document.getElementById('brandName').textContent = this.brand.name;
        document.getElementById('brandTagline').textContent = this.brand.tagline;
        
        const badgesContainer = document.getElementById('heroBadges');
        badgesContainer.innerHTML = this.brand.badges.map(badge => 
            `<span class="hero-badge">${badge}</span>`
        ).join('');

        document.getElementById('brandRating').textContent = this.brand.rating;
        document.getElementById('brandReviews').textContent = (this.brand.reviews / 1000).toFixed(1) + 'k';
        document.getElementById('brandProducts').textContent = this.brand.products;
    }

    renderBrandOverview() {
        document.getElementById('brandDescription').textContent = this.brand.description;
        document.getElementById('brandFounded').textContent = this.brand.founded;
        document.getElementById('brandSpecialty').textContent = 
            this.brand.specialty.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
        document.getElementById('brandPriceRange').textContent = 
            this.brand.priceRange.charAt(0).toUpperCase() + this.brand.priceRange.slice(1);

        const valuesContainer = document.getElementById('brandValues');
        valuesContainer.innerHTML = this.brand.values.map(value => `
            <div class="value-item">
                <span class="value-icon">${value.icon}</span>
                <span class="value-text">${value.text}</span>
            </div>
        `).join('');
    }

    renderCollections() {
        const grid = document.getElementById('collectionsGrid');
        grid.innerHTML = this.brand.collections.map(collection => `
            <div class="collection-card">
                <div class="collection-header">${collection.icon}</div>
                <div class="collection-footer">
                    <div class="collection-name">${collection.name}</div>
                    <div class="collection-count">${collection.count} products</div>
                </div>
            </div>
        `).join('');
    }

    renderFeaturedProducts() {
        const carousel = document.getElementById('productsCarousel');
        carousel.innerHTML = this.brand.featuredProducts.map((product, idx) => `
            <div class="product-card" onclick="window.location.href='/product/${this.brand.id}-${idx}'">
                <div class="product-image">🛍️</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">
                        ⭐ ${product.rating} (${product.reviews})
                    </div>
                    <div class="product-price">${product.price}</div>
                    <button class="product-btn">View Product</button>
                </div>
            </div>
        `).join('');
    }

    renderStory() {
        document.getElementById('brandStory').textContent = this.brand.storyText;
        const highlights = document.getElementById('storyHighlights');
        highlights.innerHTML = this.brand.values.map(v => `<li>${v.text}</li>`).join('');
    }

    renderReviews() {
        const ratingNumber = this.brand.rating;
        document.getElementById('reviewsRating').textContent = ratingNumber;
        
        const stars = '⭐'.repeat(Math.round(ratingNumber));
        document.getElementById('reviewsStars').innerHTML = stars;
        
        document.getElementById('reviewsCount').textContent = 
            `Based on ${this.brand.reviews.toLocaleString()} reviews`;

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
                <span class="breakdown-count">${Math.round(this.brand.reviews * item.percentage / 100)}</span>
            </div>
        `).join('');

        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = this.brand.reviews.map(review => `
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

    renderFAQ() {
        const container = document.getElementById('faqContainer');
        container.innerHTML = this.brand.faqs.map((faq, idx) => `
            <div class="faq-item" data-faq-index="${idx}">
                <div class="faq-question">
                    <span>${faq.q}</span>
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">${faq.a}</div>
            </div>
        `).join('');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.querySelector('.faq-question').addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    renderRelatedBrands() {
        const grid = document.getElementById('relatedBrandsGrid');
        const relatedBrands = Object.values(BRANDS_DATA)
            .filter(b => b.id !== this.brand.id)
            .slice(0, 4);

        grid.innerHTML = relatedBrands.map(brand => `
            <div class="related-brand-card" onclick="window.location.href='/brand-detail.html?id=${brand.id}'">
                <div class="related-brand-logo">${brand.logo}</div>
                <div class="related-brand-info">
                    <div class="related-brand-name">${brand.name}</div>
                    <div class="related-brand-rating">⭐ ${brand.rating} (${brand.reviews})</div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.getElementById('shopBrandBtn').addEventListener('click', () => {
            window.location.href = `/shop?brand=${this.brand.id}`;
        });

        document.getElementById('followBrandBtn').addEventListener('click', () => {
            NotificationManager.success(`Following ${this.brand.name}!`);
        });

        document.getElementById('shareBrandBtn').addEventListener('click', () => {
            this.shareBrand();
        });
    }

    updateMetaTags() {
        document.title = `${this.brand.name} | DANHAYS`;
        document.getElementById('pageDescription').content = this.brand.description;
        document.getElementById('pageTitle').textContent = this.brand.name;
        document.getElementById('ogTitle').content = this.brand.name;
        document.getElementById('ogDescription').content = this.brand.description;
    }

    shareBrand() {
        const shareUrl = `${window.location.origin}/brand-detail.html?id=${this.brand.id}`;
        const shareText = `Check out ${this.brand.name} on DANHAYS!`;

        if (navigator.share) {
            navigator.share({
                title: this.brand.name,
                text: shareText,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);
            NotificationManager.success('Link copied to clipboard!');
        }
    }

    showNotFound() {
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h1>Brand Not Found</h1>
                <p>The brand you're looking for doesn't exist.</p>
                <a href="/brands.html" class="btn btn-primary">Back to Brands</a>
            </div>
        `;
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    new BrandDetailManager();
});
