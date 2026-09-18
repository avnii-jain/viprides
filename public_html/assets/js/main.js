/**
 * VIP RIDES - MODERN CINEMATIC & INTERACTIVE JAVASCRIPT
 * "Every Journey Begins From Chandigarh"
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSequence();
  initJourneyPathInteraction();
  initDestinationFiltersAndModals();
  initFleetFilters();
  initPackageFilters();
  initTimelineObserver();
  initBookingForms();
  initLeafletMap();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navMenu = document.querySelector('.nav-menu-list');

  if (header && !header.classList.contains('solid-header')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* ==========================================================================
   2. HERO CINEMATIC DESTINATION REVEAL & CAR ENTRANCE SEQUENCE
   ========================================================================== */
function initHeroSequence() {
  const panels = document.querySelectorAll('.hero-vertical-panel');
  const travelCar = document.getElementById('heroTravelCar');
  const carStage = document.querySelector('.hero-car-stage');
  const mainContent = document.getElementById('heroMainContent');
  const bookingBar = document.getElementById('heroBookingBar');

  if (!panels.length) return;

  // Step 1: Reveal destination panels sequentially
  panels.forEach((panel, idx) => {
    setTimeout(() => {
      panel.classList.add('revealed');
    }, idx * 160);
  });

  // Step 2: Reveal the hero text & buttons smoothly
  setTimeout(() => {
    if (mainContent) {
      mainContent.classList.add('visible');
    }
  }, 400);

  // Step 3: Once panels are in view, the large luxury van drives from LEFT to RIGHT below the buttons
  const panelsDuration = panels.length * 160 + 100;
  setTimeout(() => {
    if (travelCar) {
      travelCar.classList.add('drive-across');
    }
  }, panelsDuration);

  // Step 4: After drive completion, smoothly fade out the car track
  const carExitDuration = panelsDuration + 7500;
  setTimeout(() => {
    if (carStage) {
      carStage.style.opacity = '0';
      carStage.style.transition = 'opacity 0.8s ease';
      setTimeout(() => { carStage.style.display = 'none'; }, 800);
    }
    if (bookingBar) {
      bookingBar.classList.add('visible');
    }
  }, carExitDuration);
}

/* ==========================================================================
   3. "THE CHANDIGARH JOURNEY PATH" (Interactive Hover / Tap Car Movement)
   ========================================================================== */
const pathDestinationsData = {
  katra: {
    name: 'Katra (Vaishno Devi)',
    distance: '390 km',
    duration: 'Approx. 7.5 hrs',
    tag: 'Pilgrimage',
    image: 'assets/img/hero/katra-hero.jpg',
    desc: 'Spiritual gateway to Holy Shrine of Shri Mata Vaishno Devi Ji with dedicated round trips from Chandigarh.'
  },
  dalhousie: {
    name: 'Dalhousie & Khajjiar',
    distance: '315 km',
    duration: 'Approx. 6.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/dalhousie-hero.png',
    desc: 'Tranquil pine-clad hills, Dainkund Peak, and the mini-Switzerland of India — Khajjiar.'
  },
  srinagar: {
    name: 'Srinagar (Kashmir)',
    distance: '560 km',
    duration: 'Approx. 12 hrs',
    tag: 'Kashmir',
    image: 'assets/img/hero/srinagar-hero.png',
    desc: 'Breathtaking Kashmir Valley — Dal Lake shikara rides, Mughal Gardens, Gulmarg, and Pahalgam.'
  },
  manali: {
    name: 'Manali & Solang',
    distance: '290 km',
    duration: 'Approx. 7.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/manali-hero.png',
    desc: 'Valley of Gods, high-altitude Atal Tunnel, Solang Valley adventure sports, and Old Manali.'
  },
  shimla: {
    name: 'Shimla & Kufri',
    distance: '112 km',
    duration: 'Approx. 3.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/shimla-hero.jpg',
    desc: 'The Queen of Hills across the Himalayan Expressway — Mall Road, Ridge, and Kufri slopes.'
  },
  dharamshala: {
    name: 'Dharamshala & McLeod Ganj',
    distance: '240 km',
    duration: 'Approx. 5.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/dharamshala-hero.jpg',
    desc: 'Spiritual haven with Tsuglagkhang Complex, Bhagsu waterfalls, and scenic Kangra valley vistas.'
  },
  amritsar: {
    name: 'Amritsar Golden Temple',
    distance: '225 km',
    duration: 'Approx. 4 hrs',
    tag: 'Pilgrimage',
    image: 'assets/img/slider/2.jpg',
    desc: 'Direct highway trip to Sri Harmandir Sahib (Golden Temple), Jallianwala Bagh, and Wagah Border.'
  }
};

