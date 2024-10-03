import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const htmDiscounted =
    item.FinalPrice < item.SuggestedRetailPrice
      ? `<span class="cart-cart__discounted">$${item.SuggestedRetailPrice}</span>`
      : "";
  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images?.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">${htmDiscounted}$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        if(cartItems) {
          const htmlItems = cartItems?.map((item) => cartItemTemplate(item)) || [];
          document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
          document.querySelector(".cart-footer").classList.remove("hide");
          
          const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0)
          document.querySelector("#cart-total-price").innerText = `$${total}` ;
        };
    }
}
