document.addEventListener('DOMContentLoaded', () => {
    // Popup de Cookies
    const cookiesPopup = document.getElementById('cookies-popup');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    acceptCookiesBtn.addEventListener('click', () => {
        cookiesPopup.style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    });

    if (!localStorage.getItem('cookiesAccepted')) {
        cookiesPopup.style.display = 'block';
    }

    // Popups de Inicio de Sesión y Registro
    const loginPopup = document.getElementById('login-popup');
    const registerPopup = document.getElementById('register-popup');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const closeButtons = document.querySelectorAll('.popup .close');

    loginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'block';
    });

    registerBtn.addEventListener('click', () => {
        loginPopup.style.display = 'none';
        registerPopup.style.display = 'block';
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            loginPopup.style.display = 'none';
            registerPopup.style.display = 'none';
        });
    });

    // Carrito de Compras
    const cartMenu = document.getElementById('cart-menu');
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');

    cartBtn.addEventListener('click', () => {
        cartMenu.style.transform = 'translateX(0)';
        displayCart();
    });

    closeCartBtn.addEventListener('click', () => {
        cartMenu.style.transform = 'translateX(100%)';
    });

    function addToCart(product, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ product, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `<p>${item.product} - $${item.price}</p>`;
                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    // Validación de Cupón
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const couponPopup = document.getElementById('coupon-popup');
    const couponMessage = document.getElementById('coupon-message');
    const couponCodeInput = document.getElementById('coupon-code');

    applyCouponBtn.addEventListener('click', () => {
        const couponCode = couponCodeInput.value;
        if (couponCode === 'DESCUENTO10') {
            couponMessage.textContent = '¡Cupón aplicado con éxito!';
        } else {
            couponMessage.textContent = 'Cupón no válido. Inténtalo de nuevo.';
        }
        couponPopup.style.display = 'block';
    });

    const closeCouponPopup = couponPopup.querySelector('.close');
    closeCouponPopup.addEventListener('click', () => {
        couponPopup.style.display = 'none';
    });

    // Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Formulario enviado con éxito');
        contactForm.reset();
    });
});
