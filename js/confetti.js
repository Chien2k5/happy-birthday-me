(() => {
  const canvas = document.querySelector('#confetti-canvas');
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;

  const colors = ['#7c2738', '#b75b68', '#c69b58', '#ead0cc', '#fffaf2'];
  let particles = [];
  let animationFrame;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const createParticle = () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * .35,
    width: 4 + Math.random() * 6,
    height: 8 + Math.random() * 9,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedX: -1.2 + Math.random() * 2.4,
    speedY: 2.4 + Math.random() * 3.2,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -.09 + Math.random() * .18,
    wave: Math.random() * Math.PI * 2,
    opacity: .7 + Math.random() * .3
  });

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle) => {
      particle.wave += .045;
      particle.x += particle.speedX + Math.sin(particle.wave) * .6;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;
      if (particle.y > window.innerHeight * .78) particle.opacity -= .022;

      context.save();
      context.globalAlpha = Math.max(0, particle.opacity);
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
      context.restore();
    });

    particles = particles.filter((particle) => particle.opacity > 0 && particle.y < window.innerHeight + 30);
    if (particles.length) animationFrame = requestAnimationFrame(draw);
  };

  window.launchConfetti = (amount = 110) => {
    particles.push(...Array.from({ length: amount }, createParticle));
    cancelAnimationFrame(animationFrame);
    draw();
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();
})();
