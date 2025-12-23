(function () {
  const dd1 = document.getElementById('dd-f-1');
  const t1 = document.getElementById('dd-f-opc-1');
  const arrow1 = document.getElementById('dd-f-a-1');
  const dd2 = document.getElementById('dd-o-1');
  const t2 = document.getElementById('dd-o-opc-1');
  const arrow2 = document.getElementById('dd-o-a-1');
  const dd3 = document.getElementById('dd-f-2');
  const t3 = document.getElementById('dd-f-opc-2');
  const arrow3 = document.getElementById('dd-f-a-2');
  const dd4 = document.getElementById('dd-o-2');
  const t4 = document.getElementById('dd-o-opc-2');
  const arrow4 = document.getElementById('dd-o-a-2');
  if (!dd1) return;
  if (!dd2) return;
  if (!dd3) return;
  if (!dd4) return;

  // ensure trigger is keyboard-focusable
  if (!dd1.hasAttribute('tabindex')) dd1.setAttribute('tabindex', '0');
  if (!dd2.hasAttribute('tabindex')) dd2.setAttribute('tabindex', '0');
  if (!dd3.hasAttribute('tabindex')) dd3.setAttribute('tabindex', '0');
  if (!dd4.hasAttribute('tabindex')) dd4.setAttribute('tabindex', '0');

  let count = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;

  function applyVisibility() {
    if (!t1) return;
    const isOdd = count % 2 === 1;
    t1.style.display = isOdd ? 'none' : '';
    arrow1.style.transform = isOdd ? 'rotate(-90deg)' : '';
  }

  function handler() {
    count += 1;
    applyVisibility();
  }

  function applyVisibility2() {
    if (!t2) return;
    const isOdd = count2 % 2 === 1;
    t2.style.display = isOdd ? 'none' : '';
    arrow2.style.transform = isOdd ? 'rotate(-90deg)' : '';
  }

  function handler2() {
    count2 += 1;
    applyVisibility2();
  }

  function applyVisibility3() {
    if (!t3) return;
    const isOdd = count3 % 2 === 1;
    t3.style.display = isOdd ? 'none' : '';
    arrow3.style.transform = isOdd ? 'rotate(-90deg)' : '';
  }

  function handler3() {
    count3 += 1;
    applyVisibility3();
  }

  function applyVisibility4() {
    if (!t4) return;
    const isOdd = count4 % 2 === 1;
    t4.style.display = isOdd ? 'none' : '';
    arrow4.style.transform = isOdd ? 'rotate(-90deg)' : '';
  }

  function handler4() {
    count4 += 1;
    applyVisibility4();
  }

  dd1.addEventListener('click', handler);
  dd1.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  });

  dd2.addEventListener('click', handler2);
  dd2.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler2();
    }
  });

  dd3.addEventListener('click', handler3);
  dd3.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler3();
    }
  });

  dd4.addEventListener('click', handler4);
  dd4.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler4();
    }
  });
})();
