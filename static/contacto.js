document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreVal = document.getElementById('nombre').value;
    const emailVal = document.getElementById('email').value;
    const asuntoVal = document.getElementById('asunto').value;
    const mensajeVal = document.getElementById('mensaje').value;

    const formData = {
        nombre: nombreVal,
        email: emailVal,
        asunto: asuntoVal,
        mensaje: mensajeVal
    };

    // 2. Enviamos los datos al backend de Python mediante POST
    fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // 3. SOLO SI EL GUARDADO FUE EXITOSO, mostramos el mensaje de éxito
            const contenedor = document.querySelector('.contact-form');
            contenedor.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <i class="fas fa-check-circle" style="font-size: 50px; color: green;"></i>
                    <h3>¡Gracias, ${nombreVal}!</h3>
                    <p>Tu mensaje se guardó correctamente en la base de datos SQL.</p>
                    <br>
                    <a href="/contacto" style="color: red; text-decoration: underline;">Enviar otro mensaje</a>
                </div>
            `;
        } else {
            alert("Error del servidor: " + data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("No se pudo conectar con el servidor. Revisa la terminal.");
    });
});