// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const searchInput = document.getElementById('searchInput');
    const productosGrid = document.getElementById('productosGrid');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Inicializar funcionalidades
    initMobileMenu();
    initSearch();
    initNewsletter();
    initSmoothScroll();
    initProductCards();
    
    // Menú móvil
    function initMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Animar hamburger
                hamburger.classList.toggle('active');
            });
            
            // Cerrar menú al hacer clic en un enlace
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    }
    
    // Funcionalidad de búsqueda
    function initSearch() {
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                buscarProductos(searchTerm);
            });
            
            // Búsqueda en tiempo real
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const searchTerm = this.value.toLowerCase().trim();
                    buscarProductos(searchTerm);
                }
            });
        }
    }
    
    // Newsletter
    function initNewsletter() {
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const nombre = document.getElementById('nombre').value;
                const errorMessage = document.getElementById('errorMessage');
                const successMessage = document.getElementById('successMessage');
                
                // Limpiar mensajes previos
                errorMessage.style.display = 'none';
                successMessage.style.display = 'none';
                
                // Validaciones
                if (!validarEmail(email)) {
                    mostrarError('Por favor, ingresa un email válido.');
                    return;
                }
                
                if (nombre.length < 2) {
                    mostrarError('El nombre debe tener al menos 2 caracteres.');
                    return;
                }
                
                // Simular envío exitoso
                mostrarExito('¡Gracias por suscribirte! Recibirás nuestras mejores ofertas.');
                newsletterForm.reset();
            });
        }
    }
    
    // Scroll suave
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Tarjetas de productos
    function initProductCards() {
        const buyButtons = document.querySelectorAll('.btn-comprar');
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.producto-card');
                const productName = productCard.querySelector('h3').textContent;
                
                // Animación del botón
                this.style.transform = 'scale(0.95)';
                this.textContent = 'Añadido ✓';
                this.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.textContent = 'Añadir al Carrito';
                    this.style.backgroundColor = '';
                }, 1500);
                
                // Mostrar notificación
                mostrarNotificacion(`${productName} añadido al carrito`);
            });
        });
    }
});

// Función de búsqueda de productos
function buscarProductos(termino = '') {
    const productos = document.querySelectorAll('.producto-card');
    let productosEncontrados = 0;
    
    productos.forEach(producto => {
        const nombre = producto.querySelector('h3').textContent.toLowerCase();
        const descripcion = producto.querySelector('.descripcion').textContent.toLowerCase();
        const categoria = producto.dataset.categoria.toLowerCase();
        
        const coincide = nombre.includes(termino) || 
                        descripcion.includes(termino) || 
                        categoria.includes(termino) ||
                        termino === '';
        
        if (coincide) {
            producto.style.display = 'block';
            producto.style.animation = 'fadeInUp 0.5s ease';
            productosEncontrados++;
        } else {
            producto.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no se encontraron productos
    mostrarResultadosBusqueda(productosEncontrados, termino);
}

// Mostrar resultados de búsqueda
function mostrarResultadosBusqueda(cantidad, termino) {
    let mensaje = document.getElementById('searchMessage');
    
    // Crear mensaje si no existe
    if (!mensaje) {
        mensaje = document.createElement('div');
        mensaje.id = 'searchMessage';
        mensaje.style.textAlign = 'center';
        mensaje.style.padding = '1rem';
        mensaje.style.margin = '1rem 0';
        
        const productosSection = document.getElementById('productos');
        const grid = document.getElementById('productosGrid');
        productosSection.insertBefore(mensaje, grid);
    }
    
    if (termino && cantidad === 0) {
        mensaje.innerHTML = `<p style="color: #ef4444;">No se encontraron productos para "${termino}"</p>`;
        mensaje.style.display = 'block';
    } else if (termino && cantidad > 0) {
        mensaje.innerHTML = `<p style="color: #10b981;">Se encontraron ${cantidad} producto(s) para "${termino}"</p>`;
        mensaje.style.display = 'block';
    } else {
        mensaje.style.display = 'none';
    }
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Mostrar mensaje de éxito
function mostrarExito(mensaje) {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = mensaje;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

// Mostrar notificación
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

// Función para filtrar productos por categoría
function filtrarPorCategoria(categoria) {
    const productos = document.querySelectorAll('.producto-card');
    
    productos.forEach(producto => {
        const categoriaProducto = producto.dataset.categoria;
        
        if (categoria === 'todos' || categoriaProducto === categoria) {
            producto.style.display = 'block';
            producto.style.animation = 'fadeInUp 0.5s ease';
        } else {
            producto.style.display = 'none';
        }
    });
}

// Función para manejar el scroll y mostrar/ocultar header
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll hacia abajo
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Agregar estilos CSS para las animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .header {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});