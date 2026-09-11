const CART_KEY = "cart";
function getCart() {
     try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
         return [];
      }
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}
function addToCart(product, qty = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: qty
        });
    }
    saveCart(cart);
}
function removeFromCart(id) {
    saveCart(getCart().filter(item => item.id !== id));
}

function updateQuantity(id, qty) {
    const cart = getCart();
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.quantity = qty;
    if (item.quantity <= 0) return removeFromCart(id);
    saveCart(cart);
}

function getCartTotal() {
    return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (el) el.textContent = getCartCount();
}
document.addEventListener("DOMContentLoaded", updateCartCount);
window.addEventListener("pageshow", updateCartCount);