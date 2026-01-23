(() => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const SPEED_AUTOPLAY = 0.4; // px por frame
    let autoplay = true;
    let rafId = null;
    let pauseTimeout = null;

    // Duplicar contenido
    const items = Array.from(carousel.children);
    items.forEach(item => {
        carousel.appendChild(item.cloneNode(true));
    });

    const halfScrollWidth = carousel.scrollWidth / 2;

    function loop() {
        if (autoplay) {
            carousel.scrollLeft += SPEED_AUTOPLAY;
            if (carousel.scrollLeft >= halfScrollWidth) {
                carousel.scrollLeft -= halfScrollWidth;
            }
        }
        rafId = requestAnimationFrame(loop);
    }

    loop();

    function pauseAutoplay(ms = 10000) {
        autoplay = false;
        clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => {
            autoplay = true;
        }, ms);
    }

    // Wheel = avance continuo (no por pasos)
    carousel.addEventListener('wheel', (e) => {
        pauseAutoplay();
        carousel.scrollLeft += e.deltaY;

        if (carousel.scrollLeft >= halfScrollWidth) {
            carousel.scrollLeft -= halfScrollWidth;
        }
        if (carousel.scrollLeft < 0) {
            carousel.scrollLeft += halfScrollWidth;
        }
    }, { passive: true });

    // Hover pausa
    carousel.addEventListener('mouseenter', () => autoplay = false);
    carousel.addEventListener('mouseleave', () => autoplay = true);

    // Touch
    carousel.addEventListener('touchstart', () => pauseAutoplay());
})();
