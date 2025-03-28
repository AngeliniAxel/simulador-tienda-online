let cart = [];
loadCart();
let brand = 'all';

renderAllProducts(products);

const selectBrand = document.querySelector('#brand');
selectBrand.addEventListener('change', selectFilter);

const inputName = document.querySelector('.search-bar');
inputName.addEventListener('input', selectFilter);

const cartBtn = document.querySelector('.cart-icon');
cartBtn.addEventListener('click', () => toggleDisplay('.cart-container'));

const closeCartBtn = document.querySelector('.close-cart');
closeCartBtn.addEventListener('click', () => toggleDisplay('.cart-container'));

const closealertBtn = document.querySelector('.close-alert');
closealertBtn.addEventListener('click', () => toggleDisplay('.alert'));

const toggleMenu = document.querySelector('.toggle-menu');
toggleMenu.addEventListener('click', (e) => {
    toggleDisplay('.inputs');
    changeToggleMenuIcon(e);
});

const emptyCartButton = document.querySelector('.empty-btn');
emptyCartButton.addEventListener('click', () => emptyCart(cart));

const buyCartButton = document.querySelector('.buy-btn');
buyCartButton.addEventListener('click', () => buyCart(cart));
