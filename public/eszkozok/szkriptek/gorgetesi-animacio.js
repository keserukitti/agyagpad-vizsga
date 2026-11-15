(() => {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll([
    'main .hero > *',
    'main .band > .wrap:not(.split, .contact) > :not(.grid, .gallery)',
    'main :is(.split, .contact, .grid, .gallery) > *',
  ].join(', '));

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      observer.unobserve(entry.target);
      if (reducedMotion.matches || entry.target.matches(':focus-within')) continue;

      entry.target.animate(
        [
          { opacity: 0, translate: '0 18px' },
          { opacity: 1, translate: '0 0' },
        ],
        { duration: 480, easing: 'ease-out' },
      );
    }
  });

  for (const target of targets) {
    if (target.getBoundingClientRect().top >= window.innerHeight) {
      observer.observe(target);
    }
  }
})();
