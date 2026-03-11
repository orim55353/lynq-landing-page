export function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll styling
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const links = navbar.querySelector('.navbar__links');
  const cta = navbar.querySelector('.navbar__cta');
  if (!menuBtn || !links) return;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'navbar__overlay';
  navbar.appendChild(overlay);

  function openMenu() {
    links.classList.add('open');
    if (cta) cta.classList.add('open');
    overlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    links.classList.remove('open');
    if (cta) cta.classList.remove('open');
    overlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = links.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close on link click
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      closeMenu();
    }
  });

  // Logo tap: first tap scrolls to top, second tap navigates home
  const logo = navbar.querySelector('.navbar__logo');
  if (logo && window.location.pathname !== '/') {
    logo.addEventListener('click', (e) => {
      if (window.scrollY > 0) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // If already at top, let the default <a href="/"> navigate home
    });
  }
}
