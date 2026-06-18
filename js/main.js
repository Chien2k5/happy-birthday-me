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
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ============================================================
   LAUNCH CONFETTI ON PAGE LOAD
   ============================================================ */
window.addEventListener('load', function () {
  setTimeout(launchConfetti, 500);
});

/* ============================================================
   FLOATING HEARTS — inject into sections
   ============================================================ */
(function () {
  const sections = document.querySelectorAll('.cake-section, .gallery-section, .message-section');
  sections.forEach(sec => {
    const wrapper = document.createElement('div');
    wrapper.className = 'floating-hearts';
    const count = 5;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'fh';
      el.textContent = ['💕','💖','🌸','❤️','✨'][i % 5];
      el.style.left = (10 + (i / count) * 80) + '%';
      el.style.animationDuration = (8 + Math.random() * 8) + 's';
      el.style.animationDelay    = (Math.random() * 6) + 's';
      el.style.fontSize = (.8 + Math.random() * .8) + 'rem';
      wrapper.appendChild(el);
    }
    sec.style.position = 'relative';
    sec.insertBefore(wrapper, sec.firstChild);
  });
})();

/* ============================================================
   MUSIC PLAYER — PLAYLIST
   ============================================================ */
(function () {
  const PLAYLIST = [
    'music/the_mountain-birthday-490600.mp3',
    'music/nastelbom-happy-birthday-471481.mp3',
  ];
  const TRACK_NAMES = ['Bài 1 / 2 🎵', 'Bài 2 / 2 🎵'];

  const btn   = document.getElementById('music-btn');
  const label = document.createElement('div');
  label.className = 'music-track-label';
  document.body.appendChild(label);

  let currentIndex = 0;
  let playing = false;
  const audio = new Audio();
  audio.volume = 0.4;

  function loadTrack(idx) {
    audio.src = PLAYLIST[idx];
    audio.load();
  }

  function showLabel(text) {
    label.textContent = text;
    label.classList.add('show');
    clearTimeout(label._timer);
    label._timer = setTimeout(() => label.classList.remove('show'), 3000);
  }

  function tryPlay() {
    audio.play().then(() => {
      playing = true;
      btn.classList.add('playing');
      btn.classList.remove('muted');
      btn.querySelector('.music-icon').textContent = '🎵';
      btn.title = 'Tắt nhạc';
      showLabel(TRACK_NAMES[currentIndex]);
    }).catch(() => { /* autoplay blocked */ });
  }

  /* Auto-advance to next track */
  audio.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % PLAYLIST.length;
    loadTrack(currentIndex);
    audio.play().then(() => {
      showLabel(TRACK_NAMES[currentIndex]);
    }).catch(() => {});
  });

  loadTrack(currentIndex);

  /* Attempt autoplay on first interaction */
  function onFirstInteraction() {
    if (!playing) tryPlay();
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }
  document.addEventListener('click', onFirstInteraction);
  document.addEventListener('touchstart', onFirstInteraction);
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
      audio.play().then(() => {
        playing = true;
        btn.classList.remove('muted');
        btn.classList.add('playing');
        btn.querySelector('.music-icon').textContent = '🎵';
        btn.title = 'Tắt nhạc';
        showLabel(TRACK_NAMES[currentIndex]);
      });
    }
  });
})();

/* ============================================================
   CAKE — BLOW CANDLES (shake + wind + smoke + fireworks)
   ============================================================ */
(function () {
  const blowBtn = document.getElementById('blow-btn');
  const cakeMsg = document.getElementById('cake-msg');
  const candles = document.querySelectorAll('.candle');
  let blown = false;

  function spawnSmoke(candle) {
    const rect = candle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + 4;
    for (let i = 0; i < 4; i++) {
      const s = document.createElement('div');
      s.className = 'smoke-particle';
      const dx = (Math.random() - .5) * 30;
      s.style.cssText = `left:${cx}px;top:${cy}px;--dx:${dx}px;animation-delay:${i * 80}ms`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  }

  blowBtn.addEventListener('click', function () {
    if (blown) return;

    /* Shake the button */
    blowBtn.classList.add('shaking');
    setTimeout(() => blowBtn.classList.remove('shaking'), 500);

    /* Wind + blow each candle sequentially */
    candles.forEach((c, i) => {
      setTimeout(() => {
        c.classList.add('wind');
        setTimeout(() => {
          c.classList.remove('wind');
          c.classList.add('blown');
          spawnSmoke(c);
          /* small burst per candle */
          const r = c.getBoundingClientRect();
          burstAt(r.left + r.width / 2, r.top + r.height / 2, 14);
        }, 280);
      }, i * 200);
    });

    /* After all blown — fireworks */
    const totalDelay = candles.length * 200 + 400;
    setTimeout(() => {
      blown = true;
      blowBtn.disabled = true;
      blowBtn.textContent = '🎉 Đã thổi rồi!';
      cakeMsg.textContent = '🎂 Chúc Mẹ Nguyệt sinh nhật vui vẻ! 🎂';
      cakeMsg.classList.add('show');

      /* 5 bursts at different positions */
      const positions = [
        [window.innerWidth * .2,  window.innerHeight * .3],
        [window.innerWidth * .8,  window.innerHeight * .3],
        [window.innerWidth * .5,  window.innerHeight * .2],
        [window.innerWidth * .15, window.innerHeight * .6],
        [window.innerWidth * .85, window.innerHeight * .6],
      ];
      positions.forEach(([x, y], idx) => {
        setTimeout(() => burstAt(x, y, 55), idx * 160);
      });
      setTimeout(() => launchConfetti(), 300);
    }, totalDelay);
  });
})();
