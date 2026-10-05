/* ==========================================================================
   Chetan Yalla - Portfolio (plain JavaScript, no build step, no backend)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DATA - edit these lists to update the Skills and Projects sections.
   (In the MERN version these came from the Express/MongoDB API.)
   -------------------------------------------------------------------------- */

// Optional: set this to a form-handling URL (Formspree, your own API, etc.)
// to POST messages as JSON. When empty, the form opens a pre-filled email.
const CONTACT_ENDPOINT = '';
const CONTACT_EMAIL = 'chetan.yalla02@gmail.com';

const SKILL_CATEGORIES = [
  { id: 'Languages', title: 'Languages', icon: 'fas fa-code' },
  { id: 'Frontend', title: 'Frontend', icon: 'fas fa-layer-group' },
  { id: 'Backend', title: 'Backend & Databases', icon: 'fas fa-server' },
  { id: 'Tools', title: 'Tools & Platforms', icon: 'fas fa-tools' }
];

const SKILLS = [
  { category: 'Languages', name: 'Python', icon: 'fab fa-python' },
  { category: 'Languages', name: 'Java', icon: 'fab fa-java' },
  { category: 'Languages', name: 'C Language', icon: 'fas fa-terminal' },
  { category: 'Languages', name: 'JavaScript', icon: 'fab fa-js' },
  { category: 'Frontend', name: 'React.js', icon: 'fab fa-react' },
  { category: 'Frontend', name: 'HTML5', icon: 'fab fa-html5' },
  { category: 'Frontend', name: 'CSS3', icon: 'fab fa-css3-alt' },
  { category: 'Frontend', name: 'Angular', icon: 'fab fa-angular' },
  { category: 'Backend', name: 'Node.js', icon: 'fab fa-node-js' },
  { category: 'Backend', name: 'Express.js', icon: 'fas fa-network-wired' },
  { category: 'Backend', name: 'MongoDB', icon: 'fas fa-database' },
  { category: 'Backend', name: 'MySQL', icon: 'fas fa-database' },
  { category: 'Backend', name: 'DBMS', icon: 'fas fa-table' },
  { category: 'Tools', name: 'Git', icon: 'fab fa-git-alt' },
  { category: 'Tools', name: 'GitHub', icon: 'fab fa-github' },
  { category: 'Tools', name: 'VS Code', icon: 'fas fa-laptop-code' },
  { category: 'Tools', name: 'REST APIs', icon: 'fas fa-cloud' }
];

// `category` holds the filter keys (space separated); `label` is the tag shown on the card.
const PROJECTS = [
  {
    title: 'AI-Powered Safety Monitoring System',
    description: 'A smart safety surveillance platform that detects unsafe conditions, monitors hazards in real time, and sends instant alerts for faster emergency response.',
    category: 'fullstack ai',
    label: 'Gen AI',
    icon: 'fas fa-shield-alt',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'React.js', 'Node.js', 'MongoDB'],
    features: [
      'Built an AI-driven monitoring dashboard to identify unsafe worker behavior and environmental risks in real time.',
      'Integrated video analysis, alert notifications, and centralized reporting for safer operational decision-making.'
    ]
  },
  {
    title: 'Spare Parts Management',
    description: 'A spare parts inventory management system built to track stock, monitor supplier data, and streamline maintenance operations with real-time visibility into available components.',
    category: 'fullstack',
    label: 'Full Stack',
    icon: 'fas fa-cogs',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'JSON', 'FastAPI', 'Supabase', 'Python'],
    features: [
      'Created a responsive frontend using HTML, CSS, JavaScript, and JSON-driven data rendering for managing part records.',
      'Connected the UI to a FastAPI backend and stored inventory, supplier, and stock data in Supabase for secure and scalable access.'
    ]
  },
  {
    title: 'Courier Management System',
    description: 'A full-stack shipment management system designed to track delivery statuses and logistics workflows.',
    category: 'fullstack mern',
    label: 'MERN Stack',
    icon: 'fas fa-truck-ramp-box',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    features: [
      'Developed RESTful APIs and complete CRUD operations backed by MongoDB.',
      'Created an intuitive shipment tracking dashboard for users and dispatchers.'
    ]
  },
  {
    title: 'Real-Time Multiplayer Ludo',
    description: 'An interactive full-stack web Ludo game featuring real-time multiplayer board synchronization and custom rule logic.',
    category: 'fullstack',
    label: 'Full Stack',
    icon: 'fas fa-gamepad',
    tags: ['JavaScript', 'Node.js', 'Full Stack', 'WebSockets'],
    features: [
      'Implemented full-stack game engine logic and state synchronization for players.',
      'Engineered responsive interactive board UI with smooth pawn movement animations.'
    ]
  },
  {
    title: 'Real-Time Digital Clock',
    description: 'A full-stack digital clock application featuring server-side time synchronization and clean responsive UI design.',
    category: 'fullstack mern',
    label: 'Full Stack',
    icon: 'far fa-clock',
    tags: ['React.js', 'Node.js', 'REST API', 'CSS3'],
    features: [
      'Implemented REST API endpoints for server-side precise time synchronization.',
      'Designed a sleek UI with customizable time formatting and smooth updates.'
    ]
  }
];

