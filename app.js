/* ============================================================
   VELVETSTAGE — app.js  v3
   100 modelos · Login por rol · Galería · Promos · Admin CRUD
   ============================================================ */
'use strict';

/* ─── Usuarios / Login ──────────────────────────────────── */
const USERS = [
  { email:'admin@doncellas.mx',     pass:'admin123',   role:'admin',  name:'Administrador', redirect:'panel-admin.html' },
  { email:'valentina@doncellas.mx', pass:'modelo123',  role:'modelo', name:'Valentina R.',  redirect:'panel-modelo.html' },
  { email:'camila@doncellas.mx',    pass:'modelo123',  role:'modelo', name:'Camila V.',     redirect:'panel-modelo.html' },
  { email:'isabella@doncellas.mx',  pass:'modelo123',  role:'modelo', name:'Isabella M.',   redirect:'panel-modelo.html' },
];

function doLogin() {
  const email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
  const pass  = document.getElementById('loginPass')?.value;
  const errEl = document.getElementById('loginError');
  if (!email || !pass) return;
  const user = USERS.find(u => u.email === email && u.pass === pass);
  if (!user) {
    if (errEl) errEl.style.display = 'block';
    document.getElementById('loginPass').value = '';
    return;
  }
  if (errEl) errEl.style.display = 'none';
  showToast(`Bienvenida, ${user.name}`, 'success');
  setTimeout(() => { window.location.href = user.redirect; }, 800);
}

function fillLogin(email, pass) {
  const eEl = document.getElementById('loginEmail');
  const pEl = document.getElementById('loginPass');
  if (eEl) eEl.value = email;
  if (pEl) pEl.value = pass;
  const errEl = document.getElementById('loginError');
  if (errEl) errEl.style.display = 'none';
}

/* ─── Fotos Unsplash ────────────────────────────────────── */
const PHOTO_POOL = [
  'photo-1534528741775-53994a69daeb','photo-1524504388940-b1c1722653e1',
  'photo-1488426862026-3ee34a7d66df','photo-1529626455594-4ff0802cfb7e',
  'photo-1509967419530-da38b4704bc6','photo-1531746020798-e6953c6e8e04',
  'photo-1567532939604-b6b5b0db2604','photo-1517841905240-472988babdf9',
  'photo-1438761681033-6461ffad8d80','photo-1502323703975-b9c8f761e6e7',
  'photo-1500917293891-ef795e70e1f6','photo-1494790108755-2616b612b786',
  'photo-1544005313-94ddf0286df2', 'photo-1573497019940-1c28c88b4f3e',
  'photo-1580489944761-15a19d654956','photo-1508214751196-bcfd4ca60f91',
  'photo-1614204424926-197092de8a8a','photo-1596359732843-ea43cc3acbf8',
  'photo-1539571696357-5a69c17a67c6','photo-1504703395950-b89145a5425b',
  'photo-1519085360753-af0119f7cbe7','photo-1522337360788-8b13dee7a37e',
  'photo-1494783367193-149034c05e8f','photo-1515023115689-589c33041d3c',
  'photo-1487412720507-e7ab37603c6f',
];

function photoUrl(id, w=400, h=530) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&crop=face&auto=format&q=75`;
}

/* ─── Nombres / Zonas / Categorías ─────────────────────── */
const NAMES_F = [
  'Valentina','Camila','Isabella','Sofía','Renata','Mariana','Ximena','Daniela','Luisa','Andrea',
  'Paola','Natalia','Fernanda','Gabriela','Valeria','Ana Lucía','María José','Karla','Diana','Alejandra',
  'Claudia','Verónica','Patricia','Sandra','Mónica','Rebeca','Lorena','Susana','Elena','Beatriz',
  'Luciana','Cristina','Ariana','Stephanie','Michelle','Vanessa','Samantha','Paloma','Regina','Montserrat',
  'Itzel','Yolanda','Araceli','Esperanza','Rosario','Consuelo','Alicia','Teresa','Carmen','Pilar',
  'Nadia','Ivana','Tatiana','Katia','Olga','Iris','Vera','Zoe','Emma','Mia',
  'Luna','Abril','Violeta','Aurora','Celeste','Estrella','Coral','Jade','Amber','Ruby',
  'Jimena','Brenda','Nancy','Miriam','Viviana','Elisa','Claudia B.','Dafne','Ilse','Ofelia',
  'Ingrid','Astrid','Helga','Kirsten','Brigitte','Eliana','Romina','Florencia','Antonella','Catalina',
  'Marisol','Concepción','Guadalupe','Magdalena','Esmeralda','Ambar','Citlali','Xochitl','Tlalli','Yaretzi',
];
const SURNAMES    = ['R.','M.','V.','L.','G.','H.','F.','C.','T.','A.','P.','S.','B.','Z.','N.'];
const ZONES       = ['Zona Rosa','Providencia','Chapultepec','Tlaquepaque','Zapopan','Centro Histórico'];
const CATS        = ['Universitaria','Milf','Petite','Nalgona','Voluptuosa','Chichona','Extranjera','Jovencita','Fit','Natural','Tuneada','Chaparrita','Alta'];
const HAIR_COLORS = ['Castaño','Negro','Rubio','Castaño oscuro','Castaño claro','Rubio oscuro','Pelirrojo'];
const EYE_COLORS  = ['Café','Verde','Azul','Miel','Gris','Avellana'];
const SKIN_COLORS = ['Blanca','Morena clara','Morena','Trigueña','Canela'];
const ALL_SERVICES = ['Relaciones ilimitadas','Trato de novios','Oral con protección','Oral natural','Oral terminado','Tiro MHM','Tiro HMH','Anal'];
const NATIONALITIES = ['Mexicana','Colombiana','Argentina','Brasileña','Española','Venezolana','Cubana','Peruana'];
const TAG_POOL    = [
  'Universitaria','Milf','Petite','Nalgona','Voluptuosa','Chichona','Extranjera','Jovencita',
  'Fit','Natural','Tuneada','Chaparrita','Alta','VIP','Premium','Elite',
  'Tattoo','Cabello Largo','Rubia','Morena','Pelirroja','Yoga',
  'Bailarina','Bilingüe','Colombiana','Venezolana','Argentina','Brasileña',
];

/* ─── Pool de promos (8 plantillas) ────────────────────── */
const PROMO_POOL = [
  { badge:'20% OFF',         title:'Sesión fotográfica 20% off',           desc:'50 fotos editadas profesionalmente incluidas.',       discount:20, validUntil:'30 Abr 2026' },
  { badge:'2x1',             title:'2 horas al precio de 1',               desc:'Válido fines de semana. Reserva con anticipación.',   discount:50, validUntil:'31 May 2026' },
  { badge:'Paquete Evento',  title:'Paquete evento completo',              desc:'4 hrs + sesión foto + maquillaje incluido.',          discount:15, validUntil:'15 May 2026' },
  { badge:'30% OFF',         title:'30% en tu primera cita',               desc:'Oferta exclusiva para nuevos clientes.',              discount:30, validUntil:'31 May 2026' },
  { badge:'Precio Especial', title:'Tarifa de temporada reducida',         desc:'Precios especiales en sesiones de semana.',           discount:25, validUntil:'20 May 2026' },
  { badge:'Kit Lujo',        title:'Experiencia de lujo completa',         desc:'Cena + 3 hrs de acompañamiento + transporte.',        discount:10, validUntil:'30 Jun 2026' },
  { badge:'VIP Pass',        title:'Acceso VIP tarifa preferencial',       desc:'Membresía VIP con descuento especial de lanzamiento.',discount:35, validUntil:'31 May 2026' },
  { badge:'Flash Sale',      title:'Oferta relámpago — solo esta semana',  desc:'¡Descuento limitado, no te lo pierdas!',              discount:40, validUntil:'22 Abr 2026' },
];

/* Índices de modelos con promo (25 en total) */
const PROMO_INDICES = new Set([0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96]);

/* ─── RNG determinista ──────────────────────────────────── */
const _rng = (seed) => {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
};

/* ─── Generador de 100 modelos ──────────────────────────── */
function generateModels() {
  const models = [];
  for (let i = 0; i < 100; i++) {
    const r       = _rng(i * 997 + 13);
    const age     = 18 + Math.floor(r() * 18);
    const photoId = PHOTO_POOL[i % PHOTO_POOL.length];
    const photo2  = PHOTO_POOL[(i + 5)  % PHOTO_POOL.length];
    const photo3  = PHOTO_POOL[(i + 11) % PHOTO_POOL.length];

    const name  = NAMES_F[i] + ' ' + SURNAMES[i % SURNAMES.length];
    const zone  = ZONES[i % ZONES.length];
    const cat   = CATS[i % CATS.length];
    const rate  = [1500,1800,2000,2200,2500,2800,3000,3200,3500,4000,4500,5000,5500,6000,7000,8000][i % 16];
    const rating    = parseFloat((3.5 + r() * 1.5).toFixed(1));
    const reviews   = Math.floor(r() * 280) + 5;
    const citas     = Math.floor(r() * 500) + 20;
    const available = r() > 0.35;
    const featured  = i < 12;
    const isNew     = i >= 88;
    const height    = 158 + Math.floor(r() * 22);

    const hairColor   = HAIR_COLORS[i % HAIR_COLORS.length];
    const eyeColor    = EYE_COLORS[i % EYE_COLORS.length];
    const skinColor   = SKIN_COLORS[i % SKIN_COLORS.length];
    const waist       = 58 + Math.floor(r() * 15);
    const hips        = 86 + Math.floor(r() * 15);
    const bust        = 82 + Math.floor(r() * 15);
    const nationality = NATIONALITIES[i % NATIONALITIES.length];
    const services = {};
    const rSvc = _rng(i * 1997 + 101);
    rSvc(); rSvc(); rSvc(); rSvc(); /* warm-up: small seeds give near-zero on first calls */
    ALL_SERVICES.forEach(svc => {
      const active = rSvc() > 0.35;
      const extra  = active && rSvc() > 0.62;
      services[svc] = { si: active, extra };
    });

    const tags = [
      cat,
      ['VIP','Premium','Elite','Bilingüe','Tattoo','Yoga','Colombiana','Rubia','Morena','Bailarina'][i % 10],
      TAG_POOL[Math.floor(r() * TAG_POOL.length)],
    ];

    const promo = PROMO_INDICES.has(i) ? { ...PROMO_POOL[i % PROMO_POOL.length] } : null;

    models.push({
      id: i + 1, name, age, height, zone, cat, tags,
      rate, rating: Math.min(5, rating), reviews, citas,
      available, featured, isNew,
      img: photoUrl(photoId),
      photos: [photoUrl(photoId), photoUrl(photo2), photoUrl(photo3)],
      hasVideo: i % 7 === 0,
      hairColor, eyeColor, skinColor, waist, hips, bust, nationality,
      services,
      hidden: false,
      promo,
    });
  }
  return models;
}

let MODELS = generateModels();

/* ─── Categorías ────────────────────────────────────────── */
const CATEGORIES = [
  { name:'Universitaria', count:52, icon:'fa-graduation-cap', img: photoUrl(PHOTO_POOL[0],400,400),  desc:'Estudiantes universitarias con energía y frescura' },
  { name:'Milf',          count:45, icon:'fa-crown',          img: photoUrl(PHOTO_POOL[4],400,400),  desc:'Mujeres maduras con experiencia y sensualidad' },
  { name:'Petite',        count:38, icon:'fa-feather-alt',    img: photoUrl(PHOTO_POOL[1],400,400),  desc:'Pequeñas y encantadoras, con mucho carácter' },
  { name:'Nalgona',       count:48, icon:'fa-heart',          img: photoUrl(PHOTO_POOL[7],400,400),  desc:'Curvas prominentes que te dejarán sin aliento' },
  { name:'Voluptuosa',    count:42, icon:'fa-venus',          img: photoUrl(PHOTO_POOL[2],400,400),  desc:'Cuerpos llenos y sensuales para los que aman las curvas' },
  { name:'Chichona',      count:40, icon:'fa-fire',           img: photoUrl(PHOTO_POOL[5],400,400),  desc:'Pechos generosos y una presencia irresistible' },
  { name:'Extranjera',    count:28, icon:'fa-globe',          img: photoUrl(PHOTO_POOL[6],400,400),  desc:'Bellezas internacionales con acento exótico' },
  { name:'Jovencita',     count:56, icon:'fa-seedling',       img: photoUrl(PHOTO_POOL[3],400,400),  desc:'Mayores de 18 con toda la energía del mundo' },
  { name:'Fit',           count:35, icon:'fa-dumbbell',       img: photoUrl(PHOTO_POOL[8],400,400),  desc:'Cuerpos trabajados, tonificados y atléticos' },
  { name:'Natural',       count:32, icon:'fa-leaf',           img: photoUrl(PHOTO_POOL[9],400,400),  desc:'Sin retoques, belleza genuina y espontánea' },
  { name:'Tuneada',       count:24, icon:'fa-magic',          img: photoUrl(PHOTO_POOL[10],400,400), desc:'Con mejoras estéticas para una figura espectacular' },
  { name:'Chaparrita',    count:33, icon:'fa-compress-alt',   img: photoUrl(PHOTO_POOL[11],400,400), desc:'Pequeñas en talla, grandes en personalidad' },
  { name:'Alta',          count:27, icon:'fa-sort-amount-up', img: photoUrl(PHOTO_POOL[12],400,400), desc:'Esbeltas y de gran estatura con porte elegante' },
];

const ZONES_LIST = [
  { name:'Zona Rosa',        count:52, icon:'fa-heart' },
  { name:'Providencia',      count:38, icon:'fa-tree'  },
  { name:'Chapultepec',      count:31, icon:'fa-landmark' },
  { name:'Tlaquepaque',      count:27, icon:'fa-store' },
  { name:'Zapopan',          count:45, icon:'fa-city'  },
  { name:'Centro Histórico', count:22, icon:'fa-church' },
];

const TAGS_POPULAR = ['Universitaria','Milf','Petite','Nalgona','Voluptuosa','Chichona','Extranjera','Jovencita','Fit','Natural','Tuneada','Chaparrita','Alta','VIP','Premium','Elite'];

/* ─── Reviews ───────────────────────────────────────────── */
const REVIEWS_DATA = [
  { name:'Carlos M.',  initials:'CM', date:'Hace 2 días',   rating:5, text:'Increíble profesionalismo. Puntual, elegante y muy agradable. Definitivamente volvería.' },
  { name:'Roberto A.', initials:'RA', date:'Hace 1 semana', rating:5, text:'La mejor experiencia que he tenido. Completamente recomendada.' },
  { name:'Eduardo L.', initials:'EL', date:'Hace 2 semanas',rating:4, text:'Muy profesional, buena comunicación. La sesión fotográfica quedó espectacular.' },
  { name:'Héctor F.',  initials:'HF', date:'Hace 3 semanas',rating:5, text:'Superó todas mis expectativas. El evento fue todo un éxito.' },
  { name:'Javier R.',  initials:'JR', date:'Hace 1 mes',    rating:4, text:'Puntual y muy profesional. Repetiré sin duda.' },
];

const FAQ_DATA = [
  { q:'¿Puedo cancelar en cualquier momento?', a:'Sí, puedes cancelar sin penalización contactando a soporte.' },
  { q:'¿Cómo funcionan los perfiles verificados?', a:'Cada Doncella pasa verificación de identidad con documento oficial y selfie en tiempo real.' },
  { q:'¿Los datos de mi tarjeta están seguros?', a:'Usamos cifrado SSL 256-bit y procesamiento PCI-DSS nivel 1. Nunca almacenamos datos de tarjeta.' },
  { q:'¿Puedo cambiar de plan en cualquier momento?', a:'Sí. Los cambios se aplican de forma inmediata con prorrateo automático.' },
  { q:'¿Cómo se garantiza la discreción?', a:'Toda la comunicación es cifrada. No compartimos datos con terceros ni aparecemos en buscadores.' },
];

/* ─── Galería con videos ────────────────────────────────── */
const GALLERY_MEDIA = [
  { type:'image', src: photoUrl(PHOTO_POOL[0],900,700),  thumb: photoUrl(PHOTO_POOL[0],160,120) },
  { type:'image', src: photoUrl(PHOTO_POOL[1],900,700),  thumb: photoUrl(PHOTO_POOL[1],160,120) },
  { type:'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: photoUrl(PHOTO_POOL[2],160,120), poster: photoUrl(PHOTO_POOL[2],900,700) },
  { type:'image', src: photoUrl(PHOTO_POOL[3],900,700),  thumb: photoUrl(PHOTO_POOL[3],160,120) },
  { type:'image', src: photoUrl(PHOTO_POOL[4],900,700),  thumb: photoUrl(PHOTO_POOL[4],160,120) },
  { type:'video', src: 'https://www.w3schools.com/html/movie.mp4',   thumb: photoUrl(PHOTO_POOL[5],160,120), poster: photoUrl(PHOTO_POOL[5],900,700) },
  { type:'image', src: photoUrl(PHOTO_POOL[6],900,700),  thumb: photoUrl(PHOTO_POOL[6],160,120) },
  { type:'image', src: photoUrl(PHOTO_POOL[7],900,700),  thumb: photoUrl(PHOTO_POOL[7],160,120) },
  { type:'image', src: photoUrl(PHOTO_POOL[8],900,700),  thumb: photoUrl(PHOTO_POOL[8],160,120) },
  { type:'image', src: photoUrl(PHOTO_POOL[9],900,700),  thumb: photoUrl(PHOTO_POOL[9],160,120) },
  { type:'image', src: photoUrl(PHOTO_POOL[10],900,700), thumb: photoUrl(PHOTO_POOL[10],160,120) },
  { type:'image', src: photoUrl(PHOTO_POOL[11],900,700), thumb: photoUrl(PHOTO_POOL[11],160,120) },
];

/* ─── Utilities ─────────────────────────────────────────── */
function stars(n) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(n))   s += '<i class="fas fa-star"></i>';
    else if (i - 0.5 <= n)   s += '<i class="fas fa-star-half-alt"></i>';
    else                      s += '<i class="far fa-star star-empty"></i>';
  }
  return s;
}

function fmtMXN(n) { return '$' + Number(n).toLocaleString('es-MX'); }

function showToast(msg, type = 'info') {
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const icons  = { success:'fa-check-circle', error:'fa-times-circle', info:'fa-info-circle' };
  const colors = { success:'var(--green)', error:'var(--red)', info:'var(--gold)' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas ${icons[type]} toast-icon" style="color:${colors[type]}"></i>${msg}`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='.3s'; setTimeout(()=>t.remove(),300); }, 3200);
}

