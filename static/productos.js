document.querySelectorAll('.btn-add-cart').forEach(boton => {
    boton.addEventListener('click', function() {
        const producto = this.getAttribute('data-producto');
        const password = prompt(`Para agregar "${producto}", ingresa tu contraseña de usuario:`);

        if (password) {
            fetch('/api/verificar_compra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: password })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.mensaje);
            })
            .catch(err => alert("Error al conectar con el servidor"));
        }
    });
});