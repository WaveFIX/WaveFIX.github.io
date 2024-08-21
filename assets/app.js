// Configuración inicial de seguridad
(function() {
    'use strict';
    // Políticas de seguridad
    const cspHeader = "default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self'; frame-ancestors 'none';";
    document.head.querySelector("meta[http-equiv='Content-Security-Policy']").setAttribute('content', cspHeader);
})();

// Función para alternar el menú de navegación
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
    if (!menu.classList.contains('hidden')) {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Funciones para mostrar y cerrar los pop-ups de login y registro
function openLogin() {
    closeAllPopups();
    const loginPopup = document.getElementById('loginPopup');
    loginPopup.style.display = 'block';
}

function openRegister() {
    closeAllPopups();
    const registerPopup = document.getElementById('registerPopup');
    registerPopup.style.display = 'block';
}

// Función para cerrar todos los pop-ups
function closeAllPopups() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.style.display = 'none';
    });
}

// Función para cerrar un pop-up específico
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
}

// Función para validar el formulario de contacto con medidas de seguridad
function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación básica
    if (!name || !email || !message) {
        alert('Todos los campos son obligatorios.');
        return false;
    }

    // Validación de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, introduce un email válido.');
        return false;
    }

    // Validación de contenido del mensaje para prevenir XSS
    const invalidChars = /<|>|&|"/g;
    if (invalidChars.test(message)) {
        alert('El mensaje contiene caracteres inválidos.');
        return false;
    }

    return true;
}

// Función para enviar el formulario de comentarios con protección CSRF
function submitComment(token) {
    const estrellas = document.querySelector('input[name="estrellas"]:checked').value;
    const comentario = document.getElementById('comentario').value.trim();

    // Validación del comentario
    if (!comentario) {
        alert('El comentario no puede estar vacío.');
        return false;
    }

    // Protección CSRF
    if (!token || token !== getCSRFToken()) {
        alert('Token CSRF inválido. Por favor, recarga la página.');
        return false;
    }

    // Protección XSS
    const safeComment = comentario.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Añadir el comentario al listado
    const comentariosList = document.getElementById('comentariosList');
    const newComment = document.createElement('div');
    newComment.className = 'comentario';
    newComment.innerHTML = `
        <p><strong>${estrellas} estrellas</strong></p>
        <p>${safeComment}</p>
    `;
    comentariosList.appendChild(newComment);

    // Limpiar el formulario
    document.getElementById('comentariosForm').reset();

    return false; // Prevenir recarga de la página
}

// Función para obtener token CSRF (simulado)
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

// Función para enviar el formulario de registro con validaciones
function submitRegister(token) {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validaciones básicas
    if (!username || !password || !confirmPassword) {
        alert('Todos los campos son obligatorios.');
        return false;
    }

    // Verificación de longitud de la contraseña
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return false;
    }

    // Verificación de coincidencia de contraseñas
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    // Protección CSRF
    if (!token || token !== getCSRFToken()) {
        alert('Token CSRF inválido. Por favor, recarga la página.');
        return false;
    }

    // Envío seguro del formulario
    // Aquí podrías agregar código para enviar el formulario al servidor de manera segura
    console.log('Formulario de registro enviado.');
    return false; // Prevenir recarga de la página
}

// Función para enviar el formulario de login con validaciones
function submitLogin(token) {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Validaciones básicas
    if (!username || !password) {
        alert('Todos los campos son obligatorios.');
        return false;
    }

    // Protección CSRF
    if (!token || token !== getCSRFToken()) {
        alert('Token CSRF inválido. Por favor, recarga la página.');
        return false;
    }

    // Envío seguro del formulario
    // Aquí podrías agregar código para autenticar al usuario de manera segura
    console.log('Formulario de login enviado.');
    return false; // Prevenir recarga de la página
}

// Función para aceptar cookies con almacenamiento en localStorage
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    const cookiesPopup = document.getElementById('cookiesPopup');
    cookiesPopup.style.display = 'none';
}

// Función para comprobar si las cookies han sido aceptadas
function checkCookiesAccepted() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookiesPopup = document.getElementById('cookiesPopup');
        cookiesPopup.style.display = 'block';
    }
}

// Función para abrir la política de cookies
function openPolicy() {
    window.location.href = 'policy.html'; // Redirigir a la política de cookies
}

 
    // Filtrar y mostrar comentarios
    const filteredComments = comentarios.filter(c => c.estrellas >= minStars && c.estrellas <= maxStars);
    filteredComments.forEach(c => {
        const newComment = document.createElement('div');
        newComment.className = 'comentario';
        newComment.innerHTML = `
            <p><strong>${c.estrellas} estrellas</strong></p>
            <p>${c.texto}</p>
        `;
        comentariosList.appendChild(newComment);
    });
}

// Inicialización de funcionalidades al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    checkCookiesAccepted(); // Comprobar cookies
    // Otras inicializaciones que se puedan necesitar
});

// Código adicional de ejemplo para añadir funcionalidades avanzadas
function initializeAdvancedFeatures() {
    // Implementación de funcionalidades avanzadas
    // Ejemplo: manejo avanzado de usuarios, roles, permisos, etc.
    console.log('Funcionalidades avanzadas inicializadas.');
}

// Llamar a la función de inicialización avanzada
initializeAdvancedFeatures();
