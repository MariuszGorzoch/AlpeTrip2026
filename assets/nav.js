/* Render top nav and highlight active page based on current path. */
(function () {
  // path z URL — wybiera, który item ma być active
  // Wszystkie ścieżki względem repo root.
  const NAV_ITEMS = [
    { href: 'index.html',     label: 'Dom' },
    { href: 'plan.html',      label: 'Plan' },
    { href: 'mapy.html',      label: 'Mapy' },
    { href: 'atrakcje.html',  label: 'Atrakcje' },
    { href: 'hotele.html',    label: 'Hotele' },
    { href: 'logistyka.html', label: 'Logistyka' }
  ];

  // wykryj, czy strona jest pod /dni/ (głębiej o jeden poziom)
  const path = window.location.pathname.replace(/\\/g, '/');
  const isInSub = /\/dni\//.test(path);
  const prefix = isInSub ? '../' : '';

  // ustal aktywną sekcję
  const filename = path.split('/').pop() || 'index.html';
  let activeHref = null;
  if (isInSub || filename.startsWith('plan') || filename.startsWith('d')) {
    activeHref = 'plan.html';
  } else {
    activeHref = filename;
  }

  // znajdź miejsce do wstawienia
  const placeholder = document.querySelector('[data-nav]');
  if (!placeholder) return;

  const brandHref = prefix + 'index.html';
  const itemsHtml = NAV_ITEMS.map(it => {
    const cls = it.href === activeHref ? 'active' : '';
    return `<li><a href="${prefix}${it.href}" class="${cls}">${it.label}</a></li>`;
  }).join('');

  placeholder.outerHTML = `
    <header class="topnav">
      <div class="topnav-inner">
        <a class="topnav-brand" href="${brandHref}">
          <span class="star">★</span>
          <span>Alpe Adria 2026</span>
        </a>
        <button class="topnav-toggle" aria-label="Menu" aria-expanded="false" id="navToggle">
          ☰
        </button>
        <ul class="topnav-menu" id="navMenu">
          ${itemsHtml}
        </ul>
      </div>
    </header>
  `;

  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // zamknij menu po kliknięciu w element
    menu.addEventListener('click', e => {
      if (e.target.tagName === 'A') menu.classList.remove('open');
    });
  }
})();
