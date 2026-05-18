window.addEventListener('DOMContentLoaded', () => {

  // ── Custom cursor ──────────────────────────────────────────────
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, li, button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.5)');
    el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
  });

  // ── Nav active + scroll ────────────────────────────────────────
  const navItems = document.querySelectorAll('.nav-links li');
  const sections = document.querySelectorAll('section[id]');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.target;
      const target = document.getElementById(id);
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navItems.forEach(li => {
      li.classList.toggle('active', li.dataset.target === current);
    });
  });

  // ── Intersection observer: reveal ──────────────────────────────
  const revealEls = document.querySelectorAll(
    '.cert-card, .project-row, .stat, .skill-item, .contact-card'
  );

  revealEls.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));

  // ── Skill bars animate on scroll ──────────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); skillObserver.unobserve(e.target); }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(bar => skillObserver.observe(bar));

});
