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
  const checkoutForm = document.forms[0];
  const checkStatus = checkoutForm.checkValidity();
  checkoutForm.reportValidity();
  if (checkStatus) {
    myCheckout.checkout();
  }
});
