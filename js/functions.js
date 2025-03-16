const renderProduct = (product) => {
    const productCard = document.createElement('div');
    const imgContainer = document.createElement('figure');
    const img = document.createElement('img');
    const h3Title = document.createElement('h3');
    const pDescription = document.createElement('p');
    const pPrice = document.createElement('p');
    const addToCartBtn = document.createElement('button');

    productCard.classList.add('product-card');
    imgContainer.classList.add('product-img');
    h3Title.classList.add('product-title');
    pDescription.classList.add('product-description');
    pPrice.classList.add('product-price');
    addToCartBtn.classList.add('add-to-cart-button');

    productCard.id = product.id;

    imgContainer.appendChild(img);
    img.src = product.image;
    img.alt = product.name;

    h3Title.textContent = product.name;
    pDescription.textContent = product.description;
    pPrice.textContent = product.price;
    addToCartBtn.textContent = 'Agregar al Carrito';
    addToCartBtn.id = product.id;

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

const renderByBrand = (e) => {
    if (e.target.value === 'all') {
        renderAllProducts(products);
    } else {
        let filteredProducts = products.filter((product) => product.brand === e.target.value);
        renderAllProducts(filteredProducts);
    }
};

const filterByName = (name) => {
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredProducts;
};

const renderByName = (e) => {
    let filteredProducts = filterByName(e.target.value);
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

        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-cart-container');

        const itemDetail = document.createElement('p');
        itemDetail.textContent = `${productFound.name} - 
        €${productFound.price} x ${item.quantity}`;

        const btnsContainer = document.createElement('div');
        btnsContainer.classList.add('btns-container');

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';

        const restBtn = document.createElement('button');
        restBtn.textContent = '-';

        const addBtn = document.createElement('button');
        addBtn.textContent = '+';

        btnsContainer.append(eliminarBtn, restBtn, addBtn);

        itemContainer.append(itemDetail, btnsContainer);
        cartItems.appendChild(itemContainer);

        total += Number(productFound.price) * Number(item.quantity);
    }

    const totalAmount = document.querySelector('.cart-total');
    totalAmount.textContent = `Total: €${total}`;
};
