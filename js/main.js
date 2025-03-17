let cart = [];
let brand = 'all';

renderAllProducts(products);

const selectBrand = document.querySelector('#brand');
selectBrand.addEventListener('change', selectFilter);

const inputName = document.querySelector('.search-bar');
inputName.addEventListener('input', selectFilter);

const cartBtn = document.querySelector('.cart-icon');
cartBtn.addEventListener('click', () => toggleDisplay('.cart-container'));
