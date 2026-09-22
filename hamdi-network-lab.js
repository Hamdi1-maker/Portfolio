// Keep the section index aligned with the chapter currently being read.
const chapters = document.querySelectorAll('.study-content section[id]');
const chapterLinks = document.querySelectorAll('.study-index a, .chapter-menu a');
if ('IntersectionObserver' in window) {
  const chapterObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    const currentId = visible[0].target.id;
    chapterLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-5% 0px -65% 0px', threshold: 0 });
  chapters.forEach(chapter => chapterObserver.observe(chapter));
}

const chapterMenu = document.querySelector('.chapter-menu');
if (chapterMenu) {
  chapterMenu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    chapterMenu.open = false;
    const chapter = document.querySelector(link.getAttribute('href'));
    if (chapter) {
      chapter.setAttribute('tabindex', '-1');
      chapter.focus({ preventScroll: true });
      chapter.addEventListener('blur', () => chapter.removeAttribute('tabindex'), { once: true });
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && chapterMenu.open) {
      chapterMenu.open = false;
      chapterMenu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (!chapterMenu.contains(event.target)) chapterMenu.open = false;
  });
}
