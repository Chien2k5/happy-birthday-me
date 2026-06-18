/* Lightweight canvas confetti engine */
(function () {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');

  const COLORS = ['#FFB7C5','#FF8FAB','#D4AF37','#F5E6A3','#fff','#ffd1e8','#ffc2d4'];
  const MAX = 120;
  let pieces = [];
  let running = false;
  let animId;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function randomPiece(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? -12,
      vx: Math.cos(angle) * speed * .5 + (Math.random() - .5),
      vy: speed * .8 + Math.random() * 2,
      r: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - .5) * .12,
      shape: Math.random() > .4 ? 'rect' : 'circle',
      alpha: 1,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  function update() {
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06; // gravity
      p.rot += p.rotV;
      if (p.y > canvas.height * .7) p.alpha -= 0.018;
    });
    pieces = pieces.filter(p => p.alpha > 0);
  }

  function loop() {
    update();
    draw();
    if (pieces.length > 0 || running) {
      animId = requestAnimationFrame(loop);
    }
  }

  let spawnCount = 0;
  const SPAWN_BATCHES = 6;

  function spawnBatch() {
    if (spawnCount >= SPAWN_BATCHES) { running = false; return; }
    const n = Math.floor(MAX / SPAWN_BATCHES);
    for (let i = 0; i < n; i++) pieces.push(randomPiece());
    spawnCount++;
    setTimeout(spawnBatch, 300);
  }

  window.launchConfetti = function () {
    spawnCount = 0;
    running = true;
    spawnBatch();
    cancelAnimationFrame(animId);
    loop();
  };

  /* Burst from a point (for cake blow) */
  window.burstAt = function (x, y, count) {
    count = count || 40;
    for (let i = 0; i < count; i++) {
      pieces.push(randomPiece(x, y));
    }
    if (!running) {
      cancelAnimationFrame(animId);
      loop();
    }
  };
})();
