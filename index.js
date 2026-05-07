// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id'); });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ===== TYPING EFFECT =====
const words = ['Brand Online', 'Revenue Fast', 'Audience Reach', 'ROI Massively'];
let wi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingText');
function type() {
  const w = words[wi];
  typingEl.textContent = deleting ? w.slice(0, ci--) : w.slice(0, ci++);
  if (!deleting && ci > w.length) { deleting = true; setTimeout(type, 1400); return; }
  if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counters
      entry.target.querySelectorAll('.stat-number, .metric-num').forEach(el => {
        if (!el.dataset.counted) { el.dataset.counted = true; animateCounter(el); }
      });
    }
  });
}, { threshold: 0.15 });

// Reveal all sections and cards
document.querySelectorAll('.service-card, .stat-card, .testimonial-card, .contact-wrapper, .section-header').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
document.querySelectorAll('section').forEach(s => revealObserver.observe(s));

// Ensure explicitly added .reveal elements are also observed (for new sections like fake-logos, timeline-items)
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  cards[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + cards.length) % cards.length;
  cards[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
setInterval(() => goToSlide(currentSlide + 1), 5000);

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  setTimeout(() => {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    form.reset();
    setTimeout(() => formSuccess.classList.add('hidden'), 5000);
  }, 1800);
});

// ===== HERO METRIC COUNTERS (on load) =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.metric-num').forEach(el => animateCounter(el));
  }, 600);
});

// ===== SMOOTH PARALLAX ON ORBS =====
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ===== NEWSLETTER FORM =====
function handleNewsletter(e) {
  e.preventDefault();
  const success = document.getElementById('nlSuccess');
  if (success) { success.classList.remove('hidden'); }
  e.target.reset();
}
