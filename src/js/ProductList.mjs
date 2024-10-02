import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const htmDiscounted = product.FinalPrice < product.SuggestedRetailPrice ? `<span class="product-card__discounted">$${product.SuggestedRetailPrice}</span>` : ""
  return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}${htmDiscounted}</p>
      </a>
    </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const productList = await this.dataSource.getData(this.category);
    this.renderList(productList);
    // this.renderListFiltered(productList);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  renderListFiltered(list) {
    const allowedIds = ["880RR", "985RF", "985PR", "344YJ"];
    const newList = list.filter((p) => allowedIds.includes(p.Id));
    renderListWithTemplate(productCardTemplate, this.listElement, newList);
  }
}
