const createElement = (tag, className = '', textContent = '', functionEvent = null, id = null) => {
    const htmlElement = document.createElement(tag);
    if (className) htmlElement.classList.add(className);
    if (textContent) htmlElement.textContent = textContent;
    if (functionEvent && tag == 'button') htmlElement.addEventListener('click', functionEvent);
    if (id) htmlElement.id = id;
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

    const addToCartBtn = createElement(
        'button',
        'add-to-cart-button',
        'Agregar al Carrito',
        () => addToCart(cart, product.id),
        product.id
    );

    if (!product.stock) {
        addToCartBtn.textContent = 'Sin stock';
        addToCartBtn.disabled = true;
        addToCartBtn.classList.add('no-stock');
    }
    /* addToCartBtn.id = product.id;
    addToCartBtn.addEventListener('click', (e) => {
        addToCart(cart, product.id);
    }); */

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
    let itemIndexInCart = cart.findIndex((item) => item.id === id);

    if (itemIndexInCart !== -1) {
        cart[itemIndexInCart].quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    let itemIndexInProducts = products.findIndex((item) => item.id === id);
    products[itemIndexInProducts].stock--;
    console.log(products[itemIndexInProducts]);
    renderAllProducts(products);
    printCart(cart);

    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer.classList.contains('hidden')) cartContainer.classList.remove('hidden');
};

const emptyCart = (cart) => {
    Swal.fire({
        title: 'Seguro que quieres eliminar todo el carrito?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#ff6f61',
        denyButtonText: `Cancelar`,
        denyButtonColor: '#666',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Carrito eliminado!',
                icon: 'success',
                confirmButtonColor: '#ff6f61',
            });
            cart.splice(0, cart.length);
            printCart(cart);
        }
    });
};

const buyCart = (cart) => {
    if (!cart.length) {
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacio!!',
            text: 'Agrega productos antes de comprar!',
            confirmButtonColor: '#ff6f61',
        });
    } else {
        const total = cart.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.id);
            return sum + product.price * item.quantity;
        }, 0);

        Swal.fire({
            icon: 'success',
            title: 'Gracias por su compra!!!',
            text: `Total a pagar: €${total}`,
            confirmButtonColor: '#ff6f61',
        });
        cart.splice(0, cart.length);
        printCart(cart);
    }
};

const printCart = (cart) => {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    let total = cart.reduce((sum, item) => {
        const { itemContainer, total } = createCartItem(item);
        cartItems.appendChild(itemContainer);
        return sum + total;
    }, 0);

    const totalAmount = document.querySelector('.cart-total');
    totalAmount.textContent = `Total: €${total}`;
};

const createCartItem = (item) => {
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

    return { itemContainer, total: Number(productFound.price) * Number(item.quantity) };
};

const toggleDisplay = (itemName) => {
    const item = document.querySelector(itemName);
    item.classList.toggle('hidden');
};
