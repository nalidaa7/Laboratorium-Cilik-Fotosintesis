// Canvas Confetti generator without external package dependencies
export function fireConfetti(durationMs: number = 3000) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  const colors = ['#22c55e', '#eab308', '#38bdf8', '#f43f5e', '#a855f7', '#fb923c'];
  const particleCount = 120;
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    angle: number;
    spin: number;
    shape: 'circle' | 'rect' | 'leaf';
  }

  const particles: Particle[] = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 200,
      y: height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 10,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
    });
  }

  const startTime = performance.now();
  let animationFrameId: number;

  function loop(now: number) {
    const elapsed = now - startTime;
    if (elapsed > durationMs) {
      window.removeEventListener('resize', onResize);
      canvas.remove();
      return;
    }

    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const gravity = 0.35;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += gravity;
      p.vx *= 0.98;
      p.angle += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  animationFrameId = requestAnimationFrame(loop);
}
