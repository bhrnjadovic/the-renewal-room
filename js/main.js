/* SkinSci - Main JavaScript */
document.addEventListener('DOMContentLoaded', function() {

  // --- Scroll Progress Bar ---
  const scrollProgress = document.querySelector('.scroll-progress');
  // --- Back to Top ---
  const backToTop = document.querySelector('.back-to-top');
  // --- Nav Scroll ---
  const nav = document.querySelector('.nav-main');

  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Progress bar
    if (scrollProgress) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }
    // Nav scrolled state
    if (nav) {
      if (scrollTop > 50) { nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    }
    // Back to top
    if (backToTop) {
      if (scrollTop > 500) { backToTop.classList.add('visible'); }
      else { backToTop.classList.remove('visible'); }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Menu ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function closeMobileMenu() {
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      const isOpen = mobileMenu && mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        mobileMenuBtn.classList.add('active');
        if (mobileMenu) mobileMenu.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // --- Mobile Dropdown Toggles ---
  document.querySelectorAll('.nav-mobile .dropdown > .nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  });

  // --- Scroll Reveal (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  // --- Accordion ---
  document.querySelectorAll('.accordion-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const parent = this.closest('.accordion-item').parentElement;
      // Close others in same accordion group
      parent.querySelectorAll('.accordion-trigger').forEach(function(other) {
        if (other !== trigger) {
          other.classList.remove('active');
          if (other.nextElementSibling) other.nextElementSibling.classList.remove('open');
        }
      });
      // Toggle current
      this.classList.toggle('active');
      if (content) content.classList.toggle('open');
    });
  });

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          let current = 0;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = prefix + current + suffix;
          }, 25);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { counterObserver.observe(el); });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        const offset = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

});
