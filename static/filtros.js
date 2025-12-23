
function filtrar(categoria) {
    const secciones = document.querySelectorAll('.category-section');

    // Revisamos cada sección una por una
    secciones.forEach(seccion => {
        const titulo = seccion.querySelector('h2').innerText.toLowerCase();
        if (categoria === 'todos') {
            seccion.style.display = 'block'; 
        } else if (titulo.includes(categoria)) {
            seccion.style.display = 'block'; 
        } else {
            seccion.style.display = 'none'; 
        }
    });
}