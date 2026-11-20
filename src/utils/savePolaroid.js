// Caption shown on the polaroid, matching whichever mood is selected.
// Kept at module scope so the on-screen photo and the exported PNG
// always use the exact same string.
export const MOOD_CAPTIONS = {
  goofy: '“proof that we share exactly one braincell ♡”',
  normal: '“same quiet night, same little universe ♡”',
};

// Helper to render and download a real PNG polaroid photo.
// `options.caption` lets the caller keep the exported image in sync with
// the mood currently shown on screen; MainRoom (which has no mood picker)
// simply omits it and gets the default goofy caption.
export async function downloadPolaroidImage(playerName = 'Keonho', options = {}) {
  const caption = options.caption || MOOD_CAPTIONS.goofy;
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // 1. Polaroid White Outer Body
  ctx.fillStyle = '#FAF8F5';
  roundRect(ctx, 0, 0, 600, 760, 20);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#E2DDD4';
  ctx.stroke();

  // 2. Photo Area (Dark space mirror)
  const photoX = 36;
  const photoY = 36;
  const photoW = 528;
  const photoH = 530;

  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, 10);
  ctx.clip();

  // Gradient space background
  const grad = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
  grad.addColorStop(0, '#1C2244');
  grad.addColorStop(0.5, '#141830');
  grad.addColorStop(1, '#0C0E1E');
  ctx.fillStyle = grad;
  ctx.fillRect(photoX, photoY, photoW, photoH);

  // Twinkling stars
  const starColors = ['#FFE082', '#FFB3D6', '#D6B8F7', '#FFFFFF'];
  for (let i = 0; i < 45; i++) {
    const sx = photoX + ((i * 73 + 19) % (photoW - 20)) + 10;
    const sy = photoY + ((i * 109 + 37) % (photoH - 20)) + 10;
    const sz = (i % 3) + 2;
    ctx.fillStyle = starColors[i % starColors.length];
    ctx.fillRect(sx, sy, sz, sz);
  }

  // Top header in photo
  ctx.fillStyle = '#FFF8E7';
  ctx.font = 'bold 15px "Press Start 2P", monospace, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('MIRROR SNAP', photoX + 22, photoY + 34);

  ctx.textAlign = 'right';
  ctx.fillText('✨', photoX + photoW - 22, photoY + 34);

  // Render SVG characters from DOM if available
  const svgs = document.querySelectorAll('.selfie-image svg');
  if (svgs && svgs.length >= 2) {
    const loadSvgImage = (svgEl) => {
      return new Promise((resolve) => {
        try {
          const xml = new XMLSerializer().serializeToString(svgEl);
          const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
          };
          img.onerror = () => resolve(null);
          img.src = url;
        } catch {
          resolve(null);
        }
      });
    };

    // Sebastian (back right) and Keonho (front left)
    const [sebImg, keonhoImg] = await Promise.all([
      loadSvgImage(svgs[0]),
      loadSvgImage(svgs[1]),
    ]);

    if (sebImg) {
      // Sebastian in back (scaled ~2.2x -> 44*3.6 = ~160, 64*3.6 = ~230)
      ctx.drawImage(sebImg, photoX + photoW - 220, photoY + photoH - 250, 160, 230);
    }
    if (keonhoImg) {
      // Keonho in front (scaled ~2.5x -> 180x260)
      ctx.drawImage(keonhoImg, photoX + 60, photoY + photoH - 270, 180, 260);
    }
  } else {
    // Fallback cute pixel silhouettes
    ctx.fillStyle = '#1A244D';
    ctx.fillRect(photoX + 100, photoY + photoH - 220, 140, 200);
    ctx.fillStyle = '#202440';
    ctx.fillRect(photoX + 280, photoY + photoH - 200, 140, 180);
  }

  ctx.restore();

  // 3. Polaroid Caption Footer
  ctx.fillStyle = '#2A2440';
  ctx.font = 'bold 20px "Nunito", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(caption, 300, 620);

  ctx.fillStyle = '#6E6796';
  ctx.font = '600 16px "Nunito", sans-serif';
  ctx.fillText(`${playerName || 'Keonho'} & Sebastian · somewhere in our universe`, 300, 655);

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.fillStyle = '#A39BBF';
  ctx.font = '13px monospace';
  ctx.fillText(`★ ${dateStr} ★`, 300, 690);

  // 4. Trigger download
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `polaroid-${(playerName || 'keonho').toLowerCase()}-sebastian.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve(true);
    }, 'image/png');
  });
}
