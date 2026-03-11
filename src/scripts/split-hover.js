export function initSplitHover() {
  const hero = document.querySelector('.splash-hero');
  if (!hero) return;

  const left = hero.querySelector('.splash-hero__half--left');
  const right = hero.querySelector('.splash-hero__half--right');
  if (!left || !right) return;

  // Only apply hover on non-touch devices
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  left.addEventListener('mouseenter', () => {
    hero.classList.add('splash-hero--hover-left');
    hero.classList.remove('splash-hero--hover-right');
  });

  right.addEventListener('mouseenter', () => {
    hero.classList.add('splash-hero--hover-right');
    hero.classList.remove('splash-hero--hover-left');
  });

  hero.addEventListener('mouseleave', () => {
    hero.classList.remove('splash-hero--hover-left', 'splash-hero--hover-right');
  });
}
