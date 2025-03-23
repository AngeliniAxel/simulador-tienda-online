const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.forEach((cartItem) => {
        const product = products.find((item) => item.id === cartItem.id);
        if (product) {
            product.stock -= cartItem.quantity;
        }
    });
    cart = savedCart;
    console.log(cart);
    renderAllProducts(products);
    printCart(cart);
};

/**
 * Toggles the display of an element by adding or removing the 'hidden' class.
 *
 * @param {string} itemName - The CSS selector of the element to toggle.
 */
const toggleDisplay = (itemName) => {
    const item = document.querySelector(itemName);
    item.classList.toggle('hidden');
};

/**
 * Changes the icon of the toggle menu button based on the visibility of the `.inputs` element.
 *
 * @param {Event} e - The click event triggered on the toggle button.
 *
 * - If `.inputs` is visible, changes the icon to a close icon (`fa-xmark`).
 * - If `.inputs` is hidden, changes the icon to a menu icon (`fa-bars`).
 */
const changeToggleMenuIcon = (e) => {
    const inputs = document.querySelector('.inputs');
    e.currentTarget.innerHTML = !inputs.classList.contains('hidden')
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
};

/**
 * Creates and returns a new HTML element with optional class, text, event, and ID.
 *
 * @param {string} tag - The HTML tag name (e.g., 'div', 'button', 'p').
 * @param {string} [className=''] - The class name to apply to the element.
 * @param {string} [textContent=''] - The text content to insert into the element.
 * @param {Function|null} [functionEvent=null] - The function to execute on click (only for buttons).
 * @param {string|null} [id=null] - The ID to assign to the element.
 * @returns {HTMLElement} The created HTML element.
 */
const createElement = (tag, className = '', textContent = '', functionEvent = null, id = null) => {
    const htmlElement = document.createElement(tag);
    if (className) htmlElement.classList.add(className);
    if (textContent) htmlElement.textContent = textContent;
    if (functionEvent && tag == 'button') htmlElement.addEventListener('click', functionEvent);
    if (id) htmlElement.id = id;
    return htmlElement;
};

/**
 * Creates and returns a new img element with optional source, alt text, and class.
 *
 * @param {string} [src=''] - The source URL of the image.
 * @param {string} [alt=''] - The alternative text for the image.
 * @param {string} [className=''] - The class name to apply to the image.
 * @returns {HTMLImageElement} The created `<img>` element.
 */
const createImg = (src = '', alt = '', className = '') => {
    const img = document.createElement('img');

    if (src) img.src = src;
    if (alt) img.alt = alt;
    if (className) img.classList.add(className);

    return img;
};

/**
 * Creates and returns a cart item element with buttons to update or remove the item.
 *
 * @param {Object} item - The item to create in the cart.
 * @param {number} item.id - The ID of the product.
 * @param {number} item.quantity - The quantity of the product in the cart.
 * @returns {{itemContainer: HTMLElement, total: number}}
 * - `itemContainer` - The created HTML element for the cart item.
 * - `total` - The total price for the item (price * quantity).
 */
const createCartItem = (item) => {
    const productFound = products.find((product) => product.id == item.id);

    const itemContainer = createElement('div', 'item-cart-container');
    const itemDetail = createElement(
        'p',
        '',
        `${productFound.name} - €${productFound.price} x ${item.quantity}`
    );

    const btnsContainer = createElement('div', 'btns-container');

    // Button to remove the item from the cart
    const eliminarBtn = createElement('button', '', 'Eliminar', () =>
        removeFromCart(productFound.id)
    );

    // Button to decrease the quantity of the item in the cart
    const restBtn = createElement('button', '', '-', () => updateCartItem(productFound.id, -1));

    // Button to increase the quantity of the item in the cart
    const addBtn = createElement('button', '', '+', () => updateCartItem(productFound.id, 1));

    // Disables addBtn if product is out of stock
    checkStock(addBtn, '+', productFound.stock);

    btnsContainer.append(eliminarBtn, restBtn, addBtn);
    itemContainer.append(itemDetail, btnsContainer);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    return { itemContainer, total: Number(productFound.price) * Number(item.quantity) };
};

