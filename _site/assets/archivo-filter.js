(() => {
  const filterCheckboxes = [
    { id: '1', label: 'vivienda' },
    { id: '2', label: 'gestión hídrica' },
    { id: '3', label: 'paisaje' },
    { id: '4', label: 'usos mixtos' },
    { id: '5', label: 'experiencia laboral' },
    { id: '6', label: 'investigación' }
  ];

  function updateFiltersAndSort() {
    const selectedFilters = filterCheckboxes
      .filter(f => document.getElementById(f.id)?.checked)
      .map(f => f.label.toLowerCase());

    const sortOption = document.querySelector('input[name="ord"]:checked');
    const sortBy = sortOption ? sortOption.id : null;

    const archivoDesktop = document.getElementById('archivo-desktop');
    if (!archivoDesktop) {
      console.error('archivo-desktop not found');
      return;
    }

    const itemContainers = archivoDesktop.querySelectorAll('a.project-a');
    
    if (itemContainers.length === 0) {
      console.error('No project-a items found');
      return;
    }

    const items = Array.from(itemContainers);

    items.forEach(item => {
      const tags = item.getAttribute('data-tags') || '';
      const tagArray = tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t);

      const matches = selectedFilters.length === 0 || 
                      selectedFilters.every(filter => tagArray.includes(filter));

      item.style.display = matches ? '' : 'none';
    });

    if (sortBy === '7') {
      const visibleItems = items.filter(item => item.style.display !== 'none');
      const parent = items[0]?.parentNode;
      
      if (parent) {
        visibleItems.sort((a, b) => {
          const dateA = parseInt(a.getAttribute('data-date')) || 0;
          const dateB = parseInt(b.getAttribute('data-date')) || 0;
          // For descending (newest first): return dateB - dateA
          // For ascending (oldest first): return dateA - dateB
          return dateB - dateA;
        });

        visibleItems.forEach(item => parent.appendChild(item));
      }
    } else if (sortBy === '9') {
      // Escala: sort by data-scale numeric value (ascending: 1, 2, 3, 4...)
      const visibleItems = items.filter(item => item.style.display !== 'none');
      const parent = items[0]?.parentNode;
      
      if (parent) {
        visibleItems.sort((a, b) => {
          const scaleA = parseInt(a.getAttribute('data-scale')) || 0;
          const scaleB = parseInt(b.getAttribute('data-scale')) || 0;
          // For ascending (smallest first): return scaleA - scaleB
          // For descending (largest first): return scaleB - scaleA
          return scaleA - scaleB;
        });

        visibleItems.forEach(item => parent.appendChild(item));
      }
    } else if (sortBy === '8') {
      // Uso: sort by data-use alphabetically (A-Z)
      const visibleItems = items.filter(item => item.style.display !== 'none');
      const parent = items[0]?.parentNode;
      
      if (parent) {
        visibleItems.sort((a, b) => {
          const useA = (a.getAttribute('data-use') || '').toLowerCase();
          const useB = (b.getAttribute('data-use') || '').toLowerCase();
          // For alphabetical ascending (A-Z): return useA.localeCompare(useB)
          // For alphabetical descending (Z-A): return useB.localeCompare(useA)
          return useA.localeCompare(useB);
        });

        visibleItems.forEach(item => parent.appendChild(item));
      }
    }
  }

  filterCheckboxes.forEach(f => {
    const checkbox = document.getElementById(f.id);
    if (checkbox) {
      checkbox.addEventListener('change', updateFiltersAndSort);
    }
  });

  const sortRadios = document.querySelectorAll('input[name="ord"]');
  sortRadios.forEach(radio => {
    radio.addEventListener('change', updateFiltersAndSort);
  });

  // --- Mobile controls (ids: 1m..6m for checkboxes, 7m..9m for radios) ---
  function updateFiltersAndSortMobile() {
    const selectedFilters = filterCheckboxes
      .filter(f => document.getElementById(f.id + 'm')?.checked)
      .map(f => f.label.toLowerCase());

    let sortBy = null;
    if (document.getElementById('7m')?.checked) sortBy = '7m';
    else if (document.getElementById('8m')?.checked) sortBy = '8m';
    else if (document.getElementById('9m')?.checked) sortBy = '9m';

    const archivoMobile = document.getElementById('archivo-mobile');
    if (!archivoMobile) {
      // no mobile container found; nothing to do
      return;
    }

    // mobile items expected to be anchors with class project-a (same structure as desktop)
    const itemContainers = archivoMobile.querySelectorAll('a.project-a');
    if (itemContainers.length === 0) {
      // fallback: try any direct children with data-tags
      const all = Array.from(archivoMobile.querySelectorAll('[data-tags]'));
      if (all.length === 0) return;
      itemContainers.push = () => {};
    }

    const items = Array.from(archivoMobile.querySelectorAll('a.project-a'));
    if (items.length === 0) return;

    items.forEach(item => {
      const tags = item.getAttribute('data-tags') || '';
      const tagArray = tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t);

      const matches = selectedFilters.length === 0 || 
                      selectedFilters.every(filter => tagArray.includes(filter));

      item.style.display = matches ? '' : 'none';
    });

    if (sortBy === '7m') {
      const visibleItems = items.filter(item => item.style.display !== 'none');
      const parent = items[0]?.parentNode;
      if (parent) {
        visibleItems.sort((a, b) => {
          const dateA = parseInt(a.getAttribute('data-date')) || 0;
          const dateB = parseInt(b.getAttribute('data-date')) || 0;
          return dateB - dateA; // newest first
        });
        visibleItems.forEach(item => parent.appendChild(item));
      }
    } else if (sortBy === '9m') {
      const visibleItems = items.filter(item => item.style.display !== 'none');
      const parent = items[0]?.parentNode;
      if (parent) {
        visibleItems.sort((a, b) => {
          const scaleA = parseInt(a.getAttribute('data-scale')) || 0;
          const scaleB = parseInt(b.getAttribute('data-scale')) || 0;
          return scaleA - scaleB; // ascending: 1,2,3...
        });
        visibleItems.forEach(item => parent.appendChild(item));
      }
    } else if (sortBy === '8m') {
      const visibleItems = items.filter(item => item.style.display !== 'none');
      const parent = items[0]?.parentNode;
      if (parent) {
        visibleItems.sort((a, b) => {
          const useA = (a.getAttribute('data-use') || '').toLowerCase();
          const useB = (b.getAttribute('data-use') || '').toLowerCase();
          return useA.localeCompare(useB); // A-Z
        });
        visibleItems.forEach(item => parent.appendChild(item));
      }
    }
  }

  // attach mobile listeners
  filterCheckboxes.forEach(f => {
    const cb = document.getElementById(f.id + 'm');
    if (cb) cb.addEventListener('change', updateFiltersAndSortMobile);
  });
  ['7m','8m','9m'].forEach(id => {
    const r = document.getElementById(id);
    if (r) r.addEventListener('change', updateFiltersAndSortMobile);
  });

  updateFiltersAndSort();
  updateFiltersAndSortMobile();
})();