function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

/* ─── Navigation scroll ─────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 40);
});

document.addEventListener('DOMContentLoaded', () => {
  const btn      = document.getElementById('navMenuBtn');
  const nav      = document.getElementById('mainNav');
  const drawer   = document.getElementById('mobileDrawer');
  const overlay  = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');

  const openDrawer = () => {
    if (!drawer || !overlay) return;
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('drawer-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    btn?.setAttribute('aria-expanded', 'true');
    nav?.classList.add('nav-mobile-open');
  };
  const closeDrawer = () => {
    if (!drawer || !overlay) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('drawer-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    btn?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('nav-mobile-open');
  };

  if (btn && drawer && overlay) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    overlay.addEventListener('click', closeDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  } else if (btn && nav) {
    // Fallback: legacy nav-links drawer behavior
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('nav-mobile-open');
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('.nav-links a')) nav.classList.remove('nav-mobile-open');
    });
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('nav-mobile-open')) return;
      if (!e.target.closest('#mainNav')) nav.classList.remove('nav-mobile-open');
    });
  }

  /* ── Mobile-only: swap search placeholder ── */
  const searchInput = document.getElementById('searchInput');
  const mq = window.matchMedia('(max-width: 768px)');
  const applyMobilePlaceholder = () => {
    if (!searchInput) return;
    const mobilePh = searchInput.getAttribute('data-mobile-placeholder');
    if (!mobilePh) return;
    if (mq.matches) {
      if (!searchInput.dataset._origPh) {
        searchInput.dataset._origPh = searchInput.getAttribute('placeholder') || '';
      }
      searchInput.setAttribute('placeholder', mobilePh);
    } else if (searchInput.dataset._origPh !== undefined) {
      searchInput.setAttribute('placeholder', searchInput.dataset._origPh);
    }
  };
  applyMobilePlaceholder();
  mq.addEventListener?.('change', applyMobilePlaceholder);

  /* ── Mobile-only: city-chip activation + sync to zona select ── */
  const chips = document.querySelectorAll('.city-bar .city-chip');
  const zonaSelect = document.getElementById('searchZona');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      if (zonaSelect) {
        const v = chip.getAttribute('data-city') || '';
        // If chip value isn't in the select options, leave select untouched.
        const opt = Array.from(zonaSelect.options).find(o => o.value === v || o.text === v);
        if (opt) zonaSelect.value = opt.value || opt.text;
      }
    });
  });
});

/* ─── Hero Slider ───────────────────────────────────────── */
let heroIndex = 0, heroTimer = null;

function initHero() {
  const slides   = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  if (!slides.length || !dotsWrap) return;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i+1}`);
    d.addEventListener('click', () => goHeroSlide(i));
    dotsWrap.appendChild(d);
  });

  heroTimer = setInterval(nextHeroSlide, 5500);
  /* sync stats visibility on initial load */
  const stats = document.getElementById('heroStats');
  if (stats) stats.style.opacity = heroIndex < 2 ? '0' : '1';
  document.querySelectorAll('[data-count]').forEach(el => animateCount(el, +el.dataset.count));
}

function goHeroSlide(idx) {
  const slides  = document.querySelectorAll('.hero-slide');
  const dots    = document.querySelectorAll('.hero-dot');
  const content = document.getElementById('heroMainContent');
  const stats   = document.getElementById('heroStats');
  slides[heroIndex].classList.remove('active');
  dots[heroIndex]?.classList.remove('active');
  heroIndex = idx;
  slides[heroIndex].classList.add('active');
  dots[heroIndex]?.classList.add('active');
  if (content) content.style.opacity = '0';
  /* hide floating stats on brand/pagos slides (0,1) — they have their own */
  if (stats) stats.style.opacity = heroIndex < 2 ? '0' : '1';
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, 5500);
}
function nextHeroSlide() {
  const total = document.querySelectorAll('.hero-slide').length;
  if (total) goHeroSlide((heroIndex + 1) % total);
}

function animateCount(el, target) {
  let v = 0;
  const step = Math.ceil(target / 60);
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = v.toLocaleString('es-MX');
    if (v >= target) clearInterval(t);
  }, 22);
}

/* ─── Model Card HTML ───────────────────────────────────── */
function modelCardHTML(m) {
  return `
  <div class="model-card" onclick="window.location.href='perfil.html?id=${m.id}'"
       data-id="${m.id}" data-zone="${m.zone}" data-cat="${m.cat}"
       data-rate="${m.rate}" data-rating="${m.rating}" data-available="${m.available}">
    <div class="model-card-img-wrap">
      <div class="card-img-strip" id="strip-${m.id}">
        ${m.photos.map(p=>`<img src="${p}" alt="${m.name}" loading="lazy" />`).join('')}
      </div>
      <div class="card-img-overlay"></div>
      <div class="card-top-badges">
        ${m.available
          ? '<span class="pill pill-available" style="font-size:.6rem">Disponible</span>'
          : '<span class="pill pill-busy" style="font-size:.6rem">No Disponible</span>'}
        ${m.isNew    ? '<span class="pill pill-new" style="font-size:.6rem">Nueva</span>' : ''}
        ${m.hasVideo ? '<span class="pill pill-gold" style="font-size:.6rem"><i class="fas fa-video"></i></span>' : ''}
        ${m.promo    ? `<span class="pill pill-gold" style="font-size:.6rem">🔥 ${m.promo.badge}</span>` : ''}
      </div>
      <button class="card-fav-btn" onclick="event.stopPropagation();toggleCardFav(this)" aria-label="Guardar">
        <i class="far fa-heart"></i>
      </button>
      ${m.photos.length > 1 ? `<div class="card-carousel-dots">${m.photos.map((_,i)=>`<div class="card-carousel-dot${i===0?' active':''}"></div>`).join('')}</div>` : ''}
    </div>
    <div class="model-card-info">
      <div class="model-card-name">${m.name}</div>
      <div class="model-card-meta">
        <span><i class="fas fa-map-marker-alt" style="color:var(--gold);margin-right:.25rem"></i>${m.zone}</span>
        <span class="stars" style="font-size:.7rem">${stars(m.rating)} <span style="color:var(--t2);margin-left:.2rem">${m.rating}</span></span>
      </div>
      <div class="model-card-tags">
        ${m.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="model-card-prices">
        <div><span class="model-card-price-val">${fmtMXN(m.rate)}</span><span class="model-card-price-label">1hr</span></div>
        <div><span class="model-card-price-val">${fmtMXN(Math.round(m.rate * 1.85))}</span><span class="model-card-price-label">2hr</span></div>
      </div>
      <div class="model-card-footer" style="margin-top:.5rem">
        <button class="btn btn-ghost btn-sm" style="font-size:.72rem;padding:.35rem .65rem" onclick="event.stopPropagation();openQuickView(${m.id})">
          <i class="fas fa-eye"></i> Ver
        </button>
        <button class="btn btn-telegram btn-sm" onclick="event.stopPropagation();window.open('https://t.me/doncellas','_blank')" title="Telegram">
          <i class="fab fa-telegram"></i>
        </button>
        <button class="btn btn-wa btn-sm" onclick="event.stopPropagation();window.open('https://wa.me/523312345678?text=Hola%20${encodeURIComponent(m.name)}','_blank')" title="WhatsApp">
          <i class="fab fa-whatsapp"></i>
        </button>
      </div>
    </div>
  </div>`;
}

/* Hover carousel */
function initCardCarousels() {
  document.querySelectorAll('.model-card[data-id]').forEach(card => {
    const m = MODELS.find(x => x.id == card.dataset.id);
    if (!m || m.photos.length < 2) return;
    const strip = card.querySelector(`#strip-${m.id}`);
    const dots  = card.querySelectorAll('.card-carousel-dot');
    let idx = 0, timer = null;
    card.addEventListener('mouseenter', () => {
      timer = setInterval(() => {
        idx = (idx + 1) % m.photos.length;
        strip.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((d,i) => d.classList.toggle('active', i===idx));
      }, 900);
    });
    card.addEventListener('mouseleave', () => {
      clearInterval(timer); idx = 0;
      strip.style.transform = '';
      dots.forEach((d,i) => d.classList.toggle('active', i===0));
    });
  });
}

function toggleCardFav(btn) {
  const i = btn.querySelector('i');
  if (i.classList.contains('far')) {
    i.className = 'fas fa-heart'; i.style.color = 'var(--red)';
    showToast('Guardado en favoritos', 'success');
  } else {
    i.className = 'far fa-heart'; i.style.color = '';
    showToast('Eliminado de favoritos', 'info');
  }
}

