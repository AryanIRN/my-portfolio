/* ============================================================
   Aryan Imanipour · Portfolio interactions (vanilla JS)
   ============================================================ */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ----------------------------------------------------------
     1. Skills grid (12 categories)
     ---------------------------------------------------------- */
  const SKILLS = [
    { name: "Network & Infrastructure Architecture", sub: "Design · HA · Routing", icon: "network" },
    { name: "Cloud & Containerization", sub: "Docker · Kubernetes", icon: "box" },
    { name: "Windows Server & Active Directory", sub: "Identity · GPO · DNS", icon: "server" },
    { name: "Linux System Administration", sub: "Shell · Hardening", icon: "terminal" },
    { name: "Enterprise Security & Risk Management", sub: "Threats · Controls", icon: "shield" },
    { name: "SecDevOps & CI/CD Tooling", sub: "Pipelines · Security by Design", icon: "git" },
    { name: "Log Management & Routing", sub: "SIEM · Object Storage", icon: "activity" },
    { name: "Vulnerability Research & Auditing", sub: "Pentest · Prioritering", icon: "search" },
    { name: "Scripting & Automation", sub: "PowerShell · Python", icon: "code" },
    { name: "Database Management & SQL", sub: "MS SQL · Modeling", icon: "database" },
    { name: "IT Service Management", sub: "ITSM · SLA", icon: "layers" },
    { name: "Identity & Access Management", sub: "IAM · Zero Trust", icon: "key" },
  ];

  // Minimal lucide-style icon set (24x24, stroke).
  const ICONS = {
    network: '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M12 12l-5 4M12 12l5 4"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    server: '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><line x1="6" y1="7" x2="6.01" y2="7"/><line x1="6" y1="17" x2="6.01" y2="17"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    git: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
  };

  const grid = $("#skillsGrid");
  if (grid) {
    grid.innerHTML = SKILLS.map((s) => `
      <div class="skill reveal" tabindex="0">
        <div class="skill__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[s.icon] || ICONS.shield}</svg>
        </div>
        <div class="skill__name">${s.name}</div>
        <div class="skill__sub">${s.sub}</div>
      </div>`).join("");

    // Spotlight that follows the cursor inside each card.
    if (finePointer) {
      grid.addEventListener("pointermove", (e) => {
        const card = e.target.closest(".skill");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }
  }

  /* ----------------------------------------------------------
     2. Reveal on scroll
     ---------------------------------------------------------- */
  const revealEls = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------
     3. Scroll progress bar + nav background
     ---------------------------------------------------------- */
  const progress = $(".scroll-progress");
  const nav = $("#nav");
  let ticking = false;
  const onScroll = () => {
    const st = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${h > 0 ? (st / h) * 100 : 0}%`;
    if (nav) nav.classList.toggle("is-scrolled", st > 24);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     4. Active nav link
     ---------------------------------------------------------- */
  const navLinks = $$("[data-nav]");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) =>
            a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ----------------------------------------------------------
     5. Mobile menu
     ---------------------------------------------------------- */
  const toggle = $("#navToggle");
  const menu = $("#mobileMenu");
  if (toggle && menu) {
    const setMenu = (open) => {
      toggle.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    };
    toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
    $$("[data-nav-mobile]", menu).forEach((a) =>
      a.addEventListener("click", () => setMenu(false)));
  }

  /* ----------------------------------------------------------
     6. Text scramble (hero name): on load + on hover
     ---------------------------------------------------------- */
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&_<>/\\";
  function scramble(el) {
    if (prefersReduced) return;
    const target = el.dataset.text || el.textContent;
    let frame = 0;
    const queue = [];
    for (let i = 0; i < target.length; i++) {
      const start = Math.floor(Math.random() * 12);
      const end = start + Math.floor(Math.random() * 14) + 6;
      queue.push({ char: target[i], start, end, rnd: "" });
    }
    let raf;
    const run = () => {
      let out = "", done = 0;
      for (const q of queue) {
        if (frame >= q.end) { done++; out += q.char; }
        else if (frame >= q.start) {
          if (!q.rnd || Math.random() < 0.28) q.rnd = CHARS[Math.floor(Math.random() * CHARS.length)];
          out += `<span class="scramble-glitch">${q.rnd}</span>`;
        } else { out += q.char === " " ? " " : ""; }
      }
      el.innerHTML = out;
      if (done === queue.length) { el.textContent = target; cancelAnimationFrame(raf); return; }
      frame++;
      raf = requestAnimationFrame(run);
    };
    run();
  }
  $$(".scramble").forEach((el, i) => {
    setTimeout(() => scramble(el), 120 + i * 130);
    el.addEventListener("mouseenter", () => scramble(el));
  });

  /* ----------------------------------------------------------
     7. Custom cursor (fine pointer only)
     ---------------------------------------------------------- */
  if (finePointer && !prefersReduced) {
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    if (dot && ring) {
      document.body.classList.add("cursor-ready");
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let rx = mx, ry = my;
      window.addEventListener("pointermove", (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }, { passive: true });
      const loop = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
      };
      loop();
      const hoverSel = "a, button, [data-magnetic], .skill, .project, .contact__link";
      document.addEventListener("pointerover", (e) => {
        if (e.target.closest(hoverSel)) ring.classList.add("is-hover");
      });
      document.addEventListener("pointerout", (e) => {
        if (e.target.closest(hoverSel)) ring.classList.remove("is-hover");
      });
    }
  }

  /* ----------------------------------------------------------
     8. 3D tilt on project cards (fine pointer only)
     ---------------------------------------------------------- */
  if (finePointer && !prefersReduced) {
    $$("[data-tilt]").forEach((card) => {
      const MAX = 5; // degrees, subtle
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(1100px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ----------------------------------------------------------
     9. Magnetic buttons (fine pointer only)
     ---------------------------------------------------------- */
  if (finePointer && !prefersReduced) {
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ----------------------------------------------------------
     10. Toast helper
     ---------------------------------------------------------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2400);
  }

  /* ----------------------------------------------------------
     11. Copy e-mail
     ---------------------------------------------------------- */
  const EMAIL = "aryanimanipours@gmail.com";
  const copyBtn = $("#copyEmail");
  const copyLabel = $("#copyEmailLabel");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
      } catch {
        // Fallback for older / non-secure contexts
        const ta = document.createElement("textarea");
        ta.value = EMAIL; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch {}
        document.body.removeChild(ta);
      }
      if (copyLabel) {
        const orig = copyLabel.textContent;
        copyLabel.textContent = "Gekopieerd ✓";
        setTimeout(() => { copyLabel.textContent = orig; }, 2000);
      }
      toast(`${EMAIL} gekopieerd`);
    });
  }

  /* ----------------------------------------------------------
     12. Live clock + year
     ---------------------------------------------------------- */
  const clock = $("#clock");
  const tick = () => {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
  };
  tick(); setInterval(tick, 30000);
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------
     13. CV download: lazy-load jsPDF on click, build vector PDF
     ---------------------------------------------------------- */
  const cvBtn = $("#downloadCv");
  let jsPdfPromise = null;
  function loadJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
    if (jsPdfPromise) return jsPdfPromise;
    jsPdfPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = () => resolve(window.jspdf.jsPDF);
      s.onerror = () => reject(new Error("jsPDF kon niet geladen worden"));
      document.head.appendChild(s);
    });
    return jsPdfPromise;
  }

  function buildCV(jsPDF) {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();   // 595
    const M = 48;                                  // margin
    const CW = W - M * 2;                           // content width
    let y = M;

    const BLUE = [59, 130, 246];
    const DARK = [17, 24, 39];
    const GRAY = [90, 99, 112];

    const para = (str, size, color, lineH) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(...(color || GRAY));
      const lines = doc.splitTextToSize(str, CW);
      lines.forEach((ln) => { doc.text(ln, M, y); y += lineH || size + 3; });
    };
    const heading = (str) => {
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...DARK);
      doc.text(str.toUpperCase(), M, y);
      y += 7;
      doc.setDrawColor(...BLUE);
      doc.setLineWidth(1.4);
      doc.line(M, y, M + 34, y);
      doc.setDrawColor(225, 228, 233);
      doc.setLineWidth(0.6);
      doc.line(M + 40, y - 3, W - M, y - 3);
      y += 14;
    };

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(...DARK);
    doc.text("ARYAN IMANIPOUR", M, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...BLUE);
    doc.text("Infrastructure & Security Management", M, y);
    y += 16;
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text("aryanimanipours@gmail.com   |   linkedin.com/in/aryan-imanipour   |   Nederland", M, y);
    y += 8;
    doc.setDrawColor(...DARK);
    doc.setLineWidth(1.2);
    doc.line(M, y, W - M, y);
    y += 6;

    // Profiel
    heading("Profiel");
    para("Gedreven, 21-jarige IT'er met focus op infrastructuur, security en kostenoptimalisatie. Bewezen in het veilig en efficient inrichten van complexe infrastructuur via strategisch advies en procesverbetering. Combineert technische diepgang met een zakelijke blik op veiligheid. Start oktober 2026 als trainee Cyber Security bij het Kadaster.", 10, GRAY, 14);

    // Opleiding
    heading("Opleiding");
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(...DARK);
    doc.text("HBO-ICT, Infrastructure & Security Management", M, y);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...GRAY);
    doc.text("Bezig met afstuderen", W - M, y, { align: "right" });
    y += 14;
    doc.setTextColor(...BLUE); doc.setFontSize(9);
    doc.text("Hogeschool van Arnhem en Nijmegen (HAN)", M, y);
    y += 14;
    para("Focus op het ontwerpen, beveiligen en beheren van complexe infrastructuren: Cloud/DevOps & Security, enterprise netwerken (High Availability), penetratietesten & auditing en Security by Design / SecDevOps.", 9.5, GRAY, 13);

    // Projecten
    heading("Uitgelichte projecten");
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); doc.setTextColor(...DARK);
    doc.text("Adviesrapport Back-up Security (Belastingdienst)", M, y); y += 13;
    para("Strategisch en technisch adviesrapport ter voorkoming van ongeautoriseerde toegang tot back-updata. Diepgaande analyse met technische en procesmatige oplossingen; meerdere uitgewerkte scenario's met impact-analyses.", 9.5, GRAY, 13);
    y += 4;
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); doc.setTextColor(...DARK);
    doc.text("Enterprise Log Routing & Kostenoptimalisatie", M, y); y += 13;
    para("Herontwerp van de log-infrastructuur met een routeringslaag tussen bron en analyseplatform: alle logs naar goedkope objectopslag (archief), alleen beveiligingsincidenten naar het SIEM/SOC. Resultaat: kostenbesparing van een factor 17, volledige compliance en scherpere security-alerting.", 9.5, GRAY, 13);

    // Skills
    heading("Skills");
    const cols = 2, colW = CW / cols;
    doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(...DARK);
    SKILLS.forEach((s, i) => {
      const col = i % cols;
      const x = M + col * colW;
      if (col === 0 && i > 0) y += 14;
      doc.setTextColor(...BLUE);
      doc.text("-", x, y);
      doc.setTextColor(...DARK);
      doc.text(s.name, x + 9, y, { maxWidth: colW - 14 });
    });
    y += 18;

    // Footer
    doc.setDrawColor(225, 228, 233); doc.setLineWidth(0.6);
    doc.line(M, y, W - M, y); y += 14;
    doc.setFont("helvetica", "italic"); doc.setFontSize(9); doc.setTextColor(...GRAY);
    doc.text('"Security is een grote puzzel. En die los ik graag op."', M, y);

    doc.save("Aryan_Imanipour_CV.pdf");
  }

  if (cvBtn) {
    cvBtn.addEventListener("click", async () => {
      const label = cvBtn.querySelector(".btn__label");
      const orig = label ? label.textContent : "";
      if (label) label.textContent = "Genereren…";
      cvBtn.disabled = true;
      try {
        const jsPDF = await loadJsPDF();
        buildCV(jsPDF);
        toast("CV gedownload");
      } catch (err) {
        console.error(err);
        toast("CV genereren mislukt, probeer opnieuw");
      } finally {
        if (label) label.textContent = orig;
        cvBtn.disabled = false;
      }
    });
  }
})();
