document.addEventListener('DOMContentLoaded', function () {
    const payButton = document.getElementById('pay-button');
    const termsCheckbox = document.getElementById('terms');
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    const creditCardInfo = document.querySelector('.credit-card-info');
    const billingAddressInputs = document.querySelectorAll('.billing-address input, .billing-address select');
    const contactInfoInputs = document.querySelectorAll('.contact-info input');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    const emailInput = document.getElementById('email');

    // Validaciones adicionales
    function validateCardNumber(cardNumber) {
        // Validar que el número de tarjeta tenga el formato adecuado
        const cardRegex = /^[0-9]{16}$/;
        return cardRegex.test(cardNumber.replace(/\s+/g, ''));
    }

    function validateExpiryDate(expiryDate) {
        // Validar que la fecha de expiración tenga el formato MM/AA
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return expiryRegex.test(expiryDate);
    }

    function validateCVV(cvv) {
        // Validar que el CVV tenga 3 dígitos
        const cvvRegex = /^[0-9]{3}$/;
        return cvvRegex.test(cvv);
    }

    function validateEmail(email) {
        // Validar que el correo electrónico tenga el formato adecuado
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateForm() {
        let valid = true;

        // Validar los campos de la tarjeta de crédito si es el método seleccionado
        if (document.querySelector('input[name="payment-method"]:checked').value === 'credit-card') {
            if (!validateCardNumber(cardNumberInput.value)) {
                valid = false;
                alert('Por favor, ingresa un número de tarjeta válido.');
            }

            if (!validateExpiryDate(expiryDateInput.value)) {
                valid = false;
                alert('Por favor, ingresa una fecha de expiración válida (MM/AA).');
            }

            if (!validateCVV(cvvInput.value)) {
                valid = false;
                alert('Por favor, ingresa un CVV válido (3 dígitos).');
            }
        }

        // Validar el correo electrónico
        if (!validateEmail(emailInput.value)) {
            valid = false;
            alert('Por favor, ingresa un correo electrónico válido.');
        }

        // Validar los campos de la dirección de facturación
        billingAddressInputs.forEach(input => {
            if (!input.value) {
                valid = false;
                alert('Por favor, completa todos los campos de la dirección de facturación.');
            }
        });

        // Validar los campos de información de contacto
        contactInfoInputs.forEach(input => {
            if (!input.value) {
                valid = false;
                alert('Por favor, completa todos los campos de información de contacto.');
            }
        });

        return valid;
    }

    // Habilitar el botón de pago si se aceptan los términos
    termsCheckbox.addEventListener('change', function () {
        payButton.disabled = !termsCheckbox.checked;
    });

    // Mostrar u ocultar campos de tarjeta de crédito según el método de pago
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'credit-card') {
                creditCardInfo.style.display = 'block';
            } else {
                creditCardInfo.style.display = 'none';
            }
        });
    });

    // Lógica para procesar el pago
    payButton.addEventListener('click', function () {
        if (!termsCheckbox.checked) {
            alert('Por favor, acepta los términos y condiciones.');
            return;
        }

        if (validateForm()) {
            const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

            if (selectedPaymentMethod === 'paypal') {
                // Redirigir a PayPal
                window.location.href = 'https://www.paypal.com/your-paypal-link';
            } else if (selectedPaymentMethod === 'credit-card') {
                // Aquí añadirías la lógica para procesar el pago con tarjeta de crédito
                alert('Procesando pago con tarjeta de crédito...');
                // Simulación de procesamiento de pago
                setTimeout(() => {
                    alert('Pago procesado con éxito.');
                }, 2000);
            }
        }
    });

    // Formato automático para el número de tarjeta de crédito
    cardNumberInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    });

    // Formato automático para la fecha de expiración
    expiryDateInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').replace(/(\d{2})(\d{1,2})/, '$1/$2').substr(0, 5);
    });

    // Prevenir el envío del formulario con Enter en campos individuales
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                return false;
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const payButton = document.getElementById("pay-button");
    const termsCheckbox = document.getElementById("terms");
    const inputs = document.querySelectorAll("input[required], select[required]");
    const successIcon = document.createElement("div");
    const errorIcon = document.createElement("div");

    successIcon.classList.add("success-icon");
    successIcon.innerHTML = "✔";
    document.querySelector(".payment-form").appendChild(successIcon);

    errorIcon.classList.add("error-icon");
    errorIcon.innerHTML = "✖";
    document.querySelector(".payment-form").appendChild(errorIcon);

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });
        payButton.disabled = !isValid || !termsCheckbox.checked;
    }

    inputs.forEach(input => {
        input.addEventListener("input", validateForm);
    });

    termsCheckbox.addEventListener("change", validateForm);

    payButton.addEventListener("click", function () {
        // Simulación de proceso de pago
        const isPaymentSuccessful = Math.random() > 0.5; // Random para simular éxito o fracaso

        if (isPaymentSuccessful) {
            successIcon.style.display = "block";
            errorIcon.style.display = "none";

            // Aquí puedes agregar la lógica para procesar el pago y enviar la información al servidor
            // Ejemplo de lógica de pago exitoso:
            setTimeout(() => {
                alert("Pago realizado con éxito. Los fondos se han transferido a la cuenta bancaria.");
                successIcon.style.display = "none";
            }, 5000);
        } else {
            successIcon.style.display = "none";
            errorIcon.style.display = "block";

            // Ejemplo de lógica de pago fallido:
            setTimeout(() => {
                alert("Pago fallido. Por favor, verifica tu información e inténtalo nuevamente.");
                errorIcon.style.display = "none";
            }, 5000);
        }
    });
});