function initHCarouselNav() {
  document.querySelectorAll('.h-carousel-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = document.getElementById(btn.dataset.target);
      if (!t) return;
      const card = t.querySelector('.model-card');
      t.scrollBy({ left: btn.classList.contains('h-carousel-prev') ? -(card?.offsetWidth+24||260) : (card?.offsetWidth+24||260), behavior:'smooth' });
    });
  });
}

/* ─── Index page ────────────────────────────────────────── */
function initIndex() {
  buildHeroSlides();   // must run before initHero()
  initHero();
  initHCarouselNav();
  buildFeaturedCarousel();
  buildAvailableCarousel();
  buildNewCarousel();
  buildPromoCarousel();
  setupSearchForm();
}

/* Returns a featured-model photo for the brand slide mosaic */
function _mosaicPic(i) {
  const pool = MODELS.filter(m => m.featured && !m.hidden);
  if (pool[i]) return pool[i].photos[0];
  return photoUrl(PHOTO_POOL[i * 3 % PHOTO_POOL.length], 380, 570);
}

/* Genera slides del hero desde modelos con promo */
function buildHeroSlides() {
  const wrap = document.getElementById('heroSlides');
  if (!wrap) return;

  /* ── Banner 1: Marca (primer slide, active) ─── */
  const brandSlide = document.createElement('div');
  brandSlide.className = 'hero-slide hero-slide-brand active';
  brandSlide.innerHTML = `
    <div class="hero-slide-brand-bg">
      <div class="hb-dots"></div>
      <div class="hb-lines"></div>
      <div class="hb-glow-left"></div>
      <div class="hb-fade-right"></div>
    </div>
    <div class="hero-brand-content">
      <div class="hero-brand-label"><i class="fas fa-gem"></i> Guadalajara, Jalisco</div>
      <h1 class="hero-brand-title">Escorts Elite<br><em>en Guadalajara</em></h1>
      <p class="hero-brand-desc">Perfiles verificados, disponibilidad en tiempo real<br>y la discreción que mereces.</p>
      <div class="hero-brand-actions">
        <a href="modelos.html" class="hero-brand-cta" onclick="event.stopPropagation()">
          <span>Explorar Doncellas</span><i class="fas fa-arrow-right"></i>
        </a>
        <a href="membresias.html" class="hero-brand-cta-sec" onclick="event.stopPropagation()">Membresías</a>
      </div>
      <div class="hero-brand-stats">
        <div class="hero-brand-stat"><span class="hero-brand-stat-n">240+</span><span class="hero-brand-stat-l">Doncellas</span></div>
        <div class="hero-brand-stat-div"></div>
        <div class="hero-brand-stat"><span class="hero-brand-stat-n">98%</span><span class="hero-brand-stat-l">Verificadas</span></div>
        <div class="hero-brand-stat-div"></div>
        <div class="hero-brand-stat"><span class="hero-brand-stat-n">4,800</span><span class="hero-brand-stat-l">Citas/mes</span></div>
      </div>
    </div>
    <div class="hero-brand-mosaic">
      <div class="hero-brand-mosaic-col">
        <div class="hbm-img-wrap"><img src="${_mosaicPic(0)}" alt="modelo" /></div>
        <div class="hbm-img-wrap"><img src="${_mosaicPic(1)}" alt="modelo" /></div>
      </div>
      <div class="hero-brand-mosaic-col">
        <div class="hbm-img-wrap"><img src="${_mosaicPic(2)}" alt="modelo" /></div>
        <div class="hbm-img-wrap"><img src="${_mosaicPic(3)}" alt="modelo" /></div>
      </div>
    </div>`;
  wrap.appendChild(brandSlide);

  /* ── Banner 2: Pagos ─── */
  const pagoSlide = document.createElement('div');
  pagoSlide.className = 'hero-slide hero-slide-pagos';
  pagoSlide.innerHTML = `
    <div class="hero-slide-pagos-bg">
      <div class="hp-grid"></div>
      <div class="hp-glow-1"></div>
      <div class="hp-glow-2"></div>
    </div>
    <div class="hero-pagos-content">
      <div class="hero-brand-label"><i class="fas fa-shield-alt"></i> Transacciones seguras</div>
      <h2 class="hero-brand-title">Pagos seguros,<br><em>a tu manera</em></h2>
      <p class="hero-brand-desc">Acepta tu forma favorita de pago. Todas las transacciones<br>están protegidas con encriptación de extremo a extremo.</p>
      <div class="hero-pagos-grid">
        <div class="hero-pago-item">
          <div class="hero-pago-icon"><i class="fas fa-credit-card"></i></div>
          <div class="hero-pago-name">Tarjeta</div>
          <div class="hero-pago-sub">Visa · Mastercard · Amex</div>
        </div>
        <div class="hero-pago-item">
          <div class="hero-pago-icon"><i class="fas fa-university"></i></div>
          <div class="hero-pago-name">Transferencia</div>
          <div class="hero-pago-sub">SPEI · OXXO Pay</div>
        </div>
        <div class="hero-pago-item">
          <div class="hero-pago-icon" style="color:#25D366;border-color:rgba(37,211,102,.35);background:rgba(37,211,102,.1)"><i class="fab fa-whatsapp"></i></div>
          <div class="hero-pago-name">WhatsApp Pay</div>
          <div class="hero-pago-sub">Pago directo y rápido</div>
        </div>
      </div>
      <div class="hero-pagos-badge"><i class="fas fa-lock"></i> Encriptación SSL 256-bit · Pagos 100% protegidos</div>
    </div>`;
  wrap.appendChild(pagoSlide);

  /* ── Banners de modelos con promo ─── */
  const promoModels = MODELS.filter(m => m.promo).slice(0, 6);
  promoModels.forEach(m => {
    const bgId = PHOTO_POOL[(m.id - 1) % PHOTO_POOL.length];
    const original = fmtMXN(m.rate);
    const discounted = fmtMXN(Math.round(m.rate * (1 - m.promo.discount / 100)));
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.style.cssText = `background-image:url('${photoUrl(bgId,1400,900)}');cursor:pointer`;
    slide.innerHTML = `
      <div class="hero-overlay"></div>
      <div class="hero-promo-overlay">
        <div class="hero-promo-badge">🔥 ${m.promo.badge}</div>
        <div class="hero-promo-name">${m.name}</div>
        <div class="hero-promo-zone"><i class="fas fa-map-marker-alt"></i> ${m.zone}</div>
        <div class="hero-promo-offer">${m.promo.title}</div>
        <div class="hero-promo-desc">${m.promo.desc}</div>
        <div class="hero-promo-prices">
          <span class="hero-promo-original">${original}/hr</span>
          <span class="hero-promo-discounted">${discounted}/hr</span>
        </div>
        <a href="perfil.html?id=${m.id}" class="hero-promo-cta">Ver perfil <i class="fas fa-arrow-right"></i></a>
      </div>`;
    wrap.appendChild(slide);
  });
}

function buildFeaturedCarousel() {
  const wrap = document.getElementById('featuredCarousel');
  if (!wrap) return;
  MODELS.filter(m => m.featured).forEach(m => wrap.insertAdjacentHTML('beforeend', modelCardHTML(m)));
  initCardCarousels();
}

function buildAvailableCarousel() {
  const wrap = document.getElementById('availableCarousel');
  if (!wrap) return;
  MODELS.filter(m => m.available).slice(0, 12).forEach(m => wrap.insertAdjacentHTML('beforeend', modelCardHTML(m)));
  initCardCarousels();
}

function buildNewCarousel() {
  const wrap = document.getElementById('newCarousel');
  if (!wrap) return;
  MODELS.filter(m => m.isNew).forEach(m => wrap.insertAdjacentHTML('beforeend', modelCardHTML(m)));
  initCardCarousels();
}

function buildPromoCarousel() {
  const wrap = document.getElementById('promoCarousel');
  if (!wrap) return;
  MODELS.filter(m => m.promo).forEach(m => wrap.insertAdjacentHTML('beforeend', modelCardHTML(m)));
  initCardCarousels();
}

function setupSearchForm() {
  const form = document.getElementById('searchForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q    = document.getElementById('searchInput')?.value.trim();
    const zona = document.getElementById('searchZona')?.value;
    const cat  = document.getElementById('searchCat')?.value;
    const p = new URLSearchParams();
    if (q)    p.set('q', q);
    if (zona) p.set('zona', zona);
    if (cat)  p.set('cat', cat);
    window.location.href = 'modelos.html?' + p.toString();
  });
}

/* ─── Modelos page ──────────────────────────────────────── */
let filteredModels = [];

function initModelos() {
  filteredModels = [...MODELS];
  renderModelos();

  document.getElementById('clearFilters')?.addEventListener('click', clearFilters);
  document.getElementById('sortSelect')?.addEventListener('change', renderModelos);
  ['fZona','fCat','fPrice','fRating'].forEach(id =>
    document.getElementById(id)?.addEventListener('change', renderModelos));
  const searchEl = document.getElementById('modelosSearch');
  if (searchEl) {
    searchEl.addEventListener('input', () => {
      const clearBtn = document.getElementById('modelosSearchClear');
      if (clearBtn) clearBtn.style.display = searchEl.value ? 'flex' : 'none';
      renderModelos();
    });
  }
  document.querySelectorAll('[data-filter-avail]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-avail]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderModelos();
    });
  });

  const p = new URLSearchParams(window.location.search);
  if (p.get('zona')) { const s = document.getElementById('fZona'); if (s) s.value = p.get('zona'); }
  if (p.get('cat'))  { const s = document.getElementById('fCat');  if (s) s.value = p.get('cat');  }
  if (p.get('filter') === 'available') {
    document.querySelectorAll('[data-filter-avail]').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-filter-avail="available"]')?.classList.add('active');
  }
  renderModelos();
}

function renderModelos() {
  filteredModels = applyFilters(MODELS);
  const grid = document.getElementById('modelosGrid');
  if (!grid) return;
  grid.innerHTML = '';
  filteredModels.forEach(m => grid.insertAdjacentHTML('beforeend', modelCardHTML(m)));
  initCardCarousels();
  const c = document.getElementById('resultsCount');
  if (c) c.textContent = `${filteredModels.length} Doncellas encontradas`;
}

function applyFilters(list) {
  const zona   = document.getElementById('fZona')?.value  || '';
  const cat    = document.getElementById('fCat')?.value   || '';
  const price  = document.getElementById('fPrice')?.value || '';
  const avail  = document.querySelector('[data-filter-avail].active')?.dataset.filterAvail || 'all';
  const rating = parseFloat(document.getElementById('fRating')?.value || '0');
  const sort   = document.getElementById('sortSelect')?.value || 'featured';
  const q      = (document.getElementById('modelosSearch')?.value.trim() ||
                  new URLSearchParams(window.location.search).get('q') || '').toLowerCase();

  let r = list.filter(m => {
    if (m.hidden) return false;
    if (zona && m.zone !== zona) return false;
    if (cat  && m.cat  !== cat)  return false;
    if (avail === 'available' && !m.available) return false;
    if (avail === 'busy'      &&  m.available) return false;
    if (rating && m.rating < rating) return false;
    if (price) {
      if (price === '10000+' && m.rate < 10000) return false;
      else if (price !== '10000+') {
        const [lo,hi] = price.split('-').map(Number);
        if (m.rate < lo || m.rate > hi) return false;
      }
    }
    if (q && !m.name.toLowerCase().includes(q) && !m.zone.toLowerCase().includes(q) &&
             !m.cat.toLowerCase().includes(q) && !m.tags.join(' ').toLowerCase().includes(q)) return false;
    return true;
  });

  if (sort === 'new')          r.sort((a,b) => (b.isNew?1:0)-(a.isNew?1:0));
  else if (sort === 'rating')  r.sort((a,b) => b.rating - a.rating);
  else if (sort === 'price-asc')  r.sort((a,b) => a.rate - b.rate);
  else if (sort === 'price-desc') r.sort((a,b) => b.rate - a.rate);
  else r.sort((a,b) => (b.featured?1:0)-(a.featured?1:0));
  return r;
}

function clearFilters() {
  ['fZona','fCat','fPrice','fRating'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const s = document.getElementById('sortSelect'); if (s) s.value = 'featured';
  document.querySelectorAll('[data-filter-avail]').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-filter-avail="all"]')?.classList.add('active');
  renderModelos();
  showToast('Filtros eliminados', 'info');
}

/* ─── Categorias page ───────────────────────────────────── */
function initCategorias() {
  buildCatFeatureGrid();
  buildAllCatsGrid();
  buildZonesGrid();
  buildPopularTags();
  initCatSearch();
}

function initCatSearch() {
  const input = document.getElementById('catSearchInput');
  if (!input) return;
  input.addEventListener('focus', () => { input.style.borderColor = 'var(--gold)'; });
  input.addEventListener('blur', () => {
    input.style.borderColor = '';
    setTimeout(() => {
      const d = document.getElementById('catSearchDrop');
      if (d) d.style.display = 'none';
    }, 200);
  });
}

const _CAT_EXTRA = [
  { name:'Colombiana',  count:18, icon:'fa-globe'   },
  { name:'Venezolana',  count:15, icon:'fa-globe'   },
  { name:'Rubia',       count:22, icon:'fa-sun'     },
  { name:'Morena',      count:34, icon:'fa-moon'    },
  { name:'VIP',         count:12, icon:'fa-gem'     },
  { name:'Premium',     count:19, icon:'fa-crown'   },
];

