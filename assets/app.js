function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('show');
    } else {
        menu.classList.remove('show');
        menu.classList.add('hidden');
    }
}

function openRegister() {
    const registerPopup = document.getElementById('registerPopup');
    registerPopup.classList.add('show');
}

function closeRegister() {
    const registerPopup = document.getElementById('registerPopup');
    registerPopup.classList.remove('show');
}

function openLogin() {
    const loginPopup = document.getElementById('loginPopup');
    loginPopup.classList.add('show');
}

function closeLogin() {
    const loginPopup = document.getElementById('loginPopup');
    loginPopup.classList.remove('show');
}

function submitRegister(event) {
    event.preventDefault();
    closeRegister();
    openLogin();
    return false;
}

function submitLogin(event) {
    event.preventDefault();
    closeLogin();
    alert('Inicio de sesión exitoso');
    return false;
}

function validateForm(event) {
    const form = document.getElementById('contactForm');
    const nombre = form.nombre.value;
    const email = form.email.value;
    const mensaje = form.mensaje.value;

    if (!nombre || !email || !mensaje) {
        alert('Por favor, rellene todos los campos.');
        return false;
    }

    alert('Formulario enviado correctamente.');
    return true;
}

function submitComment() {
    const form = document.getElementById('comentariosForm');
    const estrellas = form.estrellas.value;
    const comentario = form.comentario.value;

    if (!estrellas || !comentario) {
        alert('Por favor, rellene todos los campos.');
        return false;
    }

    const comentariosList = document.getElementById('comentariosList');
    const comentarioDiv = document.createElement('div');
    comentarioDiv.classList.add('comentario-item');
    comentarioDiv.innerHTML = `
        <p><strong>Valoración:</strong> ${estrellas} estrellas</p>
        <p><strong>Comentario:</strong> ${comentario}</p>
    `;
    comentariosList.appendChild(comentarioDiv);

    form.reset();
    return false;
}

function acceptCookies() {
    const cookiesPopup = document.getElementById('cookiesPopup');
    cookiesPopup.classList.remove('show');
}

window.onload = function() {
    setTimeout(function() {
        const cookiesPopup = document.getElementById('cookiesPopup');
        cookiesPopup.classList.add('show');
    }, 5000);
};
