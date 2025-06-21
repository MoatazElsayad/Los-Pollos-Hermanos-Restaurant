import { products } from './products.js';
import { cart, addToCart, renderCart, placeOrder } from './cart.js';


document.addEventListener('DOMContentLoaded', () => {
    // Back to top button
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (btn) btn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    if (btn) {
        btn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // Attach Add to Cart listeners after HTML is injected
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            // Add to cart btn
            addToCart(productId);
            // Call the function to simulate filling the cart
            renderCart(cart);
        });
    });

    document.getElementById('place-order-btn')?.addEventListener('click', () => {
        // calling place order function
        placeOrder();
    });
});


// Generating the HTML of Top Deals Section
let combosHTML = ``;

products.combos.forEach((combo) => {
    combosHTML += `
        <div class="sub-div">
            <div class="img-wrapper">
                <img class="meal-img" src="${combo.image}"/>
            </div>
            <p class="meal-name">${combo.name}</p>
            <hr  class="divider-line">
            <div class="meal-des">${combo.description}</div>
            <div class="price"><p>${combo.price.toFixed(2)} EGP</p></div>
            <button class="add-to-cart js-add-to-cart" data-product-id="${combo.id}">+ Add to cart</button>
        </div>
    `
});

document.querySelector('.js-top-deals').innerHTML = combosHTML;

// Generating the HTML of Additions Section
let addsHTML = ``;

products.adds.forEach((add) => {
    addsHTML += `
        <div class="sub-div">
            <div class="img-wrapper">
                <img class="meal-img" src="${add.image}"/>
            </div>
            <p class="meal-name">${add.name}</p>
            <hr  class="divider-line">
            <div class="meal-des">${add.description}</div>
            <div class="price"><p>${add.price.toFixed(2)} EGP</p></div>
            <button class="add-to-cart js-add-to-cart" data-product-id="${add.id}">+ Add to cart</button>
        </div>
    `
});

document.querySelector('.js-additions').innerHTML = addsHTML;


// Generating the HTML of Beverages Section
let drinksHTML = ``;

products.drinks.forEach((drink) => {
    drinksHTML += `
        <div class="sub-div">
            <div class="img-wrapper">
                <img class="meal-img" src="${drink.image}"/>
            </div>
            <p class="meal-name">${drink.name}</p>
            <hr  class="divider-line">
            <div class="meal-des">${drink.description}</div>
            <div class="price"><p>${drink.price.toFixed(2)} EGP</p></div>
            <button class="add-to-cart js-add-to-cart" data-product-id="${drink.id}">+ Add to cart</button>
        </div>
    `
});

document.querySelector('.js-beverages').innerHTML = drinksHTML;

