let cart = [];

renderAllProducts(products);

const selectBrand = document.querySelector('#brand');
selectBrand.addEventListener('change', renderByBrand);

const nameInput = document.querySelector('.search-bar');
nameInput.addEventListener('input', renderByName);

const cartBtn = document.querySelector('.cart-icon');
cartBtn.addEventListener('click', () => toggleDisplay('.cart-container'));
