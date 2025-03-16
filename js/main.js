renderAllProducts(products);

const selectBrand = document.querySelector('#brand');
selectBrand.addEventListener('change', renderByBrand);

const nameInput = document.querySelector('.search-bar');
nameInput.addEventListener('input', renderByName);
