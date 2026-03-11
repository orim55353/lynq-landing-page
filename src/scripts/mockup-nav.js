export function initMockupNav() {
  const nav = document.getElementById('mockup-nav');
  const mockup = document.querySelector('.hero__mockup');
  if (!nav || !mockup) return;

  const buttons = Array.from(nav.querySelectorAll('.mockup-nav-item'));
  const views = document.querySelectorAll('.mockup-view');
  let activeIndex = 0;
  let timer = null;
  let transitioning = false;
  const INTERVAL = 4000;

  function switchTo(index) {
    if (index === activeIndex || transitioning) return;
    transitioning = true;

    const currentView = document.querySelector('.mockup-view--active');
    const nextView = Array.from(views).find((v) => v.dataset.view === buttons[index].dataset.view);

    buttons.forEach((b) => b.classList.remove('mockup-nav-item--active'));
    buttons[index].classList.add('mockup-nav-item--active');

    if (currentView) {
      currentView.classList.remove('mockup-view--visible');
    }

    setTimeout(() => {
      views.forEach((v) => v.classList.remove('mockup-view--active'));
      nextView.classList.add('mockup-view--active');
      nextView.offsetHeight;
      nextView.classList.add('mockup-view--visible');
      activeIndex = index;
      transitioning = false;
    }, 350);
  }

  function startCycle() {
    if (timer) return;
    timer = setInterval(() => {
      switchTo((activeIndex + 1) % buttons.length);
    }, INTERVAL);
  }

  function stopCycle() {
    clearInterval(timer);
    timer = null;
  }

  // Mark initial view as visible
  const initialView = document.querySelector('.mockup-view--active');
  if (initialView) initialView.classList.add('mockup-view--visible');

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      switchTo(i);
      stopCycle();
      startCycle();
    });
  });

  // Only cycle when the mockup is visible on screen
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startCycle();
      } else {
        stopCycle();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(mockup);
}
