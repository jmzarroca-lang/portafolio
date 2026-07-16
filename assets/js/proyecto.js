/* ============================================
   ZARROCA — Proyecto: scroll horizontal + progreso
   ============================================ */

(function () {
  const scroll = document.getElementById('proyecto-scroll');
  const barra = document.getElementById('barra-progreso');

  if (!scroll) return;

  /* --- Convertir scroll vertical en horizontal ---
     - Rueda del mouse (deltaY)
     - Trackpad vertical (deltaY)
     - Trackpad horizontal (deltaX, se respeta directamente)
  */
  scroll.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    scroll.scrollLeft += e.deltaY * 1.2;
  }, { passive: false });

  /* --- Teclado: flechas izquierda/derecha --- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') scroll.scrollLeft += 120;
    if (e.key === 'ArrowLeft') scroll.scrollLeft -= 120;
  });

  /* --- Barra de progreso --- */
  function actualizarProgreso() {
    if (!barra) return;
    const max = scroll.scrollWidth - scroll.clientWidth;
    const porcentaje = max > 0 ? (scroll.scrollLeft / max) * 100 : 0;
    barra.style.width = porcentaje + '%';
  }

  scroll.addEventListener('scroll', actualizarProgreso, { passive: true });
  actualizarProgreso();
})();
