// JavaScript específico para la página de Contacto
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar formulario de contacto
    initContactForm();
    
    // Inicializar FAQ
    initFAQ();
    
    // Inicializar chat button
    initChatButton();
    
    // Contador de caracteres para textarea
    initCharCounter();
});

// Formulario de contacto
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

// Validar formulario completo
function validateForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;
    
    // Validar nombre
    const nombre = document.getElementById('nombre');
    if (nombre.value.trim().length < 2) {
        showFieldError(nombre, 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showFieldError(email, 'Por favor, ingresa un email válido');
        isValid = false;
    }
    
    // Validar teléfono (opcional pero si se llena debe ser válido)
    const telefono = document.getElementById('telefono');
    if (telefono.value.trim() && !/^[0-9+\-\s\(\)]{10,}$/.test(telefono.value)) {
        showFieldError(telefono, 'Por favor, ingresa un teléfono válido');
        isValid = false;
    }
    
    // Validar asunto
    const asunto = document.getElementById('asunto');
    if (!asunto.value) {
        showFieldError(asunto, 'Por favor, selecciona un asunto');
        isValid = false;
    }
    
    // Validar mensaje
    const mensaje = document.getElementById('mensaje');
    if (mensaje.value.trim().length < 10) {
        showFieldError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    // Validar términos y condiciones
    const terminos = document.getElementById('acepto-terminos');
    if (!terminos.checked) {
        showFieldError(terminos, 'Debes aceptar los términos y condiciones');
        isValid = false;
    }
    
    return isValid;
}

// Validar campo individual
function validateField(field) {
    clearFieldError(field);
    
    switch(field.id) {
        case 'nombre':
            if (field.value.trim().length < 2) {
                showFieldError(field, 'El nombre debe tener al menos 2 caracteres');
                return false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Por favor, ingresa un email válido');
                return false;
            }
            break;
            
        case 'telefono':
            if (field.value.trim() && !/^[0-9+\-\s\(\)]{10,}$/.test(field.value)) {
                showFieldError(field, 'Por favor, ingresa un teléfono válido');
                return false;
            }
            break;
            
        case 'asunto':
            if (!field.value) {
                showFieldError(field, 'Por favor, selecciona un asunto');
                return false;
            }
            break;
            
        case 'mensaje':
            if (field.value.trim().length < 10) {
                showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
                return false;
            }
            break;
            
        case 'acepto-terminos':
            if (!field.checked) {
                showFieldError(field, 'Debes aceptar los términos y condiciones');
                return false;
            }
            break;
    }
    
    return true;
}

// Mostrar error en campo
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorText = formGroup.querySelector('.error-text');
    
    field.style.borderColor = 'var(--error-color)';
    errorText.textContent = message;
    errorText.style.display = 'block';
}

// Limpiar error de campo
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorText = formGroup.querySelector('.error-text');
    
    field.style.borderColor = '';
    errorText.textContent = '';
    errorText.style.display = 'none';
}

// Enviar formulario
function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Simular envío (en un proyecto real, aquí harías una petición AJAX)
    setTimeout(() => {
        // Simular éxito
        showSuccessMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        form.reset();
        updateCharCounter(); // Resetear contador
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 2000);
}

// Mostrar mensaje de éxito
function showSuccessMessage(message) {
    const successDiv = document.getElementById('successMessage');
    const errorDiv = document.getElementById('errorMessage');
    
    errorDiv.style.display = 'none';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

// Mostrar mensaje de error
function showErrorMessage(message) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    successDiv.style.display = 'none';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// FAQ interactivo
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar todas las FAQ
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Abrir la FAQ clickeada si no estaba activa
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Botón de chat
function initChatButton() {
    const chatBtn = document.querySelector('.chat-btn');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            // En un proyecto real, aquí abrirías el widget de chat
            mostrarNotificacion('Chat en vivo próximamente disponible');
        });
    }
}

// Contador de caracteres para textarea
function initCharCounter() {
    const textarea = document.getElementById('mensaje');
    const charCounter = document.querySelector('.char-count');
    
    if (textarea && charCounter) {
        textarea.addEventListener('input', updateCharCounter);
        
        function updateCharCounter() {
            const currentLength = textarea.value.length;
            const maxLength = textarea.getAttribute('maxlength') || 1000;
            
            charCounter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            // Cambiar color si se acerca al límite
            if (currentLength > maxLength * 0.9) {
                charCounter.style.color = 'var(--error-color)';
            } else if (currentLength > maxLength * 0.75) {
                charCounter.style.color = 'var(--accent-color)';
            } else {
                charCounter.style.color = 'var(--gray-600)';
            }
        }
        
        // Hacer la función accesible globalmente para el reset del formulario
        window.updateCharCounter = updateCharCounter;
    }
}

// Función de notificación (reutilizar del script principal)
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notification';
    notificacion.textContent = mensaje;
    
    // Estilos de la notificación
    Object.assign(notificacion.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: '#10b981',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '5px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Añadir al DOM
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

// Validación de formulario con HTML5 Constraint API
function setupHTML5Validation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            
            let message = '';
            
            if (this.validity.valueMissing) {
                message = 'Este campo es obligatorio';
            } else if (this.validity.typeMismatch) {
                message = 'Por favor, ingresa un valor válido';
            } else if (this.validity.tooShort) {
                message = `Mínimo ${this.minLength} caracteres`;
            } else if (this.validity.tooLong) {
                message = `Máximo ${this.maxLength} caracteres`;
            } else if (this.validity.patternMismatch) {
                message = 'El formato no es válido';
            }
            
            showFieldError(this, message);
        });
        
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                clearFieldError(this);
            }
        });
    });
}