function initJourneyPathInteraction() {
  const timelineItems = document.querySelectorAll('.route-timeline-item');
  const carTracker = document.getElementById('timelineCarTracker');
  const spineFill = document.getElementById('timelineSpineFill');
  const timelineWrap = document.getElementById('routeTimelineWrap');

  if (!timelineItems.length || !carTracker || !timelineWrap) return;

  function setActiveMilestone(item) {
    timelineItems.forEach(el => el.classList.remove('active-milestone'));
    item.classList.add('active-milestone');

    const itemMarker = item.querySelector('.timeline-milestone-marker');
    if (itemMarker) {
      const wrapRect = timelineWrap.getBoundingClientRect();
      const markerRect = itemMarker.getBoundingClientRect();
      const targetTop = markerRect.top - wrapRect.top + (markerRect.height / 2);

      carTracker.style.top = `${targetTop}px`;

      if (spineFill) {
        const wrapHeight = timelineWrap.offsetHeight;
        const fillPercent = Math.min(100, Math.max(0, (targetTop / wrapHeight) * 100));
        spineFill.style.height = `${fillPercent}%`;
      }
    }
  }

  // Hover & Click triggers
  timelineItems.forEach((item) => {
    item.addEventListener('mouseenter', () => setActiveMilestone(item));
    item.addEventListener('click', () => {
      setActiveMilestone(item);
    });
  });

  // IntersectionObserver for scroll-driven timeline progress
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setActiveMilestone(entry.target);
        }
      });
    }, {
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0.4, 0.7]
    });

    timelineItems.forEach(item => observer.observe(item));
  }

  // Set default initial position on load
  setTimeout(() => {
    if (timelineItems[0]) {
      setActiveMilestone(timelineItems[0]);
    }
  }, 400);
}

/* ==========================================================================
   4. DESTINATION DATA & MODALS
   ========================================================================== */
