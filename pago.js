window.onload = () => {
    cargarResumen();
};

function cargarResumen() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const resumenProductosContainer = document.getElementById('resumen-productos');
    resumenProductosContainer.innerHTML = ''; // Limpiar el contenedor

    if (cart.length === 0) {
        resumenProductosContainer.innerText = 'El carrito está vacío.';
        return;
    }

    fetch('productos.json')
        .then(response => response.json())
        .then(products => {
            let total = 0;
            cart.forEach(item => {
                const product = products.find(p => p.id == item.id);
                if (product) {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('producto');
                    itemElement.innerHTML = `
                        <div class="imagen-container">
                            <img src="${product.image}" alt="${product.name}" width="200px" height="200px">
                            <div class="cantidad">${item.quantity}</div>
                        </div>
                        <div class="detalle">
                            <p>${product.name}</p>
                            <p>Talla: ${item.size}</p>
                            <p>Precio: <strong>${product.price} EUR</strong></p>
                        </div>
                    `;
                    resumenProductosContainer.appendChild(itemElement);
                    total += product.price * item.quantity;
                }
            });

            let envio = 0;
            if (total < 65) {
                envio = 5.99;
            }

            const totalConEnvio = total + envio;
            const mensajeEnvio = envio === 0 ? "Envío gratuito" : `Costo de envío: 5.99 EUR`;

            document.getElementById('order').innerHTML = `
                Pagar <strong>${totalConEnvio.toFixed(2)} EUR</strong>
            `;

            document.getElementById('sub-price').innerHTML = `
                <strong>${totalConEnvio.toFixed(2)} EUR</strong>
            `;

            document.getElementById('envio').innerHTML = `
            ${mensajeEnvio}
            `;

            document.getElementById('total-pago').innerHTML = `
                <strong>${totalConEnvio.toFixed(2)} EUR</strong>
            `;
           
           
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
            resumenProductosContainer.innerText = 'Error al cargar los productos.';
        });
}

function pagoExpress(metodo) {
    alert(`Pago Express con ${metodo} no implementado aún.`);
}

function toggleEdit(id) {
    const element = document.getElementById(id);
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
}

function guardarDireccion(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;
    const codigoPostal = document.getElementById('codigo-postal').value;

    document.getElementById('direccion-info').innerText = `${nombre} ${apellidos}\n${direccion}, ${ciudad}, ${pais} ${codigoPostal}`;
    toggleEdit('edit-address');
}

function guardarInstrucciones() {
    const instrucciones = document.getElementById('instrucciones').value;
    document.getElementById('instrucciones-info').innerText = instrucciones;
    toggleEdit('add-instructions');
}

function guardarTarjeta(event) {
    event.preventDefault();
    const nombreTarjeta = document.getElementById('nombre-tarjeta').value;
    const numeroTarjeta = document.getElementById('numero-tarjeta').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion').value;
    const cvv = document.getElementById('cvv').value;

    document.getElementById('tarjeta-info').innerText = `Ending in ${numeroTarjeta.slice(-4)}`;
    toggleEdit('add-payment');
}

function guardarEdicionTarjeta(event) {
    event.preventDefault();
    const nombreTarjeta = document.getElementById('edit-nombre-tarjeta').value;
    const numeroTarjeta = document.getElementById('edit-numero-tarjeta').value;
    const fechaExpiracion = document.getElementById('edit-fecha-expiracion').value;
    const cvv = document.getElementById('edit-cvv').value;

    document.getElementById('tarjeta-info').innerText = `Ending in ${numeroTarjeta.slice(-4)}`;
    toggleEdit('edit-payment');
}

function mostrarDetalles() {
    const resumenProductosContainer = document.getElementById('resumen-productos');
    resumenProductosContainer.classList.toggle('show');
}


