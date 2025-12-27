(() => {
  let raf = 0;

  function viewportHeight() {
    return window.visualViewport?.height ?? window.innerHeight;
  }

  function setVars() {
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const photo = document.querySelector('.about-photo');
    if (!photo) return;

    const rect = photo.getBoundingClientRect();
    const photoBottomY = rect.top + rect.height;
    const vh = viewportHeight();
    const viewportCenterY = vh / 2;
    const bgY = photoBottomY - viewportCenterY;

    document.documentElement.style.setProperty('--bg-y', `${Math.round(bgY)}px`);
  }

  function requestUpdate() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      setVars();
    });
  }

  window.addEventListener('load', setVars, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.visualViewport?.addEventListener('resize', requestUpdate, { passive: true });
})();
