// ============================================
// Happy Accessories By Tota - Main JavaScript
// ============================================

// Global state
let cart = JSON.parse(localStorage.getItem('happyCart')) || [];
let currentProduct = null;

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initProducts();
    initCart();
    initFilters();
    initQuickView();
    initQuantityButtons();
    initFormValidation();
    initNavbarScroll();
    
    // Update cart count
    updateCartCount();
});

// ============================================
// Products Functions
// ============================================
function initProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    renderProducts(products);
}

function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new elements
    attachProductEventListeners();
}

function createProductCard(product) {
    const badges = product.badges.map(badge => {
        if (badge === 'جديد') {
            return `<span class="badge-new">${badge}</span>`;
        } else if (badge === 'ذهب') {
            return `<span class="badge-gold"><i class="fas fa-crown"></i> بالذهب</span>`;
        }
        return '';
    }).join('');
    
    return `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}" onclick="openQuickView(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badges">
                    ${badges}
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="product-action-btn quick-view-btn" data-id="${product.id}" title="عرض سريع">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="product-action-btn wishlist-btn" data-id="${product.id}" title="إضافة للمفضلة">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.categoryName}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-short-desc">${product.description.substring(0, 60)}...</p>
                <div class="product-price">
                    <span class="price-value">${product.priceGoldPlated}</span>
                    <span class="currency">ر.س</span>
                </div>
                <div class="product-material">
                    <button class="material-btn active" data-material="gold-plated" onclick="event.stopPropagation()">فضة مطلية ذهب</button>
                    <button class="material-btn gold-btn" data-material="gold" data-price="${product.priceGold}" onclick="event.stopPropagation()">ذهب (+${Math.round((product.priceGold - product.priceGoldPlated) / product.priceGoldPlated * 100)}%)</button>
                </div>
                <div class="product-quantity">
                    <div class="qty-control">
                        <button class="qty-btn minus" onclick="event.stopPropagation(); changeQty(${product.id}, -1)">-</button>
                        <span class="qty-value" id="qty-${product.id}">1</span>
                        <button class="qty-btn plus" onclick="event.stopPropagation(); changeQty(${product.id}, 1)">+</button>
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); orderViaWhatsApp(${product.id})">
                    <i class="fab fa-whatsapp"></i> طلب عبر الواتساب
                </button>
            </div>
        </div>
    `;
}

function attachProductEventListeners() {
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            openQuickView(productId);
        });
    });
    
    // Material selection
    document.querySelectorAll('.product-material').forEach(container => {
        const buttons = container.querySelectorAll('.material-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active', 'gold-active'));
                this.classList.add('active');
                
                if (this.dataset.material === 'gold') {
                    this.classList.add('gold-active');
                    const priceEl = this.closest('.product-info').querySelector('.price-value');
                    const productId = parseInt(this.closest('.product-card').dataset.id);
                    const product = products.find(p => p.id === productId);
                    priceEl.textContent = product.priceGold;
                } else {
                    const priceEl = this.closest('.product-info').querySelector('.price-value');
                    const productId = parseInt(this.closest('.product-card').dataset.id);
                    const product = products.find(p => p.id === productId);
                    priceEl.textContent = product.priceGoldPlated;
                }
            });
        });
    });
}

// ============================================
// Filter Functions
// ============================================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filter = this.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });
    
    // Category cards filter
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const filtered = products.filter(p => p.category === category);
            
            // Update filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            const categoryBtn = document.querySelector(`[data-filter="${category}"]`);
            if (categoryBtn) categoryBtn.classList.add('active');
            
            // Scroll to products
            renderProducts(filtered);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ============================================
// Cart Functions
// ============================================
function initCart() {
    updateCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if material is gold
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    const goldBtn = card.querySelector('.material-btn[data-material="gold"]');
    const isGold = goldBtn.classList.contains('active');
    
    const qtyEl = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyEl.textContent);
    
    const price = isGold ? product.priceGold : product.priceGoldPlated;
    const material = isGold ? 'ذهب' : 'فضة مطلية ذهب';
    
    // Check if product with same material exists in cart
    const existingItem = cart.find(item => item.id === productId && item.material === material);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: price,
            material: material,
            quantity: quantity
        });
    }
    
    // Save to localStorage
    saveCart();
    
    // Update UI
    updateCartCount();
    
    // Show success message
    showToast(`تمت إضافة ${product.name} للسلة!`, 'success');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateCartItemQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    saveCart();
    updateCartCount();
    renderCart();
}

function saveCart() {
    localStorage.setItem('happyCart', JSON.stringify(cart));
}

function updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (countEl) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = total;
        countEl.style.display = total > 0 ? 'flex' : 'none';
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-bag" style="font-size: 4rem; color: var(--text-light);"></i>
                <h3 class="mt-3">السلة فارغة</h3>
                <p class="text-muted">ابدأ التسوق لملء سلتك</p>
                <a href="index.html" class="btn-gold mt-3">تصفح المنتجات</a>
            </div>
        `;
        return;
    }
    
    cartContainer.innerHTML = cart.map((item, index) => `
        <tr>
            <td>
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h5>${item.name}</h5>
                        <small class="text-muted">${item.material}</small>
                    </div>
                </div>
            </td>
            <td>${item.price} ج.م</td>
            <td>
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td>${item.price * item.quantity} ج.م</td>
            <td>
                <button class="btn-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;
    
    document.getElementById('cartSubtotal').textContent = subtotal + ' ج.م';
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'مجاني' : shipping + ' ج.م';
    document.getElementById('cartTotal').textContent = total + ' ج.م';
}

function getCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 50;
    return subtotal + shipping;
}

