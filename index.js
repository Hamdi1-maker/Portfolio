
  const navToggle = document.querySelector('.nav-toggle');
  const mainNavigation = document.getElementById('main-navigation');
  if (navToggle && mainNavigation) {
    const mobileNavigation = window.matchMedia('(max-width: 600px)');
    const setNavigationOpen = (open) => {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      mainNavigation.classList.toggle('is-open', open);
    };
    navToggle.addEventListener('click', () => {
      setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    mainNavigation.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link || !mobileNavigation.matches) return;
      setNavigationOpen(false);
      const destination = document.querySelector(link.getAttribute('href'));
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
        destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNavigationOpen(false);
        navToggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('header.site')) setNavigationOpen(false);
    });
    mobileNavigation.addEventListener('change', () => {
      const focusedElement = document.activeElement;
      setNavigationOpen(false);
      if (mobileNavigation.matches && mainNavigation.contains(focusedElement)) navToggle.focus();
      if (!mobileNavigation.matches && focusedElement === navToggle) mainNavigation.querySelector('a').focus();
    });
    navToggle.closest('header.site').classList.add('nav-ready');
  }

  try {
    document.documentElement.classList.add('has-js');
    window.addEventListener('DOMContentLoaded', () => {
      const span = document.querySelector('#heroName span');
      if (span) {
        requestAnimationFrame(() => {
          span.style.transition = 'transform 1s cubic-bezier(.16,1,.3,1)';
          span.style.transform = 'translateY(0)';
        });
      }
    });
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in'), (i % 4) * 60);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      reveals.forEach(el => io.observe(el));
      setTimeout(() => {
        document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
      }, 2500);
    } else {
      reveals.forEach(el => el.classList.add('in'));
    }
    const track = document.getElementById('tickerTrack');
    if (track) track.innerHTML += track.innerHTML;
  } catch (e) {
    document.documentElement.classList.remove('has-js');
  }
