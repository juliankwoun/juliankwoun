(function () {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const container  = document.getElementById('pdf-container');
  const pagesDiv   = document.getElementById('pdf-pages');
  const loading    = document.getElementById('pdf-loading');
  const zoomInBtn  = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const zoomLabel  = document.getElementById('zoom-label');
  const fsBtn      = document.getElementById('fullscreen-btn');
  const url        = container.dataset.pdfUrl;

  let displayPct = 100;

  function applyZoom() {
    pagesDiv.querySelectorAll('canvas').forEach(c => {
      c.style.width = displayPct + '%';
    });
    zoomLabel.textContent = displayPct + '%';
    zoomOutBtn.disabled = displayPct <= 50;
    zoomInBtn.disabled  = displayPct >= 200;
  }

  zoomInBtn.addEventListener('click', () => {
    displayPct = Math.min(displayPct + 25, 200);
    applyZoom();
  });

  zoomOutBtn.addEventListener('click', () => {
    displayPct = Math.max(displayPct - 25, 50);
    applyZoom();
  });

  fsBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    fsBtn.textContent = document.fullscreenElement ? '✕' : '⛶';
  });

  (async function init() {
    try {
      const pdf = await pdfjsLib.getDocument(url).promise;
      loading.style.display = 'none';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page     = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.8 });

        const canvas   = document.createElement('canvas');
        canvas.width   = viewport.width;
        canvas.height  = viewport.height;
        canvas.style.cssText = 'width:100%;display:block;margin-bottom:6px;';
        canvas.addEventListener('contextmenu', e => e.preventDefault());

        pagesDiv.appendChild(canvas);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      }
    } catch (err) {
      loading.textContent = 'Score unavailable.';
      console.error(err);
    }
  })();
})();
