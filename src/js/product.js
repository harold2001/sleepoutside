import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
