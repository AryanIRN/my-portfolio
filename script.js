// === CURSOR ===
const cursor = document.createElement('div');
cursor.className = 'cursor';
const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursor);
document.body.appendChild(cursorRing);
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 60);
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// === MOBILE MENU ===
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => navMobile.classList.toggle('open'));
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMobile.classList.remove('open')));

// === SCRAMBLE EFFECT ===
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$';
function scramble(el, target) {
  let iter = 0;
  const interval = setInterval(() => {
    el.textContent = target.split('').map((c, i) => {
      if (i < iter) return target[i];
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (iter >= target.length) clearInterval(interval);
    iter += 0.5;
  }, 40);
}
const firstEl = document.getElementById('firstName');
const lastEl = document.getElementById('lastName');
firstEl.addEventListener('mouseenter', () => scramble(firstEl, 'ARYAN'));
lastEl.addEventListener('mouseenter', () => scramble(lastEl, 'IMANIPOUR'));

// === TERMINAL ===
const terminalLines = [
  { type: 'prompt', text: 'whoami' },
  { type: 'output', text: 'aryan.imanipour // security-analyst' },
  { type: 'prompt', text: 'cat skills.txt' },
  { type: 'output', text: '> Network Infrastructure' },
  { type: 'output', text: '> Encryption & EKM' },
  { type: 'output', text: '> Cloud Security' },
  { type: 'output', text: '> Risk Management' },
  { type: 'prompt', text: 'cat mission.txt' },
  { type: 'output', text: 'Security is not a feature.' },
  { type: 'output', text: 'It is a foundation.' },
];

const termBody = document.getElementById('terminalBody');
let lineIdx = 0;
function typeNextLine() {
  if (lineIdx >= terminalLines.length) {
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    termBody.appendChild(cursor);
    return;
  }
  const line = terminalLines[lineIdx];
  const div = document.createElement('div');
  div.className = 'terminal-line';
  if (line.type === 'prompt') {
    div.innerHTML = `<span class="terminal-prompt">$ </span><span>${line.text}</span>`;
  } else {
    div.innerHTML = `<span class="terminal-output">${line.text}</span>`;
  }
  termBody.appendChild(div);
  lineIdx++;
  setTimeout(typeNextLine, line.type === 'prompt' ? 600 : 200);
}
setTimeout(typeNextLine, 800);

// === CLOCK ===
const clockEl = document.getElementById('clock');
function updateClock() {
  clockEl.textContent = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}
updateClock();
setInterval(updateClock, 1000);

// === COPY EMAIL ===
function copyEmail() {
  navigator.clipboard.writeText('contact@imanipour.nl');
  const btn = document.getElementById('copyBtn');
  const txt = document.getElementById('copyText');
  txt.textContent = 'ADDRESS SECURED';
  btn.style.borderColor = 'rgba(59,130,246,0.5)';
  setTimeout(() => {
    txt.textContent = 'COPY_EMAIL_ADDRESS';
    btn.style.borderColor = '';
  }, 2000);
}
window.copyEmail = copyEmail;

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-words, .edu-card, .cert-card, .project-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// === INFINITE CAROUSEL ===
const techSkills = [
  { name: 'Routers & Switches', color: '#60a5fa', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="8" rx="2"/><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M2 12h20"/><circle cx="6" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></svg>' },
  { name: 'Docker', color: '#22d3ee', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13a9 9 0 0 0 9 9 9 9 0 0 0 6.3-2.55"/><path d="m9 9 1 1"/><path d="m13 9 2 2"/><path d="m9 13 2 2"/><path d="m13 13 1 1"/><path d="m5 9 2 2"/><path d="m5 13 2 2"/><path d="M22 11c0 4-2 6-5.5 6H9s-5-2-5-6c0-5 5-6 5-6h7.5c3.5 0 5.5 2 5.5 6Z"/></svg>' },
  { name: 'Kubernetes', color: '#3b82f6', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="8" rx="2"/><path d="M2 12h20"/><circle cx="6" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></svg>' },
  { name: 'Linux', color: '#eab308', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>' },
  { name: 'MS SQL Server', color: '#f87171', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>' },
  { name: 'S3 Storage', color: '#f97316', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>' },
  { name: 'Python', color: '#93c5fd', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
  { name: 'PowerShell', color: '#818cf8', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>' },
  { name: 'Enterprise Backup', color: '#4ade80', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>' },
  { name: 'Zero Trust', color: '#c084fc', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { name: 'SecDevOps', color: '#60a5fa', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="11" height="11" x="11" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>' },
  { name: 'Risk Management', color: '#fbbf24', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>' },
  { name: 'EKM & Encryption', color: '#f59e0b', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>' },
  { name: 'High Availability', color: '#34d399', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
];

function buildCarouselItem(skill) {
  const div = document.createElement('div');
  div.className = 'carousel-item';
  div.innerHTML = `<span style="color:${skill.color}">${skill.icon}</span>${skill.name}`;
  return div;
}

function initCarousel(trackEl, skills, direction, speed) {
  // 4x duplicate for seamless looping
  const allItems = [...skills, ...skills, ...skills, ...skills];
  allItems.forEach(s => trackEl.appendChild(buildCarouselItem(s)));

  let pos = direction === -1 ? -(trackEl.scrollWidth / 4) : 0;
  let paused = false;
  let pauseTimer = null;
  let isDragging = false;
  let dragStart = 0;
  let posOnDrag = 0;

  function step() {
    if (!paused && !isDragging) {
      const singleSet = trackEl.scrollWidth / 4;
      pos += (speed * 0.016) * -direction;  // ~60fps target
      if (direction === 1 && pos <= -singleSet) pos += singleSet;
      if (direction === -1 && pos >= 0) pos -= singleSet;
      trackEl.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  function pauseFor2s() {
    paused = true;
    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(() => { paused = false; }, 2000);
  }

  trackEl.addEventListener('mouseenter', () => { paused = true; clearTimeout(pauseTimer); });
  trackEl.addEventListener('mouseleave', pauseFor2s);

  trackEl.addEventListener('mousedown', (e) => {
    isDragging = true; paused = true;
    dragStart = e.clientX; posOnDrag = pos;
    clearTimeout(pauseTimer);
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    pos = posOnDrag + (e.clientX - dragStart);
    trackEl.style.transform = `translateX(${pos}px)`;
  });
  window.addEventListener('mouseup', () => {
    if (isDragging) { isDragging = false; pauseFor2s(); }
  });

  // Touch
  trackEl.addEventListener('touchstart', (e) => {
    isDragging = true; paused = true;
    dragStart = e.touches[0].clientX; posOnDrag = pos;
    clearTimeout(pauseTimer);
  }, { passive: true });
  trackEl.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    pos = posOnDrag + (e.touches[0].clientX - dragStart);
    trackEl.style.transform = `translateX(${pos}px)`;
  }, { passive: true });
  trackEl.addEventListener('touchend', () => {
    isDragging = false; pauseFor2s();
  });
}

const half = Math.ceil(techSkills.length / 2);
const row1Skills = techSkills.slice(0, half);
const row2Skills = techSkills.slice(half);
initCarousel(document.getElementById('carouselRow1'), row1Skills, 1, 80);
initCarousel(document.getElementById('carouselRow2'), row2Skills, -1, 65);
