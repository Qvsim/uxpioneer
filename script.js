document.documentElement.dataset.theme = 'dark';

// Mobile nav
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle?.addEventListener('click', () => {
  const open = siteNav.style.display === 'block';
  siteNav.style.display = open ? 'none' : 'block';
  navToggle.setAttribute('aria-expanded', (!open).toString());
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Forms: basic validation + safe default
function wireForm(id) {
  const form = document.getElementById(id);
  if (!form) return;

  const live = document.createElement('div');
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  live.className = 'sr-only';
  form.appendChild(live);

  form.addEventListener('submit', (e) => {
    if (!form.reportValidity()) {
      e.preventDefault();
      live.textContent = 'Please check the required fields.';
      return;
    }
    if (form.action === '#') {
      e.preventDefault();
      live.textContent = 'Form is ready. Add your endpoint to the action attribute.';
      alert('Set your form "action" to a real endpoint (e.g., https://formsubmit.co/YOUR_EMAIL or your API).');
    }
  });
}
wireForm('introForm');
wireForm('contactForm');
