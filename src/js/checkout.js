import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector("#checkout-button").addEventListener("click", (e) => {
  e.preventDefault();
  myCheckout.checkout();
});
