import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const shoppingCart = new ShoppingCart("so-cart", ".product-list");
shoppingCart.renderCartContents();
