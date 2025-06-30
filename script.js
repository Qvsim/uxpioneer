// ========== Cursor Glow Tracking ==========
const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX - 100}px`;
  cursorGlow.style.top = `${e.clientY - 100}px`;
});

// ========== Smooth Page Load Animations ==========
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll('.glass, .hero-content, .card, .panel, .member');

  animatedElements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// ========== Optional WebGL / Canvas Animation ==========
const canvas = document.getElementById("webgl-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = "rgba(0, 123, 255, 0.3)";
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
      if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ========== Mobile Nav Toggle ==========
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}
