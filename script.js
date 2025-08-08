// Theme
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.dataset.theme = savedTheme;
  if (savedTheme === 'dark') document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0B1220');
}
themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});

// Apply “light” design tokens if theme=light
const applyThemeTokens = () => {
  const isLight = root.dataset.theme === 'light';
  root.style.colorScheme = isLight ? 'light' : 'dark';
};
applyThemeTokens();
new MutationObserver(applyThemeTokens).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

// Mobile nav
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle?.addEventListener('click', () => {
  const open = siteNav.style.display === 'block';
  siteNav.style.display = open ? 'none' : 'block';
  navToggle.setAttribute('aria-expanded', (!open).toString());
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Forms – simple client-side validation + a11y live region
function attachFormHandler(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const live = document.createElement('div');
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  live.className = 'sr-only';
  form.appendChild(live);

  form.addEventListener('submit', (e) => {
    const ok = form.reportValidity();
    if (!ok) {
      e.preventDefault();
      live.textContent = 'Please fix the highlighted fields.';
    } else if (form.action === '#') {
      // Prevent broken POST if user didn’t set endpoint yet.
      e.preventDefault();
      live.textContent = 'Form ready. Add your endpoint to the form “action” attribute.';
      alert('Form is ready. Set the form “action” to your endpoint (e.g., https://formsubmit.co/YOUR_EMAIL).');
    }
  });
}
attachFormHandler('introForm');
attachFormHandler('contactForm');

// Respect reduced motion for hover tilt (no extra JS needed)

// Perf: no canvas/WebGL here to keep Lighthouse high.
// (Your previous version used canvas particles and rotating cube) // ref only
