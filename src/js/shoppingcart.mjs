import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `
    <li class="cart-card divider">
        <a href="#" class="cart-card_image">
            <img src="${item.Image} alt="${item.Name} />
        </a>
        <a href="#">
            <h2 class="card_name"> ${item.Name}</h2>
        </a>
        <p class="cart-card_color">${item.Colors[0].ColorName}</p>
        <p class="cart-card_quantity">qty: 1</p>
        <p class="cart-card_price">$${item.FinalPrice}</p>
    </li>
    `;

    return newItem;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }
}