function onCatSearch(q) {
  const drop = document.getElementById('catSearchDrop');
  if (!drop) return;
  if (!q.trim()) { drop.style.display = 'none'; return; }
  const ql = q.toLowerCase();

  const matchCats = [...CATEGORIES, ..._CAT_EXTRA]
    .filter(c => c.name.toLowerCase().includes(ql))
    .slice(0, 5);

  const matchModels = MODELS.filter(m => !m.hidden && (
    m.name.toLowerCase().includes(ql) ||
    m.cat.toLowerCase().includes(ql) ||
    m.zone.toLowerCase().includes(ql) ||
    TAGS_POPULAR.some(t => t.toLowerCase().includes(ql))
  )).slice(0, 5);

  if (!matchCats.length && !matchModels.length) {
    drop.innerHTML = `<div style="padding:1rem 1.25rem;color:var(--t3);font-size:.85rem">Sin resultados para "<b>${q}</b>"</div>`;
    drop.style.display = 'block';
    return;
  }

  let html = '';
  if (matchCats.length) {
    html += `<div class="cat-search-section-lbl">Categorías</div>`;
    matchCats.forEach(c => {
      html += `<a href="modelos.html?cat=${encodeURIComponent(c.name)}" class="cat-search-row">
        <div class="cat-search-icon"><i class="fas ${c.icon||'fa-tag'}"></i></div>
        <div><div class="cat-search-name">${c.name}</div><div class="cat-search-sub">${c.count} Doncellas</div></div>
      </a>`;
    });
  }
  if (matchModels.length) {
    html += `<div class="cat-search-section-lbl" style="border-top:1px solid var(--border);margin-top:.25rem;padding-top:.5rem">Doncellas sugeridas</div>`;
    matchModels.forEach(m => {
      html += `<a href="perfil.html?id=${m.id}" class="cat-search-row">
        <img src="${m.photos[0]}" class="cat-search-avatar" alt="${m.name}" />
        <div style="flex:1;min-width:0"><div class="cat-search-name">${m.name}</div><div class="cat-search-sub">${m.cat} · ${m.zone}</div></div>
        ${m.available ? '<span class="pill pill-available" style="font-size:.6rem;flex-shrink:0">Disponible</span>' : ''}
      </a>`;
    });
  }

  drop.innerHTML = html;
  drop.style.display = 'block';
}

function buildCatFeatureGrid() {
  const g = document.getElementById('catFeatureGrid');
  if (!g) return;
  CATEGORIES.forEach(c => {
    g.insertAdjacentHTML('beforeend', `
      <a href="modelos.html?cat=${encodeURIComponent(c.name)}" class="cat-hero-card">
        <img src="${c.img}" alt="${c.name}" loading="lazy" />
        <div class="cat-hero-overlay"></div>
        <div class="cat-hero-info">
          <h3>${c.name}</h3>
          <p>${c.desc}</p>
          <div class="count"><i class="fas fa-users"></i> ${c.count} Doncellas</div>
        </div>
      </a>`);
  });
}

function buildAllCatsGrid() {
  const g = document.getElementById('allCatsGrid');
  if (!g) return;
  const extra = [
    { name:'Bilingüe',    count:45, icon:'fa-globe' },
    { name:'Fitness',     count:38, icon:'fa-dumbbell' },
    { name:'Lujo & VIP',  count:29, icon:'fa-gem' },
    { name:'Corporativo', count:52, icon:'fa-building' },
    { name:'Bohemia',     count:18, icon:'fa-palette' },
    { name:'Deportes',    count:24, icon:'fa-running' },
  ];
  [...CATEGORIES, ...extra].forEach(c => {
    g.insertAdjacentHTML('beforeend', `
      <a href="modelos.html?cat=${encodeURIComponent(c.name)}" class="zone-card">
        <div class="zone-icon"><i class="fas ${c.icon||'fa-tag'}"></i></div>
        <div class="zone-info"><h4>${c.name}</h4><p>${c.count} Doncellas disponibles</p></div>
        <i class="fas fa-chevron-right zone-arrow"></i>
      </a>`);
  });
}

function buildZonesGrid() {
  const g = document.getElementById('zonesGrid');
  if (!g) return;
  ZONES_LIST.forEach(z => {
    g.insertAdjacentHTML('beforeend', `
      <a href="modelos.html?zona=${encodeURIComponent(z.name)}" class="zone-card">
        <div class="zone-icon"><i class="fas ${z.icon}"></i></div>
        <div class="zone-info"><h4>${z.name}</h4><p>${z.count} Doncellas en esta zona</p></div>
        <i class="fas fa-chevron-right zone-arrow"></i>
      </a>`);
  });
}

function buildPopularTags() {
  const w = document.getElementById('popularTags');
  if (!w) return;
  TAGS_POPULAR.forEach(t => {
    const a = document.createElement('a');
    a.href = `modelos.html?q=${encodeURIComponent(t)}`;
    a.className = 'tag';
    a.style.cssText = 'padding:.45rem 1rem;font-size:.8rem;cursor:pointer;transition:var(--transition)';
    a.textContent = t;
    a.addEventListener('mouseenter', () => { a.style.background='rgba(201,168,76,.15)'; a.style.color='var(--gold)'; a.style.borderColor='var(--gold)'; });
    a.addEventListener('mouseleave', () => { a.style.background=''; a.style.color=''; a.style.borderColor=''; });
    w.appendChild(a);
  });
}

/* ─── Perfil page ───────────────────────────────────────── */
let profileCarouselIdx = 0;
let calDate = new Date();
let activeMediaIdx = 0;

