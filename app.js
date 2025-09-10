// ShivNanadi Dairy Farm E-commerce Application JavaScript

// Product data from the farm
const productData = {
  "farmInfo": {
    "name": "ShivNanadi Dairy Faram",
    "parentBrand": "VARDHA",
    "location": "Kolar District, Karnataka",
    "established": "2020",
    "description": "A traditional dairy farm committed to providing fresh, organic milk and cow products directly from our farm to your doorstep.",
    "story": "Started as a small family business in Kolar district, ShivNanadi Dairy Farm has been serving the community with fresh, high-quality dairy products. As a unit of VARDHA, we maintain the highest standards of animal care and product quality.",
    "contact": {
      "phone": "+91 98765 43210",
      "email": "info@shivnanadidairy.com",
      "address": "Village Road, Near Temple, Kolar District, Karnataka 563101"
    }
  },
  "products": [
    {
      "id": 1,
      "name": "Fresh A2 Cow Milk",
      "category": "Milk Products",
      "price": 60,
      "unit": "per liter",
      "image": "🥛",
      "description": "Pure A2 cow milk from desi cows, delivered fresh daily. Rich in nutrients and completely natural.",
      "features": ["100% Pure", "No Preservatives", "A2 Protein", "Daily Fresh"],
      "inStock": true,
      "rating": 4.8,
      "reviews": 156
    },
    {
      "id": 2,
      "name": "Organic Cow Ghee",
      "category": "Milk Products",
      "price": 800,
      "unit": "per kg",
      "image": "🧈",
      "description": "Traditional bilona method ghee made from A2 cow milk. Golden, aromatic, and full of nutrients.",
      "features": ["Bilona Method", "A2 Cow Milk", "No Additives", "Traditional Process"],
      "inStock": true,
      "rating": 4.9,
      "reviews": 89
    },
    {
      "id": 3,
      "name": "Fresh Paneer",
      "category": "Milk Products",
      "price": 350,
      "unit": "per kg",
      "image": "🧀",
      "description": "Soft, fresh paneer made daily from our farm's pure milk. Perfect for your daily cooking needs.",
      "features": ["Made Daily", "Soft Texture", "Pure Milk", "No Preservatives"],
      "inStock": true,
      "rating": 4.7,
      "reviews": 203
    },
    {
      "id": 4,
      "name": "Organic Cow Dung Manure - 5kg",
      "category": "Cow Dung Fertilizer",
      "price": 150,
      "unit": "per 5kg bag",
      "image": "🌱",
      "description": "Premium quality composted cow dung manure, perfect for organic farming and gardening. Rich in NPK nutrients.",
      "features": ["100% Organic", "Composted 6 Months", "Weed Free", "Rich in NPK"],
      "inStock": true,
      "rating": 4.6,
      "reviews": 134
    },
    {
      "id": 5,
      "name": "Organic Cow Dung Manure - 25kg",
      "category": "Cow Dung Fertilizer",
      "price": 600,
      "unit": "per 25kg bag",
      "image": "🌿",
      "description": "Bulk pack of premium composted cow dung manure for large gardens and farming. Excellent soil conditioner.",
      "features": ["100% Organic", "Bulk Pack", "Cost Effective", "Soil Conditioner"],
      "inStock": true,
      "rating": 4.7,
      "reviews": 78
    },
    {
      "id": 6,
      "name": "Organic Cow Dung Manure - 50kg",
      "category": "Cow Dung Fertilizer",
      "price": 1100,
      "unit": "per 50kg bag",
      "image": "🌾",
      "description": "Extra large pack of composted cow dung manure for commercial farming and large-scale gardening projects.",
      "features": ["Commercial Size", "100% Organic", "Best Value", "Professional Grade"],
      "inStock": true,
      "rating": 4.8,
      "reviews": 45
    },
    {
      "id": 7,
      "name": "Oat Milk Alternative",
      "category": "Milk Substitutes",
      "price": 120,
      "unit": "per liter",
      "image": "🌾",
      "description": "Creamy oat milk made from premium oats. Perfect dairy alternative for lactose intolerant customers.",
      "features": ["Lactose Free", "Plant Based", "Creamy Texture", "Healthy Alternative"],
      "inStock": true,
      "rating": 4.4,
      "reviews": 92
    },
    {
      "id": 8,
      "name": "Almond Milk Alternative",
      "category": "Milk Substitutes",
      "price": 150,
      "unit": "per liter",
      "image": "🥛",
      "description": "Rich and nutty almond milk made from California almonds. Naturally sweet and nutritious.",
      "features": ["100% Natural", "No Added Sugar", "Rich in Vitamin E", "Vegan Friendly"],
      "inStock": true,
      "rating": 4.5,
      "reviews": 67
    },
    {
      "id": 9,
      "name": "Coconut Milk Alternative",
      "category": "Milk Substitutes",
      "price": 130,
      "unit": "per liter",
      "image": "🥥",
      "description": "Traditional coconut milk extracted from fresh coconuts. Rich, creamy, and naturally sweet.",
      "features": ["Fresh Coconut", "Traditional Method", "Rich & Creamy", "Natural Sweetness"],
      "inStock": true,
      "rating": 4.6,
      "reviews": 83
    }
  ]
};