/**
 * Creates and displays an alert with a custom icon, message, and color.
 *
 * @param {string} icon - The HTML string representing the icon to display.
 * @param {string} message - The message to display in the alert.
 * @param {string} color - The CSS class to apply for the alert color (e.g., 'success', 'error').
 */
const createAlert = (icon, title, message = '', color) => {
    // Remove 'hidden' class from container
    const alert = document.querySelector('.alert');
    alert.classList.remove('hidden');

    // Select the element for the alert icon and update its content
    const alertIcon = document.querySelector('.alert-icon');
    alertIcon.innerHTML = icon;

    // Reset the icon's class and apply the specified color
    alertIcon.className = 'alert-icon';
    alertIcon.classList.add(color);

    // Select alert title and message and update its content
    const alertTitle = document.querySelector('.alert-title');
    alertTitle.textContent = title;

    const alertMessage = document.querySelector('.alert-message');
    alertMessage.textContent = message;
};

/**
 * Creates and returns a product card element with product details and "Add to Cart" button.
 *
 * @param {Object} product - The product to render.
 * @param {number} product.id - The product ID.
 * @param {string} product.image - The product image URL.
 * @param {string} product.name - The product name.
 * @param {string} product.description - The product description.
 * @param {number} product.price - The product price.
 * @param {number} product.stock - The available stock of the product.
 * @returns {HTMLElement} The created HTML element for the product card.
 */
const renderProduct = (product) => {
    const productCard = createElement('div', 'product-card');
    productCard.id = product.id;

    // Create product image
    const imgContainer = createElement('figure', 'product-img');
    const img = createImg(product.image, product.name);
    imgContainer.appendChild(img);

    // Create the product title
    const h3Title = createElement('h3', 'product-title', product.name);

    // Create the product description
    const pDescription = createElement('p', 'product-description', product.description);

    // Create the product price
    const pPrice = createElement('p', 'product-price', `€${product.price}`);

    // Create the "Add to Cart" button
    const addToCartBtn = createElement(
        'button',
        'add-to-cart-button',
        'Agregar al Carrito',
        () => addToCart(cart, product.id),
        product.id
    );

    // Disable the button if it´s out of stock
    checkStock(addToCartBtn, 'Sin stock', product.stock);

    // Append everything to the productCard container and returns it
    productCard.append(imgContainer, h3Title, pDescription, pPrice, addToCartBtn);
    return productCard;
};

/**
 * Renders all products in the provided array into the product container.
 *
 * @param {Array} products - The array of products to render.
 * Each product object should have the following structure:
 * - { id: number, name: string, description: string, price: number, image: string, stock: number }
 */
const renderAllProducts = (products) => {
    const productsSection = document.querySelector('.products-container');
    productsSection.innerHTML = '';

    products.forEach((product) => {
        productsSection.appendChild(renderProduct(product));
    });
};

/**
 * Renders the cart items and updates the total amount.
 *
 * @param {Array} cart - The array of cart items to display.
 * Each cart item object should have the following structure:
 * - { id: number, quantity: number }
 */
const printCart = (cart) => {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    // Using reduce to calculate total amount and, at the same time,
    // creating the HTML cart item and appending it to the container
    let total = cart.reduce((sum, item) => {
        const { itemContainer, total } = createCartItem(item);
        cartItems.appendChild(itemContainer);
        return sum + total;
    }, 0);

    // Update total amount in the cart
    const totalAmount = document.querySelector('.cart-total');
    totalAmount.textContent = `Total: €${total}`;
};

/**
 * Adds a product to the cart, updates the stock, and re-renders the products.
 *
 * @param {Array} cart - The current array of cart items.
 * @param {number} id - The ID of the product to add to the cart.
 */
const addToCart = (cart, id) => {
    let itemIndexInCart = cart.findIndex((item) => item.id === id);

    /* 
    Check if the product is already in the cart
    If product exists in cart, increase quantity
    If not, add it to the cart with quantity 1
    */
    if (itemIndexInCart !== -1) {
        cart[itemIndexInCart].quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    /* 
    Reduce stock in products list
    */
    let product = products.find((item) => item.id === id);
    if (product && product.stock > 0) {
        product.stock--;
    }

    /* 
    Re-rendering the products using selectFilter instead of renderAllProducts
    so if user was using a filter, it stays active
    */
    selectFilter({ target: { value: inputName.value, name: 'name' } });
    printCart(cart);

    // Make sure the cart container is visible when adding product
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer.classList.contains('hidden')) cartContainer.classList.remove('hidden');
};