const destinationDetails = {
  chandigarh: {
    title: 'Chandigarh — The Central Gateway',
    subtitle: 'Where Every Journey Across North India Begins',
    distance: '0 km (Hub)',
    time: 'Starting Hub',
    tag: 'Origin Hub',
    image: 'assets/img/hero/chandigarh-hero.jpg',
    overview: 'Chandigarh is the premier travel gateway connecting the plains of Punjab and Haryana to the Himalayan states of Himachal Pradesh, Jammu & Kashmir, and Uttarakhand. VIP Rides provides on-demand cabs, premium sedans, and group travellers directly from Chandigarh airport, railway station, and residence addresses.',
    highlights: [
      '24/7 Pickups from Chandigarh Airport (IXC) & Railway Station',
      'Instant local taxi hire and full day sightseeing packages',
      'Comfortable fleet ready for direct mountain hill routes'
    ]
  },
  katra: {
    title: 'Chandigarh to Katra',
    subtitle: 'Spiritual Gateway to Maa Vaishno Devi',
    distance: '390 km',
    time: 'Approx. 7.5 hrs',
    tag: 'Pilgrimage',
    image: 'assets/img/hero/katra-hero.jpg',
    overview: 'Katra serves as the base camp for the revered pilgrimage to the Holy Shrine of Shri Mata Vaishno Devi Ji. Enjoy a serene and comfortable ride with our experienced drivers who know the NH44 highway and Jammu-Udhampur mountain expressway routes thoroughly.',
    highlights: [
      'Smooth travel via Pathankot & Jammu bypass',
      'Multiple vehicle options: Dzire, Innova Crysta & Tempo Traveller',
      'Flexible return and waiting options for Darshan'
    ]
  },
  dalhousie: {
    title: 'Chandigarh to Dalhousie',
    subtitle: 'Peaceful Himalayan Hills & Khajjiar Meadow',
    distance: '315 km',
    time: 'Approx. 6.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/dalhousie-hero.png',
    overview: 'Nestled across five hills, Dalhousie offers pine-clad valleys, colonial architecture, and the mini-Switzerland of India — Khajjiar. Our cabs offer a smooth journey through the Dhauladhar mountain foothills with seasoned hill drivers.',
    highlights: [
      'Scenic stopovers at Kangra Valley & Ravi riverbanks',
      'Full coverage of Khajjiar, Dainkund Peak & Kalatop Wildlife Sanctuary',
      'Sanitized and heated cabs for winter snow travel'
    ]
  },
  srinagar: {
    title: 'Chandigarh to Srinagar',
    subtitle: 'Paradise on Earth — Kashmir Valley & Dal Lake',
    distance: '560 km',
    time: 'Approx. 12 hrs',
    tag: 'Kashmir',
    image: 'assets/img/hero/srinagar-hero.png',
    overview: 'Experience the magic of Kashmir with our premier outstation taxi service from Chandigarh. Travel through the landmark Chenani-Nashri and Banihal Qazigund tunnels to reach the jewel of Kashmir — Srinagar.',
    highlights: [
      'Expert drivers experienced with Srinagar-Jammu National Highway (NH44)',
      'Custom stops at Patnitop, Ramban & Qazigund',
      'Extended tour options covering Gulmarg, Pahalgam & Sonamarg'
    ]
  },
  manali: {
    title: 'Chandigarh to Manali',
    subtitle: 'Valley of Gods, Solang Snow & Atal Tunnel',
    distance: '290 km',
    time: 'Approx. 7.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/manali-hero.png',
    overview: 'From the iconic Atal Tunnel to snow adventures in Solang Valley and ancient timber temples in Old Manali, this classic Himalayan journey is made smooth, punctual, and safe with VIP Rides cabs.',
    highlights: [
      'Fast travel via the newly constructed Kiratpur-Nerchowk expressway',
      'Cover Kullu, Kasol & Manikaran on demand',
      'High-clearance SUVs (Innova Crysta, Fortuner) available for snow terrain'
    ]
  },
  shimla: {
    title: 'Chandigarh to Shimla',
    subtitle: 'Queen of Hills & Colonial Grandeur',
    distance: '112 km',
    time: 'Approx. 3.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/shimla-hero.jpg',
    overview: 'A quick scenic getaway from Chandigarh across the Himalayan Expressway. Visit Mall Road, Jakhu Temple, Ridge, and Kufri with punctual door-to-door cab pickups.',
    highlights: [
      'Himalayan Expressway route with smooth mountain driving',
      'Same-day return and multi-day packages available',
      'Sightseeing coverage for Kufri, Chail & Narkanda'
    ]
  },
  dharamshala: {
    title: 'Chandigarh to Dharamshala',
    subtitle: 'Kangra Valley & McLeod Ganj Retreat',
    distance: '240 km',
    time: 'Approx. 5.5 hrs',
    tag: 'Himachal',
    image: 'assets/img/hero/dharamshala-hero.jpg',
    overview: 'Visit the seat of the Dalai Lama, the world-famous HPCA Cricket Stadium, Bhagsu Waterfalls, and tea gardens of Kangra. Our drivers ensure a peaceful, scenic ride.',
    highlights: [
      'Travel via Anandpur Sahib & Una / Kangra Valley',
      'Coverage of McLeod Ganj, Triund base & Palampur tea estates',
      'Spacious AC cabs with flexible pickup schedules'
    ]
  },
  amritsar: {
    title: 'Chandigarh to Amritsar',
    subtitle: 'Golden Temple & Wagah Border Ceremony',
    distance: '225 km',
    time: 'Approx. 4 hrs',
    tag: 'Pilgrimage',
    image: 'assets/img/slider/2.jpg',
    overview: 'Take a swift expressway journey from Chandigarh to the spiritual heart of Punjab. Visit the Holy Golden Temple (Sri Harmandir Sahib), Jallianwala Bagh, and the patriotic Wagah Border beating retreat ceremony.',
    highlights: [
      'Smooth 4-lane expressway travel via Jalandhar',
      'Same day round trip or multi-day temple tour',
      'Dedicated waiting for evening Wagah Border ceremony'
    ]
  },
  jammu: {
    title: 'Chandigarh to Jammu',
    subtitle: 'City of Temples & Gateway to Kashmir',
    distance: '345 km',
    time: 'Approx. 6.5 hrs',
    tag: 'Outstation',
    image: 'assets/img/section/katra.jpg',
    overview: 'Direct outstation taxi service to Raghunath Temple, Bahu Fort, and Jammu Tawi railway transit with comfortable AC cabs and experienced drivers.',
    highlights: [
      'Direct highway travel via Pathankot',
      'Door-to-door drops across Jammu city and railway station',
      'Round-trip and one-way taxi options'
    ]
  }
};

function initDestinationFiltersAndModals() {
  const filterPills = document.querySelectorAll('.dest-filter-bar .filter-pill');
  const bentoCards = document.querySelectorAll('.bento-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      bentoCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Opener triggers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const destId = trigger.dataset.openModal;
      openDestinationModal(destId);
    });
  });
}

