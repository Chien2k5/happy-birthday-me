/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

/* ============================================================
   LAUNCH CONFETTI ON PAGE LOAD
   ============================================================ */
window.addEventListener('load', function () {
  setTimeout(launchConfetti, 400);
});

/* ============================================================
   MUSIC PLAYER
   ============================================================ */
(function () {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  let playing = false;

  function tryPlay() {
    audio.volume = 0.4;
    audio.play().then(() => {
      playing = true;
      btn.classList.add('playing');
      btn.title = 'Tắt nhạc';
    }).catch(() => {
      /* autoplay blocked — wait for user interaction */
    });
  }

  /* Attempt autoplay on first user interaction */
  function onFirstInteraction() {
    if (!playing) tryPlay();
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }
  document.addEventListener('click', onFirstInteraction);
  document.addEventListener('touchstart', onFirstInteraction);
  /* Also try immediately (works on some browsers) */
  tryPlay();

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (playing) {
      audio.pause();
      playing = false;
      btn.classList.remove('playing');
      btn.classList.add('muted');
      btn.querySelector('.music-icon').textContent = '🔇';
      btn.title = 'Bật nhạc';
    } else {
      audio.play();
      playing = true;
      btn.classList.remove('muted');
      btn.classList.add('playing');
      btn.querySelector('.music-icon').textContent = '🎵';
      btn.title = 'Tắt nhạc';
    }
  });
})();

/* ============================================================
   CAKE — BLOW CANDLES
   ============================================================ */
(function () {
  const blowBtn  = document.getElementById('blow-btn');
  const cakeMsg  = document.getElementById('cake-msg');
  const candles  = document.querySelectorAll('.candle');
  let blown = false;

  blowBtn.addEventListener('click', function () {
    if (blown) return;

    /* Blow candles one by one */
    candles.forEach((c, i) => {
      setTimeout(() => {
        c.classList.add('blown');
        /* small burst at each candle position */
        const rect = c.getBoundingClientRect();
        burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
      }, i * 120);
    });

    /* After all blown */
    setTimeout(() => {
      blown = true;
      blowBtn.disabled = true;
      blowBtn.textContent = '🎉 Đã thổi!';
      cakeMsg.textContent = '🎂 Chúc Mẹ Nguyệt sinh nhật vui vẻ! 🎂';

      /* Big confetti burst from centre */
      burstAt(window.innerWidth / 2, window.innerHeight / 2, 80);
      setTimeout(() => launchConfetti(), 300);
    }, candles.length * 120 + 200);
  });
})();

/* ============================================================
   GALLERY — DYNAMIC IMAGE LOADING
   ============================================================ */
(function () {
  const grid        = document.getElementById('gallery-grid');
  const placeholder = document.getElementById('gallery-placeholder');

  /* Common image extensions to try */
  const COMMON_NAMES = [
    'photo1','photo2','photo3','photo4','photo5','photo6',
    'img1','img2','img3','img4',
    'me','mom','mother','family','memories',
    '1','2','3','4','5','6',
  ];
  const EXTS = ['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];

  let loaded = 0;

  function addImage(src) {
    const div = document.createElement('div');
    div.className = 'gallery-item reveal';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Ảnh kỷ niệm';
    img.loading = 'lazy';
    div.appendChild(img);
    grid.appendChild(div);

    /* Trigger reveal for dynamically added elements */
    setTimeout(() => div.classList.add('visible'), 50 * loaded);
    loaded++;
  }

  function probe(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload  = () => resolve(src);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  async function scanImages() {
    const promises = [];
    COMMON_NAMES.forEach(name => {
      EXTS.forEach(ext => {
        promises.push(probe(`images/${name}.${ext}`));
      });
    });

    const results = await Promise.all(promises);
    const found = [...new Set(results.filter(Boolean))];

    if (found.length === 0) {
      placeholder.style.display = '';
      grid.style.display = 'none';
    } else {
      found.forEach(src => addImage(src));
    }
  }

  scanImages();
})();
