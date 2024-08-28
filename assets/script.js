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

    

    

    
    const popups = document.querySelectorAll('.popup-content');
    popups.forEach(popup => {
        popup.style.transition = "transform 0.3s ease";
        popup.addEventListener('mouseenter', () => {
            popup.style.transform = "scale(1.05)";
        });
        popup.addEventListener('mouseleave', () => {
            popup.style.transform = "scale(1)";
        });
    });

    
    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            this.closest('.popup').style.display = 'none';
        });
    });

    
    document.getElementById('register-btn').addEventListener('click', function() {
        document.getElementById('register-popup').style.display = 'block';
    });
});




const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_csrl5ge';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('El formulario a sido enviado, espera tu respuesta al mismo correo');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
