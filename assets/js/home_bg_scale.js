(() => {
  const body = document.body;

  const MIN_WIDTH = 375;
  const MAX_WIDTH = 1400;
  const MAX_PX = 1000;
  const MIN_PX = 2600;

  function readBgWidthPx() {
    const bgSize = getComputedStyle(body).getPropertyValue('--bg-size').trim();
    const m = bgSize.match(/([0-9.]+)px/);
    if (!m) return null;
    const n = parseFloat(m[1]);
    return Number.isFinite(n) ? n : null;
  }

  function getBodyBgUrl() {
    const v = getComputedStyle(body).backgroundImage;
    const m = v.match(/url\(["']?(.*?)["']?\)/);
    return m ? m[1] : null;
  }

  function loadImageSize(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = reject;
      img.src = url;
    });
  }

  function updateBackgroundSize() {
    const w = window.innerWidth;

    const t = Math.min(1, Math.max(0, (w - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH)));
    const sizePx = MAX_PX + (MIN_PX - MAX_PX) * t;

    body.style.setProperty('--bg-size', `${Math.round(sizePx)}px auto`);
  }

  async function main() {
    const url = getBodyBgUrl();
    if (!url) return;

    let imgSize;
    try {
      imgSize = await loadImageSize(url);
    } catch {
      return;
    }

    function update() {
      updateBackgroundSize();

      const bgW = readBgWidthPx();
      if (bgW == null) return;

      const bgH = bgW * (imgSize.h / imgSize.w);
      const vh = window.innerHeight;
      const posY = vh - (bgH / 2);

      body.style.setProperty('--bg-pos-y', `${Math.round(posY)}px`);
    }

    update();
    window.addEventListener('resize', update);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
