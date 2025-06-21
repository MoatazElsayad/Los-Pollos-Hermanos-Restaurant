import { products } from './products.js';

// Exported to script.js
export const cart = [];

// Add to cart Function, when the add-to-cart btn clicked the item will be added to the cart
export function addToCart(productId) {
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
    console.log(cart);
}

// Functions to remove item from the cart
export function removeFromCart(productId) {
    const index = cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
        cart.splice(index, 1); // remove 1 item at that index
    }
    renderCart(cart);
}


// Function to generate and insert cart HTML
export function renderCart(cartArray) {
    let cartHTML = ``;
    let total = 0;

    const allItems = [
        ...products.combos,
        ...products.adds,
        ...products.drinks
    ];

    cartArray.forEach((cartItem) => {
    const product = allItems.find(item => item.id === cartItem.productId);
        if (product) {
            const itemTotal = product.price * cartItem.quantity;
            total += itemTotal;

            cartHTML += `
                <div class="cart-item">
                    <div class="item-details">
                        <p class="item-name">${product.name}</p>
                        <p class="item-qty">Quantity: <span>${cartItem.quantity}</span></p>
                        <p class="item-price">Price: <span>${product.price} EGP</span></p>
                        <p class="item-subtotal">Subtotal: <span>${itemTotal} EGP</span></p>
                        <button class="remove-from-cart" data-product-id="${cartItem.productId}">
                            <img src="images/bin-icon.svg" alt="Remove" class="remove-icon"/>
                        </button>
                    </div>
                </div>
            `;
        }
    });

    document.querySelector('.js-cart-items').innerHTML = cartHTML;
    document.querySelector('.js-cart-total').innerHTML = `<p><strong>Total:</strong> <span>${total} EGP</span></p>`;

    document.querySelectorAll('.remove-from-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeFromCart(productId);
        });
    });
}

// Place Order function, just it will emby the cart and display 'order placed!' message
export function placeOrder() {
    // Empty the cart array
    cart.length = 0;

    // Re-render the cart
    renderCart(cart);

    // Show confirmation message
    const confirmation = document.getElementById('order-confirmation');
    confirmation.classList.remove('hidden');

    // Optionally hide after a few seconds
    setTimeout(() => {
        confirmation.classList.add('hidden');
    }, 5000);
}