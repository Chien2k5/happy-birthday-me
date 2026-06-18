(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(element);
    });
  }

  window.addEventListener('load', () => {
    if (!reduceMotion && typeof window.launchConfetti === 'function') {
      window.setTimeout(() => window.launchConfetti(90), 450);
    }
  });

  const blowButton = document.querySelector('#blow-btn');
  const cake = document.querySelector('.cake');
  const wishResult = document.querySelector('#wish-result');

  blowButton?.addEventListener('click', () => {
    if (blowButton.disabled) return;
    cake.classList.add('blown');
    blowButton.disabled = true;
    blowButton.querySelector('span').textContent = 'Điều ước đã được gửi đi';
    wishResult.textContent = 'Chúc Mẹ tuổi mới luôn bình an, khỏe mạnh và rạng rỡ.';

    if (!reduceMotion && typeof window.launchConfetti === 'function') {
      window.launchConfetti(180);
    }
  });

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const closeLightbox = () => lightbox?.close();

  document.querySelectorAll('.photo').forEach((photo) => {
    photo.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = photo.dataset.full;
      lightboxImage.alt = photo.querySelector('img')?.alt || 'Ảnh kỷ niệm';
      lightbox.showModal();
    });
  });

  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  const playlist = [
    'music/the_mountain-birthday-490600.mp3',
    'music/nastelbom-happy-birthday-471481.mp3'
  ];
  const musicButton = document.querySelector('#music-btn');
  const musicLabel = musicButton?.querySelector('.music-label');
  const audio = new Audio();
  let trackIndex = 0;
  let isPlaying = false;

  audio.volume = 0.32;
  audio.preload = 'none';
  audio.src = playlist[trackIndex];

  const updateMusicButton = () => {
    musicButton?.classList.toggle('playing', isPlaying);
    musicButton?.setAttribute('aria-pressed', String(isPlaying));
    musicButton?.setAttribute('aria-label', isPlaying ? 'Tắt nhạc' : 'Bật nhạc');
    if (musicLabel) musicLabel.textContent = isPlaying ? 'Tắt nhạc' : 'Bật nhạc';
  };

  const playMusic = async () => {
    try {
      await audio.play();
      isPlaying = true;
      updateMusicButton();
    } catch {
      isPlaying = false;
      updateMusicButton();
    }
  };

  musicButton?.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      updateMusicButton();
    } else {
      playMusic();
    }
  });

  audio.addEventListener('ended', () => {
    trackIndex = (trackIndex + 1) % playlist.length;
    audio.src = playlist[trackIndex];
    playMusic();
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
