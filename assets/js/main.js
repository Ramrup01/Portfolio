(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector('#header');
  const scrollTop = document.querySelector('.scroll-top');

  /**
   * Header background and scroll-top button on scroll
   */
  function onScroll() {
    const scrolled = window.scrollY > 100;
    if (header) body.classList.toggle('scrolled', scrolled);
    if (scrollTop) scrollTop.classList.toggle('active', scrolled);
  }
  document.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (body.classList.contains('mobile-nav-active')) mobileNavToggle();
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Animation on scroll
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed.js (home page)
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    new Typed('.typed', {
      strings: selectTyped.getAttribute('data-typed-items').split(','),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate skill progress bars on reveal (about & resume pages)
   */
  if (typeof Waypoint !== 'undefined') {
    document.querySelectorAll('.skills-animation').forEach(item => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function() {
          item.querySelectorAll('.progress .progress-bar').forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * Pure Counter (about page)
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Isotope layout and filters (portfolio page)
   */
  if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
    document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
      const container = isotopeItem.querySelector('.isotope-container');
      let iso;

      imagesLoaded(container, () => {
        iso = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: isotopeItem.getAttribute('data-layout') ?? 'masonry',
          filter: isotopeItem.getAttribute('data-default-filter') ?? '*',
          sortBy: isotopeItem.getAttribute('data-sort') ?? 'original-order'
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(filter => {
        filter.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          if (iso) iso.arrange({ filter: this.getAttribute('data-filter') });
          aosInit();
        });
      });
    });
  }

  /**
   * GLightbox (portfolio page)
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

})();
