document.getElementById('menu-icon').addEventListener('click', function() {
    var menuContent = document.getElementById('menu-content');
    menuContent.classList.toggle('show');
});

document.getElementById('close-btn').addEventListener('click', function() {
    var menuContent = document.getElementById('menu-content');
    menuContent.classList.remove('show');
});

document.querySelectorAll('.menu-content ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace
        
        var targetId = this.getAttribute('href').substring(1);
        var targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Calcula la posición centrada en la pantalla
            var rect = targetElement.getBoundingClientRect();
            var offset = rect.top + window.pageYOffset - (window.innerHeight / 4) + (rect.height / 4);
            
            window.scrollTo({
                top: offset,
                behavior: 'smooth' // Añade un desplazamiento suave
            });
        }
    });
});

/* script de producto */

document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const productCards = document.querySelectorAll('.product-card');

    const visibleProducts = 2; // Número de productos visibles a la vez
    const totalProducts = productCards.length;
    let cardWidth = productCards[0].offsetWidth;

    let currentIndex = 0;
    let startX, currentX, isDragging = false;

    function updateSlider() {
        const offset = -currentIndex * cardWidth;
        sliderWrapper.style.transition = 'transform 0.3s ease'; // Añadido para mejorar la fluidez
        sliderWrapper.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + visibleProducts) % totalProducts;
        updateSlider();
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - visibleProducts + totalProducts) % totalProducts;
        updateSlider();
    });

    // Inicializa el slider
    updateSlider();

    // Función para manejar el arrastre
    function handleMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const deltaX = startX - x;
        sliderWrapper.style.transition = 'none'; // Desactiva la transición durante el arrastre
        sliderWrapper.style.transform = `translateX(${-currentIndex * cardWidth - deltaX}px)`;
    }

    function handleEnd() {
        if (!isDragging) return;
        const deltaX = startX - currentX;
        if (Math.abs(deltaX) > cardWidth / 3) { // Ajustado para suavizar la transición
            currentIndex = deltaX > 0 ? Math.min(currentIndex + visibleProducts, totalProducts - visibleProducts) : Math.max(currentIndex - visibleProducts, 0);
        }
        isDragging = false;
        updateSlider();
    }

    // Eventos para arrastrar con el mouse
    sliderWrapper.addEventListener('mousedown', function(e) {
        if (window.innerWidth > 768) return; // Desactiva el arrastre en pantallas grandes
        e.preventDefault(); // Evita el comportamiento predeterminado del arrastre del navegador
        startX = e.clientX;
        isDragging = true;
    });

    sliderWrapper.addEventListener('mousemove', handleMove);

    sliderWrapper.addEventListener('mouseup', function(e) {
        currentX = e.clientX;
        handleEnd();
    });

    // Eventos para arrastrar con el tacto
    sliderWrapper.addEventListener('touchstart', function(e) {
        if (window.innerWidth > 768) return; // Desactiva el arrastre en pantallas grandes
        e.preventDefault(); // Evita el comportamiento predeterminado del arrastre del navegador
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    sliderWrapper.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del arrastre del navegador
        handleMove(e);
    });

    sliderWrapper.addEventListener('touchend', function(e) {
        currentX = e.changedTouches[0].clientX;
        handleEnd();
    });

    // Recalcula las dimensiones del slider cuando se cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        cardWidth = productCards[0].offsetWidth;
        updateSlider();
    });
});