// Application state
let cart = [];
let currentUser = null;
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const elements = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  initializeApp();
});

function initializeElements() {
  elements.productsGrid = document.getElementById('productsGrid');
  elements.cartBtn = document.getElementById('cartBtn');
  elements.cartCount = document.getElementById('cartCount');
  elements.cartModal = document.getElementById('cartModal');
  elements.cartItems = document.getElementById('cartItems');
  elements.cartTotal = document.getElementById('cartTotal');
  elements.productModal = document.getElementById('productModal');
  elements.productModalTitle = document.getElementById('productModalTitle');
  elements.productModalContent = document.getElementById('productModalContent');
  elements.loginModal = document.getElementById('loginModal');
  elements.searchInput = document.getElementById('searchInput');
  elements.searchBtn = document.getElementById('searchBtn');
  elements.contactForm = document.getElementById('contactForm');
  elements.loginForm = document.getElementById('loginForm');
  elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
  elements.mainNav = document.getElementById('mainNav');
  elements.productFilters = document.getElementById('productFilters');
  elements.checkoutBtn = document.getElementById('checkoutBtn');
  elements.clearCartBtn = document.getElementById('clearCart');
}

function initializeApp() {
  renderProducts();
  setupEventListeners();
  updateCartUI();
}

// Event Listeners Setup
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Mobile menu
  if (elements.mobileMenuBtn) {
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Search functionality
  if (elements.searchBtn) {
    elements.searchBtn.addEventListener('click', handleSearch);
  }
  if (elements.searchInput) {
    elements.searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleSearch();
    });
  }

  // Cart modal
  if (elements.cartBtn) {
    elements.cartBtn.addEventListener('click', openCartModal);
  }
  
  const closeCartModalBtn = document.getElementById('closeCartModal');
  if (closeCartModalBtn) {
    closeCartModalBtn.addEventListener('click', closeCartModal);
  }

  // Product modal
  const closeProductModalBtn = document.getElementById('closeProductModal');
  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener('click', closeProductModal);
  }

  // Login modal
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', openLoginModal);
  }
  
  const closeLoginModalBtn = document.getElementById('closeLoginModal');
  if (closeLoginModalBtn) {
    closeLoginModalBtn.addEventListener('click', closeLoginModal);
  }

  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      filterProducts(category);
      scrollToSection('products');
    });
  });

  // Product filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      filterProducts(filter);
      
      // Update active state
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Forms
  if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', handleContactSubmit);
  }
  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', handleLoginSubmit);
  }

  // Cart actions
  if (elements.clearCartBtn) {
    elements.clearCartBtn.addEventListener('click', clearCart);
  }
  if (elements.checkoutBtn) {
    elements.checkoutBtn.addEventListener('click', handleCheckout);
  }

  // Modal backdrop clicks
  document.querySelectorAll('.modal__backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', function() {
      this.closest('.modal').classList.add('hidden');
    });
  });
}

