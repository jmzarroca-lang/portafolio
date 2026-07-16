(function () {
  var carousel = document.querySelector('.carousel');
  if (!carousel) return;
  var items = Array.from(carousel.children);
  var totalOriginal = items.length;

  items.forEach(function (item) {
    var clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.remove('reveal');
    clone.style.opacity = '1';
    carousel.appendChild(clone);
  });

  // Todos los ítems, incluyendo clones, en orden
  var allItems = Array.from(carousel.children);

  function loopPoint() {
    return allItems[totalOriginal].offsetLeft;
  }

  var jumping = false;
  carousel.addEventListener('scroll', function () {
    if (jumping) return;
    if (carousel.scrollLeft >= loopPoint()) {
      jumping = true;
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft -= loopPoint();
      requestAnimationFrame(function () {
        carousel.style.scrollBehavior = 'smooth';
        jumping = false;
      });
    }
  }, { passive: true });

  var locked = false;
  var LOCK_MS = 500;

  function closestIndex() {
    var pos = carousel.scrollLeft;
    var closest = 0;
    var minDiff = Infinity;
    allItems.forEach(function (item, i) {
      var diff = Math.abs(item.offsetLeft - pos);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });
    return closest;
  }

  function goToStep(direction) {
    if (locked) return;
    locked = true;
    var current = closestIndex();
    var targetIndex = current + direction;
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= allItems.length) targetIndex = allItems.length - 1;
    carousel.scrollTo({ left: allItems[targetIndex].offsetLeft, behavior: 'smooth' });
    setTimeout(function () { locked = false; }, LOCK_MS);
  }

  carousel.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (Math.abs(e.deltaY) < 2) return;
    goToStep(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goToStep(1);
    if (e.key === 'ArrowLeft') goToStep(-1);
  });
})();