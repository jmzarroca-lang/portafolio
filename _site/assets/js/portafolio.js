(function () {
  var carousel = document.querySelector('.carousel');
  if (!carousel) return;

  var items = Array.from(carousel.children);
  var totalOriginal = items.length;

  // Clonar al final solamente
  items.forEach(function(item) {
    var clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.remove('reveal');
    clone.style.opacity = '1';
    carousel.appendChild(clone);
  });

  var itemWidth = items[0].offsetWidth + 20;
  var loopPoint = itemWidth * totalOriginal;
var jumping = false;

carousel.addEventListener('scroll', function () {
  if (jumping) return;
  if (carousel.scrollLeft >= loopPoint) {
    jumping = true;
    carousel.style.scrollBehavior = 'auto';
    carousel.scrollLeft = carousel.scrollLeft - loopPoint;
    requestAnimationFrame(function() {
      carousel.style.scrollBehavior = 'smooth';
      jumping = false;
    });
  }
}, { passive: true });

  carousel.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    carousel.scrollLeft += e.deltaY * 3;
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') carousel.scrollLeft += itemWidth;
    if (e.key === 'ArrowLeft') carousel.scrollLeft -= itemWidth;
  });

// Snap al proyecto más cercano al soltar la rueda
  var snapTimeout;
  carousel.addEventListener('scroll', function () {
    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(function () {
      if (jumping) return;
      var nearest = Math.round(carousel.scrollLeft / itemWidth) * itemWidth;
      carousel.style.scrollBehavior = 'smooth';
      carousel.scrollLeft = nearest;
    }, 150);
  }, { passive: true });

})();