function openDestinationModal(destId) {
  const data = destinationDetails[destId] || destinationDetails.katra;
  const modal = document.getElementById('vipDestinationModal');
  if (!modal) return;

  const modalTitle = document.getElementById('modalDestTitle');
  const modalSubtitle = document.getElementById('modalDestSubtitle');
  const modalImg = document.getElementById('modalDestImg');
  const modalDistance = document.getElementById('modalDestDistance');
  const modalTime = document.getElementById('modalDestTime');
  const modalOverview = document.getElementById('modalDestOverview');
  const modalHighlights = document.getElementById('modalDestHighlights');

  if (modalTitle) modalTitle.textContent = data.title;
  if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
  if (modalImg) modalImg.src = data.image;
  if (modalDistance) modalDistance.textContent = data.distance;
  if (modalTime) modalTime.textContent = data.time;
  if (modalOverview) modalOverview.textContent = data.overview;
  
  if (modalHighlights) {
    modalHighlights.innerHTML = data.highlights.map(h => `<li><i class="fas fa-check-circle"></i> ${h}</li>`).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDestinationModal() {
  const modal = document.getElementById('vipDestinationModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
window.closeDestinationModal = closeDestinationModal;

/* ==========================================================================
   5. CAR RENTAL FLEET FILTERING
   ========================================================================== */
function initFleetFilters() {
  const pills = document.querySelectorAll('.fleet-filter-bar .filter-pill');
  const cards = document.querySelectorAll('.fleet-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. TOUR PACKAGES FILTERING
   ========================================================================== */
function initPackageFilters() {
  const pills = document.querySelectorAll('.package-filter-bar .filter-pill');
  const cards = document.querySelectorAll('.package-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. 6-STEP TIMELINE SCROLL OBSERVER
   ========================================================================== */
function initTimelineObserver() {
  const stepCards = document.querySelectorAll('.step-card');
  if (stepCards.length === 0 || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  stepCards.forEach(card => observer.observe(card));
}

/* ==========================================================================
   8. BOOKING & QUICK QUOTE MODAL LOGIC
   ========================================================================== */
function initBookingForms() {
  const heroForm = document.getElementById('heroBookingForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pickup = heroForm.querySelector('[name="pickup"]')?.value || 'Chandigarh';
      const destination = heroForm.querySelector('[name="destination"]')?.value || '';
      const date = heroForm.querySelector('[name="date"]')?.value || '';
      const passengers = heroForm.querySelector('[name="passengers"]')?.value || '1-4 Passengers';

      openQuoteModal({ pickup, destination, date, passengers });
    });
  }

  window.openQuoteModal = function(params = {}) {
    const quoteModal = document.getElementById('vipQuoteModal');
    if (!quoteModal) return;

    if (params.pickup) document.getElementById('quotePickup').value = params.pickup;
    if (params.destination) document.getElementById('quoteDestination').value = params.destination;
    if (params.date) document.getElementById('quoteDate').value = params.date;
    if (params.passengers) document.getElementById('quotePassengers').value = params.passengers;
    if (params.tripType) document.getElementById('quoteTripType').value = params.tripType;
    if (params.vehicle) document.getElementById('quoteVehicle').value = params.vehicle;

    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuoteModal = function() {
    const quoteModal = document.getElementById('vipQuoteModal');
    if (quoteModal) {
      quoteModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.vip-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  window.sendWhatsAppQuote = function() {
    const pickup = document.getElementById('quotePickup')?.value || 'Chandigarh';
    const destination = document.getElementById('quoteDestination')?.value || '';
    const date = document.getElementById('quoteDate')?.value || '';
    const vehicle = document.getElementById('quoteVehicle')?.value || 'Sedan / SUV';
    
    const text = encodeURIComponent(`Hello VIP Rides, I would like to get a quote:\n• Pickup: ${pickup}\n• Destination: ${destination}\n• Travel Date: ${date}\n• Vehicle: ${vehicle}`);
    window.open(`https://wa.me/919872798927?text=${text}`, '_blank');
  };
}

/* ==========================================================================
   9. INTERACTIVE MAP ON CONTACT PAGE
   ========================================================================== */
function initLeafletMap() {
  const mapElement = document.getElementById('vipContactMap');
  if (!mapElement || typeof L === 'undefined') return;

  const businessLat = 30.6425;
  const businessLng = 76.8173;

  try {
    const map = L.map('vipContactMap', {
      scrollWheelZoom: false,
      touchZoom: true
    }).setView([businessLat, businessLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([businessLat, businessLng]).addTo(map);
    marker.bindPopup(`
      <div style="font-family:'Outfit',sans-serif; padding:4px;">
        <strong style="color:#0b132b; font-size:1rem; display:block; margin-bottom:4px;">VIP Rides Chandigarh Hub</strong>
        <p style="color:#576579; font-size:0.85rem; margin:0 0 8px 0;">30B, Ananta Homes, Gazipur Road, Zirakpur - 140603</p>
        <a href="https://maps.google.com/?q=30B,+Ananta+Homes,+Gazipur+Road,+Zirakpur" target="_blank" style="display:inline-block; color:#0b132b; background:#eab308; padding:4px 10px; border-radius:4px; font-size:0.8rem; font-weight:700; text-decoration:none;">Get Directions &rarr;</a>
      </div>
    `).openPopup();

    map.on('click', () => map.scrollWheelZoom.enable());
    map.on('mouseout', () => map.scrollWheelZoom.disable());
  } catch (err) {
    console.warn('Map initialization:', err);
  }
}
