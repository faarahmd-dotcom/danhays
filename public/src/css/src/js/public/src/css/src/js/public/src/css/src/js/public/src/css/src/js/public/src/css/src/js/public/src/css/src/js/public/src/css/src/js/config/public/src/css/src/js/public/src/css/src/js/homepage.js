/* ===================================
   HOMEPAGE JAVASCRIPT
   Version 1.0
   =================================== */

// ===== HOMEPAGE DATA =====
const HOMEPAGE_PRODUCTS = [
    { id: 1, name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', price: 35, rating: 4.8, icon: '💄' },
    { id: 2, name: 'Black Opal Moisturizer', brand: 'Black Opal', price: 28, rating: 4.6, icon: '✨' },
    { id: 3, name: 'Gloss Bomb Liquid Lipstick', brand: 'Fenty Beauty', price: 26, rating: 4.6, icon: '💋' },
    { id: 4, name: 'Raw Shea Butter Shampoo', brand: 'SheaMoisture', price: 12, rating: 4.7, icon: '💇' },
    { id: 6, name: 'Pro Glow Highlighter', brand: 'Fenty Beauty', price: 30, rating: 4.7, icon: '💄' },
    { id: 7, name: 'MAC Fix+', brand: 'MAC', price: 22, rating: 4.6, icon: '💄' },
    { id: 9, name: 'Cantu Shea Butter Leave-In', brand: 'Cantu', price: 6.99, rating: 4.5, icon: '💇' },
    { id: 10, name: 'Eyeshadow Palette', brand: 'Urban Decay', price: 54, rating: 4.9, icon: '👁️' }
];

const HOMEPAGE_BRANDS = [
    { name: 'Fenty Beauty', icon: '👑', products: 145 },
    { name: 'SheaMoisture', icon: '🌿', products: 89 },
    { name: 'Black Opal', icon: '💎', products: 56 },
    { name: 'MAC', icon: '💄', products: 234 },
    { name: 'NYX Professional', icon: '✨', products: 178 }
];

const TESTIMONIALS = [
    {
        text: 'Finally found my perfect shade! The AI shade finder is incredibly accurate.',
        author: 'Zainab M.',
        role: 'Verified Buyer',
        rating: 5
    },
    {
        text: 'DANHAYS has changed my beauty routine. The curation is impeccable for my skin tone.',
        author: 'Amara K.',
        role: 'Beauty Enthusiast',
        rating: 5
    },
    {
        text: 'The Melanin Rewards program is amazing! I earn points on every purchase.',
        author: 'Tasha L.',
        role: 'Gold Member',
        rating: 5
    }
];

// ===== HOMEPAGE MANAGER =====
class HomepageManager {
    constructor() {
        this.currentSlide = 0;
        this.slideInterval = null;
        this.init();
    }

    init() {
        this.renderProducts();
        this.renderBrands();
        this.renderTestimonials();
        this.setupEventListeners();
        this.startSlideshow();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    renderProducts() {
        const container = document.getElementById('bestsellerCarousel');
        let html = '';

        HOMEPAGE_PRODUCTS.forEach(product => {
            const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
            html += `
                <div class="product-card-home" onclick="viewProduct(${product.id})">
                    <div class="product-image">${product.icon}</div>
                    <div class="product-content">
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">${stars}</div>
                        <div class="product-price">€${product.price}</div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderBrands() {
        const container = document.getElementById('brandsCarousel');
        let html = '';

        HOMEPAGE_BRANDS.forEach(brand => {
            html += `
                <div class="brand-card-home" onclick="goToBrandPage('${brand.name}')">
                    <div class="brand-logo-home">${brand.icon}</div>
                    <h3 class="brand-name-home">${brand.name}</h3>
                    <p class="brand-description">${brand.products} products</p>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderTestimonials() {
        const container = document.getElementById('testimonialsCarousel');
        let html = '';

        TESTIMONIALS.forEach(testimonial => {
            const stars = '★'.repeat(testimonial.rating);
            html += `
                <div class="testimonial-card">
                    <div class="testimonial-stars">${stars}</div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">${testimonial.author}</div>
                    <div class="testimonial-role">${testimonial.role}</div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    setupEventListeners() {
        // Newsletter form
        document.getElementById('newsletterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}!`);
            e.target.reset();
        });

        // Search button
        document.getElementById('searchBtn').addEventListener('click', () => {
            const query = prompt('Search for products, brands, or categories:');
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    startSlideshow() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    nextSlide() {
        this.goToSlide((this.currentSlide + 1) % 3);
    }

    goToSlide(n) {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[n].classList.add('active');
        dots[n].classList.add('active');

        this.currentSlide = n;

        // Reset interval
        clearInterval(this.slideInterval);
        this.startSlideshow();
    }
}

// ===== GLOBAL HELPER FUNCTIONS =====
function viewProduct(productId) {
    window.location.href = `/product-detail.html?id=${productId}`;
}

function goToBrandPage(brandName) {
    window.location.href = `/brands.html?brand=${encodeURIComponent(brandName)}`;
}

function goToSlide(n) {
    if (homepageManager) {
        homepageManager.goToSlide(n);
    }
}

// ===== INITIALIZATION =====
let homepageManager;
document.addEventListener('DOMContentLoaded', () => {
    homepageManager = new HomepageManager();
});
