renderAllProducts(products);

const selectBrand = document.querySelector('#brand');
selectBrand.addEventListener('change', renderByBrand);

const nameInput = document.querySelector('.search-bar');
nameInput.addEventListener('input', renderByName);

const toggleDisplay = (itemName) => {
    const item = document.querySelector(itemName);
    item.classList.toggle('hidden');
};

const cartBtn = document.querySelector('.cart-icon');
cartBtn.addEventListener('click', () => toggleDisplay('.cart-container'));
