// Testimonial carousel
(function () {
  const carousel = document.getElementById('testimonialCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('.testimonial-track');
  const slides = Array.from(carousel.querySelectorAll('.testimonial-slide'));
  const dots   = Array.from(carousel.querySelectorAll('.dot'));
  let current = 0;
  let timer;

  function sizeTrack() {
    slides.forEach(s => { s.style.position = 'static'; s.style.opacity = '1'; });
    track.style.minHeight = Math.max(...slides.map(s => s.offsetHeight)) + 'px';
    slides.forEach(s => { s.style.position = ''; s.style.opacity = ''; });
  }

  function goTo(i) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function start() { timer = setInterval(() => goTo(current + 1), 5000); }
  function stop()  { clearInterval(timer); }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { stop(); goTo(i); start(); }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);

  sizeTrack();
  window.addEventListener('resize', sizeTrack);
  start();
})();

// Nav: solid background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });

// Section reveal — enable hiding only after JS is ready
document.body.classList.add('js-ready');
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));
