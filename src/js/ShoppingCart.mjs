import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const htmDiscounted =
    item.FinalPrice < item.SuggestedRetailPrice
      ? `<span class="cart-cart__discounted">$${item.SuggestedRetailPrice}</span>`
      : "";
  return `
    <li class="cart-card divider">
      <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
        <img src="${item.Images?.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <a href="/product_pages/?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">${htmDiscounted}$${item.FinalPrice}</p>
      <button class="cart-card__remove" type="button" data-id="${item.Id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="currentColor" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
    </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentElement = document.querySelector(parentSelector);
    this.cartFooter = document.querySelector(".cart-footer");
    this.totalPriceElement = document.querySelector("#cart-total-price");
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];

    if (cartItems.length === 0) {
      this.showEmptyCartMessage();
      return;
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join("");
    this.parentElement.innerHTML = htmlItems;
    this.cartFooter.classList.remove("hide");

    this.updateTotalPrice(cartItems);
    this.bindRemoveButtons();
  }

  showEmptyCartMessage() {
    this.parentElement.innerHTML = "<p>Your cart is empty</p>";
    this.cartFooter.classList.add("hide");
  }

  updateTotalPrice(cartItems) {
    const total = cartItems.reduce(
      (acc, { FinalPrice }) => acc + FinalPrice,
      0,
    );
    this.totalPriceElement.innerText = `$${total.toFixed(2)}`;
  }

  bindRemoveButtons() {
    const removeBtns =
      this.parentElement.querySelectorAll(".cart-card__remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener(
        "click",
        (e) => {
          const targetBtn = e.target.closest(".cart-card__remove");
          const itemId = targetBtn?.dataset.id;
          if (itemId) this.removeItem(itemId);
        },
        { once: true },
      );
    });
  }

  removeItem(itemId) {
    const cartItems = getLocalStorage(this.key);
    const updatedItems = cartItems.filter((item) => item.Id !== itemId);
    localStorage.setItem(this.key, JSON.stringify(updatedItems));
    this.renderCartContents();
  }
}
