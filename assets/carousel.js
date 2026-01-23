(() => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const INTERVAL = 5000;
    let timer = null;

    let items = Array.from(carousel.querySelectorAll('.project-a')).filter(e => e instanceof HTMLElement);
    if (items.length === 0) items = Array.from(carousel.children).filter(e => e instanceof HTMLElement);

    const originalItemsCount = items.length;

    // Clonar items para loop infinito
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Recalcular lista total
    items = Array.from(carousel.children).filter(e => e instanceof HTMLElement);

    let currentIndex = 0;
    let wheelAccumulator = 0;
    const WHEEL_THRESHOLD = 100;

    function scrollToIndex(smooth = true) {
        const itemWidth = items[0].offsetWidth;

        carousel.scrollTo({
            left: currentIndex * itemWidth,
            behavior: smooth ? 'smooth' : 'instant'
        });

        // Normalización invisible (solo hacia adelante)
        if (currentIndex >= originalItemsCount * 2) {
            currentIndex -= originalItemsCount;
            carousel.scrollTo({
                left: currentIndex * itemWidth,
                behavior: 'instant'
            });
        }
    }

    function scrollToNextItem() {
        currentIndex++;
        scrollToIndex(true);
    }

    function startTimer() {
        stopTimer();
        timer = setInterval(scrollToNextItem, INTERVAL);
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // Autoplay
    startTimer();

    // Rueda del mouse (avance continuo por pasos)
    carousel.addEventListener('wheel', (event) => {
        stopTimer(); // el usuario manda
        wheelAccumulator += event.deltaY;

        if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return;

        const direction = wheelAccumulator > 0 ? 1 : -1;
        wheelAccumulator = 0;

        if (direction > 0) {
            currentIndex++;
            scrollToIndex(true);
        }
    }, { passive: true });

    // Touch (móvil)
    carousel.addEventListener('touchstart', () => {
        stopTimer();
    }, { passive: true });

})();
