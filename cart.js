//this is responsible for the functionality of buttons.
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    loadCartItems();

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if item is already in cart
    let item = cart.find(product => product.name === name);
    if (item) {
        item.quantity += 1; // Increase quantity if item exists
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} has been added to the cart!`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalQuantity;
}

function loadCartItems() {
    if (!document.getElementById("cart-items")) return; // Ensure function runs only on cart page

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    
    cartItemsContainer.innerHTML = ""; // Clear existing cart items
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ₱${item.price} x ${item.quantity} 
                        <button onclick="removeItem('${item.name}')">Remove</button>`;
        cartItemsContainer.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function removeItem(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== name); // Remove item
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems(); // Reload cart
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCartItems();
    updateCartCount();
}