/**
 * main.js — Renders content from data.js and wires up interaction:
 * mobile drawer, scroll-spy navigation, CV preview dialog, contact form validation.
 * Depends on globals declared in data.js (loaded first via `defer`, in order).
 */
(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Helpers
   * ------------------------------------------------------------------ */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

  /** Only allow http(s) and mailto links through; anything else becomes an inert "#". */
  const safeUrl = (url) => {
    try {
      const parsed = new URL(url, window.location.href);
      return ['http:', 'https:', 'mailto:'].includes(parsed.protocol) ? url : '#';
    } catch {
      return '#';
    }
  };

  const ICONS = {
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
  };

  const icon = (name, size = 20) =>
    `<svg aria-hidden="true" focusable="false" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;

  const newTabHint = '<span class="visually-hidden"> (opens in a new tab)</span>';

  const mount = (selector, html) => {
    const el = $(selector);
    if (el) el.innerHTML = html;
    return el;
  };

  const emptyState = (message) => `<p class="empty-state">${esc(message)}</p>`;

  /* ------------------------------------------------------------------ *
   * Renderers (all content comes from data.js)
   * ------------------------------------------------------------------ */
  const renderSocials = () => {
    const links = profileData.socials
      .map((s) => {
        const external = !s.url.startsWith('mailto:');
        return `<a class="social-link" href="${esc(safeUrl(s.url))}" aria-label="${esc(s.label)}" title="${esc(s.label)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${icon(s.icon, 20)}</a>`;
      })
      .join('');
    $$('[data-socials]').forEach((el) => { el.innerHTML = links; });
  };

  const renderAbout = () => {
    mount('#aboutStats', aboutData.stats
      .map((s) => `<div class="stat"><div class="stat-value">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`)
      .join(''));
    mount('#aboutDirection', aboutData.direction.map((d) => `<li>${esc(d)}</li>`).join(''));
  };

  const projectCard = (p) => {
    const live = p.liveUrl
      ? `<a class="btn btn--primary btn--sm" href="${esc(safeUrl(p.liveUrl))}" target="_blank" rel="noopener noreferrer"><span>Visit live site</span>${icon('external', 14)}${newTabHint}</a>`
      : '';
    const repo = p.githubUrl
      ? `<a class="btn btn--ghost btn--sm" href="${esc(safeUrl(p.githubUrl))}" target="_blank" rel="noopener noreferrer"><span>View source</span>${icon('github', 14)}${newTabHint}</a>`
      : '';
    const cover = p.image
      ? `<img class="project-cover" src="${esc(p.image)}" alt="${esc(p.imageAlt || '')}" width="800" height="350" loading="lazy" decoding="async">`
      : '';

    return `<article class="card project-card" aria-labelledby="${esc(p.id)}-title">
      ${cover}
      <div class="project-head">
        <span class="chip">${esc(p.category)}</span>
        <h3 class="project-title" id="${esc(p.id)}-title">${esc(p.title)}</h3>
      </div>
      <div class="project-body">
        <p class="project-desc">${esc(p.description)}</p>
        <h4 class="features-title">Key features</h4>
        <ul class="check-list">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <ul class="tech-stack" aria-label="Technologies used">${p.technologies.map((t) => `<li class="tech-pill">${esc(t)}</li>`).join('')}</ul>
        <div class="project-actions">${live}${repo}</div>
      </div>
    </article>`;
  };

  const renderProjects = () =>
    mount('#projectsGrid', projectsData.length ? projectsData.map(projectCard).join('') : emptyState('Projects are coming soon.'));

  const skillCard = (group) => `<article class="card skill-card" aria-labelledby="skill-${esc(group.id)}">
      <div class="icon-tile">${icon(group.icon, 24)}</div>
      <h3 class="skill-title" id="skill-${esc(group.id)}">${esc(group.category)}</h3>
      <ul class="skill-list">${group.items
        .map((i) => `<li class="skill-item"><span>${esc(i.name)}</span><span class="skill-level">${esc(i.level)}</span></li>`)
        .join('')}</ul>
    </article>`;

  const renderSkills = () =>
    mount('#skillsGrid', skillsData.length ? skillsData.map(skillCard).join('') : emptyState('Skills are coming soon.'));

  const experienceItem = (e) => `<li class="timeline-item">
      <span class="timeline-dot" aria-hidden="true"></span>
      <article class="card timeline-card">
        <div class="timeline-top">
          <div>
            <h3 class="timeline-role">${esc(e.role)}</h3>
            <p class="timeline-org">${esc(e.organization)}</p>
          </div>
          <span class="timeline-date">${esc(e.date)}</span>
        </div>
        <p class="timeline-desc">${esc(e.description)}</p>
        <ul class="bullet-list">${e.achievements.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      </article>
    </li>`;

  const renderExperience = () =>
    mount('#experienceList', experienceData.length ? experienceData.map(experienceItem).join('') : emptyState('Experience is coming soon.'));

  const certificateCard = (c) => {
    const categoryBadge = c.category ? `<span class="chip">${esc(c.category)}</span>` : '';
    const dateText = c.date ? (c.date.startsWith('[') ? esc(c.date) : `Issued ${esc(c.date)}`) : '';
    const link = c.credentialUrl
      ? `<a class="cert-link" href="${esc(safeUrl(c.credentialUrl))}" target="_blank" rel="noopener noreferrer"><span>Verify credential</span>${icon('arrow', 14)}${newTabHint}</a>`
      : '';
    return `<article class="card cert-card">
      <div class="cert-top">
        <div class="icon-tile">${icon('award', 22)}</div>
        ${categoryBadge}
      </div>
      <h3 class="cert-title">${esc(c.name)}</h3>
      <p class="cert-issuer">${esc(c.issuer)}</p>
      ${dateText ? `<p class="cert-date">${dateText}</p>` : ''}
      ${link}
    </article>`;
  };

  const renderCertificates = () =>
    mount('#certificatesGrid', certificatesData.length ? certificatesData.map(certificateCard).join('') : emptyState('Certificates and credentials will be added here as coursework and certifications are completed.'));

  const renderContact = () => {
    mount('#contactList', profileData.socials
      .map((s) => {
        const external = !s.url.startsWith('mailto:');
        return `<li class="contact-item">
          <span class="icon-tile">${icon(s.icon, 20)}</span>
          <div>
            <div class="contact-label">${esc(s.label)}</div>
            <div class="contact-value"><a href="${esc(safeUrl(s.url))}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(s.display)}</a></div>
          </div>
        </li>`;
      })
      .join(''));

    const location = $('#contactLocation');
    if (location) location.textContent = profileData.location;
  };

  const renderCv = () => {
    const download = $('#downloadCvBtn');
    const modalDownload = $('#cvDialogDownload');
    [download, modalDownload].forEach((a) => a && a.setAttribute('href', profileData.cvFile));

    mount('#cvDialogBody', `
      <div class="cv-block">
        <h4>Profile</h4>
        <p><strong>${esc(profileData.name)}</strong> (${esc(profileData.nickname)}) &middot; ${esc(profileData.title)}</p>
        <p>${esc(cvData.summary)}</p>
      </div>
      <div class="cv-block">
        <h4>Education</h4>
        <ul>${cvData.education.map((e) => `<li><strong>${esc(e.title)}</strong>, ${esc(e.place)} (${esc(e.date)})</li>`).join('')}</ul>
      </div>
      <div class="cv-block">
        <h4>Highlights</h4>
        <ul>${cvData.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      </div>
      <div class="cv-block">
        <h4>Contact</h4>
        <p>${esc(profileData.email)} &middot; ${esc(profileData.location)}</p>
      </div>`);
  };

  /* ------------------------------------------------------------------ *
   * Mobile navigation drawer
   * ------------------------------------------------------------------ */
  const initDrawer = () => {
    const drawer = $('#mobileDrawer');
    const overlay = $('#drawerOverlay');
    const openBtn = $('#hamburgerBtn');
    const closeBtn = $('#closeDrawerBtn');
    if (!drawer || !overlay || !openBtn || !closeBtn) return;

    let returnFocusTo = null;

    const setOpen = (open, { restoreFocus = true } = {}) => {
      drawer.classList.toggle('is-open', open);
      overlay.classList.toggle('is-open', open);
      drawer.toggleAttribute('inert', !open);
      document.body.classList.toggle('no-scroll', open);
      openBtn.setAttribute('aria-expanded', String(open));
      openBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');

      if (open) {
        returnFocusTo = document.activeElement;
        closeBtn.focus();
      } else if (restoreFocus && returnFocusTo instanceof HTMLElement) {
        returnFocusTo.focus();
      }
    };

    openBtn.addEventListener('click', () => setOpen(true));
    closeBtn.addEventListener('click', () => setOpen(false));
    overlay.addEventListener('click', () => setOpen(false));
    $$('a', drawer).forEach((link) => link.addEventListener('click', () => setOpen(false, { restoreFocus: false })));

    document.addEventListener('keydown', (event) => {
      if (!drawer.classList.contains('is-open')) return;

      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key === 'Tab') {
        // Keep keyboard focus inside the open drawer
        const focusable = $$('a[href], button:not([disabled])', drawer);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Close if the viewport grows into the desktop layout
    if (window.matchMedia) {
      window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
        if (e.matches && drawer.classList.contains('is-open')) setOpen(false, { restoreFocus: false });
      });
    }
  };

  /* ------------------------------------------------------------------ *
   * Scroll-spy: highlight the nav link for the section in view
   * ------------------------------------------------------------------ */
  const initScrollSpy = () => {
    const sections = $$('main section[id]');
    const links = $$('.desktop-nav .nav-link, .drawer-nav .nav-link');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const setActive = (id) => {
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    setActive('hero');
  };

  /* ------------------------------------------------------------------ *
   * CV preview dialog
   * ------------------------------------------------------------------ */
  const initCvDialog = () => {
    const dialog = $('#cvDialog');
    const openBtn = $('#previewCvBtn');
    const closeBtn = $('#closeCvBtn');
    if (!dialog || !openBtn) return;

    if (typeof dialog.showModal !== 'function') {
      // Very old browsers: fall back to opening the PDF directly
      openBtn.addEventListener('click', () => window.open(profileData.cvFile, '_blank', 'noopener'));
      return;
    }

    openBtn.addEventListener('click', () => dialog.showModal());
    if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());
    // Clicks on the ::backdrop report the dialog itself as the target
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  };

  /* ------------------------------------------------------------------ *
   * Contact form: client-side validation
   * ------------------------------------------------------------------ */
  const initContactForm = () => {
    const form = $('#contactForm');
    if (!form) return;

    const status = $('#formStatus');
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const fields = {
      name: {
        input: $('#userName'),
        error: $('#nameError'),
        validate: (v) => (v.length >= 2 ? '' : 'Enter your name (at least 2 characters).')
      },
      email: {
        input: $('#userEmail'),
        error: $('#emailError'),
        validate: (v) => (EMAIL_PATTERN.test(v) ? '' : 'Enter a valid email address, like name@example.com.')
      },
      message: {
        input: $('#userMessage'),
        error: $('#messageError'),
        validate: (v) => {
          if (v.length < 10) return 'Write at least 10 characters so I know how to help.';
          if (v.length > 2000) return 'Keep your message under 2,000 characters.';
          return '';
        }
      }
    };

    const check = (field) => {
      const message = field.validate(field.input.value.trim());
      field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
      field.error.textContent = message;
      field.error.classList.toggle('is-visible', Boolean(message));
      return !message;
    };

    let submitted = false;

    Object.values(fields).forEach((field) => {
      field.input.addEventListener('blur', () => { if (field.input.value || submitted) check(field); });
      field.input.addEventListener('input', () => { if (submitted) check(field); });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitted = true;
      status.classList.remove('is-visible');

      const results = Object.values(fields).map((f) => ({ field: f, ok: check(f) }));
      const firstInvalid = results.find((r) => !r.ok);
      if (firstInvalid) {
        firstInvalid.field.input.focus();
        return;
      }

      // No backend: hand the message to the visitor's email app, addressed to me.
      const name = fields.name.input.value.trim();
      const email = fields.email.input.value.trim();
      const message = fields.message.input.value.trim();
      const subject = `Portfolio inquiry from ${name}`;
      const body = `${message}\n\n${name}\n${email}`;
      const mailto = `mailto:${profileData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      status.textContent = `Your email app should open with the message ready to send. If nothing opens, write to ${profileData.email}.`;
      status.classList.add('is-visible');
      window.location.href = mailto;

      form.reset();
      submitted = false;
      Object.values(fields).forEach((f) => f.input.setAttribute('aria-invalid', 'false'));
    });
  };

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */
  const init = () => {
    renderSocials();
    renderAbout();
    renderProjects();
    renderSkills();
    renderExperience();
    renderCertificates();
    renderContact();
    renderCv();

    initDrawer();
    initScrollSpy();
    initCvDialog();
    initContactForm();

    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
