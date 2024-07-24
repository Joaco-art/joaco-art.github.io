// Función para obtener el ID del producto desde la URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Función para cargar y mostrar los datos del producto
async function loadProduct() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        document.getElementById('product-detail').innerText = 'Producto no encontrado.';
        return;
    }

    const response = await fetch('productos.json');
    const products = await response.json();
    const product = products.find(p => p.id == productId);

    if (!product) {
        document.getElementById('product-detail').innerText = 'Producto no encontrado.';
        return;
    }

    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
        <div class="contenedor">
            <div class="contenedor-izq">
                <img src="${product.image}" height="380" width="600" alt="${product.name}">
            </div>

            <div class="contenedor-derecha">
                <form id="cartForm">
                    <h2>${product.name}</h2>
                    <p><span class="tachado">54,99EUR</span> <span>${product.price}EUR</span></p>
                    <p><label for="talla">Talla</label></p>
                    <p><select name="talla" id="talla" required>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                    </p>
                    <p><label for="cantidad">Cantidad</label></p>
                    <p><select name="cantidad" id="cantidad" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </p>
                    <p><button type="submit" id="agregar-carrito">AGREGAR AL CARRITO</button></p>
                </form>
                <div class="descripcion-contenido">
                    <p>DESCRIPCIÓN</p>
                    <p class="descripcion">${product.description}</p>
                    <p class="caracteristicas">CARACTERÍSTICAS</p>
                    <p class="caracteristicas-lista">
                        <ul>
                            <li>100% algodón</li>
                            <li>Regular fit</li>
                            <li>Cuello Redondo</li>
                            <li>Etiqueta interior</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    `;

    // Añadir evento para el formulario del carrito
    document.getElementById('cartForm').addEventListener('submit', addToCart);
    document.getElementById("favoritos").addEventListener("click", addToWishlist);
}

// Función para cargar los datos del producto al cargar la página
window.onload = loadProduct;

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;
}

// Función para añadir un producto al carrito
function addToCart(event) {
    event.preventDefault();

    const productId = getProductIdFromUrl();
    const size = document.getElementById('talla').value;
    const quantity = parseInt(document.getElementById('cantidad').value, 10);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id == productId && item.size == size);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ id: productId, size, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = 'cart.html'; // Redirigir después de añadir al carrito
}

// Actualizar el contador del carrito al cargar la página
updateCartCount();
