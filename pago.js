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
                    itemElement.classList.add('resumen-item');
                    itemElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Talla: ${item.size}</p>
                    <p>Precio: ${product.price}EUR</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Total: ${(product.price * item.quantity).toFixed(2)}EUR</p>
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

            document.getElementById('total-pago').innerHTML = `
                Total productos: ${total.toFixed(2)} EUR<br>
                ${mensajeEnvio}<br>
                <strong>Total a pagar: ${totalConEnvio.toFixed(2)} EUR</strong>
            `;
        });
}

function pagoExpress(metodo) {
    alert(`Pago Express con ${metodo} no implementado aún.`);
}
