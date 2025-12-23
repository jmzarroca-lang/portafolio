(() => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const INTERVAL = 5000;
    let timer = null;
    let isPaused = false;
    let scrollPauseTimeout = null;
    let items = Array.from(carousel.querySelectorAll('.project-a')).filter(e => e instanceof HTMLElement);
    if (items.length === 0) items = Array.from(carousel.children).filter(e => e instanceof HTMLElement);

    // Clone items to create infinite scroll
    const originalItemsCount = items.length;
    const clonedItems = [...items];
    clonedItems.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
        items.push(clone);
    });

    let currentIndex = 0;

    function scrollToNextItem() {
        currentIndex++;
        const itemWidth = items[0].offsetWidth;
        carousel.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });

        // Reset scroll position when we've scrolled through all original items
        if (currentIndex >= originalItemsCount) {
            setTimeout(() => {
                currentIndex = 0;
                carousel.scrollTo({
                    left: 0,
                    behavior: 'instant'
                });
            }, 500); // Match the smooth scroll duration
        }
    }

    function startTimer() {
        stopTimer();
        timer = setInterval(() => {
            if (!isPaused) {
                scrollToNextItem();
            }
        }, INTERVAL);
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function pauseForUserInteraction(ms = 5000) {
        isPaused = true;
        if (scrollPauseTimeout) clearTimeout(scrollPauseTimeout);
        scrollPauseTimeout = setTimeout(() => {
            isPaused = false;
        }, ms);
    }

    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; });
    carousel.addEventListener('wheel', () => pauseForUserInteraction(), { passive: true });
    carousel.addEventListener('touchstart', () => {
        if (scrollPauseTimeout) clearTimeout(scrollPauseTimeout);
        isPaused = true;
    }, { passive: true });
    carousel.addEventListener('touchend', () => pauseForUserInteraction(), { passive: true });

    startTimer();
})();