// Product rendering
function renderProducts(productsToRender = productData.products) {
  if (!elements.productsGrid) return;

  elements.productsGrid.innerHTML = '';

  productsToRender.forEach(product => {
    const productCard = createProductCard(product);
    elements.productsGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category = product.category;
  
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  
  card.innerHTML = `
    <div class="product-card__image">${product.image}</div>
    <div class="product-card__content">
      <div class="product-card__category">${product.category}</div>
      <h3 class="product-card__title">${product.name}</h3>
      <div class="product-card__price">₹${product.price} ${product.unit}</div>
      <div class="product-rating">
        <span class="stars">${stars}</span>
        <span class="rating-text">(${product.reviews} reviews)</span>
      </div>
      <p class="product-card__description">${product.description}</p>
      <div class="product-card__quantity">
        <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
        <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1">
        <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
      </div>
      <div class="product-card__actions">
        <button class="btn btn--primary" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="btn btn--outline" onclick="viewProductDetails(${product.id})">View Details</button>
      </div>
    </div>
  `;
  
  return card;
}

// Product filtering and search
function filterProducts(filter) {
  currentFilter = filter;
  let filteredProducts = productData.products;
  
  if (filter !== 'all') {
    filteredProducts = productData.products.filter(product => product.category === filter);
  }
  
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  renderProducts(filteredProducts);
}

function handleSearch() {
  searchQuery = elements.searchInput?.value || '';
  filterProducts(currentFilter);
}

// Cart functionality
function addToCart(productId) {
  const product = productData.products.find(p => p.id === productId);
  const quantityInput = document.getElementById(`qty-${productId}`);
  const quantity = parseInt(quantityInput?.value || 1);
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  updateCartUI();
  showNotification(`Added ${product.name} to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  renderCartItems();
}

function updateCartQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      updateCartUI();
      renderCartItems();
    }
  }
}

function changeQuantity(productId, change) {
  const input = document.getElementById(`qty-${productId}`);
  if (input) {
    const newValue = Math.max(1, parseInt(input.value) + change);
    input.value = newValue;
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (elements.cartCount) {
    elements.cartCount.textContent = totalItems;
  }
  
  if (elements.cartTotal) {
    elements.cartTotal.textContent = totalPrice.toFixed(2);
  }
}

function clearCart() {
  cart = [];
  updateCartUI();
  renderCartItems();
  showNotification('Cart cleared!');
}

// Modal functionality
function openCartModal() {
  if (elements.cartModal) {
    elements.cartModal.classList.remove('hidden');
    renderCartItems();
  }
}

function closeCartModal() {
  if (elements.cartModal) {
    elements.cartModal.classList.add('hidden');
  }
}

function renderCartItems() {
  if (!elements.cartItems) return;
  
  if (cart.length === 0) {
    elements.cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    return;
  }
  
  elements.cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item__image">${item.image}</div>
      <div class="cart-item__details">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">₹${item.price} ${item.unit}</div>
      </div>
      <div class="cart-item__quantity">
        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
      </div>
      <button class="cart-item__remove" onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');
}

function viewProductDetails(productId) {
  const product = productData.products.find(p => p.id === productId);
  if (!product || !elements.productModal || !elements.productModalTitle || !elements.productModalContent) return;
  
  elements.productModalTitle.textContent = product.name;
  
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  
  elements.productModalContent.innerHTML = `
    <div class="product-details">
      <div class="product-details__image">${product.image}</div>
      <div class="product-details__info">
        <h2>${product.name}</h2>
        <div class="product-details__category">${product.category}</div>
        <div class="product-details__price">₹${product.price} ${product.unit}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <p class="product-details__description">${product.description}</p>
        <div class="product-details__features">
          <h4>Features:</h4>
          <div class="product-features">
            ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
          </div>
        </div>
        <div class="product-card__quantity">
          <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
          <input type="number" class="quantity-input" id="qty-modal-${product.id}" value="1" min="1">
          <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
        </div>
        <div class="product-card__actions" style="margin-top: 1rem;">
          <button class="btn btn--primary" onclick="addToCartFromModal(${product.id}); closeProductModal();">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
  
  elements.productModal.classList.remove('hidden');
}

function addToCartFromModal(productId) {
  const product = productData.products.find(p => p.id === productId);
  const quantityInput = document.getElementById(`qty-modal-${productId}`);
  const quantity = parseInt(quantityInput?.value || 1);
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  updateCartUI();
  showNotification(`Added ${product.name} to cart!`);
}

function closeProductModal() {
  if (elements.productModal) {
    elements.productModal.classList.add('hidden');
  }
}

function openLoginModal() {
  if (elements.loginModal) {
    elements.loginModal.classList.remove('hidden');
  }
}

function closeLoginModal() {
  if (elements.loginModal) {
    elements.loginModal.classList.add('hidden');
  }
}

// Form handling
function handleContactSubmit(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('contactName')?.value,
    email: document.getElementById('contactEmail')?.value,
    phone: document.getElementById('contactPhone')?.value,
    message: document.getElementById('contactMessage')?.value
  };
  
  // Simulate form submission
  showNotification('Thank you for your message! We will get back to you soon.');
  if (elements.contactForm) {
    elements.contactForm.reset();
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;
  
  // Simulate login
  currentUser = { email: email, name: email.split('@')[0] };
  
  // Update UI
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.textContent = `Welcome, ${currentUser.name}`;
    loginBtn.onclick = logout;
  }
  
  closeLoginModal();
  showNotification(`Welcome back, ${currentUser.name}!`);
}

function logout() {
  currentUser = null;
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.textContent = 'Login';
    loginBtn.onclick = openLoginModal;
  }
  showNotification('You have been logged out.');
}

function handleCheckout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty!');
    return;
  }
  
  if (!currentUser) {
    closeCartModal();
    openLoginModal();
    showNotification('Please login to proceed with checkout.');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Simulate checkout process
  showNotification(`Order placed successfully! Total: ₹${total.toFixed(2)}. Thank you for your purchase!`);
  
  // Clear cart and close modal
  cart = [];
  updateCartUI();
  closeCartModal();
}

// Navigation
function handleNavClick(e) {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (href && href.startsWith('#')) {
    const targetId = href.substring(1);
    scrollToSection(targetId);
    
    // Update active nav item
    document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleMobileMenu() {
  if (elements.mainNav) {
    elements.mainNav.classList.toggle('mobile-open');
  }
}

// Utility functions
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--farm-green, #4a7c59);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Make functions globally accessible
window.addToCart = addToCart;
window.addToCartFromModal = addToCartFromModal;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.changeQuantity = changeQuantity;
window.viewProductDetails = viewProductDetails;
window.closeProductModal = closeProductModal;
window.closeCartModal = closeCartModal;
window.closeLoginModal = closeLoginModal;
window.scrollToSection = scrollToSection;