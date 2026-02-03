// ===== Init libs =====
AOS.init({ duration: 650, once: true });

// ===== DOM refs =====
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("mobileDrawer");
const drawerClose = document.getElementById("drawerClose");
const progressBar = document.querySelector(".scroll-progress__bar");
const navLinks = Array.from(
  document.querySelectorAll(".nav-links .nav-link, .drawer-links .drawer-link")
);
const revealElements = Array.from(document.querySelectorAll(".reveal"));
const sectionIds = ["#intro", "#products", "#info", "#packages", "#gallery", "#contact"];
const sections = sectionIds
  .map((id) => document.querySelector(id))
  .filter(Boolean);

function updateActiveLink(id) {
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === id;
    link.classList.toggle("active", isMatch);
    if (isMatch) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// ===== Drawer / Menu =====
function openDrawer() {
  drawer?.classList.add("open");
  drawer?.setAttribute("aria-hidden", "false");
  menuBtn?.classList.add("is-open");
  menuBtn?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawer?.classList.remove("open");
  drawer?.setAttribute("aria-hidden", "true");
  menuBtn?.classList.remove("is-open");
  menuBtn?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

menuBtn?.addEventListener("click", () => {
  const isOpen = menuBtn.classList.contains("is-open");
  isOpen ? closeDrawer() : openDrawer();
});

drawerClose?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e) => {
  if (e.target === drawer) closeDrawer();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

document.querySelectorAll(".drawer-link").forEach((a) => {
  a.addEventListener("click", () => closeDrawer());
});

// ===== Smooth scroll =====
function smoothScrollTo(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      smoothScrollTo(href);
      history.replaceState(null, "", href);
    }
  });
});

// ===== Scroll progress =====
const updateScrollProgress = () => {
  if (!progressBar) return;
  const scrollEl = document.scrollingElement || document.documentElement;
  const totalHeight = scrollEl.scrollHeight - window.innerHeight;
  const progress = totalHeight > 0 ? scrollEl.scrollTop / totalHeight : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
};

let progressFrame;
const requestProgressUpdate = () => {
  if (progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    updateScrollProgress();
    progressFrame = null;
  });
};

window.addEventListener("scroll", requestProgressUpdate, { passive: true });
window.addEventListener("resize", requestProgressUpdate, { passive: true });
updateScrollProgress();

// ===== Reveal animation =====
if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

// ===== Section highlight =====
if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveLink(`#${entry.target.id}`);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0.25 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
  updateActiveLink(sectionIds[0]);
}

// ===== Button ripple =====
document.addEventListener("pointerdown", (event) => {
  const btn = event.target.closest(".btn");
  if (!btn || btn.disabled) return;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
});

// ===== Demo data (customize here easily) =====
const products = [
  {
    code: "BR-V1",
    type: "VILLA",
    title: "Lake View Villa",
    desc: "Private villa with sunrise view + breakfast included.",
    price: 4200,
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "BR-R2",
    type: "ROOM",
    title: "Forest Room",
    desc: "Cozy stay surrounded by jungle vibes — quiet & clean.",
    price: 1800,
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "BR-DAY",
    type: "DAYPASS",
    title: "Day Pass (Pool + Cafe)",
    desc: "Pool access + cafe credit included. Great for locals/weekend.",
    price: 499,
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "BR-VH",
    type: "VILLA",
    title: "Honeymoon Villa",
    desc: "Romantic setup + private deck. Upgrade decor on request.",
    price: 5200,
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
];

const packages = [
  {
    badge: "BEST OFFER",
    title: "2 Days 1 Night — Lake Explorer",
    desc: "Boat cruise vibe + stay + easy schedule. Perfect for couples.",
    price: 2900,
    img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "POPULAR",
    title: "3 Days 2 Nights — Jungle + Lake",
    desc: "Jungle walk + lake day + 2 nights stay. Balanced adventure & relax.",
    price: 4500,
    img: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "FAMILY",
    title: "Family Pack — Easy & Fun",
    desc: "Comfort stay + flexible activities + family-friendly timing.",
    price: 3800,
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501117716987-c8e1ecb210ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
];

// ===== Render helpers =====
const money = (n) => new Intl.NumberFormat("th-TH").format(n);

function productCard(p) {
  return `
    <article class="cardx">
      <div class="cardx-media">
        <img src="${p.img}" alt="${p.title}">
        <div class="cardx-tag">${p.type}</div>
        <div class="cardx-price">THB ${money(p.price)}</div>
      </div>
      <div class="cardx-body">
        <div class="cardx-code">${p.code}</div>
        <h3 class="cardx-title">${p.title}</h3>
        <p class="cardx-desc">${p.desc}</p>
        <div class="cardx-actions">
          <button class="btn btn-outline-light btn-mini" type="button">Details</button>
          <a class="btn btn-danger btn-mini" href="#contact">Book</a>
        </div>
      </div>
    </article>
  `;
}

function packageCard(p) {
  return `
    <div class="col-12 col-lg-4">
      <div class="img-card">
        <img src="${p.img}" alt="${p.title}">
        <div class="img-overlay">
          <div class="img-overlay-title">${p.badge} • THB ${money(p.price)}</div>
          <div class="img-overlay-sub">${p.title}</div>
        </div>
      </div>
      <div class="glass-card p-3 mt-2">
        <div class="fw-bold">${p.title}</div>
        <div class="text-muted-soft small mt-1">${p.desc}</div>
        <div class="d-flex gap-2 mt-3 flex-wrap">
          <a class="btn btn-danger fw-bold" href="#contact">Reserve</a>
          <a class="btn btn-outline-light fw-bold" href="#gallery">See Photos</a>
        </div>
      </div>
    </div>
  `;
}

function galleryItem(url, i) {
  return `
    <a class="g-item glightbox" href="${url}" data-gallery="resort" data-title="Gallery ${i + 1}">
      <img src="${url}" alt="Gallery ${i + 1}">
    </a>
  `;
}

// ===== Inject content =====
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  productGrid.innerHTML = products.map(productCard).join("");
}

const packageGrid = document.getElementById("packageGrid");
if (packageGrid) {
  packageGrid.innerHTML = packages.map(packageCard).join("");
}

const galleryGrid = document.getElementById("galleryGrid");
if (galleryGrid) {
  galleryGrid.innerHTML = gallery.map(galleryItem).join("");
}

// init lightbox after DOM injection
GLightbox({ selector: ".glightbox" });

// demo send
document.getElementById("fakeSend")?.addEventListener("click", () => {
  alert("✅ Sent! (demo) Later connect to your API / Line OA / WhatsApp.");
});

// year
document.getElementById("year").textContent = new Date().getFullYear();
