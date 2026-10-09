document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCursorGlow();
  initVideoControls();
  initMouseParallax();
  init3DTilt();
  initScrollReveal();
  initIndustryTabs();
  initHotspots();
  initLoadCalculator();
  initModals();
  initMobileMenu();
});

/* ==========================================================
   1. SCROLL PROGRESS BAR
   ========================================================== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  });
}

/* ==========================================================
   2. CURSOR GLOW EFFECT (SMOOTH LERP)
   ========================================================== */
function initCursorGlow() {
  const cursor = document.getElementById('cursor-glow');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================
   3. BACKGROUND VIDEO CONTROLLER (PLAY/PAUSE & MUTE/UNMUTE)
   ========================================================== */
function initVideoControls() {
  const video = document.getElementById('hero-video');
  const playBtn = document.getElementById('video-toggle-play');
  const muteBtn = document.getElementById('video-toggle-sound');
  const playIcon = document.getElementById('video-play-icon');
  const soundIcon = document.getElementById('video-sound-icon');

  if (!video) return;

  // Auto-play attempt on muted
  video.muted = true;
  video.play().catch(() => {});

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
      } else {
        video.pause();
        if (playIcon) playIcon.setAttribute('data-lucide', 'play');
      }
      lucide.createIcons();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (soundIcon) {
        soundIcon.setAttribute('data-lucide', video.muted ? 'volume-x' : 'volume-2');
      }
      lucide.createIcons();
    });
  }
}

/* ==========================================================
   4. MOUSE PARALLAX TRACKING
   ========================================================== */
function initMouseParallax() {
  const parallaxContainers = document.querySelectorAll('[data-parallax-container]');

  parallaxContainers.forEach((container) => {
    const layers = container.querySelectorAll('[data-parallax-depth]');

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-parallax-depth')) || 0.05;
        const moveX = x * depth;
        const moveY = y * depth;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });

    container.addEventListener('mouseleave', () => {
      layers.forEach((layer) => {
        layer.style.transform = `translate3d(0px, 0px, 0)`;
        layer.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      setTimeout(() => {
        layers.forEach((layer) => {
          layer.style.transition = '';
        });
      }, 600);
    });
  });
}

/* ==========================================================
   5. 3D CARD TILT ON HOVER
   ========================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        card.style.transition = '';
      }, 400);
    });
  });
}

/* ==========================================================
   6. SCROLL REVEAL OBSERVER
   ========================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================
   7. INDUSTRY APPLICATION TAB SWITCHER
   ========================================================== */
const industryData = {
  manufacturing: {
    title: 'Manufacturing & Garment Industries',
    desc: 'Uninterrupted prime power engineered for high-throughput production lines, textile weaving mills, and automated machinery across Bangladesh.',
    bullets: [
      'Heavy-duty continuous duty cycle with 110% overload margin',
      'Automatic sync between dual gensets for peak-shift sharing',
      'Full SCADA & IoT remote fuel telemetry'
    ],
    image: 'assets/images/hero-gen.jpg',
    tag: '// PRIME POWER SPEC //'
  },
  commercial: {
    title: 'Commercial Towers & Corporate HQs',
    desc: 'Acoustically insulated standby power systems for corporate hubs and high-rise commercial complexes ensuring zero downtime.',
    bullets: [
      'Ultra-silent acoustic canopy (<68 dBA at 7 meters)',
      'Under 8-second automatic mains failure (AMF) transfer',
      'Compact footprint optimized for basement & rooftop installation'
    ],
    image: 'assets/images/commercial-white.jpg',
    tag: '// STANDBY POWER SPEC //'
  },
  hospitals: {
    title: 'Hospitals & Critical Healthcare Facilities',
    desc: 'Life-safety backup power engineered to power intensive care units, diagnostic imaging suites, and operating theatres without a millisecond of interruption.',
    bullets: [
      'Dual ATS fast-transfer with uninterruptible UPS coordination',
      'Hospital-grade critical silencers with zero exhaust backflow',
      'Priority 24/7 emergency rapid maintenance contract'
    ],
    image: 'assets/images/yellow-silent.jpg',
    tag: '// LIFE-SAFETY SPEC //'
  },
  datacenters: {
    title: 'Data Centers & Critical Telecom HQs',
    desc: 'Tier III & IV compliant power infrastructure built with fault-tolerant redundancy and clean harmonic sine-wave output.',
    bullets: [
      'Permanent magnet generator (PMG) excitation for clean waveform',
      'Underground bulk fuel transfer system with 72-hour reserve',
      'Microprocessor synchronizing panel with N+1 redundancy'
    ],
    image: 'assets/images/perkins-blue.jpg',
    tag: '// TELECOM SPEC //'
  },
  construction: {
    title: 'Infrastructure & Construction Sites',
    desc: 'Rugged, weather-resistant mobile power units built for severe outdoor environments, heavy piling machinery, and bridge construction.',
    bullets: [
      'Heavy-duty skid base with integrated crane lifting eyelets',
      'High ambient tropical radiator designed for +50°C operation',
      'Lockable steel fuel fill neck with anti-siphon protection'
    ],
    image: 'assets/images/industrial-site.jpg',
    tag: '// HEAVY MOBILE SPEC //'
  }
};