// ============================================
// Quantity Functions
// ============================================
function changeQty(productId, change) {
    const qtyEl = document.getElementById(`qty-${productId}`);
    let qty = parseInt(qtyEl.textContent) + change;
    if (qty < 1) qty = 1;
    if (qty > 10) qty = 10;
    qtyEl.textContent = qty;
}

function initQuantityButtons() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // This is handled inline for product cards
        });
    });
}

// ============================================
// Quick View Modal
// ============================================
function initQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    
    modal.addEventListener('show.bs.modal', function(event) {
        // Modal is shown
    });
}

// Quick view quantity buttons
document.querySelectorAll('#quickViewModal .qty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = document.getElementById('quickViewQty');
        let qty = parseInt(input.value);
        if (this.classList.contains('plus')) qty++;
        if (this.classList.contains('minus')) qty--;
        if (qty < 1) qty = 1;
        if (qty > 10) qty = 10;
        input.value = qty;
    });
});

// ============================================
// Form Validation
// ============================================
function initFormValidation() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                showToast('تم إرسال رسالتك بنجاح!', 'success');
                this.reset();
            }
        });
    }
    
    // Custom order form
    const orderForm = document.getElementById('customOrderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                showToast('تم إرسال طلبك بنجاح! سنقوم بتواصل معك قريباً', 'success');
                this.reset();
            }
        });
    }
    
    // Login form
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('تم تسجيل الدخول بنجاح!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        });
    }
    
    // Register form
    const registerForm = document.querySelector('#register form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('تم إنشاء حسابك بنجاح!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        });
    }
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
            
            // Email validation
            if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                input.classList.add('is-invalid');
            }
            
            // Phone validation
            if (input.type === 'tel' && !isValidPhone(input.value)) {
                isValid = false;
                input.classList.add('is-invalid');
            }
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\+]{10,}$/.test(phone);
}

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content ${type}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// Search Functions
// ============================================
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length < 2) {
            renderProducts(products);
            return;
        }
        
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.categoryName.includes(query)
        );
        
        renderProducts(filtered);
    });
}

// ============================================
// Wishlist Functions
// ============================================
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let wishlist = JSON.parse(localStorage.getItem('happyWishlist')) || [];
    
    if (!wishlist.find(p => p.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('happyWishlist', JSON.stringify(wishlist));
        showToast(`تمت إضافة ${product.name} للمفضلة!`, 'success');
    } else {
        showToast('المنتج موجود بالفعل في المفضلة', 'info');
    }
}

// ============================================
// Checkout Functions
// ============================================
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('السلة فارغة! أضف منتجات للمتابعة', 'error');
        return;
    }
    
    // Here you would redirect to checkout page
    // For now, show success message
    showToast('جاري التحويل للدفع...', 'success');
}

// ============================================
// Initialize cart page
// ============================================
if (document.getElementById('cartItems')) {
    renderCart();
}

// ============================================
// WhatsApp Order Functions
// ============================================
function orderViaWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get selected material
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    const goldBtn = card.querySelector('.material-btn[data-material="gold"]');
    const isGold = goldBtn.classList.contains('active');
    
    const qtyEl = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyEl.textContent);
    
    const price = isGold ? product.priceGold : product.priceGoldPlated;
    const material = isGold ? 'ذهب' : 'فضة مطلية ذهب';
    const totalPrice = price * quantity;
    
    // Create WhatsApp message
    const message = `مرحباً، أريد طلب المنتج التالي:%0A%0A` +
        `📦 المنتج: ${product.name}%0A` +
        `📝 الوصف: ${product.description}%0A` +
        `💎 المادة: ${material}%0A` +
        `🔢 الكمية: ${quantity}%0A` +
        `💰 السعر: ${totalPrice} ر.س%0A%0A` +
        `شكراً لتواصلكم مع Happy Accessories By Tota ✨`;
    
    // WhatsApp number (replace with actual number)
    const phoneNumber = '966500000000';
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    document.getElementById('quickViewTitle').textContent = product.name;
    document.getElementById('quickViewImage').src = product.image;
    document.getElementById('quickViewDesc').textContent = product.description;
    document.getElementById('quickViewPrice').textContent = product.priceGoldPlated;
    document.getElementById('quickViewQty').value = 1;
    
    // Reset material selection
    document.querySelectorAll('#quickViewModal .material-option').forEach(opt => {
        opt.querySelector('input').checked = opt.querySelector('input').value === 'gold-plated';
    });
    
    // Update price when material changes
    document.querySelectorAll('#quickViewModal input[name="material"]').forEach(input => {
        input.addEventListener('change', function() {
            const price = this.value === 'gold' ? product.priceGold : product.priceGoldPlated;
            document.getElementById('quickViewPrice').textContent = price;
        });
    });
    
    // Update WhatsApp button functionality
    document.getElementById('quickViewWhatsApp').onclick = function() {
        const material = document.querySelector('#quickViewModal input[name="material"]:checked').value;
        const quantity = parseInt(document.getElementById('quickViewQty').value);
        const price = material === 'gold' ? product.priceGold : product.priceGoldPlated;
        const materialName = material === 'gold' ? 'ذهب' : 'فضة مطلية ذهب';
        const totalPrice = price * quantity;
        
        const message = `مرحباً، أريد طلب المنتج التالي:%0A%0A` +
            `📦 المنتج: ${product.name}%0A` +
            `📝 الوصف: ${product.description}%0A` +
            `💎 المادة: ${materialName}%0A` +
            `🔢 الكمية: ${quantity}%0A` +
            `💰 السعر: ${totalPrice} ر.س%0A%0A` +
            `شكراً لتواصلكم مع Happy Accessories By Tota ✨`;
        
        const phoneNumber = '966500000000';
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modal.show();
}

