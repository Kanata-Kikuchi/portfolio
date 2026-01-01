(() => {
  function setVh() {
    // iPhone Chromeで一番信用できる“見えてる高さ”
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);
})();