/* ============================================
   ZARROCA — Proyecto: scroll horizontal con snap + progreso
   ============================================ */

(function () {
  const scroll = document.getElementById('proyecto-scroll');
  const barra = document.getElementById('barra-progreso');
  const btnVolver = document.getElementById('btn-volver-inicio');
  const flecha = document.getElementById('flecha-carrusel');

  if (!scroll) return;

  const stops = Array.from(scroll.children);
  if (stops.length === 0) return;

  const OFFSET = stops[0].offsetLeft;

  function targetScrollLeft(index) {
    return Math.max(0, stops[index].offsetLeft - OFFSET);
  }

  function closestIndex() {
    const posAbsoluta = scroll.scrollLeft + OFFSET;
    let closest = 0;
    let minDiff = Infinity;
    stops.forEach(function (item, i) {
      const diff = Math.abs(item.offsetLeft - posAbsoluta);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });
    return closest;
  }

  let locked = false;
  const LOCK_MS = 500;

  function goToStep(direction) {
    if (locked) return;
    locked = true;
    const current = closestIndex();
    let targetIndex = current + direction;
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= stops.length) targetIndex = stops.length - 1;
    scroll.scrollTo({ left: targetScrollLeft(targetIndex), behavior: 'smooth' });
    setTimeout(function () { locked = false; }, LOCK_MS);
  }

  scroll.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (Math.abs(e.deltaY) < 2) return;
    goToStep(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goToStep(1);
    if (e.key === 'ArrowLeft') goToStep(-1);
  });

  /* --- Botón "Volver al principio" --- */
  if (btnVolver) {
    btnVolver.addEventListener('click', function () {
      scroll.scrollTo({ left: 0, behavior: 'smooth' });
    });
  }

  function actualizarBotonVolver() {
    if (!btnVolver) return;
    if (scroll.scrollLeft > 10) {
      btnVolver.classList.add('visible');
    } else {
      btnVolver.classList.remove('visible');
    }
  }

  /* --- Flecha: salta a la primera foto; se oculta tras usarse --- */
  if (flecha && stops.length > 1) {
    flecha.addEventListener('click', function () {
      scroll.scrollTo({ left: targetScrollLeft(1), behavior: 'smooth' });
    });
  }

  function actualizarFlecha() {
    if (!flecha) return;
    if (scroll.scrollLeft > 10) {
      flecha.classList.add('oculta');
    } else {
      flecha.classList.remove('oculta');
    }
  }

  /* --- Click en una foto chica: crece a tamaño completo.
     Las que ya son .tamano-completo no necesitan click.
     Segundo click en una foto ampliada la vuelve a achicar. --- */
  const fotos = Array.from(scroll.querySelectorAll('.proyecto-foto:not(.tamano-completo)'));
  fotos.forEach(function (foto) {
    foto.addEventListener('click', function () {
      foto.classList.toggle('expandida');
    });
  });

  /* --- Barra de progreso --- */
  function actualizarProgreso() {
    if (!barra) return;
    const max = scroll.scrollWidth - scroll.clientWidth;
    const porcentaje = max > 0 ? (scroll.scrollLeft / max) * 100 : 0;
    barra.style.width = porcentaje + '%';
  }

  scroll.addEventListener('scroll', function () {
    actualizarProgreso();
    actualizarBotonVolver();
    actualizarFlecha();
  }, { passive: true });

  actualizarProgreso();
  actualizarBotonVolver();
  actualizarFlecha();
})();
