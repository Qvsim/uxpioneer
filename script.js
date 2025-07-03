// ========== Cursor Glow Tracking ==========
const cursorGlow = document.getElementById("cursor-glow");
let glowX = 0, glowY = 0;

document.addEventListener("mousemove", (e) => {
  glowX = e.clientX - 100;
  glowY = e.clientY - 100;
});

function animateGlow() {
  cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
  requestAnimationFrame(animateGlow);
}
animateGlow(); // Use RAF to avoid layout thrashing

// ========== Smooth Page Load Animations ==========
document.addEventListener("DOMContentLoaded", () => {
  const animated = document.querySelectorAll(
    ".glass, .hero-content, .card, .panel, .member, .hero-left, .hero-right"
  );

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  animated.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i * 120);
  });
});

// ========== Canvas Particles ==========
const canvas = document.getElementById("webgl-canvas");
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (canvas && !isMobile) {
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const numParticles = 60;
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 123, 255, 0.25)";
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Debounced resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 200);
  });
} else if (canvas) {
  canvas.style.display = "none";
}

// ========== Mobile Nav Toggle ==========
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}
