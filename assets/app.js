function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
    if (!menu.classList.contains('hidden')) {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}


function openLogin() {
    const loginPopup = document.getElementById('loginPopup');
    loginPopup.style.display = 'block';
}


function openRegister() {
    const registerPopup = document.getElementById('registerPopup');
    registerPopup.style.display = 'block';
}

// Función para cerrar los pop-ups
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
}

// Función para validar el formulario de contacto
function validateForm() {
    // Validación del formulario de contacto
    return true;
}

// Función para enviar el formulario de comentarios
function submitComment() {
    const estrellas = document.querySelector('input[name="estrellas"]:checked').value;
    const comentario = document.getElementById('comentario').value;

    // Añadir el comentario al listado
    const comentariosList = document.getElementById('comentariosList');
    const newComment = document.createElement('div');
    newComment.className = 'comentario';
    newComment.innerHTML = 
        <p><strong>${estrellas} estrellas</strong></p>
        <p>${comentario}</p>
    ;
    comentariosList.appendChild(newComment);

    // Limpiar el formulario
    document.getElementById('comentariosForm').reset();

    return false; // Prevenir recarga de la página
}

// Función para enviar el formulario de registro
function submitRegister() {
    // Registro del usuario
    return false; // Prevenir recarga de la página
}

// Función para enviar el formulario de login
function submitLogin() {
    // Login del usuario
    return false; // Prevenir recarga de la página
}

// Función para aceptar cookies
function acceptCookies() {
    const cookiesPopup = document.getElementById('cookiesPopup');
    cookiesPopup.style.display = 'none';
}

// Función para abrir la política de cookies
function openPolicy() {
    window.location.href = 'policy.html'; // Redirigir a la política de cookies
}

// Función para filtrar comentarios
function filterComments(minStars, maxStars) {
    const comentariosList = document.getElementById('comentariosList');
    comentariosList.innerHTML = ''; // Limpiar comentarios existentes

    // Comentarios de ejemplo (pueden ser reemplazados por comentarios reales)
    const comentarios = [
        { estrellas: 5, texto: 'Excelente servicio.' },
        { estrellas: 4, texto: 'Muy buen producto.' },
        { estrellas: 3, texto: 'Aceptable, pero puede mejorar.' },
        { estrellas: 2, texto: 'No cumple con las expectativas.' },
        { estrellas: 1, texto: 'Muy malo, no lo recomiendo.' }
    ];

    // Filtrar y mostrar comentarios
    const filteredComments = comentarios.filter(c => c.estrellas >= minStars && c.estrellas <= maxStars);
    filteredComments.forEach(c => {
        const newComment = document.createElement('div');
        newComment.className = 'comentario';
        newComment.innerHTML = 
            <p><strong>${c.estrellas} estrellas</strong></p>
            <p>${c.texto}</p>
        ;
        comentariosList.appendChild(newComment);
    });
    }
