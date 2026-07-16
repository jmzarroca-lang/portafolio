/*
  carousel-nav.js
  
  Adds navigation arrows and dot indicators to all .carousel elements.
  - Left/right arrow buttons scroll to prev/next item
  - Dot indicators show current position and allow direct navigation
  - Respects existing scroll-snap behavior
*/

(function () {
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach((carousel, carouselIndex) => {
    const images = carousel.querySelectorAll('img');
    if (images.length === 0) return;
    
    // Create container for controls
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'carousel-controls';
    controlsContainer.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      gap: 10px;
    `;
    
    // Create left arrow button
    const btnPrev = document.createElement('button');
    btnPrev.innerHTML = '<span class="carousel-arrow-text"><img src="/assets/images/icons/botonflecha.png" style="position: relative; top: -1.5px; width: 20px; transform: rotate(90deg); cursor: pointer; transition: linear 100ms;" id="dd-o-a-2"></span>'; // left chevron
    btnPrev.style.cssText = `
      background: none;
      border: none;
      width: 50px;
      height: 30px;
      cursor: pointer;
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: all 0.2s ease;
    `;
    
    // Create right arrow button
    const btnNext = document.createElement('button');
    btnNext.innerHTML = '<span class="carousel-arrow-text"><span class="carousel-arrow-text"><img src="/assets/images/icons/botonflecha.png" style="position: relative; top: -1.5px; width: 20px; transform: rotate(-90deg); cursor: pointer; transition: linear 100ms;" id="dd-o-a-2"></span></span>'; // right chevron
    btnNext.style.cssText = `
      background: none;
      border: none;
      width: 50px;
      height: 30px;
      cursor: pointer;
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: all 0.2s ease;
    `;
    
    // Create dot indicators container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    dotsContainer.style.cssText = `
      display: flex;
      gap: 6px;
      justify-content: center;
      flex: 1;
    `;
    
    const dots = [];
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('carousel-dot--active');
      dot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #B1B1AF;
        background: ${i === 0 ? '#545454' : 'white'};
        cursor: pointer;
        padding: 0;
        transition: all 0.2s ease;
      `;
      
      dot.addEventListener('click', () => {
        const scrollLeft = images[i].offsetLeft - carousel.offsetLeft;
        carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        updateIndicators();
      });
      
      dots.push(dot);
      dotsContainer.appendChild(dot);
    });
    
    // Function to update active indicator
    function updateIndicators() {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.clientWidth;
      let activeIndex = Math.round(scrollLeft / itemWidth);
      activeIndex = Math.max(0, Math.min(activeIndex, images.length - 1));
      
      dots.forEach((dot, i) => {
        if (i === activeIndex) {
          dot.classList.add('carousel-dot--active');
          dot.style.background = '#545454';
        } else {
          dot.classList.remove('carousel-dot--active');
          dot.style.background = 'white';
        }
      });
    }
    
    // Arrow button handlers
    btnPrev.addEventListener('click', () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.clientWidth;
      const newLeft = Math.max(0, scrollLeft - itemWidth);
      carousel.scrollTo({ left: newLeft, behavior: 'smooth' });
      updateIndicators();
    });
    
    btnNext.addEventListener('click', () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.clientWidth;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const newLeft = Math.min(maxScroll, scrollLeft + itemWidth);
      carousel.scrollTo({ left: newLeft, behavior: 'smooth' });
      updateIndicators();
    });
    
    // Update indicators on scroll
    carousel.addEventListener('scroll', updateIndicators, { passive: true });
    
    // Assemble controls
    controlsContainer.appendChild(btnPrev);
    controlsContainer.appendChild(dotsContainer);
    controlsContainer.appendChild(btnNext);
    
    // Insert controls after the carousel
    carousel.parentNode.insertBefore(controlsContainer, carousel.nextSibling);
  });
})();
