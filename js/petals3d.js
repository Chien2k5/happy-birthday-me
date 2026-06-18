/* Three.js falling petals — hero background */
(function () {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('three-canvas');
  const hero   = document.querySelector('.hero');
  if (!canvas || !hero) return;

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* Scene & Camera */
  const scene  = new THREE.Scene();
  const aspect = hero.clientWidth / hero.clientHeight || 1;
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 50);
  camera.position.z = 6;

  /* Resize */
  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  /* Petal colours */
  const COLORS = [
    0xFFB7C5, // pink
    0xFF8FAB, // deep pink
    0xFFCCDD, // light pink
    0xFFE4EE, // pale pink
    0xFFD6E8, // blush
    0xFFC2D4, // rose
    0xFFFFFF, // white
    0xFFD700, // gold
  ];

  /* Build petal geometry — flat ellipse */
  const petalGeo = new THREE.ShapeGeometry((() => {
    const shape = new THREE.Shape();
    shape.ellipse(0, 0, 0.12, 0.18, 0, Math.PI * 2);
    return shape;
  })(), 8);

  /* Create petals */
  const PETAL_COUNT = window.innerWidth < 500 ? 38 : 65;
  const petals = [];

  for (let i = 0; i < PETAL_COUNT; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55 + Math.random() * 0.35,
    });
    const mesh = new THREE.Mesh(petalGeo, mat);

    /* Random start position */
    mesh.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 3
    );
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    /* Per-petal physics */
    mesh.userData = {
      vy:   -(0.006 + Math.random() * 0.012), // fall speed
      vx:   (Math.random() - 0.5) * 0.004,    // horizontal drift
      rx:   (Math.random() - 0.5) * 0.018,    // rotation speed
      ry:   (Math.random() - 0.5) * 0.022,
      rz:   (Math.random() - 0.5) * 0.010,
      swayT: Math.random() * Math.PI * 2,      // sway phase
    };

    scene.add(mesh);
    petals.push(mesh);
  }

  /* Animation */
  let frameId;
  let active = true;

  /* Stop rendering when hero is off screen (saves CPU) */
  const io = new IntersectionObserver(entries => {
    active = entries[0].isIntersecting;
    if (active) animate();
  }, { threshold: 0 });
  io.observe(hero);

  function animate() {
    if (!active) return;
    frameId = requestAnimationFrame(animate);

    petals.forEach(p => {
      const d = p.userData;
      d.swayT += 0.012;

      p.position.y += d.vy;
      p.position.x += d.vx + Math.sin(d.swayT) * 0.003;
      p.rotation.x += d.rx;
      p.rotation.y += d.ry;
      p.rotation.z += d.rz;

      /* Loop back to top */
      if (p.position.y < -5.5) {
        p.position.y = 5.5;
        p.position.x = (Math.random() - 0.5) * 14;
      }
    });

    renderer.render(scene, camera);
  }

  animate();
})();
