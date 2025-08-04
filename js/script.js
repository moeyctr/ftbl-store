// Shopping Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(name, price, image) {
  const product = { name, price, image };
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = cart.length;
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (!cartContainer || !totalEl) return;

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.price);
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemEl);
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("✅ Order placed! Thank you.");
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
  updateCartCount();
}

// Contact form behavior
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-message').classList.remove('hidden');
    contactForm.reset();
  });
}