/**
 * Removes a product from the cart, restores its stock, and re-renders the filtered products.
 *
 * @param {number} id - The ID of the product to remove from the cart.
 */
const removeFromCart = (id) => {
    let productToRemove = cart.find((item) => item.id === id);
    if (productToRemove) {
        cart = cart.filter((item) => item.id !== id);

        // Find products in data and restore stock
        let productInProducts = products.find((item) => item.id === id);
        if (productInProducts) productInProducts.stock += productToRemove.quantity;

        /* 
        Re-rendering the products using selectFilter instead of renderAllProducts
        so if user was using a filter, it stays active
        */
        selectFilter({ target: { value: inputName.value, name: 'name' } });
        printCart(cart);
    }
};

/**
 * Updates the quantity of a product in the cart and adjusts the stock accordingly.
 *
 * @param {number} id - The ID of the product to update.
 * @param {number} change - The change in quantity (positive to add, negative to subtract).
 */
const updateCartItem = (id, change) => {
    // Find the product in the cart and in the products list
    let productInCart = cart.find((item) => item.id === id);
    let productInProducts = products.find((item) => item.id === id);

    if (productInCart && productInProducts) {
        if (change > 0) {
            if (productInProducts.stock > 0) {
                productInCart.quantity++; // Increase quantity if stock is available
                productInProducts.stock--; // Decrease in products list
            }
        } else if (change < 0) {
            // Decrease quantity and restore stock
            productInCart.quantity--;
            productInProducts.stock++;

            // Remove product from cart if quantity reaches zero
            if (productInCart.quantity <= 0) {
                cart = cart.filter((item) => item.id !== id);
            }
        }

        /* 
        Re-rendering the products using selectFilter instead of renderAllProducts
        so if user was using a filter, it stays active
        */
        selectFilter({ target: { value: inputName.value, name: 'name' } });
        printCart(cart);
    }
};

/**
 * Empties the cart or shows an alert if it is already empty
 *
 * @param {Array} cart - The current shopping cart array.
 */
const emptyCart = (cart) => {
    if (cart.length) {
        // Remove each item from the cart
        cart.forEach((product) => removeFromCart(product.id));

        /* 
        After removing each product and restoring array
        assign to empty array to update display view 
        */
        cart = [];
        printCart(cart);
    } else {
        // Show error alert if cart is already empty
        createAlert(
            '<i class="fa-solid fa-circle-info"></i>',
            'El carrito ya está vacio!!',
            '',
            'info'
        );
    }
};

/**
 * Processes the cart purchase, showing the total price and clearing the cart.
 *
 * @param {Array} cart - The current shopping cart array.
 */
const buyCart = (cart) => {
    if (!cart.length) {
        // Show error if the cart is empty
        createAlert(
            '<i class="fa-solid fa-circle-exclamation"></i>',
            'El carrito esta vacio!!',
            'Agrega productos antes de comprar!',
            'error'
        );
    } else {
        // Calculate the total price of items in the cart
        const total = cart.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.id);
            return sum + product.price * item.quantity;
        }, 0);

        // Show success message with total price
        createAlert(
            '<i class="fa-solid fa-circle-check"></i>',
            'Gracias por su compra!!!',
            `Total a pagar: €${total}`,
            'success'
        );

        // Clear the cart after purchase
        cart.splice(0, cart.length);

        // Update local storage to reflect empty cart
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display
        printCart(cart);
    }
};

/**
 * Disables a button and updates its text if the stock is zero.
 *
 * @param {HTMLElement} btn - The button element to update.
 * @param {string} [textContent=''] - The text to display on the button if out of stock.
 * @param {number} stock - The current stock value of the product.
 */
const checkStock = (btn, textContent = '', stock) => {
    if (!stock) {
        if (textContent) btn.textContent = textContent;
        btn.disabled = true;
        btn.classList.add('no-stock');
    }
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
