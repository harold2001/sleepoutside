import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductListing("tents", dataSource, listElement);

productList.init();
