/* Lightweight bilingual toggle + testimonials carousel.
   No build, no framework. Reads data-en / data-ru attributes and persists in localStorage. */
(function () {
  var STORE = 'irynakot.lang';
  var DEFAULT = 'en';

  function applyLang(lang) {
    document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
    document.querySelectorAll('[data-en][data-ru]').forEach(function (el) {
      el.textContent = el.dataset[lang];
    });
    document.querySelectorAll('[data-en-html][data-ru-html]').forEach(function (el) {
      el.innerHTML = el.dataset[lang + 'Html'];
    });
    // Swap translatable attributes: title, aria-label, placeholder
    document.querySelectorAll('[data-en-title][data-ru-title]').forEach(function (el) {
      el.setAttribute('title', el.dataset[lang + 'Title']);
    });
    document.querySelectorAll('[data-en-aria][data-ru-aria]').forEach(function (el) {
      el.setAttribute('aria-label', el.dataset[lang + 'Aria']);
    });
    // Toggle active state of lang switcher
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  function currentLang() {
    try { return localStorage.getItem(STORE) || DEFAULT; } catch (e) { return DEFAULT; }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    applyLang(lang);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.lang-toggle');
    if (!btn) return;
    var lang = btn.dataset.lang;
    if (lang !== 'en' && lang !== 'ru') return;
    setLang(lang);
  });

  // Apply immediately so there's no flash of wrong language
  applyLang(currentLang());
  document.addEventListener('DOMContentLoaded', function () { applyLang(currentLang()); });

  /* --- Carousel --- */
  function initCarousel(root) {
    var slides = root.querySelectorAll('.slide');
    var dots = root.querySelectorAll('.dot');
    if (!slides.length) return;
    var idx = 0, timer;
    function show(i) {
      slides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
      dots.forEach(function (d, n) { d.classList.toggle('is-active', n === i); });
      idx = i;
    }
    function next() { show((idx + 1) % slides.length); }
    dots.forEach(function (d, n) {
      d.addEventListener('click', function () {
        show(n);
        clearInterval(timer); timer = setInterval(next, 7000);
      });
    });
    show(0);
    timer = setInterval(next, 7000);
    root.addEventListener('mouseenter', function () { clearInterval(timer); });
    root.addEventListener('mouseleave', function () { timer = setInterval(next, 7000); });
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.carousel').forEach(initCarousel);
  });
})();