/* --------------------------------------------------------------------------
   2. HELPERS
   -------------------------------------------------------------------------- */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for non-secure contexts (e.g. opening the file directly)
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }
}

/* --------------------------------------------------------------------------
   3. RENDERING
   -------------------------------------------------------------------------- */

function renderSkills() {
  const grid = $('#skills-grid');
  if (!grid) return;

  grid.innerHTML = SKILL_CATEGORIES.map(cat => {
    const badges = SKILLS
      .filter(skill => skill.category === cat.id)
      .map(skill => `<span class="skill-badge"><i class="${escapeHtml(skill.icon)}"></i> ${escapeHtml(skill.name)}</span>`)
      .join('');

    return `
      <div class="skill-category-card">
        <h3 class="skill-cat-title"><i class="${escapeHtml(cat.icon)}"></i> ${escapeHtml(cat.title)}</h3>
        <div class="skill-badges">${badges}</div>
      </div>`;
  }).join('');
}

function projectCardHtml(project) {
  const features = project.features
    .map(text => `<li><i class="fas fa-check-circle"></i> ${escapeHtml(text)}</li>`)
    .join('');
  const tags = project.tags
    .map(tag => `<span class="ptag">${escapeHtml(tag)}</span>`)
    .join('');

  return `
    <article class="project-card is-entering" data-category="${escapeHtml(project.category)}">
      <div class="project-header">
        <div class="project-icon"><i class="${escapeHtml(project.icon)}"></i></div>
        <span class="tag">${escapeHtml(project.label)}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>
        <ul class="project-bullets">${features}</ul>
      </div>
      <div class="project-tags">${tags}</div>
    </article>`;
}

function renderProjects(filter = 'all') {
  const grid = $('#projects-grid');
  if (!grid) return;

  const visible = PROJECTS.filter(p => filter === 'all' || p.category.split(' ').includes(filter));
  grid.innerHTML = visible.map(projectCardHtml).join('');
}

/* --------------------------------------------------------------------------
   4. INTERACTIONS
   -------------------------------------------------------------------------- */

function initTheme() {
  const button = $('#theme-toggle');
  const icon = $('i', button);
  const root = document.documentElement;

  const applyIcon = theme => {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  };

  applyIcon(root.getAttribute('data-theme') || 'dark');

  button.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    applyIcon(next);
    try { localStorage.setItem('portfolio-theme', next); } catch (e) { /* storage unavailable */ }
  });
}

function initMobileMenu() {
  const hamburger = $('#hamburger');
  const navLinks = $('#nav-links');

  const setOpen = open => {
    navLinks.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => setOpen(!navLinks.classList.contains('active')));
  $$('.nav-link').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
}

function initActiveNavLink() {
  const sections = $$('section[id]');
  const links = new Map($$('.nav-links a').map(a => [a.getAttribute('href').slice(1), a]));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.remove('active'));
      const active = links.get(entry.target.id);
      if (active) active.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
}

function initProjectFilters() {
  const buttons = $$('.filter-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      renderProjects(button.dataset.filter);
    });
  });
}

function initHeroTilt() {
  const wrapper = $('.hero-image-wrapper');
  if (!wrapper || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  wrapper.addEventListener('pointermove', event => {
    const rect = wrapper.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    wrapper.style.setProperty('--portrait-x', `${x * 10}px`);
    wrapper.style.setProperty('--portrait-y', `${y * 10}px`);
    wrapper.style.setProperty('--card-rotate-x', `${-y * 12}deg`);
    wrapper.style.setProperty('--card-rotate-y', `${x * 12}deg`);
    wrapper.classList.add('is-pointer-active');
  });

  wrapper.addEventListener('pointerleave', () => {
    wrapper.classList.remove('is-pointer-active');
    ['--portrait-x', '--portrait-y', '--card-rotate-x', '--card-rotate-y']
      .forEach(prop => wrapper.style.removeProperty(prop));
  });
}

function initCopyButtons() {
  $$('button.copy-btn[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy;
      const ok = await copyText(text);
      showToast(ok ? `Copied "${text}" to clipboard!` : 'Could not copy. Please copy it manually.');
    });
  });
}

function initContactForm() {
  const form = $('#contact-form');
  const submit = $('#form-submit');
  if (!form) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const name = $('#form-name').value.trim();
    const email = $('#form-email').value.trim();
    const message = $('#form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields.');
      return;
    }
    if (!$('#form-email').checkValidity()) {
      showToast('Please enter a valid email address.');
      return;
    }

    // Option A: send to a configured endpoint
    if (CONTACT_ENDPOINT) {
      submit.disabled = true;
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast('Thank you! Your message has been sent.');
        form.reset();
      } catch (err) {
        showToast('Could not send your message. Please email me directly.');
      } finally {
        submit.disabled = false;
      }
      return;
    }

    // Option B (default, no backend): open a pre-filled email
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n- ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    showToast('Opening your email app to send the message.');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   5. START
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();

  initTheme();
  initMobileMenu();
  initActiveNavLink();
  initProjectFilters();
  initHeroTilt();
  initCopyButtons();
  initContactForm();
});
