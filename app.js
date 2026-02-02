// ===== Init libs =====
AOS.init({ duration: 650, once: true });

// ===== Drawer / Menu =====
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("mobileDrawer");
const drawerClose = document.getElementById("drawerClose");

function openDrawer(){
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  menuBtn.classList.add("is-open");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeDrawer(){
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  menuBtn.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

menuBtn?.addEventListener("click", () => {
  const isOpen = menuBtn.classList.contains("is-open");
  isOpen ? closeDrawer() : openDrawer();
});

drawerClose?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e) => {
  if(e.target === drawer) closeDrawer();
});

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeDrawer();
});

// Close drawer on link click
document.querySelectorAll(".drawer-link").forEach(a => {
  a.addEventListener("click", () => closeDrawer());
});

// ===== Smooth scroll =====
function smoothScrollTo(hash){
  const el = document.querySelector(hash);
  if(!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if(!href || href === "#") return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      smoothScrollTo(href);
      history.replaceState(null, "", href);
    }
  });
});

// ===== Active link highlight (desktop) =====
const sections = ["#intro","#products","#info","#packages","#gallery","#contact"]
  .map(id => document.querySelector(id))
  .filter(Boolean);

const desktopLinks = Array.from(document.querySelectorAll(".nav-links .nav-link"));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = "#" + entry.target.id;
      desktopLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

sections.forEach(s => io.observe(s));

// ===== Demo data (customize here easily) =====
const products = [
  {
    code: "BR-V1",
    type: "VILLA",
    title: "Lake View Villa",
    desc: "Private villa with sunrise view + breakfast included.",
    price: 4200,
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
  },
  {
    code: "BR-R2",
    type: "ROOM",
    title: "Forest Room",
    desc: "Cozy stay surrounded by jungle vibes — quiet & clean.",
    price: 1800,
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    code: "BR-DAY",
    type: "DAYPASS",
    title: "Day Pass (Pool + Cafe)",
    desc: "Pool access + cafe credit included. Great for locals/weekend.",
    price: 499,
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    code: "BR-VH",
    type: "VILLA",
    title: "Honeymoon Villa",
    desc: "Romantic setup + private deck. Upgrade decor on request.",
    price: 5200,
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
  }
];

const packages = [
  {
    badge: "BEST OFFER",
    title: "2 Days 1 Night — Lake Explorer",
    desc: "Boat cruise vibe + stay + easy schedule. Perfect for couples.",
    price: 2900,
    img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    badge: "POPULAR",
    title: "3 Days 2 Nights — Jungle + Lake",
    desc: "Jungle walk + lake day + 2 nights stay. Balanced adventure & relax.",
    price: 4500,
    img: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80"
  },
  {
    badge: "FAMILY",
    title: "Family Pack — Easy & Fun",
    desc: "Comfort stay + flexible activities + family-friendly timing.",
    price: 3800,
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"
  }
];

const gallery = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501117716987-c8e1ecb210ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
];

// ===== Render helpers =====
const money = (n) => new Intl.NumberFormat("th-TH").format(n);

function productCard(p){
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

function packageCard(p){
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

function galleryItem(url, i){
  return `
    <a class="g-item glightbox" href="${url}" data-gallery="resort" data-title="Gallery ${i+1}">
      <img src="${url}" alt="Gallery ${i+1}">
    </a>
  `;
}

// ===== Inject content =====
const productGrid = document.getElementById("productGrid");
if(productGrid){
  productGrid.innerHTML = products.map(productCard).join("");
}

const packageGrid = document.getElementById("packageGrid");
if(packageGrid){
  packageGrid.innerHTML = packages.map(packageCard).join("");
}

const galleryGrid = document.getElementById("galleryGrid");
if(galleryGrid){
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
