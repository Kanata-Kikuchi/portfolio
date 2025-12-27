(function () {
  const main = document.querySelector('.work-main');
  if (!main) return;

  const IMG_W = 3840;
  const IMG_H = 3840;
  const R = IMG_H / IMG_W;
  const SCALE = 2;

  let pt = 0;

  function measure() {
    pt = parseFloat(getComputedStyle(main).paddingTop) || 0;

    const w = main.clientWidth * SCALE;
    const drawnH = w * R;
    const posY = pt - drawnH / 2;

    main.style.setProperty('--bg-pos-y', `${Math.round(posY)}px`);
  }

  measure();
  window.addEventListener('resize', measure);
})();
