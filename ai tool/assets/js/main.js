/* ============================================
   AI TOOL - Main JavaScript
   Neural Glass Morphism Theme Interactions
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // Dark Mode Toggle (Desktop & Mobile)
  // ============================================
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
  const body = document.body;

  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply theme on load
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }

  // Update all dark mode toggle icons
  function updateToggleIcons(isDark) {
    const iconText = isDark ? '🌙' : '☀️';
    const toggles = [darkModeToggle, darkModeToggleMobile].filter(Boolean);
    toggles.forEach(toggle => {
      const icon = toggle.querySelector('i, svg, span');
      if (icon) {
        icon.textContent = iconText;
      }
    });
  }

  // Dark mode toggle function
  function toggleDarkMode(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const isCurrentlyDark = body.classList.contains('dark-mode');

    if (isCurrentlyDark) {
      // Switch to light mode
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      updateToggleIcons(false);
    } else {
      // Switch to dark mode
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      updateToggleIcons(true);
    }
  }

  // Event listener for desktop dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleDarkMode(e);
      return false;
    });

    const icon = darkModeToggle.querySelector('span');
    if (icon) {
      icon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDarkMode(e);
        return false;
      });
    }
  }

  // Event listener for mobile dark mode toggle
  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleDarkMode(e);
      return false;
    });

    const icon = darkModeToggleMobile.querySelector('span');
    if (icon) {
      icon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDarkMode(e);
        return false;
      });
    }
  }

  // Set initial icon based on current theme
  setTimeout(function () {
    const isDark = body.classList.contains('dark-mode') || currentTheme === 'dark';
    updateToggleIcons(isDark);
  }, 100);

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  function toggleMobileMenu(e) {
    if (e) {
      e.stopPropagation();
    }

    // Don't toggle if clicking dark mode toggle
    if (darkModeToggle && e && darkModeToggle.contains(e.target)) {
      return;
    }

    if (hamburger && navMenu) {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    // Don't close menu if clicking dark mode toggle
    if (darkModeToggle && darkModeToggle.contains(event.target)) {
      return;
    }

    if (navMenu && navMenu.classList.contains('active')) {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  });

  // Close mobile menu on window resize (tablet/desktop)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // ============================================
  // Services Dropdown (Mobile/Tablet)
  // ============================================
  const servicesDropdown = document.querySelector('.dropdown');
  const servicesLink = document.querySelector('.dropdown > .nav-link');
  const servicesMenu = document.querySelector('.dropdown-menu');

  // For mobile/tablet: open dropdown on first tap, navigate on second
  if (servicesDropdown && servicesLink && servicesMenu) {
    servicesLink.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        const isActive = servicesDropdown.classList.contains('active');
        if (!isActive) {
          e.preventDefault();
          servicesDropdown.classList.add('active');
        }
      }
    });

    // Close dropdown when clicking outside (mobile only)
    document.addEventListener('click', function (event) {
      if (window.innerWidth <= 768) {
        if (!servicesDropdown.contains(event.target)) {
          servicesDropdown.classList.remove('active');
        }
      }
    });
  }

  // Desktop: hover behavior is handled by CSS
  // Mobile: click behavior handled above

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Initial check

  // ============================================
  // Active Menu Item Highlighting
  // ============================================
  function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    // Extract filename (handle root / as index.html)
    let filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    if (!filename) filename = 'index.html';

    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Get base filename from href (ignore hash/query)
      let linkFilename = href.split('#')[0].split('?')[0];
      if (!linkFilename || linkFilename === './') linkFilename = 'index.html';

      // Strict match for files
      if (filename === linkFilename) {
        link.classList.add('active');

        // If it's a dropdown item, also highlight the parent dropdown toggle
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          const parentToggle = parentDropdown.querySelector('.nav-link');
          if (parentToggle) parentToggle.classList.add('active');
        }
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Call on load
  setActiveMenuItem();

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Close mobile menu after navigation
          if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
          }
        }
      }
    });
  });

  // ============================================
  // Animated Counter (Stats Section)
  // ============================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(function () {
      start += increment;
      if (start >= target) {
        element.textContent = formatNumber(target);
        clearInterval(timer);
      } else {
        element.textContent = formatNumber(Math.floor(start));
      }
    }, 16);
  }

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return Math.floor(num) + '+';
  }

  // Intersection Observer for counter animation
  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const targetValue = parseInt(entry.target.getAttribute('data-target') || entry.target.textContent.replace(/\D/g, ''));
        if (targetValue) {
          animateCounter(entry.target, targetValue);
        }
      }
    });
  }, { threshold: 0.5 });

  // Observe all stat numbers
  document.querySelectorAll('.stat-number, [data-target]').forEach(stat => {
    statsObserver.observe(stat);
  });

  // ============================================
  // FAQ Accordion
  // ============================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Close all other FAQ items
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });

      // Toggle current FAQ item
      if (!isActive) {
        this.classList.add('active');
        if (answer) {
          answer.classList.add('active');
        }
      }
    });
  });

  // ============================================
  // Form Validation & AJAX (Demo)
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Demo AJAX call (no backend)
      console.log('Contact Form Submitted:', data);

      // Simulate AJAX request
      setTimeout(function () {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      }, 500);
    });
  }

  // Newsletter Form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      // Demo AJAX call
      console.log('Newsletter Subscription:', email);

      setTimeout(function () {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      }, 500);
    });
  }

  // Login Form
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Demo login (no backend)
      console.log('Login Attempt:', data);

      setTimeout(function () {
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
      }, 500);
    });
  }

  // Register Form
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Demo registration (no backend)
      console.log('Registration:', data);

      setTimeout(function () {
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
      }, 500);
    });
  }

  // ============================================
  // Card Tilt Effect (3D Transform)
  // ============================================
  const cards = document.querySelectorAll('.feature-card, .pricing-card, .blog-card, .glass-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================
  // Fade In Animation on Scroll
  // ============================================
  const fadeElements = document.querySelectorAll('.fade-in-up, .feature-card, .pricing-card, .blog-card');

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
  });

  // ============================================
  // Parallax Effect for Hero Section
  // ============================================
  const hero = document.querySelector('.hero');

  if (hero) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const parallax = hero.querySelector('.hero-content');

      if (parallax && scrolled < hero.offsetHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        parallax.style.opacity = 1 - (scrolled / hero.offsetHeight);
      }
    });
  }

  // ============================================
  // Testimonials Slider (UI Only)
  // ============================================
  const testimonialsContainer = document.querySelector('.testimonials-slider');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;

  if (testimonialsContainer && testimonialCards.length > 0) {
    function showTestimonial(index) {
      testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
      });
    }

    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(currentTestimonial);
    }

    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
    showTestimonial(0);
  }

  // ============================================
  // Particle Background (Canvas) - Optional Enhancement
  // ============================================
  const canvas = document.getElementById('particleCanvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    initParticles();
    animate();
  }

  // ============================================
  // Initialize on DOM Load
  // ============================================
  document.addEventListener('DOMContentLoaded', function () {
    console.log('AI TOOL - Neural Glass Morphism Theme Loaded');

    // Remove any loading states
    document.body.classList.add('loaded');

    // Initialize any additional features
    if (window.innerWidth <= 768) {
      document.body.classList.add('mobile-view');
    }
  });

})();
