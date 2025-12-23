document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Capturamos los datos usando los IDs de tu HTML
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Referencias a tus mensajes de error (opcional para mostrarlos dinámicamente)
    const errorConfirm = document.getElementById('confirm-password-error');

    // 1. Validación: ¿Coinciden las contraseñas?
    if (password !== confirmPassword) {
        errorConfirm.style.display = 'block'; // Muestra el mensaje de error de tu HTML
        alert("Las contraseñas no coinciden.");
        return;
    } else {
        errorConfirm.style.display = 'none';
    }

    // 2. Creamos el objeto con los datos para la base de datos
    const datosUsuario = {
        nombre: nombre,
        email: email,
        password: password
    };

    // 3. Enviamos los datos al backend (Python)
    fetch('/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("¡Usuario registrado con éxito!");
            window.location.href = "/"; // Te lleva al inicio tras guardar
        } else {
            alert("Error: " + data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error al conectar con el servidor.");
    });
});