function initIndustryTabs() {
  const tabButtons = document.querySelectorAll('.industry-tab-btn');
  const titleEl = document.getElementById('industry-active-title');
  const descEl = document.getElementById('industry-active-desc');
  const bulletsEl = document.getElementById('industry-active-bullets');
  const imgEl = document.getElementById('industry-active-img');
  const tagEl = document.getElementById('industry-active-tag');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-industry');
      const data = industryData[key];
      if (!data) return;

      tabButtons.forEach((b) => {
        b.classList.remove('bg-white', 'text-slate-900', 'shadow-sm', 'border-slate-300');
        b.classList.add('text-slate-500');
      });
      btn.classList.add('bg-white', 'text-slate-900', 'shadow-sm', 'border-slate-300');
      btn.classList.remove('text-slate-500');

      if (imgEl) {
        imgEl.style.opacity = '0.3';
        setTimeout(() => {
          imgEl.src = data.image;
          if (titleEl) titleEl.innerText = data.title;
          if (descEl) descEl.innerText = data.desc;
          if (tagEl) tagEl.innerText = data.tag;
          if (bulletsEl) {
            bulletsEl.innerHTML = data.bullets.map(b => `
              <li class="flex items-start gap-2.5 text-xs text-slate-700">
                <span class="w-4 h-4 rounded-full bg-orange-100 text-[#F25A24] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                <span>${b}</span>
              </li>
            `).join('');
          }
          imgEl.style.opacity = '1';
        }, 180);
      }
    });
  });
}

/* ==========================================================
   8. INTERACTIVE CAD BLUEPRINT HOTSPOTS
   ========================================================== */
const hotspotData = {
  engine: {
    title: 'UK / USA Heavy Diesel Engine',
    desc: 'Direct-injection turbocharged diesel engine engineered for 1500 RPM low-stress synchronous operation and superior fuel efficiency.'
  },
  alternator: {
    title: '100% Copper Brushless Alternator',
    desc: 'Stamford / Leroy Somer Class H insulated alternator with automatic voltage regulator (AVR) ensuring ±0.5% voltage regulation.'
  },
  canopy: {
    title: 'Soundproof Acoustic Canopy',
    desc: 'Laser-cut 2.5mm cold-rolled steel with electrostatic powder coating and high-density mineral wool soundproofing.'
  },
  controller: {
    title: 'Deep Sea (UK) Digital Control Module',
    desc: 'Microprocessor-based automatic mains failure (AMF) panel with LCD telemetry display and remote GSM engine monitoring.'
  }
};

function initHotspots() {
  const dots = document.querySelectorAll('.hotspot-dot');
  const card = document.getElementById('hotspot-info-card');
  const title = document.getElementById('hotspot-title');
  const desc = document.getElementById('hotspot-desc');

  dots.forEach((dot) => {
    dot.addEventListener('mouseenter', () => {
      const key = dot.getAttribute('data-hotspot');
      const info = hotspotData[key];
      if (info && card && title && desc) {
        title.innerText = info.title;
        desc.innerText = info.desc;
        card.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.add('opacity-100');
      }
    });

    dot.addEventListener('click', () => {
      const key = dot.getAttribute('data-hotspot');
      const info = hotspotData[key];
      if (info && card && title && desc) {
        title.innerText = info.title;
        desc.innerText = info.desc;
        card.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.add('opacity-100');
      }
    });
  });
}

/* ==========================================================
   9. INTERACTIVE LOAD SIZING CALCULATOR
   ========================================================== */
function initLoadCalculator() {
  const slider = document.getElementById('load-slider');
  const display = document.getElementById('load-display');
  const recKva = document.getElementById('recommended-kva');
  const recFuel = document.getElementById('recommended-fuel');

  if (slider && display && recKva) {
    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      display.innerText = `${val} kW`;
      const neededKva = Math.ceil((val / 0.8) * 1.25);
      recKva.innerText = `${neededKva} kVA`;
      if (recFuel) {
        recFuel.innerText = `~${(neededKva * 0.22).toFixed(1)} L/hr`;
      }
    });
  }
}

/* ==========================================================
   10. MODALS (QUOTE, VIDEO, SEARCH)
   ========================================================== */
function initModals() {
  const quoteModal = document.getElementById('quote-modal');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
  const closeQuoteBtn = document.getElementById('close-quote-modal');

  openQuoteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteModal) quoteModal.classList.remove('hidden');
    });
  });

  if (closeQuoteBtn && quoteModal) {
    closeQuoteBtn.addEventListener('click', () => quoteModal.classList.add('hidden'));
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) quoteModal.classList.add('hidden');
    });
  }

  // Search Modal
  const searchModal = document.getElementById('search-modal');
  const openSearchBtn = document.getElementById('open-search-modal');
  const closeSearchBtn = document.getElementById('close-search-modal');

  if (openSearchBtn && searchModal) {
    openSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.remove('hidden');
      const input = document.getElementById('search-input');
      if (input) setTimeout(() => input.focus(), 100);
    });
  }

  if (closeSearchBtn && searchModal) {
    closeSearchBtn.addEventListener('click', () => searchModal.classList.add('hidden'));
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.add('hidden');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (quoteModal) quoteModal.classList.add('hidden');
      if (searchModal) searchModal.classList.add('hidden');
    }
  });
}

/* ==========================================================
   11. MOBILE MENU
   ========================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    menu.querySelectorAll('a').forEach((l) => {
      l.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }
}
