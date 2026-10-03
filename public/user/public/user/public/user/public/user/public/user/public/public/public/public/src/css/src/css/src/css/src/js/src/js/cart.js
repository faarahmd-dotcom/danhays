/* ===================================
   DANHAYS - CART FUNCTIONALITY
   Shopping cart operations
   =================================== */

const CartPage = {
  init: () => {
    CartPage.renderCart();
    CartPage.setupEventListeners();
  },

  renderCart: () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.querySelector('.empty-cart');

    if (Cart.items.length === 0) {
      if (cartItemsContainer) cartItemsContainer.style.display = 'none';
      if (emptyCart) emptyCart.style.display = 'block';
      return;
    }

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = Cart.items.map((item, index) => `
        <div class="cart-item">
          <div class="item-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0e6d2' width='100' height='100'/%3E%3Ctext x='50%' y='50%' font-size='40' fill='%23D4AF37' text-anchor='middle' dy='.3em'%3E💄%3C/text%3E%3C/svg%3E" alt="${item.name}">
          </div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <p class="brand">${item.brand || 'Brand'}</p>
            <p class="variant">${item.variant || ''}</p>
          </div>
          <div class="item-price">
            <span class="price">${Utils.formatPrice(item.price)}</span>
          </div>
          <div class="item-quantity">
            <button class="qty-btn" onclick="CartPage.updateQty(${index}, -1)">−</button>
            <input type="number" value="${item.quantity}" min="1" max="10" class="qty-input" data-index="${index}">
            <button class="qty-btn" onclick="CartPage.updateQty(${index}, 1)">+</button>
          </div>
          <div class="item-total">
            <span class="total">${Utils.formatPrice(item.price * item.quantity)}</span>
          </div>
          <button class="remove-btn" onclick="CartPage.removeItem(${index})">🗑️</button>
        </div>
      `).join('');
    }

    CartPage.updateSummary();
  },

  updateQty: (index, change) => {
    if (Cart.items[index]) {
      Cart.items[index].quantity = Math.max(1, Cart.items[index].quantity + change);
      Cart.save();
      CartPage.renderCart();
    }
  },

  removeItem: (index) => {
    Cart.items.splice(index, 1);
    Cart.save();
    CartPage.renderCart();
  },

  updateSummary: () => {
    const subtotal = Cart.getTotal();
    const tax = subtotal * 0.21;
    const shipping = subtotal >= 75 ? 0 : 10;
    const total = subtotal + tax + shipping;

    if (document.getElementById('subtotal')) {
      document.getElementById('subtotal').textContent = Utils.formatPrice(subtotal);
    }
    if (document.getElementById('tax')) {
      document.getElementById('tax').textContent = Utils.formatPrice(tax);
    }
    if (document.getElementById('shipping')) {
      document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : Utils.formatPrice(shipping);
    }
    if (document.getElementById('total')) {
      document.getElementById('total').textContent = Utils.formatPrice(total);
    }

    Cart.updateBadge();
  },

  setupEventListeners: () => {
    const clearBtn = document.getElementById('clearCartBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear your cart?')) {
          Cart.clear();
          CartPage.renderCart();
        }
      });
    }

    const checkoutBtn = document.querySelector('[href="checkout.html"]');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        if (Cart.items.length === 0) {
          e.preventDefault();
          Notify.error('Please add items to your cart');
        }
      });
    }
  }
};

// Initialize cart page
if (document.body.classList.contains('cart-page') || window.location.pathname.includes('cart.html')) {
  document.addEventListener('DOMContentLoaded', CartPage.init);
}
