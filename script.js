/**
 * BABLU KUMAR - PORTFOLIO CLIENT JAVASCRIPT
 * Features:
 *  - Theme Engine (Dark/Light with localStorage persistence)
 *  - Mobile Navigation Drawer & Accessibility
 *  - Dynamic Profile Synchronization from data/profile.json
 *  - Active Section Spy using IntersectionObserver
 *  - Truthful Mailto Contact Handler & Message Copy
 *  - Resume Modal Management & Download Verification
 *  - Back-to-Top Navigation
 */

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initHeroTyping();
  initScrollReveal();
  initCardTilt();
  initMagneticButtons();
  initBackToTop();
  loadProfileData();
});

/* --------------------------------------------------------------------------
   PRELOADER CONTROLLER
   -------------------------------------------------------------------------- */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const dismissLoader = () => {
    loader.classList.add('loaded');
    setTimeout(() => {
      if (loader.parentNode) {
        loader.style.display = 'none';
      }
    }, 500);
  };

  if (document.readyState === 'complete') {
    setTimeout(dismissLoader, 300);
  } else {
    window.addEventListener('load', () => {
      setTimeout(dismissLoader, 300);
    });
    // Fallback in case load event was already triggered or delayed
    setTimeout(dismissLoader, 1200);
  }
}

/* --------------------------------------------------------------------------
   THEME CONTROLLER (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or infer from system preference
  const savedTheme = localStorage.getItem('bablu_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  htmlRoot.setAttribute('data-theme', activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('bablu_portfolio_theme', newTheme);
      showNotification(`Switched to ${newTheme.toUpperCase()} theme`);
    });
  }
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click or ESC key
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   SCROLL SPY & STICKY NAVBAR
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky shadow effect on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // IntersectionObserver for active section highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   BACK TO TOP CONTROLLER
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   HERO TYPING EFFECT
   -------------------------------------------------------------------------- */
function initHeroTyping() {
  const typingTarget = document.getElementById('hero-typing-target');
  if (!typingTarget) return;

  // Authentic verified titles
  const titles = [
    "B.Tech CSE Student & Full-Stack Developer",
    "Frontend & React.js Developer",
    "Problem Solver & C++ Programmer",
    "AI & Machine Learning Enthusiast"
  ];

  // Accessibility check
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typingTarget.textContent = titles[0];
    return;
  }

  let titleIndex = 0;
  let charIndex = titles[0].length;
  let isDeleting = true;
  let typingSpeed = 1600; // Initial display pause for the first title

  function typeStep() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      charIndex--;
      typingTarget.textContent = currentTitle.substring(0, charIndex);
      typingSpeed = 30;
    } else {
      charIndex++;
      typingTarget.textContent = currentTitle.substring(0, charIndex);
      typingSpeed = 60;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at complete word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 450; // Pause before typing next title
    }

    setTimeout(typeStep, typingSpeed);
  }

  setTimeout(typeStep, typingSpeed);
}

/* --------------------------------------------------------------------------
   VIEWPORT SCROLL REVEAL (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .timeline');
  if (!revealElements.length) return;

  // Accessibility check
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   3D CARD TILT EFFECT (Desktop Hover)
   -------------------------------------------------------------------------- */
function initCardTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (!tiltCards.length) return;

  tiltCards.forEach(card => {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((cardY - centerY) / centerY) * 7;
        const rotateY = ((cardX - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
        ticking = false;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   MAGNETIC BUTTON EFFECT (Desktop Fine Pointer)
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const magneticElements = document.querySelectorAll('.hero-cta .btn, .hero-socials .social-icon, .icon-btn');

  magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle pull (max ~4-5px)
      const pullX = (x * 0.16).toFixed(1);
      const pullY = (y * 0.16).toFixed(1);

      btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* --------------------------------------------------------------------------
   RESUME MODAL HANDLER
   -------------------------------------------------------------------------- */
let cachedProfileData = null;

function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  const content = document.getElementById('resume-modal-content');
  if (!modal || !content) return;

  const resumeFile = cachedProfileData?.preferences?.resumeFile || '';

  if (resumeFile && resumeFile.trim() !== '') {
    content.innerHTML = `
      <p style="margin-bottom: 14px;">A verified resume file is linked to this profile.</p>
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 14px; border-radius: 8px; margin-bottom: 16px;">
        <strong>Document:</strong> <code>${escapeHtml(resumeFile)}</code>
      </div>
      <p>Click below to open or download the PDF resume directly.</p>
      <div style="margin-top: 16px;">
        <a href="${escapeHtml(resumeFile)}" download class="btn btn-primary" style="display: inline-flex;">Download PDF Resume</a>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 14px;">
        <div style="background: rgba(99, 102, 241, 0.15); color: #818cf8; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          📄
        </div>
        <div>
          <h4 style="color: #fff; margin-bottom: 4px; font-size: 1rem;">Resume Pending Upload</h4>
          <p style="font-size: 0.875rem; color: #94a3b8;">
            Bablu Kumar's resume is currently undergoing final review. You can request a personalized, updated copy directly via email.
          </p>
        </div>
      </div>
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 14px; border-radius: 8px; font-size: 0.8125rem;">
        <strong>Quick Tip for Admin:</strong> To activate direct download, copy your PDF file into <code>assets/resume/resume.pdf</code> and update <code>resumeFile</code> in <code>data/profile.json</code>.
      </div>
    `;
  }

  modal.style.display = 'flex';
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.style.display = 'none';
}

// Close modal on backdrop click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('resume-modal');
  if (e.target === modal) closeResumeModal();
});

/* --------------------------------------------------------------------------
   CONTACT FORM HANDLERS (Truthful & Functional)
   -------------------------------------------------------------------------- */
function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const statusEl = document.getElementById('form-status');

  if (!name || !email || !message) {
    alert('Please fill out all required fields.');
    return;
  }

  // Construct mailto URI
  const recipient = 'bablukumar22106@gmail.com';
  const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - From ${name}`);
  const mailtoBody = encodeURIComponent(`Hi Bablu,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent via Portfolio Website`);
  const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Launch default mail client
  window.location.href = mailtoUrl;

  if (statusEl) {
    statusEl.className = 'form-status success';
    statusEl.innerHTML = `
      <strong>Opening your email client...</strong><br>
      If your mail program didn't open automatically, you can directly email <code>${recipient}</code> or click "Copy Message" below!
    `;
  }
}

function copyMessageDetails() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const formattedText = `To: bablukumar22106@gmail.com\nSubject: [Portfolio Inquiry] ${subject || 'General Inquiry'}\nFrom: ${name || 'Inquirer'} (${email || 'No email provided'})\n\nMessage:\n${message || '(No message written)'}`;

  navigator.clipboard.writeText(formattedText).then(() => {
    showNotification('Message copied to clipboard! You can now paste and send it from any email app.');
  }).catch(() => {
    prompt('Copy message text:', formattedText);
  });
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showNotification(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  toast.textContent = message;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

/* --------------------------------------------------------------------------
   DYNAMIC PROFILE DATA LOADER (from data/profile.json)
   -------------------------------------------------------------------------- */
async function loadProfileData() {
  try {
    const response = await fetch('data/profile.json');
    if (!response.ok) return;
    
    const profile = await response.json();
    cachedProfileData = profile;
    
    // Validate and sync resume button state if configured
    if (profile.preferences && profile.preferences.resumeFile) {
      const resumeBtn = document.getElementById('resume-btn');
      if (resumeBtn && profile.preferences.resumeFile.trim() !== '') {
        resumeBtn.setAttribute('title', 'Verified PDF Resume Ready');
      }
    }
  } catch (err) {
    // Graceful fallback: semantic HTML already contains verified content
    console.info('Static fallback active. Note: data/profile.json is accessible when served via HTTP or local server.');
  }
}

/* --------------------------------------------------------------------------
   SECURITY HELPER: HTML ESCAPING
   -------------------------------------------------------------------------- */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
