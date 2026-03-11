export function initPhoneSwipe() {
  const mockups = document.querySelectorAll('.phone-mockup');
  if (!mockups.length) return;

  mockups.forEach((mockup) => {
    const cards = Array.from(mockup.querySelectorAll('.job-card'));
    const segments = Array.from(mockup.querySelectorAll('.phone-mockup__stories-segment'));
    if (cards.length === 0) return;

    let activeIndex = 0;
    let timer = null;
    let transitioning = false;
    const INTERVAL = 4000;

    function switchTo(index) {
      if (index === activeIndex || transitioning) return;
      transitioning = true;

      const currentCard = cards[activeIndex];
      const nextCard = cards[index];

      currentCard.classList.add('job-card--exit');
      currentCard.classList.remove('job-card--active');

      segments.forEach((seg, i) => {
        seg.classList.remove('phone-mockup__stories-segment--active');
        seg.classList.toggle('phone-mockup__stories-segment--filled', i < index);
      });
      if (segments[index]) {
        segments[index].classList.add('phone-mockup__stories-segment--active');
      }

      setTimeout(() => {
        currentCard.classList.remove('job-card--exit');
        nextCard.classList.add('job-card--active');
        activeIndex = index;
        transitioning = false;
      }, 400);
    }

    function startCycle() {
      if (timer) return;
      timer = setInterval(() => {
        switchTo((activeIndex + 1) % cards.length);
      }, INTERVAL);
    }

    function stopCycle() {
      clearInterval(timer);
      timer = null;
    }

    // Initialize first card
    cards[0].classList.add('job-card--active');
    if (segments[0]) {
      segments[0].classList.add('phone-mockup__stories-segment--active');
    }

    // Only cycle when visible
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
  });
}
