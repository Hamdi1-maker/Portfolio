// A short, decorative trail. The native cursor remains responsive.
(() => {
  const preference = window.matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)');
  const particles = [];
  let previousTime = 0;
  let previousX = -100;
  let previousY = -100;

  function clearTrail() {
    particles.splice(0).forEach(particle => particle.remove());
    previousTime = 0;
    previousX = previousY = -100;
  }

  document.addEventListener('pointermove', event => {
    if (!preference.matches || event.pointerType !== 'mouse') return;
    const now = performance.now();
    if (now - previousTime < 28 || Math.hypot(event.clientX - previousX, event.clientY - previousY) < 7) return;
    previousTime = now;
    previousX = event.clientX;
    previousY = event.clientY;

    const particle = document.createElement('span');
    particle.className = 'cursor-diamond-trail';
    particle.setAttribute('aria-hidden', 'true');
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;
    document.body.append(particle);
    particles.push(particle);
    if (particles.length > 18) particles.shift().remove();
    particle.addEventListener('animationend', () => {
      particle.remove();
      const index = particles.indexOf(particle);
      if (index !== -1) particles.splice(index, 1);
    }, { once: true });
  }, { passive: true });

  preference.addEventListener('change', clearTrail);
  document.documentElement.addEventListener('pointerleave', clearTrail);
  window.addEventListener('blur', clearTrail);
  window.addEventListener('pagehide', clearTrail);
})();