function initPerfil() {
  const urlId = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
  const m = MODELS.find(x => x.id === urlId) || MODELS[0];

  /* Name + availability pill + meta */
  const nameEl = document.getElementById('profileName');
  if (nameEl) nameEl.textContent = m.name;

  const availPill = document.getElementById('profileAvailPill');
  if (availPill) {
    availPill.textContent = m.available ? 'Disponible' : 'No Disponible';
    availPill.className = `pill ${m.available ? 'pill-available' : 'pill-busy'}`;
  }

  const metaEl = document.getElementById('profileMeta');
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="profile-meta-item"><i class="fas fa-map-marker-alt"></i> ${m.zone}, Guadalajara</span>
      <span class="profile-meta-item"><i class="fas fa-birthday-cake"></i> ${m.age} años</span>
      <span class="profile-meta-item"><i class="fas fa-ruler-vertical"></i> ${(m.height/100).toFixed(2)} m</span>
      <span class="profile-meta-item stars">${stars(m.rating)}
        <span style="margin-left:.25rem;color:var(--t2);font-size:.78rem">(${m.reviews} reseñas)</span>
      </span>`;
  }

  /* Carousel photos */
  const track = document.getElementById('profileCarouselTrack');
  if (track) {
    track.innerHTML = m.photos.map((p, i) =>
      `<img src="${p}" alt="Foto ${i+1}" class="profile-carousel-slide" />`
    ).join('');
  }

  /* Características */
  const cg = document.getElementById('caractGrid');
  if (cg) {
    cg.innerHTML = `
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-flag"></i> Nacionalidad</span><span class="caract-val">${m.nationality}</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-ruler-vertical"></i> Altura</span><span class="caract-val">${(m.height/100).toFixed(2)} m</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-birthday-cake"></i> Edad</span><span class="caract-val">${m.age} años</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-eye"></i> Ojos</span><span class="caract-val">${m.eyeColor}</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-paint-brush"></i> Cabello</span><span class="caract-val">${m.hairColor}</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-hand-paper"></i> Piel</span><span class="caract-val">${m.skinColor||'—'}</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-arrows-alt-v"></i> Cintura</span><span class="caract-val">${m.waist} cm</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-circle"></i> Caderas</span><span class="caract-val">${m.hips} cm</span></div>
      <div class="caract-item"><span class="caract-lbl"><i class="fas fa-circle-notch"></i> Busto</span><span class="caract-val">${m.bust} cm</span></div>`;
  }

  /* Tarifas */
  const r1 = document.getElementById('rate1h');
  const r3 = document.getElementById('rate3h');
  const rd = document.getElementById('rateDay');
  if (r1) r1.textContent = fmtMXN(m.rate);
  if (r3) r3.textContent = fmtMXN(Math.round(m.rate * 2.6));
  if (rd) rd.textContent = fmtMXN(Math.round(m.rate * 7.2));

  /* Servicios */
  const svcList = document.getElementById('serviciosList');
  if (svcList) {
    const SVC_ICONS = {
      'Relaciones ilimitadas': 'fa-infinity',
      'Trato de novios':       'fa-heart',
      'Oral con protección':   'fa-shield-alt',
      'Oral natural':          'fa-smile',
      'Oral terminado':        'fa-star',
      'Tiro MHM':              'fa-users',
      'Tiro HMH':              'fa-users',
      'Anal':                  'fa-circle',
    };
    const svcMap = m.services || {};
    svcList.innerHTML = ALL_SERVICES.map(s => {
      const hasSi    = !!(svcMap[s]?.si);
      const hasExtra = !!(svcMap[s]?.extra);
      return `
        <div class="servicio-item" style="justify-content:space-between;${!hasSi ? 'opacity:.45;' : ''}">
          <div style="display:flex;align-items:center;gap:.6rem">
            <div class="servicio-icon" style="${!hasSi ? 'background:rgba(255,255,255,.04)' : ''}">
              <i class="fas ${SVC_ICONS[s]||'fa-check'}"></i>
            </div>
            <div class="servicio-info">
              <div class="servicio-name">${s}</div>
            </div>
          </div>
          <div style="display:flex;gap:.35rem;flex-shrink:0;min-width:80px;justify-content:flex-end">
            ${hasSi    ? '<span class="pill pill-available" style="font-size:.65rem">Sí</span>' : '<span class="pill pill-busy" style="font-size:.65rem">No</span>'}
            ${hasExtra ? '<span class="pill pill-gold"      style="font-size:.65rem">Extra</span>' : ''}
          </div>
        </div>`;
    }).join('');
  }

  /* Promo box */
  const promoBox = document.getElementById('profilePromoBox');
  if (promoBox) {
    if (m.promo) {
      promoBox.style.display = 'block';
      const el = (id) => document.getElementById(id);
      if (el('promoTitle')) el('promoTitle').textContent = m.promo.title;
      if (el('promoDesc'))  el('promoDesc').textContent  = m.promo.desc;
      if (el('promoValid')) el('promoValid').textContent = `Válido hasta: ${m.promo.validUntil}`;
      if (el('promoLabel')) el('promoLabel').textContent = m.promo.badge;
    } else {
      promoBox.style.display = 'none';
    }
  }

  initProfileCarousel();
  initCalendar();
  buildMediaGallery();
  buildReviews();
  buildSimilarProfiles(m);
  buildGalleryFull();
}

/* Top photo carousel */
function initProfileCarousel() {
  const track   = document.getElementById('profileCarouselTrack');
  const counter = document.getElementById('carouselCounter');
  const thumbs  = document.getElementById('thumbStrip');
  if (!track) return;
  const slides = track.querySelectorAll('.profile-carousel-slide');
  const total  = slides.length;

  if (thumbs) {
    slides.forEach((s, i) => {
      const th = document.createElement('img');
      th.src = s.src;
      th.style.cssText = `width:48px;height:48px;border-radius:6px;object-fit:cover;cursor:pointer;opacity:${i===0?'1':'0.5'};border:2px solid ${i===0?'var(--gold)':'transparent'};transition:.2s`;
      th.addEventListener('click', () => goProfileSlide(i));
      thumbs.appendChild(th);
    });
  }

  document.getElementById('carouselPrev')?.addEventListener('click', () => goProfileSlide((profileCarouselIdx-1+total)%total));
  document.getElementById('carouselNext')?.addEventListener('click', () => goProfileSlide((profileCarouselIdx+1)%total));

  function goProfileSlide(idx) {
    profileCarouselIdx = idx;
    track.style.transform = `translateX(-${idx*100}%)`;
    if (counter) counter.textContent = `${idx+1} / ${total}`;
    thumbs?.querySelectorAll('img').forEach((t,i) => {
      t.style.opacity = i===idx ? '1':'0.5';
      t.style.borderColor = i===idx ? 'var(--gold)':'transparent';
    });
  }
}

/* Media gallery: foto grande + thumbs sidebar */
function buildMediaGallery() {
  const thumbsWrap  = document.getElementById('mediaThumbs');
  const mainImg     = document.getElementById('mainMediaImg');
  const mainVideo   = document.getElementById('mainMediaVideo');
  const mainPlayBtn = document.getElementById('mainMediaPlayBtn');
  const counter     = document.getElementById('mediaCounter');
  if (!thumbsWrap || !mainImg) return;

  function showMedia(idx) {
    const item = GALLERY_MEDIA[idx];
    activeMediaIdx = idx;
    mainVideo.pause();
    mainVideo.style.display = 'none';
    mainPlayBtn.style.display = 'none';
    mainImg.style.display = 'block';
    if (item.type === 'video') {
      mainImg.src = item.poster;
      mainVideo.src = item.src;
      mainVideo.poster = item.poster;
      mainPlayBtn.style.display = 'flex';
    } else {
      mainImg.src = item.src;
    }
    if (counter) counter.textContent = `${idx+1} / ${GALLERY_MEDIA.length}`;
    thumbsWrap.querySelectorAll('.media-thumb').forEach((t,i) => t.classList.toggle('active', i===idx));
  }

  GALLERY_MEDIA.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'media-thumb' + (i===0 ? ' active' : '');
    div.innerHTML = `
      <img src="${item.thumb}" alt="Media ${i+1}" loading="lazy" />
      ${item.type==='video' ? `<div class="media-thumb-video-badge"><i class="fas fa-play"></i></div>` : ''}`;
    div.addEventListener('click', () => showMedia(i));
    thumbsWrap.appendChild(div);
  });

  showMedia(0);

  /* expose showMedia so global navigateMedia can call it */
  window._showMedia = showMedia;
}

function syncThumbScroll() {
  const thumbsWrap = document.getElementById('mediaThumbs');
  if (!thumbsWrap) return;
  const active = thumbsWrap.querySelectorAll('.media-thumb')[activeMediaIdx];
  active?.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

window.playMainVideo = function() {
  const mainImg     = document.getElementById('mainMediaImg');
  const mainVideo   = document.getElementById('mainMediaVideo');
  const mainPlayBtn = document.getElementById('mainMediaPlayBtn');
  mainImg.style.display = 'none';
  mainPlayBtn.style.display = 'none';
  mainVideo.style.display = 'block';
  mainVideo.play();
};

/* Calendar */
function initCalendar() {
  renderCalendar();
  document.getElementById('calPrev')?.addEventListener('click', () => {
    calDate = new Date(calDate.getFullYear(), calDate.getMonth()-1, 1); renderCalendar();
  });
  document.getElementById('calNext')?.addEventListener('click', () => {
    calDate = new Date(calDate.getFullYear(), calDate.getMonth()+1, 1); renderCalendar();
  });
}

function toggleCalendar() {
  document.getElementById('calToggleBtn')?.classList.toggle('open');
  document.getElementById('calWrap')?.classList.toggle('open');
}

function renderCalendar() {
  const grid  = document.getElementById('calGrid');
  const label = document.getElementById('calMonthLabel');
  if (!grid) return;
  const yr = calDate.getFullYear(), mo = calDate.getMonth();
  const today = new Date();
  label.textContent = calDate.toLocaleDateString('es-MX',{month:'long',year:'numeric'});

  const firstDay    = new Date(yr,mo,1).getDay();
  const daysInMonth = new Date(yr,mo+1,0).getDate();
  const availSet    = new Set();
  for (let d=1; d<=daysInMonth; d++) if ((d*7+mo*3)%5 !== 0) availSet.add(d);

  const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  let html = dayNames.map(n=>`<div class="calendar-day-name">${n}</div>`).join('');
  for (let i=0; i<firstDay; i++) html += '<div class="calendar-day empty"></div>';

  for (let d=1; d<=daysInMonth; d++) {
    const date    = new Date(yr,mo,d);
    const isToday = date.toDateString()===today.toDateString();
    const isPast  = date < today && !isToday;
    const isAvail = availSet.has(d) && !isPast;
    let cls = 'calendar-day';
    if (isToday) cls += ' today';
    if (isPast)  cls += ' booked';
    else if (isAvail) cls += ' available';
    html += `<div class="${cls}" onclick="selectCalDay(this,${d})">${d}</div>`;
  }
  grid.innerHTML = html;
}

function selectCalDay(el, d) {
  if (el.classList.contains('booked') || el.classList.contains('empty')) return;
  document.querySelectorAll('.calendar-day.selected').forEach(x=>x.classList.remove('selected'));
  el.classList.add('selected');
  showToast(`Día ${d} seleccionado. Contacta por WhatsApp para confirmar.`, 'info');
}

function buildGalleryFull() {
  const g = document.getElementById('galleryFull');
  if (!g) return;
  GALLERY_MEDIA.forEach((item, i) => {
    if (item.type === 'video') {
      g.insertAdjacentHTML('beforeend', `
        <div style="position:relative;border-radius:8px;overflow:hidden;aspect-ratio:4/3;background:#000;cursor:pointer" onclick="closeModal('galleryModal');openFullscreen(${i})">
          <img src="${item.poster}" style="width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4)">
            <div style="width:50px;height:50px;border-radius:50%;background:rgba(201,168,76,.9);display:flex;align-items:center;justify-content:center;color:#000;font-size:1.1rem"><i class="fas fa-play" style="margin-left:3px"></i></div>
          </div>
          <span class="pill pill-gold" style="position:absolute;top:.5rem;left:.5rem;font-size:.6rem"><i class="fas fa-video"></i> Video</span>
        </div>`);
    } else {
      g.insertAdjacentHTML('beforeend', `
        <img src="${item.src}" loading="lazy" style="border-radius:8px;object-fit:cover;width:100%;aspect-ratio:4/3;cursor:zoom-in" onclick="closeModal('galleryModal');openFullscreen(${i})" />`);
    }
  });
}

window.playGalleryItem = function(idx) {
  closeModal('galleryModal');
  openFullscreen(idx);
};

/* ── Fullscreen viewer ─────────────────────────────────────── */
let fsIndex = 0;

window.navigateMedia = function(dir) {
  if (!window._showMedia || !GALLERY_MEDIA.length) return;
  const next = (activeMediaIdx + dir + GALLERY_MEDIA.length) % GALLERY_MEDIA.length;
  window._showMedia(next);
  syncThumbScroll();
};

function fsShowItem(idx) {
  fsIndex = (idx + GALLERY_MEDIA.length) % GALLERY_MEDIA.length;
  const item     = GALLERY_MEDIA[fsIndex];
  const fsImg    = document.getElementById('fsImg');
  const fsVideo  = document.getElementById('fsVideo');
  const fsPlay   = document.getElementById('fsPlayBtn');
  const fsCtr    = document.getElementById('fsCounter');
  if (!fsImg) return;
  fsVideo.pause();
  if (item.type === 'video') {
    fsImg.style.display    = 'none';
    fsVideo.src            = item.src;
    fsVideo.poster         = item.poster;
    fsVideo.style.display  = 'none';
    if (fsPlay) { fsPlay.style.display = 'flex'; }
  } else {
    fsImg.src              = item.src;
    fsImg.style.display    = 'block';
    fsVideo.style.display  = 'none';
    if (fsPlay) { fsPlay.style.display = 'none'; }
  }
  if (fsCtr) fsCtr.textContent = `${fsIndex + 1} / ${GALLERY_MEDIA.length}`;
}

window.openFullscreen = function(idx) {
  const viewer = document.getElementById('fullscreenViewer');
  if (!viewer) return;
  fsShowItem(idx ?? activeMediaIdx);
  viewer.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeFullscreen = function() {
  const viewer  = document.getElementById('fullscreenViewer');
  const fsVideo = document.getElementById('fsVideo');
  if (fsVideo) fsVideo.pause();
  if (viewer)  viewer.style.display = 'none';
  document.body.style.overflow = '';
};

window.navigateFullscreen = function(dir) {
  fsShowItem(fsIndex + dir);
};

window.playFsVideo = function() {
  const fsImg   = document.getElementById('fsImg');
  const fsVideo = document.getElementById('fsVideo');
  const fsPlay  = document.getElementById('fsPlayBtn');
  if (!fsVideo) return;
  if (fsImg)  fsImg.style.display   = 'none';
  if (fsPlay) fsPlay.style.display  = 'none';
  fsVideo.style.display = 'block';
  fsVideo.play();
};

function buildReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;
  let shown = 0;
  function addReviews(from, count) {
    REVIEWS_DATA.slice(from, from+count).forEach(r => {
      list.insertAdjacentHTML('beforeend', `
        <div class="review-card">
          <div class="review-header">
            <div class="review-avatar">${r.initials}</div>
            <div class="review-meta">
              <div class="review-name">${r.name}</div>
              <div class="review-date">${r.date}</div>
            </div>
            <div class="stars">${stars(r.rating)}</div>
          </div>
          <p class="review-text">${r.text}</p>
        </div>`);
    });
  }
  addReviews(0,3); shown=3;
  document.getElementById('loadMoreReviews')?.addEventListener('click', () => {
    addReviews(shown,3); shown+=3;
    if (shown>=REVIEWS_DATA.length) document.getElementById('loadMoreReviews')?.remove();
  });
}

function buildSimilarProfiles(currentModel) {
  const wrap = document.getElementById('similarProfiles');
  if (!wrap) return;
  const base = currentModel || MODELS[0];
  const similar = MODELS
    .filter(x => x.id !== base.id && (x.zone === base.zone || x.cat === base.cat))
    .slice(0, 3);
  (similar.length ? similar : MODELS.slice(1,4)).forEach(m => {
    wrap.insertAdjacentHTML('beforeend', `
      <a href="perfil.html?id=${m.id}" style="display:flex;align-items:center;gap:.75rem;padding:.5rem;border-radius:var(--r-md);transition:var(--transition)" onmouseover="this.style.background='var(--surface)'" onmouseout="this.style.background=''">
        <img src="${m.img}" alt="${m.name}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:1px solid var(--border-h)" />
        <div><div style="font-size:.88rem;font-weight:500">${m.name}</div><div style="font-size:.72rem;color:var(--t2)">${m.zone} · ${fmtMXN(m.rate)}/hr</div></div>
        ${m.available ? '<span class="pill pill-available" style="margin-left:auto;font-size:.58rem">Disponible</span>' : ''}
      </a>`);
  });
}

/* ─── Admin — nueva modelo con credenciales ─────────────── */
window.generarPassword = function() {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789@#$!';
  const pass = Array.from({length: 12}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const passEl = document.getElementById('newPass');
  if (passEl) passEl.value = pass;
};

window.saveNewModelo = function() {
  const nombre = document.getElementById('newNombre')?.value.trim();
  const email  = document.getElementById('newEmail')?.value.trim();
  const pass   = document.getElementById('newPass')?.value.trim();
  const zona   = document.getElementById('newZona')?.value;
  const cat    = document.getElementById('newCat')?.value;
  const plan   = document.getElementById('newPlan')?.value;
  const tarifa = parseInt(document.getElementById('newTarifa')?.value) || 2500;

  if (!nombre) { showToast('El nombre es obligatorio', 'error'); return; }
  if (!email)  { showToast('El correo es obligatorio', 'error'); return; }
  if (!pass)   { showToast('Genera o escribe una contraseña', 'error'); return; }

  /* add to MODELS array */
  const newId = Math.max(...MODELS.map(m => m.id)) + 1;
  const photoId = PHOTO_POOL[newId % PHOTO_POOL.length];
  MODELS.unshift({
    id: newId, name: nombre, zone: zona, cat: cat, rate: tarifa,
    rating: 4.5, available: true, featured: false, isNew: true, hasVideo: false,
    img: photoUrl(photoId, 400, 530), photos: [photoUrl(photoId, 400, 530)],
    tags: [cat], plan: plan, email: email, password: pass, promo: null,
    skinColor: 'Morena clara', hairColor: 'Castaño', eyeColor: 'Café',
    bust: 86, waist: 62, hips: 90,
    services: Object.fromEntries(ALL_SERVICES.map(s => [s, { si: false, extra: false }])),
    hidden: false,
  });

  /* show credentials */
  const box = document.getElementById('credencialesBox');
  const credEmail = document.getElementById('credEmail');
  const credPass  = document.getElementById('credPass');
  if (box && credEmail && credPass) {
    credEmail.textContent = email;
    credPass.textContent  = pass;
    box.style.display = 'block';
  }

  /* refresh table */
  const tbody = document.getElementById('modelosTbody');
  if (tbody) { tbody.innerHTML = ''; buildModelosTable(); }

  showToast(`Cuenta creada para ${nombre}`, 'success');

  /* clear form after short delay */
  setTimeout(() => {
    ['newNombre','newEdad','newEmail','newPass','newTarifa','newDesc','newTel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    if (box) box.style.display = 'none';
    closeModal('addModeloModal');
  }, 3000);
};

/* ─── Admin ─────────────────────────────────────────────── */
function initAdmin() {
  buildAdminCharts();
  buildActivityTable();
  buildModelosTable();
  buildPendingReviews();
  buildTxTable();
  buildPagosTable();
  buildAdminCalendar();
  buildTodayCitas();
  buildContentGrid();
}

function showAdminPage(page) {
  document.querySelectorAll('.admin-page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(i=>i.classList.remove('active'));
  document.getElementById(`page-${page}`)?.classList.add('active');
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    if (item.getAttribute('onclick')?.includes(page)) item.classList.add('active');
  });
  if (page==='ingresos') buildIngresosChart();
  if (page==='contenido') buildContentGrid();
}

function chartOptions() {
  return {
    responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{ display:false } },
    scales:{
      x:{ ticks:{ color:'#5A5045', font:{size:11} }, grid:{ color:'rgba(201,168,76,.06)' } },
      y:{ ticks:{ color:'#5A5045', font:{size:11} }, grid:{ color:'rgba(201,168,76,.06)' } }
    }
  };
}

function buildAdminCharts() {
  const c1 = document.getElementById('revenueChart');
  if (c1) new Chart(c1,{ type:'line', data:{ labels:['L','M','X','J','V','S','D'], datasets:[{ data:[38000,42000,35000,55000,48000,62000,58000], borderColor:'#C9A84C', backgroundColor:'rgba(201,168,76,.08)', fill:true, tension:.4, pointBackgroundColor:'#C9A84C', pointRadius:4 }] }, options:chartOptions() });
  const c2 = document.getElementById('distChart');
  if (c2) new Chart(c2,{ type:'doughnut', data:{ labels:['Citas','Membresías','Eventos','Referidos'], datasets:[{ data:[45,30,15,10], backgroundColor:['#C9A84C','#4CAF82','#5078C9','#E05050'], borderWidth:0 }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ color:'#A89070', font:{size:11} } } }, cutout:'65%' } });
  const c3 = document.getElementById('citasChart');
  if (c3) new Chart(c3,{ type:'bar', data:{ labels:['L','M','X','J','V','S','D'], datasets:[{ data:[28,35,31,44,52,65,48], backgroundColor:'rgba(201,168,76,.4)', borderColor:'#C9A84C', borderWidth:1, borderRadius:4 }] }, options:chartOptions() });
  const c4 = document.getElementById('membChart');
  if (c4) new Chart(c4,{ type:'line', data:{ labels:['Ene','Feb','Mar','Abr'], datasets:[{ data:[80,95,112,138], borderColor:'#4CAF82', backgroundColor:'rgba(76,175,130,.08)', fill:true, tension:.4, pointBackgroundColor:'#4CAF82', pointRadius:4 }] }, options:chartOptions() });
}

function buildIngresosChart() {
  const ctx = document.getElementById('ingresosChart');
  if (!ctx || ctx.dataset.built) return;
  ctx.dataset.built='1';
  new Chart(ctx,{ type:'bar', data:{ labels:['Ene','Feb','Mar','Abr'], datasets:[ { label:'Citas', data:[85000,92000,108000,124000], backgroundColor:'#C9A84C', borderRadius:4 }, { label:'Membresías', data:[55000,61000,72000,89000], backgroundColor:'#4CAF82', borderRadius:4 }, { label:'Eventos', data:[22000,28000,31000,40000], backgroundColor:'#5078C9', borderRadius:4 } ] }, options:{ ...chartOptions(), plugins:{ legend:{ labels:{ color:'#A89070' } } }, scales:{ x:{ stacked:true, ticks:{color:'#5A5045'}, grid:{color:'rgba(201,168,76,.06)'} }, y:{ stacked:true, ticks:{color:'#5A5045'}, grid:{color:'rgba(201,168,76,.06)'} } } } });
}

function setChartPeriod(period, btn) {
  document.querySelectorAll('.chart-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function buildActivityTable() {
  const tbody = document.getElementById('activityTbody');
  if (!tbody) return;
  [
    ['Nueva cita','Valentina R. / Carlos M.','$2,500','Hoy 14:32','success'],
    ['Membresía Premium','Eduardo L.','$799','Hoy 12:15','success'],
    ['Pago rechazado','Roberto A.','$1,499','Hoy 10:48','error'],
    ['Nuevo perfil','Mariana F.','—','Hoy 09:20','info'],
    ['Cita cancelada','Isabella M.','−$4,500','Ayer 18:05','error'],
    ['Membresía Elite','Héctor F.','$1,499','Ayer 15:30','success'],
  ].forEach(r => {
    tbody.insertAdjacentHTML('beforeend',`
      <tr>
        <td>${r[0]}</td><td style="color:var(--t2)">${r[1]}</td>
        <td style="font-family:var(--font-serif);color:var(--gold)">${r[2]}</td>
        <td style="color:var(--t3)">${r[3]}</td>
        <td><span class="pill ${r[4]==='success'?'pill-available':r[4]==='error'?'pill-busy':'pill-gold'}" style="font-size:.65rem">${r[4]==='success'?'Exitoso':r[4]==='error'?'Fallido':'Info'}</span></td>
      </tr>`);
  });
}

function buildModelosTable() {
  const tbody = document.getElementById('modelosTbody');
  if (!tbody) return;
  const plans = ['Básico','Premium','Elite'];
  MODELS.slice(0, 50).forEach(m => {
    const plan = plans[m.id % 3];
    tbody.insertAdjacentHTML('beforeend',`
      <tr data-model-row="${m.id}">
        <td><div class="table-avatar"><img src="${m.img}" alt="${m.name}" /><div><div class="table-name">${m.name}</div><div class="table-sub">${m.age} años · ${m.nationality}</div></div></div></td>
        <td><span style="color:var(--t2)">${m.zone}</span></td>
        <td>${m.cat}</td>
        <td><span class="pill ${plan==='Elite'?'pill-new':plan==='Premium'?'pill-gold':'pill-available'}" style="font-size:.65rem">${plan}</span></td>
        <td style="font-family:var(--font-serif)">${m.citas}</td>
        <td style="color:var(--gold);font-family:var(--font-serif)">${fmtMXN(m.rate*12)}</td>
        <td><span class="pill ${m.available?'pill-available':'pill-busy'}" style="font-size:.65rem">${m.available?'Activa':'No Disponible'}</span></td>
        <td><div class="table-actions">
          <button class="tbl-btn" onclick="window.open('perfil.html?id=${m.id}')" title="Ver perfil"><i class="fas fa-eye"></i></button>
          <button class="tbl-btn" onclick="editModel(${m.id})" title="Editar"><i class="fas fa-edit"></i></button>
          <button class="tbl-btn" onclick="openModelContent(${m.id})" title="Contenido"><i class="fas fa-photo-video"></i></button>
          <button class="tbl-btn" onclick="toggleHideModel(${m.id},this)" title="${m.hidden?'Mostrar':'Ocultar'}" style="${m.hidden?'color:var(--gold)':''}"><i class="fas fa-${m.hidden?'eye':'eye-slash'}"></i></button>
          <button class="tbl-btn danger" onclick="deleteModel(${m.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
        </div></td>
      </tr>`);
  });
}

/* Admin: content grid */
function buildContentGrid(filterQ) {
  const grid = document.getElementById('contentModelGrid');
  if (!grid) return;
  const q = (filterQ || '').toLowerCase();
  const list = q ? MODELS.filter(m => m.name.toLowerCase().includes(q)) : MODELS.slice(0, 40);
  grid.innerHTML = '';
  list.forEach(m => {
    const photoCount = m.photos?.length || 1;
    grid.insertAdjacentHTML('beforeend', `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;transition:var(--transition)"
           onmouseenter="this.style.borderColor='var(--border-h)'" onmouseleave="this.style.borderColor='var(--border)'">
        <div style="position:relative">
          <img src="${m.img}" alt="${m.name}" style="width:100%;aspect-ratio:4/3;object-fit:cover" />
          ${m.hidden ? '<div style="position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center"><span class="pill pill-busy" style="font-size:.7rem"><i class="fas fa-eye-slash"></i> Oculta</span></div>' : ''}
        </div>
        <div style="padding:.85rem">
          <div style="font-size:.88rem;font-weight:600;margin-bottom:.25rem">${m.name}</div>
          <div style="font-size:.75rem;color:var(--t3);margin-bottom:.65rem">${photoCount} foto${photoCount!==1?'s':''} · ${m.hasVideo?'1 video':'Sin video'}</div>
          <button class="btn btn-gold btn-sm w-full" style="justify-content:center" onclick="openModelContent(${m.id})">
            <i class="fas fa-photo-video"></i> Gestionar
          </button>
        </div>
      </div>`);
  });
}

function filterContentGrid(q) {
  buildContentGrid(q);
}

/* Admin: editar modelo */
function editModel(id) {
  const m = MODELS.find(x => x.id === id);
  if (!m) return;

  let modal = document.getElementById('editModelModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'editModelModal';
    modal.innerHTML = `
      <div class="modal" style="max-width:620px;max-height:90vh;overflow-y:auto">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-edit" style="color:var(--gold)"></i> Editar Perfil</h3>
          <button class="modal-close" onclick="closeModal('editModelModal')"><i class="fas fa-times"></i></button>
        </div>
        <div id="editModelForm"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  }

  document.getElementById('editModelForm').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem 1rem">
      <div class="form-group"><label class="form-label">Nombre</label><input type="text" class="form-input" id="edit-name" value="${m.name}" /></div>
      <div class="form-group"><label class="form-label">Edad</label><input type="number" class="form-input" id="edit-age" value="${m.age}" min="18" max="60" /></div>
      <div class="form-group"><label class="form-label">Zona</label>
        <select class="form-input filter-select" id="edit-zone">${ZONES.map(z=>`<option${z===m.zone?' selected':''}>${z}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Categoría</label>
        <select class="form-input filter-select" id="edit-cat">${CATS.map(c=>`<option${c===m.cat?' selected':''}>${c}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Tarifa/hr ($MXN)</label><input type="number" class="form-input" id="edit-rate" value="${m.rate}" /></div>
      <div class="form-group"><label class="form-label">Altura (cm)</label><input type="number" class="form-input" id="edit-height" value="${m.height}" /></div>
      <div class="form-group"><label class="form-label">Nacionalidad</label><input type="text" class="form-input" id="edit-nationality" value="${m.nationality}" /></div>
      <div class="form-group"><label class="form-label">Disponibilidad</label>
        <select class="form-input filter-select" id="edit-available">
          <option value="true"${m.available?' selected':''}>Disponible</option>
          <option value="false"${!m.available?' selected':''}>No Disponible</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Color de cabello</label>
        <select class="form-input filter-select" id="edit-hairColor">${HAIR_COLORS.map(c=>`<option${c===m.hairColor?' selected':''}>${c}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Color de ojos</label>
        <select class="form-input filter-select" id="edit-eyeColor">${EYE_COLORS.map(c=>`<option${c===m.eyeColor?' selected':''}>${c}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Color de piel</label>
        <select class="form-input filter-select" id="edit-skinColor">${SKIN_COLORS.map(c=>`<option${c===m.skinColor?' selected':''}>${c}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Cintura (cm)</label><input type="number" class="form-input" id="edit-waist" value="${m.waist}" /></div>
      <div class="form-group"><label class="form-label">Caderas (cm)</label><input type="number" class="form-input" id="edit-hips" value="${m.hips}" /></div>
      <div class="form-group"><label class="form-label">Busto (cm)</label><input type="number" class="form-input" id="edit-bust" value="${m.bust}" /></div>
      <div class="form-group"><label class="form-label">Promo — badge (ej. "20% OFF")</label><input type="text" class="form-input" id="edit-promoBadge" value="${m.promo?.badge||''}" placeholder="Vacío = sin promo" /></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Promo — título</label><input type="text" class="form-input" id="edit-promoTitle" value="${m.promo?.title||''}" /></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Promo — descripción</label><input type="text" class="form-input" id="edit-promoDesc" value="${m.promo?.desc||''}" /></div>
      <div class="form-group"><label class="form-label">Descuento (%)</label><input type="number" class="form-input" id="edit-promoDisc" value="${m.promo?.discount||0}" min="0" max="90" /></div>
      <div class="form-group"><label class="form-label">Válido hasta</label><input type="text" class="form-input" id="edit-promoValid" value="${m.promo?.validUntil||''}" placeholder="ej. 31 May 2026" /></div>
    </div>
    <!-- Servicios -->
    <div style="border-top:1px solid var(--border);margin:.75rem 0 .5rem;padding-top:.85rem">
      <p style="font-size:.7rem;color:var(--gold);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem"><i class="fas fa-list-check"></i> Servicios</p>
      <div style="display:grid;grid-template-columns:1fr auto auto;gap:.4rem .75rem;align-items:center">
        <div style="font-size:.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:.05em">Servicio</div>
        <div style="font-size:.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;text-align:center">Sí</div>
        <div style="font-size:.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;text-align:center">Extra</div>
        ${ALL_SERVICES.map(s => {
          const cur = m.services?.[s] || { si: false, extra: false };
          const key = s.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'');
          return `
        <div style="font-size:.82rem">${s}</div>
        <div style="text-align:center"><input type="checkbox" id="esvc-si-${key}" ${cur.si?'checked':''} style="accent-color:var(--gold);width:16px;height:16px;cursor:pointer"
             onchange="document.getElementById('esvc-extra-${key}').disabled=!this.checked;if(!this.checked)document.getElementById('esvc-extra-${key}').checked=false" /></div>
        <div style="text-align:center"><input type="checkbox" id="esvc-extra-${key}" ${cur.extra?'checked':''} ${!cur.si?'disabled':''} style="accent-color:var(--gold);width:16px;height:16px;cursor:pointer" /></div>`;
        }).join('')}
      </div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1.25rem;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="closeModal('editModelModal')">Cancelar</button>
      <button class="btn btn-gold" onclick="saveEditModel(${id})"><i class="fas fa-save"></i> Guardar cambios</button>
    </div>`;

  openModal('editModelModal');
}

function saveEditModel(id) {
  const idx = MODELS.findIndex(x => x.id === id);
  if (idx === -1) return;
  const m = MODELS[idx];
  const g = (elId) => document.getElementById(elId);

  m.name        = g('edit-name')?.value.trim()        || m.name;
  m.age         = parseInt(g('edit-age')?.value)       || m.age;
  m.zone        = g('edit-zone')?.value                || m.zone;
  m.cat         = g('edit-cat')?.value                 || m.cat;
  m.rate        = parseInt(g('edit-rate')?.value)      || m.rate;
  m.height      = parseInt(g('edit-height')?.value)    || m.height;
  m.nationality = g('edit-nationality')?.value.trim()  || m.nationality;
  m.available   = g('edit-available')?.value === 'true';
  m.hairColor   = g('edit-hairColor')?.value  || m.hairColor;
  m.eyeColor    = g('edit-eyeColor')?.value   || m.eyeColor;
  m.skinColor   = g('edit-skinColor')?.value  || m.skinColor;
  m.waist       = parseInt(g('edit-waist')?.value)     || m.waist;
  m.hips        = parseInt(g('edit-hips')?.value)      || m.hips;
  m.bust        = parseInt(g('edit-bust')?.value)      || m.bust;

  /* services */
  const newServices = {};
  ALL_SERVICES.forEach(s => {
    const key = s.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'');
    const siEl    = document.getElementById(`esvc-si-${key}`);
    const extraEl = document.getElementById(`esvc-extra-${key}`);
    newServices[s] = { si: !!(siEl?.checked), extra: !!(extraEl?.checked) };
  });
  m.services = newServices;

  const badge = g('edit-promoBadge')?.value.trim();
  if (badge) {
    m.promo = {
      badge,
      title:     g('edit-promoTitle')?.value.trim() || '',
      desc:      g('edit-promoDesc')?.value.trim()  || '',
      discount:  parseInt(g('edit-promoDisc')?.value) || 0,
      validUntil:g('edit-promoValid')?.value.trim() || '—',
    };
  } else {
    m.promo = null;
  }

  closeModal('editModelModal');
  const tbody = document.getElementById('modelosTbody');
  if (tbody) { tbody.innerHTML = ''; buildModelosTable(); }
  showToast(`Perfil de ${m.name} actualizado`, 'success');
}

/* Admin: eliminar modelo */
function deleteModel(id) {
  const m = MODELS.find(x => x.id === id);
  if (!m) return;

  let modal = document.getElementById('confirmDeleteModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'confirmDeleteModal';
    modal.innerHTML = `
      <div class="modal" style="max-width:400px">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fas fa-trash" style="color:var(--red)"></i> Eliminar perfil</h3>
          <button class="modal-close" onclick="closeModal('confirmDeleteModal')"><i class="fas fa-times"></i></button>
        </div>
        <div id="confirmDeleteContent"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  }

  document.getElementById('confirmDeleteContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;padding:.75rem;background:var(--surface);border-radius:var(--r-md)">
      <img src="${m.img}" alt="${m.name}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid var(--border-h)" />
      <div><div style="font-weight:600">${m.name}</div><div style="font-size:.78rem;color:var(--t2)">${m.zone} · ${m.cat}</div></div>
    </div>
    <p style="color:var(--t2);margin-bottom:1.5rem;font-size:.88rem">¿Eliminar este perfil permanentemente? Esta acción no se puede deshacer.</p>
    <div style="display:flex;gap:.75rem;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="closeModal('confirmDeleteModal')">Cancelar</button>
      <button class="btn" style="background:var(--red);color:#fff;border-color:var(--red)" onclick="confirmDeleteModel(${id})"><i class="fas fa-trash"></i> Eliminar</button>
    </div>`;

  openModal('confirmDeleteModal');
}

function confirmDeleteModel(id) {
  const idx = MODELS.findIndex(x => x.id === id);
  if (idx === -1) return;
  const name = MODELS[idx].name;
  MODELS.splice(idx, 1);
  closeModal('confirmDeleteModal');
  const tbody = document.getElementById('modelosTbody');
  if (tbody) { tbody.innerHTML = ''; buildModelosTable(); }
  showToast(`Perfil de ${name} eliminado`, 'info');
}

/* Admin: ocultar/mostrar modelo */
function toggleHideModel(id, btn) {
  const m = MODELS.find(x => x.id === id);
  if (!m) return;
  m.hidden = !m.hidden;
  const icon = btn.querySelector('i');
  icon.className = `fas fa-${m.hidden ? 'eye' : 'eye-slash'}`;
  btn.style.color = m.hidden ? 'var(--gold)' : '';
  btn.title = m.hidden ? 'Mostrar' : 'Ocultar';
  showToast(m.hidden ? `${m.name} ocultada del sitio` : `${m.name} visible en el sitio`, m.hidden ? 'info' : 'success');
}

/* Admin: gestión de contenido (fotos/videos) */
function openModelContent(id) {
  const m = MODELS.find(x => x.id === id);
  if (!m) return;

  let modal = document.getElementById('modelContentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'modelContentModal';
    modal.innerHTML = `
      <div class="modal" style="max-width:700px;max-height:90vh;overflow-y:auto">
        <div class="modal-header">
          <h3 class="modal-title" id="mcModalTitle"><i class="fas fa-photo-video" style="color:var(--gold)"></i> Contenido</h3>
          <button class="modal-close" onclick="closeModal('modelContentModal')"><i class="fas fa-times"></i></button>
        </div>
        <div id="modelContentBody"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  }

  document.getElementById('mcModalTitle').innerHTML = `<i class="fas fa-photo-video" style="color:var(--gold)"></i> Contenido — ${m.name}`;
  renderModelContent(m);
  openModal('modelContentModal');
}

function renderModelContent(m) {
  const body = document.getElementById('modelContentBody');
  if (!body) return;

  const photosHTML = m.photos.map((src, i) => `
    <div style="position:relative;border-radius:var(--r-md);overflow:hidden;background:var(--surface)">
      <img src="${src}" alt="foto ${i+1}" style="width:100%;aspect-ratio:1;object-fit:cover" />
      <button onclick="removeModelPhoto(${m.id},${i})"
              style="position:absolute;top:.4rem;right:.4rem;background:rgba(224,80,80,.9);color:#fff;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.75rem">
        <i class="fas fa-times"></i>
      </button>
    </div>`).join('');

  body.innerHTML = `
    <div style="margin-bottom:1.5rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
        <h4 style="font-size:.9rem">Fotos del perfil</h4>
        <label class="btn btn-gold btn-sm" style="cursor:pointer">
          <i class="fas fa-plus"></i> Agregar foto
          <input type="file" accept="image/*" multiple style="display:none" onchange="addModelPhotos(${m.id},this)" />
        </label>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem">
        ${photosHTML}
        <div style="aspect-ratio:1;border:2px dashed var(--border);border-radius:var(--r-md);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;color:var(--t3);cursor:pointer;transition:var(--transition)"
             onclick="this.querySelector('input').click()"
             onmouseenter="this.style.borderColor='var(--gold)'" onmouseleave="this.style.borderColor='var(--border)'">
          <i class="fas fa-plus" style="font-size:1.2rem"></i>
          <span style="font-size:.72rem">Agregar</span>
          <input type="file" accept="image/*" multiple style="display:none" onchange="addModelPhotos(${m.id},this)" />
        </div>
      </div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:1.25rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem">
        <h4 style="font-size:.9rem">Videos</h4>
        <label class="btn btn-outline btn-sm" style="cursor:pointer">
          <i class="fas fa-video"></i> Agregar video
          <input type="file" accept="video/*" style="display:none" onchange="addModelVideo(${m.id},this)" />
        </label>
      </div>
      ${m.hasVideo
        ? `<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r-md);padding:1rem;display:flex;align-items:center;gap:.75rem">
             <i class="fas fa-film" style="color:var(--gold);font-size:1.2rem"></i>
             <div style="flex:1"><div style="font-size:.85rem">video_perfil.mp4</div><div style="font-size:.75rem;color:var(--t3)">Video activo</div></div>
             <button onclick="removeModelVideo(${m.id})" class="btn btn-ghost btn-sm"><i class="fas fa-trash" style="color:var(--red)"></i></button>
           </div>`
        : `<p style="color:var(--t3);font-size:.85rem;text-align:center;padding:1.5rem">Sin videos. Agrega uno para destacar el perfil.</p>`}
    </div>`;
}

function addModelPhotos(id, input) {
  const m = MODELS.find(x => x.id === id);
  if (!m || !input.files.length) return;
  const files = Array.from(input.files).slice(0, 6 - m.photos.length);
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    m.photos.push(url);
  });
  renderModelContent(m);
  showToast(`${files.length} foto(s) agregada(s)`, 'success');
}

function removeModelPhoto(id, idx) {
  const m = MODELS.find(x => x.id === id);
  if (!m || m.photos.length <= 1) { showToast('Debe quedar al menos 1 foto', 'info'); return; }
  m.photos.splice(idx, 1);
  if (idx === 0) m.img = m.photos[0];
  renderModelContent(m);
  showToast('Foto eliminada', 'info');
}

function addModelVideo(id, input) {
  const m = MODELS.find(x => x.id === id);
  if (!m || !input.files[0]) return;
  m.hasVideo = true;
  renderModelContent(m);
  showToast('Video agregado', 'success');
}

function removeModelVideo(id) {
  const m = MODELS.find(x => x.id === id);
  if (!m) return;
  m.hasVideo = false;
  renderModelContent(m);
  showToast('Video eliminado', 'info');
}

function buildPendingReviews() {
  const list = document.getElementById('pendingReviewsList');
  if (!list) return;
  REVIEWS_DATA.slice(0,4).forEach(r => {
    list.insertAdjacentHTML('beforeend',`
      <div class="chart-card" style="margin-bottom:0">
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          <div class="review-avatar">${r.initials}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.4rem;flex-wrap:wrap">
              <strong>${r.name}</strong><div class="stars">${stars(r.rating)}</div>
              <span style="color:var(--t3);font-size:.72rem">${r.date}</span>
            </div>
            <p style="font-size:.85rem;color:var(--t2)">${r.text}</p>
            <div style="display:flex;gap:.5rem;margin-top:.6rem">
              <button class="btn btn-sm" style="background:rgba(76,175,130,.12);color:var(--green);border:1px solid rgba(76,175,130,.3)" onclick="this.closest('.chart-card').style.opacity='.4';this.closest('.chart-card').style.pointerEvents='none';showToast('Reseña aprobada','success')"><i class="fas fa-check"></i> Aprobar</button>
              <button class="btn btn-sm" style="background:rgba(224,80,80,.1);color:var(--red);border:1px solid rgba(224,80,80,.25)" onclick="this.closest('.chart-card').remove();showToast('Reseña rechazada','info')"><i class="fas fa-times"></i> Rechazar</button>
            </div>
          </div>
        </div>
      </div>`);
  });
}

function buildTxTable() {
  const tbody = document.getElementById('txTbody');
  if (!tbody) return;
  [['#4821','Valentina R.','Cita 1hr','$2,500','$500','17 Abr','Tarjeta'],
   ['#4820','Carlos M.','Membresía Premium','$799','$160','17 Abr','OXXO'],
   ['#4819','Renata P.','Cita 3hr','$6,500','$1,300','16 Abr','SPEI'],
   ['#4818','Ximena A.','Cita Día','$18,000','$3,600','16 Abr','Tarjeta'],
   ['#4817','Andrea T.','Membresía Elite','$1,499','$300','15 Abr','Tarjeta'],
  ].forEach(r => {
    tbody.insertAdjacentHTML('beforeend',`<tr><td style="color:var(--t3)">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td style="color:var(--gold);font-family:var(--font-serif)">${r[3]}</td><td style="color:var(--green)">${r[4]}</td><td style="color:var(--t3)">${r[5]}</td><td><span class="pill pill-available" style="font-size:.65rem">${r[6]}</span></td></tr>`);
  });
}

function buildPagosTable() {
  const tbody = document.getElementById('pagosTbody');
  if (!tbody) return;
  [['#P001','Carlos M.','Membresía Premium','$799','Tarjeta','Aprobado','17 Abr'],
   ['#P002','Roberto A.','Membresía Elite','$1,499','SPEI','Pendiente','17 Abr'],
   ['#P003','Eduardo L.','Cita Valentina R.','$2,500','OXXO','Aprobado','16 Abr'],
  ].forEach(r => {
    tbody.insertAdjacentHTML('beforeend',`<tr><td style="color:var(--t3)">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td style="color:var(--gold);font-family:var(--font-serif)">${r[3]}</td><td>${r[4]}</td><td><span class="pill ${r[5]==='Aprobado'?'pill-available':'pill-gold'}" style="font-size:.65rem">${r[5]}</span></td><td style="color:var(--t3)">${r[6]}</td></tr>`);
  });
}

let adminCalDate = new Date();
function buildAdminCalendar() {
  renderAdminCalendar();
  document.getElementById('adminCalPrev')?.addEventListener('click', () => { adminCalDate = new Date(adminCalDate.getFullYear(),adminCalDate.getMonth()-1,1); renderAdminCalendar(); });
  document.getElementById('adminCalNext')?.addEventListener('click', () => { adminCalDate = new Date(adminCalDate.getFullYear(),adminCalDate.getMonth()+1,1); renderAdminCalendar(); });
}

function renderAdminCalendar() {
  const grid = document.getElementById('adminCalGrid');
  const label = document.getElementById('adminCalLabel');
  if (!grid) return;
  const yr=adminCalDate.getFullYear(), mo=adminCalDate.getMonth();
  const today=new Date();
  label.textContent=adminCalDate.toLocaleDateString('es-MX',{month:'long',year:'numeric'});
  const first=new Date(yr,mo,1).getDay(), dim=new Date(yr,mo+1,0).getDate();
  let html='';
  for(let i=0;i<first;i++) html+='<div class="calendar-day empty"></div>';
  for(let d=1;d<=dim;d++){
    const isToday=new Date(yr,mo,d).toDateString()===today.toDateString();
    const count=Math.floor(((d*13+mo*7)%8));
    html+=`<div class="calendar-day${isToday?' today':''}" title="${count} citas">${d}${count>0?`<br><span style="font-size:.58rem;color:var(--gold)">${count}</span>`:''}</div>`;
  }
  grid.innerHTML=html;
}

function buildTodayCitas() {
  const w=document.getElementById('todayCitas');
  if(!w)return;
  [['Valentina R.','Carlos M.','10:00','1hr'],['Renata P.','Eduardo L.','14:00','3hr'],['Camila V.','Javier R.','17:30','1hr']].forEach(c=>{
    w.insertAdjacentHTML('beforeend',`<div style="padding:.75rem;background:var(--surface);border-radius:var(--r-md);border:1px solid var(--border)"><div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.2rem"><strong>${c[0]}</strong><span style="color:var(--gold)">${c[2]}</span></div><div style="font-size:.75rem;color:var(--t2)">${c[1]} · ${c[3]}</div></div>`);
  });
}

/* ─── Panel Doncellas ───────────────────────────────────── */
function initPanelModelo() {
  buildModeloCharts();
  buildCurrentGallery();
  buildCitasProximas();
  buildCitasHistorial();
  buildAvailWeekGrid();
  buildReferidosTable();
}

function showModeloPage(page) {
  document.querySelectorAll('.admin-page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(i=>i.classList.remove('active'));
  document.getElementById(`page-${page}`)?.classList.add('active');
  document.querySelectorAll('.admin-nav-item').forEach(item=>{
    if(item.getAttribute('onclick')?.includes(page)) item.classList.add('active');
  });
}

function buildModeloCharts() {
  const c1=document.getElementById('modeloRevenueChart');
  if(c1) new Chart(c1,{type:'bar',data:{labels:['L','M','X','J','V','S','D'],datasets:[{data:[2500,0,3200,2500,6500,8000,2500],backgroundColor:'rgba(201,168,76,.5)',borderColor:'#C9A84C',borderWidth:1,borderRadius:4}]},options:chartOptions()});
  const c2=document.getElementById('contactSourceChart');
  if(c2) new Chart(c2,{type:'doughnut',data:{labels:['WhatsApp','Búsqueda','Referido','Directo'],datasets:[{data:[55,25,12,8],backgroundColor:['#25D366','#C9A84C','#5078C9','#9050C0'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:'#A89070',font:{size:10}}}},cutout:'60%'}});
  const c3=document.getElementById('visitasChart');
  if(c3) new Chart(c3,{type:'line',data:{labels:['L','M','X','J','V','S','D'],datasets:[{data:[120,145,132,178,195,220,180],borderColor:'#5078C9',backgroundColor:'rgba(80,120,201,.08)',fill:true,tension:.4,pointBackgroundColor:'#5078C9',pointRadius:3}]},options:chartOptions()});
}

function buildCurrentGallery() {
  const g=document.getElementById('currentGallery');
  if(!g)return;
  GALLERY_MEDIA.slice(0,6).forEach((item,i)=>{
    g.insertAdjacentHTML('beforeend',`
      <div class="upload-preview-item" style="aspect-ratio:1">
        <img src="${item.thumb}" alt="Media ${i+1}" />
        ${item.type==='video'?`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4)"><i class="fas fa-play" style="color:#fff;font-size:.9rem"></i></div>`:''}
        <button class="upload-preview-remove" onclick="this.closest('.upload-preview-item').remove();showToast('Eliminado','info')"><i class="fas fa-times"></i></button>
      </div>`);
  });
}

function buildCitasProximas() {
  const w=document.getElementById('citasProximas');
  if(!w)return;
  [['Carlos M.','Vie 18 Abr','10:00','1hr','Universitaria','$2,500'],
   ['Eduardo L.','Sáb 19 Abr','14:00','3hr','Fit','$6,500'],
   ['Roberto A.','Lun 21 Abr','17:00','1hr','Jovencita','$2,500'],
  ].forEach(c=>{
    w.insertAdjacentHTML('beforeend',`
      <div class="cita-item">
        <div class="cita-date"><div class="day">${c[1].split(' ')[1]}</div><div class="month">${c[1].split(' ')[2]} ${c[1].split(' ')[3]}</div></div>
        <div class="cita-info"><h4>${c[0]}</h4><p>${c[2]} · ${c[3]} · ${c[4]}</p></div>
        <div style="text-align:right">
          <div style="font-family:var(--font-serif);color:var(--gold)">${c[5]}</div>
          <div style="display:flex;gap:.4rem;margin-top:.4rem">
            <button class="btn btn-wa btn-sm" onclick="window.open('https://wa.me/523312345678')"><i class="fab fa-whatsapp"></i></button>
            <button class="btn btn-outline btn-sm">Cancelar</button>
          </div>
        </div>
      </div>`);
  });
}

function buildCitasHistorial() {
  const w=document.getElementById('citasHistorial');
  if(!w)return;
  [['Héctor F.','Mié 16 Abr','11:00','1hr','$2,500','Completada'],
   ['Javier R.','Lun 14 Abr','15:00','3hr','$6,500','Completada'],
   ['Miguel S.','Sáb 12 Abr','09:00','Día','$18,000','Completada'],
   ['Luis P.',  'Jue 10 Abr','18:00','1hr','$2,500', 'Cancelada'],
  ].forEach(c=>{
    w.insertAdjacentHTML('beforeend',`
      <div class="cita-item">
        <div class="cita-date"><div class="day">${c[1].split(' ')[1]}</div><div class="month">${c[1].split(' ')[2]} ${c[1].split(' ')[3]}</div></div>
        <div class="cita-info"><h4>${c[0]}</h4><p>${c[2]} · ${c[3]}</p></div>
        <div style="text-align:right">
          <div style="font-family:var(--font-serif);color:var(--gold)">${c[4]}</div>
          <span class="pill ${c[5]==='Completada'?'pill-available':'pill-busy'}" style="font-size:.65rem;margin-top:.35rem">${c[5]}</span>
        </div>
      </div>`);
  });
}

function buildAvailWeekGrid() {
  const g=document.getElementById('availWeekGrid');
  if(!g)return;
  const days=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const times=['08:00','10:00','12:00','14:00','16:00','18:00','20:00'];
  let html='<div class="week-col-header"></div>';
  days.forEach(d=>html+=`<div class="week-col-header">${d}</div>`);
  times.forEach((t,ti)=>{
    html+=`<div class="week-time">${t}</div>`;
    days.forEach((_,di)=>{
      const on=(ti+di)%3!==0;
      html+=`<div class="week-slot${on?' on':''}" onclick="this.classList.toggle('on')"></div>`;
    });
  });
  g.innerHTML=html;
}

function buildReferidosTable() {
  const tbody=document.getElementById('referidosTbody');
  if(!tbody)return;
  [['Sofía L.','15 Mar 2026','Premium','Activa','$800'],
   ['Mariana F.','01 Feb 2026','Básico','Activa','$300'],
   ['Daniela C.','20 Ene 2026','Elite','Activa','$1,500'],
   ['Luisa G.','05 Dic 2025','Premium','Activa','$800'],
  ].forEach(r=>{
    tbody.insertAdjacentHTML('beforeend',`<tr><td>${r[0]}</td><td style="color:var(--t3)">${r[1]}</td><td><span class="pill ${r[2]==='Elite'?'pill-new':r[2]==='Premium'?'pill-gold':'pill-available'}" style="font-size:.65rem">${r[2]}</span></td><td><span class="pill ${r[3]==='Activa'?'pill-available':'pill-busy'}" style="font-size:.65rem">${r[3]}</span></td><td style="color:var(--gold);font-family:var(--font-serif)">${r[4]}</td></tr>`);
  });
}

/* File upload */
function handleFileUpload(e) {
  const grid=document.getElementById('uploadPreviewGrid');
  if(!grid)return;
  Array.from(e.target?.files||e.dataTransfer?.files||[]).forEach(file=>{
    if(!file.type.startsWith('image/')&&!file.type.startsWith('video/'))return;
    const reader=new FileReader();
    reader.onload=ev=>{
      const item=document.createElement('div');
      item.className='upload-preview-item';
      const isVid=file.type.startsWith('video/');
      item.innerHTML=`
        ${isVid
          ? `<video src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover"></video><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4)"><i class="fas fa-play" style="color:#fff"></i></div>`
          : `<img src="${ev.target.result}" alt="${file.name}" />`}
        <button class="upload-preview-remove" onclick="this.closest('.upload-preview-item').remove()"><i class="fas fa-times"></i></button>`;
      grid.appendChild(item);
    };
    reader.readAsDataURL(file);
  });
  showToast(`${(e.target?.files||e.dataTransfer?.files||[]).length} archivo(s) cargado(s)`,'success');
}

document.addEventListener('DOMContentLoaded',()=>{
  const zone=document.getElementById('uploadZone');
  if(!zone)return;
  zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('drag-over');});
  zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
  zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('drag-over');handleFileUpload(e);});
});

/* ─── Membresias ────────────────────────────────────────── */
function initMembresias() { buildFAQ(); }

function buildFAQ() {
  const list=document.getElementById('faqList');
  if(!list)return;
  FAQ_DATA.forEach((item,i)=>{
    list.insertAdjacentHTML('beforeend',`
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFAQ(this,${i})">${item.q}<i class="fas fa-chevron-down arrow"></i></div>
        <div class="faq-a" id="faq-a-${i}"><div class="faq-a-inner">${item.a}</div></div>
      </div>`);
  });
}

function toggleFAQ(btn,i){
  const ans=document.getElementById(`faq-a-${i}`);
  const isOpen=ans.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a=>a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q=>q.classList.remove('open'));
  if(!isOpen){ans.classList.add('open');btn.classList.add('open');}
}

/* ─── Generic tabs ──────────────────────────────────────── */
function switchTab(prefix,tab,btn){
  document.querySelectorAll(`[id^="${prefix}-"]`).forEach(p=>p.classList.remove('active'));
  btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(`${prefix}-${tab}`)?.classList.add('active');
  btn.classList.add('active');
}

/* ─── Quick View ────────────────────────────────────────── */
window.openQuickView = function(id) {
  const m = MODELS.find(x => x.id === id);
  if (!m) return;
  const modal = document.getElementById('quickViewModal');
  const nameEl = document.getElementById('qvName');
  const content = document.getElementById('quickViewContent');
  if (!modal || !content) return;
  if (nameEl) nameEl.textContent = m.name;
  content.innerHTML = `
    <div class="qv-grid">
      <div>
        <img src="${m.img}" alt="${m.name}"
             style="width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:var(--r-lg);border:1px solid var(--border)" />
      </div>
      <div style="display:flex;flex-direction:column;gap:.75rem">
        <div>
          <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;margin-bottom:.4rem">
            <span class="pill ${m.available ? 'pill-available' : 'pill-busy'}" style="font-size:.65rem">${m.available ? 'Disponible' : 'No Disponible'}</span>
            ${m.promo ? `<span class="pill pill-gold" style="font-size:.65rem">🔥 ${m.promo.badge}</span>` : ''}
          </div>
          <div style="font-size:.82rem;color:var(--t2)"><i class="fas fa-map-marker-alt" style="color:var(--gold)"></i> ${m.zone} · ${m.cat}</div>
          <div class="stars" style="margin-top:.35rem;font-size:.8rem">${stars(m.rating)} <span style="color:var(--t2);font-size:.75rem">${m.rating}</span></div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:.75rem">
          <div style="font-size:.7rem;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem">Tarifas</div>
          <div style="display:flex;flex-direction:column;gap:.3rem">
            <div style="display:flex;justify-content:space-between;font-size:.9rem">
              <span style="color:var(--t2)">1 hora</span>
              <span style="color:var(--gold);font-family:var(--font-serif);font-weight:700">${fmtMXN(m.rate)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.9rem">
              <span style="color:var(--t2)">2 horas</span>
              <span style="color:var(--gold);font-family:var(--font-serif);font-weight:700">${fmtMXN(Math.round(m.rate * 1.85))}</span>
            </div>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:.75rem">
          <div style="font-size:.7rem;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem">Especialidades</div>
          <div style="display:flex;flex-wrap:wrap;gap:.35rem">
            ${m.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        ${m.promo ? `
        <div style="background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.25);border-radius:var(--r-md);padding:.75rem">
          <div style="font-size:.75rem;font-weight:700;color:var(--gold);margin-bottom:.2rem">🔥 ${m.promo.title}</div>
          <div style="font-size:.78rem;color:var(--t2)">${m.promo.desc}</div>
          <div style="margin-top:.4rem;font-size:.82rem">
            <span style="color:var(--t3);text-decoration:line-through">${fmtMXN(m.rate)}/hr</span>
            <span style="color:var(--gold);font-weight:700;margin-left:.5rem">${fmtMXN(Math.round(m.rate * (1 - m.promo.discount / 100)))}/hr</span>
          </div>
        </div>` : ''}
        <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:auto">
          <a href="perfil.html?id=${m.id}" class="btn btn-gold" style="justify-content:center">
            <i class="fas fa-user"></i> Ver perfil completo
          </a>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
            <button class="btn btn-wa" style="justify-content:center"
                    onclick="window.open('https://wa.me/523312345678?text=Hola%2C%20me%20interesa%20${encodeURIComponent(m.name)}','_blank')">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </button>
            <a href="https://t.me/doncellas" target="_blank" class="btn btn-telegram" style="justify-content:center">
              <i class="fab fa-telegram"></i> Telegram
            </a>
          </div>
        </div>
      </div>
    </div>`;
  openModal('quickViewModal');
};

/* ─── Fullscreen keyboard navigation ───────────────────── */
document.addEventListener('keydown', e => {
  const viewer = document.getElementById('fullscreenViewer');
  if (!viewer || viewer.style.display === 'none') return;
  if (e.key === 'Escape')      closeFullscreen();
  if (e.key === 'ArrowLeft')   navigateFullscreen(-1);
  if (e.key === 'ArrowRight')  navigateFullscreen(1);
});

/* ─── Auto-init ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  const path=window.location.pathname.split('/').pop();
  if(path==='index.html'||path===''||path==='/') initIndex();
  else if(path==='modelos.html')    initModelos();
  else if(path==='categorias.html') initCategorias();
  else if(path==='perfil.html')     initPerfil();
  else if(path==='membresias.html') initMembresias();
  else if(path==='panel-admin.html')  initAdmin();
  else if(path==='panel-modelo.html') initPanelModelo();
});
