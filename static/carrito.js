
// 1. Creamos una lista vacía para el carrito
let carrito = [];

function agregarAlCarrito(nombre, precio) {
    // 2. Creamos un objeto con la información del producto
    const producto = {
        nombre: nombre,
        precio: precio
    };

    // 3. Lo metemos a nuestra lista (el carrito)
    carrito.push(producto);

    // 4. Guardamos la lista en el navegador (localStorage)
    // Usamos JSON.stringify porque el navegador solo guarda texto
    localStorage.setItem('miCarrito', JSON.stringify(carrito));

    // 5. ¡Avisamos al usuario!
    alert(`🛒 ¡Añadido! ${nombre} ha sido agregado al carrito.\nTotal de productos: ${carrito.length}`);
    
    console.log("Estado actual del carrito:", carrito);
}