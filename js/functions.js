const createElement = (tag, className = '', textContent = '') => {
    const htmlElement = document.createElement(tag);
    if (className) htmlElement.classList.add(className);
    if (textContent) htmlElement.textContent = textContent;
    return htmlElement;
};

const createImg = (src = '', alt = '', className = '') => {
    const img = document.createElement('img');

    if (src) img.src = src;
    if (alt) img.alt = alt;
    if (className) img.classList.add(className);

    return img;
};

const renderProduct = (product) => {
    const productCard = createElement('div', 'product-card');
    productCard.id = product.id;

    const imgContainer = createElement('figure', 'product-img');

    const img = createImg(product.image, product.name);
    imgContainer.appendChild(img);

    const h3Title = createElement('h3', 'product-title', product.name);

    const pDescription = createElement('p', 'product-description', product.description);

    const pPrice = createElement('p', 'product-price', `€${product.price}`);

    const addToCartBtn = createElement('button', 'add-to-cart-button', 'Agregar al Carrito');
    addToCartBtn.id = product.id;
    addToCartBtn.addEventListener('click', (e) => {
        addToCart(cart, product.id);
    });

    productCard.append(imgContainer, h3Title, pDescription, pPrice, addToCartBtn);
    return productCard;
};

const renderAllProducts = (products) => {
    const productsSection = document.querySelector('.products-container');
    productsSection.innerHTML = '';

    products.forEach((product) => {
        productsSection.appendChild(renderProduct(product));
    });
};

/**
 * Filters products based on the input name and selected brand.
 *
 * It uses a global variable brand so if the event comes from the input,
 * it still respect the brand
 *
 * @param {Event} e - The event object triggered by the input or select change.
 */
const selectFilter = (e) => {
    // Get the current value from the input field (search bar)
    const valueName = inputName.value;

    // Get the value and name of the input that triggered the event
    const value = e.target.value;
    const nameInput = e.target.name;

    // If the event comes from the brand select, update the brand filter
    if (nameInput === 'brand') brand = value;

    // Filter by both name and brad
    let filteredProducts = products
        .filter((item) => item.name.toLowerCase().includes(valueName.toLowerCase()))
        .filter((item) => brand === 'all' || item.brand === brand);

    // Render resulted array
    renderAllProducts(filteredProducts);
};

const addToCart = (cart, id) => {
    let itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    printCart(cart);

    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer.classList.contains('hidden')) cartContainer.classList.remove('hidden');
};

const printCart = (cart) => {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    for (const item of cart) {
        const productFound = products.find((product) => product.id == item.id);

        const itemContainer = createElement('div', 'item-cart-container');

        const itemDetail = createElement(
            'p',
            '',
            `${productFound.name} - €${productFound.price} x ${item.quantity}`
        );

        const btnsContainer = createElement('div', 'btns-container');

        const eliminarBtn = createElement('button', '', 'Eliminar');

        const restBtn = createElement('button', '', '-');

        const addBtn = createElement('button', '', '+');

        btnsContainer.append(eliminarBtn, restBtn, addBtn);

        itemContainer.append(itemDetail, btnsContainer);
        cartItems.appendChild(itemContainer);

        total += Number(productFound.price) * Number(item.quantity);
    }

    const totalAmount = document.querySelector('.cart-total');
    totalAmount.textContent = `Total: €${total}`;
};

const toggleDisplay = (itemName) => {
    const item = document.querySelector(itemName);
    item.classList.toggle('hidden');
};
