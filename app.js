/* ============================================================
   VELVETSTAGE — app.js  v3
   100 modelos · Login por rol · Galería · Promos · Admin CRUD
   ============================================================ */
'use strict';

/* ─── Usuarios / Login ──────────────────────────────────── */
const USERS = [
  { username:'admin',     pass:'admin123',  role:'admin',  name:'Administrador', redirect:'panel-admin.html' },
  { username:'valentina', pass:'modelo123', role:'modelo', name:'Valentina R.',  redirect:'panel-modelo.html' },
  { username:'camila',    pass:'modelo123', role:'modelo', name:'Camila V.',     redirect:'panel-modelo.html' },
  { username:'isabella',  pass:'modelo123', role:'modelo', name:'Isabella M.',   redirect:'panel-modelo.html' },
];

async function doLogin() {
  const username = document.getElementById('loginEmail')?.value.trim().toLowerCase();
  const pass     = document.getElementById('loginPass')?.value;
  const errEl    = document.getElementById('loginError');
  if (!username || !pass) return;

  /* 1. Admin y demos hardcodeados */
  const hardUser = USERS.find(u => u.username === username && u.pass === pass);
  if (hardUser) {
    if (errEl) errEl.style.display = 'none';
    sessionStorage.setItem('userRole',   hardUser.role);
    sessionStorage.setItem('userNombre', hardUser.name);
    showToast(`Bienvenida, ${hardUser.name}`, 'success');
    setTimeout(() => { window.location.href = hardUser.redirect; }, 800);
    return;
  }

  /* 2. Escorts reales en Supabase */
  if (window.sbClient) {
    const { data } = await window.sbClient
      .from('usuarios')
      .select('*, escorts(id, nombre)')
      .eq('username', username)
      .eq('password', pass)
      .eq('activo', true)
      .maybeSingle();

    if (data) {
      if (errEl) errEl.style.display = 'none';
      sessionStorage.setItem('userRole',   'modelo');
      sessionStorage.setItem('userNombre', data.escorts?.nombre || 'Doncella');
      sessionStorage.setItem('escortId',   data.escort_id);
      showToast(`Bienvenida, ${data.escorts?.nombre || 'Doncella'} 🌹`, 'success');
      setTimeout(() => { window.location.href = 'panel-modelo.html'; }, 800);
      return;
    }
  }

  /* 3. Credenciales incorrectas */
  if (errEl) errEl.style.display = 'block';
  if (document.getElementById('loginPass')) document.getElementById('loginPass').value = '';
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

/* ─── Pool de promos (6 plantillas realistas) ──────────── */
/* Inspiradas en lo que ofrece la competencia (Pasarela, Golden, etc.):
   tiempo extra, mañaneros, primera cita, paquetes y cliente frecuente.
   Tono elegante acorde a la marca premium. */
const PROMO_POOL = [
  { badge:'30 min gratis',    title:'30 minutos extra de regalo',   desc:'En reservas de 2 horas o más.',                    discount:0,  validUntil:'30 Jun 2026' },
  { badge:'Mañanero',         title:'Tarifa especial de mañana',    desc:'Citas antes del mediodía con precio preferencial.', discount:20, validUntil:'30 Jun 2026' },
  { badge:'1ª cita −20%',     title:'20% en tu primera cita',       desc:'Bienvenida exclusiva para nuevos clientes.',       discount:20, validUntil:'31 Jul 2026' },
  { badge:'3x2',              title:'Tu tercera hora va de regalo', desc:'Reserva 3 horas y paga solo 2.',                   discount:33, validUntil:'30 Jun 2026' },
  { badge:'Cliente frecuente',title:'Premio a tu preferencia',      desc:'Descuento especial desde tu tercera cita.',        discount:15, validUntil:'31 Jul 2026' },
  { badge:'Noche completa',   title:'Paquete noche entera',         desc:'Tarifa preferencial por toda la noche.',           discount:0,  validUntil:'30 Jun 2026' },
];

/* Índices de modelos con promo (25 en total) */
const PROMO_INDICES = new Set([0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96]);

/* ─── RNG determinista ──────────────────────────────────── */
const _rng = (seed) => {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
};

/* ─── Generador de 10 modelos demo (fallback sin Supabase) ── */
function generateModels() {
  const models = [];
  for (let i = 0; i < 10; i++) {
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

/* ─── Supabase: mapeo de escort → formato MODELS ───────────── */
function mapEscortToModel(e) {
  const fotos     = (e.fotos || []).slice().sort((a, b) => a.orden - b.orden);
  const photoUrls = fotos.filter(f => f.tipo === 'foto').map(f => f.url);
  const fallback  = (n) => photoUrl(PHOTO_POOL[(e.id + n) % PHOTO_POOL.length]);

  while (photoUrls.length < 3) photoUrls.push(fallback(photoUrls.length + 1));

  const serviciosMap = {};
  (e.servicios || []).forEach(s => {
    serviciosMap[s.nombre] = { si: s.incluido, extra: s.tiene_costo_extra };
  });

  return {
    id:          e.id,
    slug:        e.slug,
    name:        e.nombre,
    age:         e.edad         || 25,
    height:      e.altura       || 165,
    zone:        e.zona         || 'Guadalajara',
    cat:         e.categoria    || 'VIP',
    tags:        e.tags         || [e.categoria || 'VIP'],
    rate:        e.precio_hora  || 2000,
    rating:      parseFloat(e.calificacion) || 5.0,
    reviews:     e.num_resenas  || 0,
    citas:       e.num_citas    || 0,
    available:   !!e.disponible,
    featured:    !!e.es_destacada,
    isNew:       !!e.es_nueva,
    img:         photoUrls[0],
    photos:      photoUrls,
    hasVideo:    fotos.some(f => f.tipo === 'video'),
    hairColor:   e.cabello      || 'Castaño',
    eyeColor:    e.ojos         || 'Café',
    skinColor:   e.piel         || 'Morena',
    waist:       e.cintura      || 65,
    hips:        e.cadera       || 90,
    bust:        e.busto        || 88,
    nationality: e.nacionalidad || 'Mexicana',
    services:    Object.keys(serviciosMap).length ? serviciosMap : null,
    hidden:      false,
    promo:       null,
    whatsapp:    e.whatsapp,
    descripcion: e.descripcion,
    idiomas:     e.idiomas      || ['Español'],
    plan:        e.plan         || 'Elite',
    verificada:  !!e.verificada,
    top10:       !!e.top10,
    ciudad:      e.ciudad       || 'Guadalajara',
  };
}

async function loadModelsFromSupabase() {
  if (!window.sbClient) return null;
  try {
    const { data, error } = await window.sbClient
      .from('escorts')
      .select('*, fotos(url,tipo,orden), servicios(nombre,incluido,tiene_costo_extra)')
      .eq('activa', true)
      .order('es_destacada', { ascending: false })
      .order('calificacion',  { ascending: false });

    if (error || !data?.length) return null;
    return data.map(mapEscortToModel);
  } catch (err) {
    console.warn('Supabase fetch falló, usando datos demo:', err.message);
    return null;
  }
}

/* ─── Citas activas: si una modelo está en cita ahora, queda
   automáticamente "No Disponible" hasta que termine. ─────── */
function _seedDemoActiveCitas() {
  const now = Date.now();
  const clients = ['Carlos M.','Eduardo L.','Roberto A.','Javier R.','Miguel S.','Andrés T.','Luis P.'];
  for (let i = 0; i < MODELS.length; i += 7) {
    const startedMinAgo = 15 + (i * 7) % 35;
    const totalMinutes  = 60 + (i * 11) % 120;
    const start = now - startedMinAgo * 60_000;
    const end   = start + totalMinutes * 60_000;
    MODELS[i].citasActivas = [{ start, end, client: clients[i % clients.length] }];
  }
}

function isModelInCita(m, nowTs) {
  if (!m) return false;
  if (nowTs == null) nowTs = Date.now();
  return (m.citasActivas || []).some(c => nowTs >= c.start && nowTs <= c.end);
}

function getActiveCita(m, nowTs) {
  if (!m) return null;
  if (nowTs == null) nowTs = Date.now();
  return (m.citasActivas || []).find(c => nowTs >= c.start && nowTs <= c.end) || null;
}

function syncModelAvailabilityWithCitas() {
  const now = Date.now();
  MODELS.forEach(m => {
    if (m._baseAvailable === undefined) m._baseAvailable = m.available;
    const inCita = isModelInCita(m, now);
    m._inCita = inCita;
    m.available = inCita ? false : m._baseAvailable;
  });
}

_seedDemoActiveCitas();
syncModelAvailabilityWithCitas();
setInterval(syncModelAvailabilityWithCitas, 60_000);

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

  /* ── Swipe en móvil: deslizar izquierda/derecha cambia slide ── */
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    let _tx = 0, _ty = 0;
    heroEl.addEventListener('touchstart', e => {
      _tx = e.touches[0].clientX;
      _ty = e.touches[0].clientY;
    }, { passive: true });
    heroEl.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - _tx;
      const dy = e.changedTouches[0].clientY - _ty;
      // Ignorar si el movimiento es más vertical que horizontal (scroll)
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      const total = document.querySelectorAll('.hero-slide').length;
      if (!total) return;
      goHeroSlide(dx < 0
        ? (heroIndex + 1) % total              // deslizar izquierda → siguiente
        : (heroIndex - 1 + total) % total);    // deslizar derecha  → anterior
    }, { passive: true });
  }
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
  /* hide floating stats en slides que tienen contenido propio (marca, telegram, pagos) */
  const total = document.querySelectorAll('.hero-slide').length;
  const isStaticSlide = heroIndex === 0 || heroIndex === 1 || heroIndex === total - 1;
  if (stats) stats.style.opacity = isStaticSlide ? '0' : '1';
  /* Cada vez que el carrusel completa una vuelta, cuenta y rota slides de perfil */
  if (heroIndex === 0) {
    _mosaicRoundCount++;
    /* Mosaico de marca: rota cada 2 vueltas */
    if (_mosaicRoundCount % 2 === 0) {
      const featuredCount = MODELS.filter(m => m.featured && !m.hidden).length || 2;
      _mosaicOffset = (_mosaicOffset + 4) % Math.max(4, featuredCount);
      refreshMosaicImages();
    }
    /* Slides de oferta: rotan cada vuelta (perfil + promo) para mostrar variedad */
    const offerPoolLen = MODELS.filter(m => !m.hidden).length;
    _heroOfferIdx = (_heroOfferIdx + 1) % Math.max(1, offerPoolLen);
    refreshOfferSlides();
  }
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
      <div class="card-top-status">
        ${m.available
          ? '<span class="pill pill-available">Disponible</span>'
          : '<span class="pill pill-busy">No Disponible</span>'}
      </div>
      <div class="card-bottom-badges">
        ${m.isNew    ? '<span class="pill pill-new">Nueva</span>' : ''}
        ${m.hasVideo ? '<span class="pill pill-gold"><i class="fas fa-video"></i></span>' : ''}
        ${m.promo    ? `<span class="pill pill-gold">🔥 ${m.promo.badge}</span>` : ''}
      </div>
      <button class="card-fav-btn" onclick="event.stopPropagation();toggleCardFav(this)" aria-label="Guardar">
        <i class="far fa-heart"></i>
      </button>
      ${m.photos.length > 1 ? `<div class="card-carousel-dots">${m.photos.map((_,i)=>`<div class="card-carousel-dot${i===0?' active':''}"></div>`).join('')}</div>` : ''}
    </div>
    <div class="model-card-info">
      <div class="model-card-name">${m.name}</div>
      <div class="model-card-meta">
        <span><i class="fas fa-birthday-cake" style="color:var(--gold);margin-right:.25rem"></i>${m.age} años</span>
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
        <button class="btn btn-telegram btn-sm" onclick="event.stopPropagation();window.open('https://t.me/DoncellasGDLbot','_blank')" title="Telegram">
          <i class="fab fa-telegram"></i>
        </button>
        <button class="btn btn-wa btn-sm" onclick="event.stopPropagation();window.open('https://wa.me/523312345678?text=Hola%20${encodeURIComponent(m.name)}','_blank')" title="WhatsApp">
          <i class="fab fa-whatsapp"></i>
        </button>
      </div>
    </div>
  </div>`;
}

/* ─── Entrada escalonada en desktop ─────────────────────── */
function initCardEntrance() {
  if (window.innerWidth < 900) return;
  const cards = [...document.querySelectorAll('.model-card[data-id]')];
  cards.forEach(c => {
    c.classList.add('card-hidden');
    if (c.dataset.available === 'true' && c.closest('.featured-section')) {
      c.classList.add('featured-card');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card  = entry.target;
      const cards = [...document.querySelectorAll('.model-card.card-hidden')];
      const idx   = cards.indexOf(card);
      setTimeout(() => {
        card.classList.remove('card-hidden');
        card.classList.add('card-visible');
        if (card.dataset.available === 'true') {
          card.style.animationDelay = `${idx * 0.08}s, ${idx * 0.08 + 1}s`;
        } else {
          card.style.animationDelay = `${idx * 0.08}s`;
        }
      }, idx * 80);
      observer.unobserve(card);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(c => observer.observe(c));
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
/* ─── Hero Mosaic (desktop) ─────────────────────────────── */
function buildHeroMosaic() {
  const el = document.getElementById('heroMosaic');
  if (!el || window.innerWidth < 900) return;

  const pool = [
    ...MODELS.filter(m => m.featured && !m.hidden),
    ...MODELS.filter(m => m.available && !m.featured && !m.hidden),
    ...MODELS.filter(m => !m.available && !m.featured && !m.hidden),
  ].slice(0, 4);

  if (!pool.length) return;

  const avCount = MODELS.filter(m => m.available && !m.hidden).length;

  const slot = (m, isMain) => `
    <div class="hm-slot${isMain ? ' hm-main' : ' hm-sm'}"
         onclick="window.location.href='perfil.html?id=${m.id}'">
      <img src="${m.photos[0]}" alt="${m.name}" loading="${isMain ? 'eager' : 'lazy'}" />
      <div class="wm-overlay"></div>
      <div class="hm-overlay">
        <div class="hm-info">
          ${m.available
            ? `<span class="pill pill-available" style="font-size:.6rem;margin-bottom:.4rem">● Disponible</span>`
            : `<span class="pill pill-busy" style="font-size:.6rem;margin-bottom:.4rem">No Disponible</span>`}
          <div class="hm-name">${m.name}</div>
          <div class="hm-meta">
            <i class="fas fa-birthday-cake" style="color:var(--gold);margin-right:.25rem;font-size:.7rem"></i>${m.age} años
            &nbsp;·&nbsp;${m.cat}
            &nbsp;·&nbsp;${stars(m.rating)} ${m.rating}
          </div>
          <a href="perfil.html?id=${m.id}" class="hm-btn" onclick="event.stopPropagation()">
            <i class="fas fa-eye"></i> Ver perfil
          </a>
        </div>
      </div>
    </div>`;

  const brandPanel = `
    <div class="hm-slot hm-brand">
      <div class="hm-brand-eyebrow">Guadalajara, Jalisco</div>
      <h2>La <span class="gold">Elegancia</span><br>del Placer</h2>
      <p>${avCount} Doncella${avCount !== 1 ? 's' : ''} disponible${avCount !== 1 ? 's' : ''} ahora mismo en Guadalajara.</p>
      <div class="hm-brand-btns">
        <a href="modelos.html" class="btn btn-gold">
          <i class="fas fa-users"></i> Ver todas las Doncellas
        </a>
        <a href="modelos.html?filter=available" class="btn btn-outline btn-sm">
          <span style="width:7px;height:7px;border-radius:50%;background:#4ade80;display:inline-block"></span>
          Solo disponibles ahora
        </a>
      </div>
    </div>`;

  el.innerHTML = slot(pool[0], true)
    + (pool[1] ? slot(pool[1], false) : '')
    + (pool[2] ? slot(pool[2], false) : '')
    + brandPanel
    + (pool[3] ? slot(pool[3], false) : '');
}

/* ─── Galería: un slot por escort, 2 en 2 hacia abajo ───── */
function buildDoncellaGallery() {
  const el = document.getElementById('doncellaGallery');
  if (!el) return;

  const escorts = MODELS.filter(m => !m.hidden);
  /* Contador honesto del stats-bar = doncellas reales (no número inflado) */
  const statsCountEl = document.getElementById('statsCount');
  if (statsCountEl) statsCountEl.textContent = escorts.length;
  if (!escorts.length) return;

  escorts.forEach((m, i) => {
    el.insertAdjacentHTML('beforeend', `
      <div class="dg-item" id="dgSlot${i}">
        <img class="dg-img dg-img-a dg-active" src="" alt="" loading="${i < 2 ? 'eager' : 'lazy'}" />
        <img class="dg-img dg-img-b" src="" alt="" loading="lazy" />
        <div class="wm-overlay"></div>
        <div class="dg-info">
          <div class="dg-name" id="dgName${i}"></div>
          <div class="dg-status" id="dgStatus${i}">
            <span class="dg-dot"></span>
            <span id="dgStatusTxt${i}"></span>
          </div>
          <a href="#" class="dg-ver" id="dgVer${i}" onclick="event.stopPropagation()">
            Ver perfil <i class="fas fa-arrow-right" style="font-size:.6rem"></i>
          </a>
        </div>
      </div>`);

    /* Pool: solo las fotos de esta escort */
    const pool = m.photos.map(p => ({ src: p, name: m.name, id: m.id, available: m.available }));
    /* Intervalos escalonados — nunca cambian dos al mismo tiempo */
    const interval = 9000 + i * 500;
    startSlotCycle(i, pool, 0, interval);
  });
}


function startSlotCycle(slotIdx, pool, startIdx, interval) {
  const slot    = document.getElementById(`dgSlot${slotIdx}`);
  const nameEl  = document.getElementById(`dgName${slotIdx}`);
  const statEl  = document.getElementById(`dgStatus${slotIdx}`);
  const statTxt = document.getElementById(`dgStatusTxt${slotIdx}`);
  const verEl   = document.getElementById(`dgVer${slotIdx}`);
  if (!slot) return;

  const imgA = slot.querySelector('.dg-img-a');
  const imgB = slot.querySelector('.dg-img-b');
  let idx    = startIdx % pool.length;
  let useA   = true;

  function showPhoto(entry) {
    const next = useA ? imgB : imgA;
    const curr = useA ? imgA : imgB;
    next.src = entry.src;
    next.alt = entry.name;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        next.classList.add('dg-active');
        curr.classList.remove('dg-active');
        useA = !useA;
        /* Actualizar info */
        nameEl.textContent  = entry.name;
        statTxt.textContent = entry.available ? 'Disponible ahora' : 'No disponible';
        statEl.className    = `dg-status${entry.available ? ' disponible' : ''}`;
        verEl.href          = `perfil.html?id=${entry.id}`;
        slot.onclick        = () => window.location.href = `perfil.html?id=${entry.id}`;
      });
    });
  }

  /* Carga la primera foto de inmediato — oculta el slot hasta que cargue */
  slot.style.opacity = '0';
  slot.style.transition = 'opacity .4s ease';
  imgA.src = pool[idx].src;
  imgA.alt = pool[idx].name;
  imgA.onload = () => { slot.style.opacity = '1'; };
  imgA.onerror = () => { slot.style.opacity = '1'; };
  nameEl.textContent  = pool[idx].name;
  statTxt.textContent = pool[idx].available ? 'Disponible ahora' : 'No disponible';
  statEl.className    = `dg-status${pool[idx].available ? ' disponible' : ''}`;
  verEl.href          = `perfil.html?id=${pool[idx].id}`;
  slot.onclick        = () => window.location.href = `perfil.html?id=${pool[idx].id}`;

  setInterval(() => {
    idx = (idx + 1) % pool.length;
    showPhoto(pool[idx]);
  }, interval);
}

function initIndex() {
  buildDoncellaGallery();
  buildHeroSlides();   // must run before initHero()
  initHero();
  initHCarouselNav();
  buildFeaturedCarousel();
  buildAvailableCarousel();
  buildNewCarousel();
  buildPromoCarousel();
  setupSearchForm();
  /* Animaciones */
  setTimeout(() => {
    addHeroParticles();
    addAuroraOrbs();
    initScrollReveal();
    initNavScroll();
    addHowStepClasses();
    addCtaSectionClass();
    init3DTilt();
    initSparkleClick();
    initMagneticBtns();
  }, 120);
}

/* ── Partículas doradas flotantes en el hero brand slide ── */
function addHeroParticles() {
  const bg = document.querySelector('.hero-slide-brand .hero-slide-brand-bg');
  if (!bg) return;
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('span');
    p.className = 'hero-particle';
    const size = 2 + Math.random() * 4;
    p.style.cssText = `
      left:${4 + Math.random() * 92}%;
      bottom:${Math.random() * 50}%;
      width:${size}px; height:${size}px;
      animation-delay:${(Math.random() * 8).toFixed(2)}s;
      animation-duration:${(5 + Math.random() * 5).toFixed(2)}s;
    `;
    bg.appendChild(p);
  }
}

/* ── Scroll reveal con IntersectionObserver ── */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  /* Secciones principales */
  document.querySelectorAll('.section, section:not(.hero)').forEach(el => {
    if (el.classList.contains('hero') || el.closest('.hero')) return;
    el.classList.add('js-reveal');
    io.observe(el);
  });

  /* Tarjetas del "por qué elegirnos" con stagger */
  document.querySelectorAll('.why-doncellas-grid > .profile-card').forEach((el, i) => {
    el.classList.add('js-reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
    io.observe(el);
  });

  /* FAQ items con stagger */
  document.querySelectorAll('.faq-item').forEach((el, i) => {
    el.classList.add('js-reveal');
    el.style.transitionDelay = `${i * 0.07}s`;
    io.observe(el);
  });
}

/* ── Navbar: sombra al hacer scroll ── */
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── Agrega clases de animación a los steps de "¿Cómo funciona?" ── */
function addHowStepClasses() {
  document.querySelectorAll('#faqList').forEach(() => {}); // placeholder
  /* Targets each step card in the how-it-works section */
  const steps = document.querySelectorAll('.section [style*="border-radius:var(--r-lg)"]');
  steps.forEach(el => el.classList.add('how-step-wrap'));
  steps.forEach(el => {
    const numDiv = el.querySelector('div[style*="border-radius:50%"]');
    if (numDiv) numDiv.classList.add('how-step-num');
  });
  /* Stat numbers shimmer */
  document.querySelectorAll('#statsCount, .stats-bar strong').forEach(el => el.classList.add('stat-num'));
}

/* ── Clase al CTA de escorts para gradiente animado ── */
function addCtaSectionClass() {
  document.querySelectorAll('section').forEach(sec => {
    if (sec.querySelector('h2')?.textContent?.includes('Quieres ser una de nuestras')) {
      sec.classList.add('cta-escorts-section');
    }
  });
}

/* ══════════════════════════════════════════════════════
   ANIMACIONES PREMIUM
══════════════════════════════════════════════════════ */

/* ── Cursor personalizado dorado (solo desktop) ── */
function initCustomCursor() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const dot  = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
  const ring = Object.assign(document.createElement('div'), { className: 'cursor-ring' });
  document.body.append(dot, ring);
  let cx = -200, cy = -200, rx = -200, ry = -200;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    dot.style.left = cx + 'px';
    dot.style.top  = cy + 'px';
  }, { passive: true });
  (function loop() {
    rx += (cx - rx) * 0.1;
    ry += (cy - ry) * 0.1;
    ring.style.left = Math.round(rx) + 'px';
    ring.style.top  = Math.round(ry) + 'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mousedown', () => dot.classList.add('is-clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('is-clicking'));
  document.addEventListener('mouseover', e => {
    const hov = e.target.closest('a,button,.profile-card,.faq-q,.how-step-wrap,[onclick]');
    ring.classList.toggle('is-hovered', !!hov);
  });
}

/* ── Aurora orbs de luz en el hero ── */
function addAuroraOrbs() {
  const bg = document.querySelector('.hero-slide-brand .hero-slide-brand-bg');
  if (!bg) return;
  ['aurora-orb-1','aurora-orb-2','aurora-orb-3'].forEach(cls => {
    const orb = document.createElement('div');
    orb.className = 'aurora-orb ' + cls;
    bg.appendChild(orb);
  });
  const scan = document.createElement('div');
  scan.className = 'hero-scan';
  bg.appendChild(scan);
}

/* ── 3D tilt en tarjetas ── */
function init3DTilt() {
  const applyTilt = () => {
    document.querySelectorAll('.profile-card:not([data-tilt])').forEach(card => {
      card.dataset.tilt = '1';
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        card.style.transform = `perspective(700px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translateZ(10px) scale(1.02)`;
        card.style.boxShadow = `${-dx*12}px ${-dy*12}px 40px rgba(201,168,76,.15), 0 20px 60px rgba(0,0,0,.5)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.boxShadow  = '';
      });
    });
  };
  applyTilt();
  setTimeout(applyTilt, 900);
}

/* ── Chispas doradas al hacer clic ── */
function initSparkleClick() {
  const colors = ['#C9A84C','#F5D880','#E0B840','#FFF0A0','#A07828'];
  document.addEventListener('click', e => {
    if (e.target.closest('a[href],button[type="submit"]')) return; // no bloquear navegación
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5;
      const dist  = 28 + Math.random() * 45;
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${colors[i % colors.length]};width:${3+Math.random()*5}px;height:${3+Math.random()*5}px;--tx:${(Math.cos(angle)*dist).toFixed(1)}px;--ty:${(Math.sin(angle)*dist).toFixed(1)}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  });
}

/* ── Botones magnéticos — siguen el cursor ── */
function initMagneticBtns() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  document.querySelectorAll('.btn-gold:not(.btn-sm):not(.nav-login-btn), .btn-wa.btn-lg').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.22;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* Returns a featured-model photo for the brand slide mosaic.
   Reframes at 2:3 aspect (matches container) with face-centered crop
   so the photo se ve completa, sin recortes raros en la cara. */
let _mosaicOffset = 0;
let _mosaicRoundCount = 0;   /* cuenta cuántas veces el carrusel completa una vuelta */
let _heroOfferIdx  = 0;      /* offset en el pool de offer slides (rota cada 2 vueltas) */
function _mosaicPic(i, offset) {
  const off = offset == null ? _mosaicOffset : offset;
  const pool = MODELS.filter(m => m.featured && !m.hidden);
  const m = pool.length ? pool[(i + off) % pool.length] : null;
  if (m) {
    const idMatch = m.photos[0].match(/images\.unsplash\.com\/([^?]+)/);
    if (idMatch) {
      /* crop=top → Unsplash empieza desde la cara, no desde la cintura */
      return `https://images.unsplash.com/${idMatch[1]}?w=500&h=667&fit=crop&crop=top&auto=format&q=85`;
    }
    return m.photos[0];
  }
  const pid = PHOTO_POOL[((i + off) * 3) % PHOTO_POOL.length];
  return `https://images.unsplash.com/${pid}?w=500&h=667&fit=crop&crop=top&auto=format&q=85`;
}

/* Rota las 4 fotos del mosaico de marca a otros perfiles destacados.
   Se llama cada vez que la slide de marca vuelve a estar activa. */
function refreshMosaicImages() {
  const imgs = document.querySelectorAll('.hero-brand-mosaic .hbm-img-wrap img');
  imgs.forEach((img, i) => {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = _mosaicPic(i);
      img.onload = () => { img.style.opacity = '1'; };
    }, i * 120);
  });
}

/* ─── Helpers para slides de perfil rotativas ─────────── */
/* Showcase de promos en el hero: si está en true, los slides de oferta
   simulan una promoción (rotando el pool) en las doncellas que no tengan
   una real — sirve para enseñar a las escorts cómo se vería su promo.
   Poner en false para que solo se muestren promociones REALES. */
const HERO_SIMULATE_PROMOS = true;

/* Aplica datos de un modelo a un slide `<a>` de perfil */
function _applyProfileSlide(el, m, badgeText) {
  if (!el || !m) return;
  const bgId = PHOTO_POOL[(m.id - 1) % PHOTO_POOL.length];
  const original = fmtMXN(m.rate);
  const hasDiscount = m.promo && m.promo.discount > 0;
  const discounted  = hasDiscount ? fmtMXN(Math.round(m.rate * (1 - m.promo.discount / 100))) : null;
  const pricesHTML  = hasDiscount
    ? `<span class="hero-promo-original">${original}/hr</span>
       <span class="hero-promo-discounted">${discounted}/hr</span>`
    : `<span class="hero-promo-discounted">${original}/hr</span>`;
  const badge = m.promo ? `🔥 ${m.promo.badge}` : badgeText;
  el.href = `perfil.html?id=${m.id}`;
  el.setAttribute('aria-label', `Ver perfil de ${m.name}`);
  el.style.cssText = `background-image:url('${photoUrl(bgId,1400,900)}');cursor:pointer;text-decoration:none;color:inherit;display:block`;
  el.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="hero-promo-photo-card"><img src="${m.photos[0]}" alt="${m.name}" loading="lazy" /></div>
    <div class="hero-promo-overlay">
      <div class="hero-promo-badge">${badge}</div>
      <div class="hero-promo-name">${m.name}</div>
      ${m.promo?.title ? `<div class="hero-promo-offer">${m.promo.title}</div>` : ''}
      ${m.promo?.desc  ? `<div class="hero-promo-desc">${m.promo.desc}</div>` : ''}
      <div class="hero-promo-prices">${pricesHTML}</div>
      <span class="hero-promo-cta">Ver perfil <i class="fas fa-arrow-right"></i></span>
    </div>`;
}

function refreshOfferSlides() {
  /* Rota TODAS las doncellas visibles por los 2 slots de oferta.
     A cada una le muestra su promo real; si no tiene y el showcase está
     activo, le simula una del pool (rotando) para enseñar cómo se vería.
     No muta el modelo original: usa una copia con la promo a mostrar. */
  const pool = MODELS.filter(m => !m.hidden);
  if (!pool.length) return;
  [0, 1].forEach(slot => {
    const m = pool[(_heroOfferIdx + slot) % pool.length];
    let promo = m.promo;
    if (!promo && HERO_SIMULATE_PROMOS) {
      promo = PROMO_POOL[(_heroOfferIdx + slot) % PROMO_POOL.length];
    }
    const display = promo ? { ...m, promo } : m;
    const badge = promo ? `🔥 ${promo.badge}` : '💎 Destacada';
    _applyProfileSlide(document.getElementById(`heroSlideOffer${slot}`), display, badge);
  });
}

/* Genera slides del hero: Marca · 2 Ofertas · Telegram · WhatsApp · Agenda */
function buildHeroSlides() {
  const wrap = document.getElementById('heroSlides');
  if (!wrap) return;

  /* Conteo honesto de disponibles ahora (señal premium real, no inflada) */
  const availCount = MODELS.filter(m => m.available && !m.hidden).length || MODELS.filter(m => !m.hidden).length;

  /* ── Slide 0: Marca principal (active) ─── */
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
      <p class="hero-brand-desc">Perfiles <span class="hbd-gold">verificados</span> · disponibilidad en <span class="hbd-gold">tiempo real</span><br>discreción y <span class="hbd-vip">trato VIP</span> que te mereces</p>
      <div class="hero-brand-actions">
        <a href="modelos.html" class="hero-brand-cta" onclick="event.stopPropagation()">
          <span>Explorar Doncellas</span><i class="fas fa-arrow-right"></i>
        </a>
        <a href="membresias.html" class="hero-brand-cta-sec" onclick="event.stopPropagation()">Únete</a>
      </div>
      <div class="hero-brand-stats">
        <div class="hero-brand-stat"><span class="hero-brand-stat-n">100%</span><span class="hero-brand-stat-l">Verificadas</span></div>
        <div class="hero-brand-stat-div"></div>
        <div class="hero-brand-stat"><span class="hero-brand-stat-n">24/7</span><span class="hero-brand-stat-l">Disponibilidad</span></div>
        <div class="hero-brand-stat-div"></div>
        <div class="hero-brand-stat"><span class="hero-brand-stat-n">${availCount}</span><span class="hero-brand-stat-l">Disponibles hoy</span></div>
      </div>
    </div>
    <div class="hero-brand-mosaic">
      <div class="hero-brand-mosaic-col">
        <div class="hbm-img-wrap"><img src="${_mosaicPic(0)}" alt="modelo" /></div>
        <div class="hbm-img-wrap hbm-mobile-only"><img src="${_mosaicPic(1)}" alt="modelo" /></div>
      </div>
      <div class="hero-brand-mosaic-col">
        <div class="hbm-img-wrap"><img src="${_mosaicPic(2)}" alt="modelo" /></div>
        <div class="hbm-img-wrap hbm-mobile-only"><img src="${_mosaicPic(3)}" alt="modelo" /></div>
      </div>
    </div>`;
  wrap.appendChild(brandSlide);

  /* ── Slides 1–2: Doncellas con oferta / destacadas ─── */
  ['Offer0','Offer1'].forEach(suffix => {
    const s = document.createElement('a');
    s.className = 'hero-slide hero-slide-profile';
    s.id = `heroSlide${suffix}`;
    wrap.appendChild(s);
  });

  /* ── Slide 3: Canal de Telegram ─── */
  const tgSlide = document.createElement('div');
  tgSlide.className = 'hero-slide hero-slide-telegram';
  tgSlide.innerHTML = `
    <div class="hero-tg-bg">
      <div class="hero-tg-glow-main"></div>
      <div class="hero-tg-glow-sec"></div>
      <i class="fab fa-telegram hero-tg-float hero-tg-f1"></i>
      <i class="fab fa-telegram hero-tg-float hero-tg-f2"></i>
      <i class="fab fa-telegram hero-tg-float hero-tg-f3"></i>
      <i class="fab fa-telegram hero-tg-float hero-tg-f4"></i>
      <i class="fab fa-telegram hero-tg-float hero-tg-f5"></i>
      <i class="fab fa-telegram hero-tg-float hero-tg-f6"></i>
    </div>

    <div class="hero-tg-content">

      <div class="hero-tg-top-row">
        <div class="hero-tg-icon-ring">
          <i class="fab fa-telegram"></i>
        </div>
        <div class="hero-tg-channel-tag">
          <i class="fab fa-telegram"></i> @DoncellasGDL &nbsp;·&nbsp; Canal Oficial
        </div>
      </div>

      <h2 class="hero-tg-title">
        Únete al canal<br>
        <em>más exclusivo <i class="fab fa-telegram hero-tg-title-icon"></i> de GDL</em>
      </h2>

      <div class="hero-tg-desc-box">
        <p>Sé el <strong>primero</strong> en ver quién está disponible esta noche.<br>
        Ofertas, perfiles nuevos y novedades de todas nuestras <em>Doncellas</em> —<br>
        todo en un solo lugar, con total discreción.</p>
      </div>

      <div class="hero-tg-pills">
        <div class="hero-tg-pill"><i class="fab fa-telegram"></i> Actualizaciones diarias</div>
        <div class="hero-tg-pill"><i class="fas fa-bell"></i> Alertas de disponibilidad</div>
        <div class="hero-tg-pill"><i class="fas fa-user-secret"></i> 100% anónimo</div>
        <div class="hero-tg-pill"><i class="fas fa-tag"></i> Ofertas exclusivas</div>
        <div class="hero-tg-pill"><i class="fas fa-eye-slash"></i> Sin rastro en tu celular</div>
        <div class="hero-tg-pill"><i class="fab fa-telegram"></i> Gratis para siempre</div>
      </div>

      <a href="https://t.me/DoncellasGDL" target="_blank" rel="noopener"
         onclick="event.stopPropagation()" class="hero-tg-cta">
        <i class="fab fa-telegram"></i>
        <span>Unirme gratis ahora</span>
        <i class="fas fa-arrow-right hero-tg-cta-arrow"></i>
      </a>

    </div>`;
  wrap.appendChild(tgSlide);

  /* ── Slide 4: Canal de WhatsApp ─── */
  /* Reutiliza las clases .hero-tg-* (mismos estilos + reglas mobile);
     el bloque .hero-slide-whatsapp en styles.css las recolorea a verde.
     NOTA: el Canal de WhatsApp aún no existe → el CTA va al chat de
     WhatsApp Business. Cambiar el href al canal cuando esté creado. */
  const waSlide = document.createElement('div');
  waSlide.className = 'hero-slide hero-slide-whatsapp';
  waSlide.innerHTML = `
    <div class="hero-tg-bg">
      <div class="hero-tg-glow-main"></div>
      <div class="hero-tg-glow-sec"></div>
      <i class="fab fa-whatsapp hero-tg-float hero-tg-f1"></i>
      <i class="fab fa-whatsapp hero-tg-float hero-tg-f2"></i>
      <i class="fab fa-whatsapp hero-tg-float hero-tg-f3"></i>
      <i class="fab fa-whatsapp hero-tg-float hero-tg-f4"></i>
      <i class="fab fa-whatsapp hero-tg-float hero-tg-f5"></i>
      <i class="fab fa-whatsapp hero-tg-float hero-tg-f6"></i>
    </div>

    <div class="hero-tg-content">

      <div class="hero-tg-top-row">
        <div class="hero-tg-icon-ring">
          <i class="fab fa-whatsapp"></i>
        </div>
        <div class="hero-tg-channel-tag">
          <i class="fab fa-whatsapp"></i> Doncellas &nbsp;·&nbsp; Canal de WhatsApp
        </div>
      </div>

      <h2 class="hero-tg-title">
        Síguenos por<br>
        <em>WhatsApp <i class="fab fa-whatsapp hero-tg-title-icon"></i></em>
      </h2>

      <div class="hero-tg-desc-box">
        <p>Recibe en tu chat quién está <strong>disponible hoy</strong>,
        perfiles nuevos y <em>ofertas exclusivas</em> —<br>
        directo a tu WhatsApp, con total discreción.</p>
      </div>

      <div class="hero-tg-pills">
        <div class="hero-tg-pill"><i class="fab fa-whatsapp"></i> Disponibilidad al instante</div>
        <div class="hero-tg-pill"><i class="fas fa-bell"></i> Avisos de nuevas Doncellas</div>
        <div class="hero-tg-pill"><i class="fas fa-tag"></i> Ofertas exclusivas</div>
        <div class="hero-tg-pill"><i class="fas fa-user-secret"></i> 100% discreto</div>
      </div>

      <a href="https://wa.me/523312345678?text=Hola%2C%20quiero%20recibir%20novedades%20y%20disponibilidad%20de%20Doncellas"
         target="_blank" rel="noopener"
         onclick="event.stopPropagation()" class="hero-tg-cta">
        <i class="fab fa-whatsapp"></i>
        <span>Seguir por WhatsApp</span>
        <i class="fas fa-arrow-right hero-tg-cta-arrow"></i>
      </a>

    </div>`;
  wrap.appendChild(waSlide);

  /* ── Slide 5: Agenda tu cita ─── */
  const agendaSlide = document.createElement('div');
  agendaSlide.className = 'hero-slide hero-slide-agenda';
  agendaSlide.innerHTML = `
    <div class="hero-agenda-bg">
      <div class="hero-agenda-glow"></div>
      <i class="fas fa-calendar-check hero-agenda-float hero-af1"></i>
      <i class="fas fa-heart hero-agenda-float hero-af2"></i>
      <i class="fas fa-gem hero-agenda-float hero-af3"></i>
    </div>
    <div class="hero-agenda-content">
      <div class="hero-brand-label"><i class="fas fa-calendar-check"></i> Reserva en minutos</div>
      <h2 class="hero-agenda-title">Agenda tu <em>cita</em></h2>
      <p class="hero-agenda-desc">Escríbenos por tu medio favorito. <br>Nuestro asistente te atiende al instante, con total discreción.</p>
      <div class="hero-agenda-btns">
        <a href="https://wa.me/523312345678?text=Hola%2C%20quiero%20agendar%20una%20cita"
           target="_blank" rel="noopener" onclick="event.stopPropagation()"
           class="hero-agenda-btn hero-agenda-btn-wa">
          <i class="fab fa-whatsapp"></i> <span>Agendar por WhatsApp</span>
        </a>
        <a href="https://t.me/DoncellasGDLbot"
           target="_blank" rel="noopener" onclick="event.stopPropagation()"
           class="hero-agenda-btn hero-agenda-btn-tg">
          <i class="fab fa-telegram"></i> <span>Agendar por Telegram</span>
        </a>
      </div>
      <div class="hero-agenda-note"><i class="fas fa-clock"></i> Respuesta inmediata · Atención 24/7</div>
    </div>`;
  wrap.appendChild(agendaSlide);

  /* ── Poblar slots de perfil inicialmente ─── */
  refreshOfferSlides();
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
    const cat  = document.getElementById('searchCat')?.value;
    const p = new URLSearchParams();
    if (q)    p.set('q', q);
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
  ['fCat','fPrice','fRating'].forEach(id =>
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
  initCardEntrance();
  const c = document.getElementById('resultsCount');
  if (c) c.textContent = `${filteredModels.length} Doncellas encontradas`;
}

function applyFilters(list) {
  const cat    = document.getElementById('fCat')?.value   || '';
  const price  = document.getElementById('fPrice')?.value || '';
  const avail  = document.querySelector('[data-filter-avail].active')?.dataset.filterAvail || 'all';
  const rating = parseFloat(document.getElementById('fRating')?.value || '0');
  const sort   = document.getElementById('sortSelect')?.value || 'featured';
  const q      = (document.getElementById('modelosSearch')?.value.trim() ||
                  new URLSearchParams(window.location.search).get('q') || '').toLowerCase();

  let r = list.filter(m => {
    if (m.hidden) return false;
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
    if (q && !m.name.toLowerCase().includes(q) &&
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
  ['fCat','fPrice','fRating'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
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
        <div><div class="cat-search-name">${c.name}</div><div class="cat-search-sub">Ver perfiles</div></div>
      </a>`;
    });
  }
  if (matchModels.length) {
    html += `<div class="cat-search-section-lbl" style="border-top:1px solid var(--border);margin-top:.25rem;padding-top:.5rem">Doncellas sugeridas</div>`;
    matchModels.forEach(m => {
      html += `<a href="perfil.html?id=${m.id}" class="cat-search-row">
        <img src="${m.photos[0]}" class="cat-search-avatar" alt="${m.name}" />
        <div style="flex:1;min-width:0"><div class="cat-search-name">${m.name}</div><div class="cat-search-sub">${m.cat} · ${m.age} años</div></div>
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
          <div class="count"><i class="fas fa-arrow-right"></i> Ver perfiles</div>
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
        <div class="zone-info"><h4>${c.name}</h4><p>${c.desc || 'Ver perfiles'}</p></div>
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
    /* Fondo borroso: foto activa como background desenfocado */
    const blurBg = document.getElementById('profileBlurBg');
    if (blurBg && m.photos[0]) {
      blurBg.style.backgroundImage = `url('${m.photos[0]}')`;
    }
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
    /* Actualizar fondo borroso con la foto activa */
    const blurBg = document.getElementById('profileBlurBg');
    if (blurBg && slides[idx]) {
      blurBg.style.backgroundImage = `url('${slides[idx].src}')`;
    }
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
          <div class="wm-overlay"></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4);z-index:9">
            <div style="width:50px;height:50px;border-radius:50%;background:rgba(201,168,76,.9);display:flex;align-items:center;justify-content:center;color:#000;font-size:1.1rem"><i class="fas fa-play" style="margin-left:3px"></i></div>
          </div>
          <span class="pill pill-gold" style="position:absolute;top:.5rem;left:.5rem;font-size:.6rem;z-index:9"><i class="fas fa-video"></i> Video</span>
        </div>`);
    } else {
      g.insertAdjacentHTML('beforeend', `
        <div style="position:relative;border-radius:8px;overflow:hidden;aspect-ratio:4/3;cursor:zoom-in" onclick="closeModal('galleryModal');openFullscreen(${i})">
          <img src="${item.src}" loading="lazy" style="width:100%;height:100%;object-fit:cover" />
          <div class="wm-overlay"></div>
        </div>`);
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
        <div><div style="font-size:.88rem;font-weight:500">${m.name}</div><div style="font-size:.72rem;color:var(--t2)">${m.cat} · ${fmtMXN(m.rate)}/hr</div></div>
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

/* Genera slug a partir del nombre artístico */
function generarSlug(nombre) {
  return nombre.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') +
    '-' + Date.now().toString(36);
}

/* Auto-genera username desde el nombre artístico */
window.autoUsername = function() {
  const nombre = document.getElementById('newNombre')?.value.trim();
  const el     = document.getElementById('newUsername');
  if (!el || el.value) return;
  if (!nombre) return;
  el.value = nombre.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.|\.$/, '');
};

window.saveNewModelo = async function() {
  const nombre   = document.getElementById('newNombre')?.value.trim();
  const username = document.getElementById('newUsername')?.value.trim().toLowerCase();
  const pass     = document.getElementById('newPass')?.value.trim();
  const zona   = 'Guadalajara';   // zona ya no se segmenta: todas cubren la ZMG
  const cat    = document.getElementById('newCat')?.value;
  const plan   = document.getElementById('newPlan')?.value;
  const tarifa = parseInt(document.getElementById('newTarifa')?.value) || 2500;
  const edad   = parseInt(document.getElementById('newEdad')?.value) || 25;
  const tel    = (document.getElementById('newTel')?.value || '').replace(/\D/g,'');
  const desc   = document.getElementById('newDesc')?.value.trim() || '';

  if (!nombre)   { showToast('El nombre artístico es obligatorio', 'error'); return; }
  if (!username) { showToast('El usuario es obligatorio', 'error'); return; }
  if (!pass)     { showToast('Genera o escribe una contraseña', 'error'); return; }

  const btn = document.querySelector('#addModeloModal .btn-gold');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Guardando…'; }

  /* ── Guardar en Supabase ── */
  if (window.sbClient) {
    const slug = generarSlug(nombre);

    const { data: escortData, error: escortErr } = await window.sbClient
      .from('escorts')
      .insert({
        slug, nombre, edad, zona, categoria: cat, plan,
        precio_hora: tarifa, whatsapp: tel, descripcion: desc,
        disponible: false, activa: true, es_nueva: true,
        tags: [cat],
      })
      .select()
      .single();

    if (escortErr) {
      showToast('Error al crear perfil: ' + escortErr.message, 'error');
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> Crear cuenta y guardar'; }
      return;
    }

    const { error: userErr } = await window.sbClient
      .from('usuarios')
      .insert({ escort_id: escortData.id, username, password: pass });

    if (userErr) {
      showToast('Perfil creado pero error con credenciales: ' + userErr.message, 'error');
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> Crear cuenta y guardar'; }
      return;
    }

    /* Agregar a MODELS para UI inmediata */
    MODELS.unshift(mapEscortToModel({ ...escortData, fotos: [], servicios: [] }));

  } else {
    /* Fallback sin Supabase — solo memoria */
    const newId  = Math.max(...MODELS.map(m => m.id)) + 1;
    const pId    = PHOTO_POOL[newId % PHOTO_POOL.length];
    MODELS.unshift({
      id: newId, name: nombre, age: edad, zone: zona, cat, rate: tarifa,
      rating: 5.0, available: false, featured: false, isNew: true, hasVideo: false,
      img: photoUrl(pId), photos: [photoUrl(pId)], tags: [cat], plan, promo: null,
      skinColor: 'Morena clara', hairColor: 'Castaño', eyeColor: 'Café',
      bust: 86, waist: 62, hips: 90, whatsapp: tel, descripcion: desc,
      services: Object.fromEntries(ALL_SERVICES.map(s => [s, { si: false, extra: false }])),
      hidden: false,
    });
  }

  /* ── Mostrar credenciales ── */
  const box = document.getElementById('credencialesBox');
  if (box) {
    document.getElementById('credEmail').textContent = username;
    document.getElementById('credPass').textContent  = pass;
    box.style.display = 'block';
  }

  /* ── Actualizar tabla de escorts en el panel ── */
  const tbody = document.getElementById('modelosTbody');
  if (tbody) { tbody.innerHTML = ''; buildModelosTable(); }

  showToast(`✅ Cuenta creada para ${nombre}`, 'success');

  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> Crear cuenta y guardar'; }

  /* ── Limpiar formulario tras 3.5 s ── */
  setTimeout(() => {
    ['newNombre','newEdad','newUsername','newPass','newTarifa','newDesc','newTel']
      .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    if (box) box.style.display = 'none';
    closeModal('addModeloModal');
  }, 3500);
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

/* ─── Estados vacíos (beta sin datos reales) ──────────────
   Las gráficas/tablas demo se reemplazan por un estado vacío honesto.
   Cuando haya datos reales (Supabase), restaurar los `new Chart(...)`
   y los builders con datos. */
function renderEmptyChart(canvasId, msg) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  const wrap = c.closest('.chart-canvas-wrap') || c.parentElement;
  if (!wrap) return;
  wrap.innerHTML = `<div class="empty-state">
    <i class="fas fa-chart-simple"></i>
    <span>${msg || 'Sin datos todavía'}</span>
    <small>Se activa con actividad real</small>
  </div>`;
}
function renderEmptyRow(tbodyId, cols, msg) {
  const t = document.getElementById(tbodyId);
  if (!t) return;
  t.innerHTML = `<tr><td colspan="${cols}" class="empty-state-row">${msg || 'Sin registros todavía'}</td></tr>`;
}

function buildAdminCharts() {
  renderEmptyChart('revenueChart', 'Sin ingresos todavía');
  renderEmptyChart('distChart',    'Sin distribución aún');
  renderEmptyChart('citasChart',   'Sin citas todavía');
  renderEmptyChart('membChart',    'Sin membresías aún');
}

function buildIngresosChart() {
  renderEmptyChart('ingresosChart', 'Sin ingresos todavía');
}

function setChartPeriod(period, btn) {
  document.querySelectorAll('.chart-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function buildActivityTable() {
  renderEmptyRow('activityTbody', 5, 'Sin actividad todavía');
}

function buildModelosTable() {
  const tbody = document.getElementById('modelosTbody');
  if (!tbody) return;
  const plans = ['Silver','Gold','Elite'];
  const total = MODELS.length;
  const countEl = document.getElementById('modelosTableCount');
  if (countEl) countEl.textContent = `Mostrando ${Math.min(total, 50)} de ${total} Doncellas`;
  const subEl = document.getElementById('modelosPageSub');
  if (subEl) subEl.textContent = `${total} Doncellas registradas`;
  const kpiEl = document.getElementById('kpiDoncellasActivas');
  if (kpiEl) kpiEl.textContent = MODELS.filter(m => m.available && !m.hidden).length;
  MODELS.slice(0, 50).forEach(m => {
    const plan = plans[m.id % 3];
    tbody.insertAdjacentHTML('beforeend',`
      <tr data-model-row="${m.id}">
        <td><div class="table-avatar"><img src="${m.img}" alt="${m.name}" /><div><div class="table-name">${m.name}</div><div class="table-sub">${m.age} años · ${m.nationality}</div></div></div></td>
        <td>${m.cat}</td>
        <td><span class="pill ${plan==='Elite'?'pill-new':plan==='Gold'?'pill-gold':'pill-available'}" style="font-size:.65rem">${plan}</span></td>
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
        <div style="position:relative;overflow:hidden">
          <img src="${m.img}" alt="${m.name}" style="width:100%;aspect-ratio:4/3;object-fit:cover" />
          <div class="wm-overlay"></div>
          ${m.hidden ? '<div style="position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:9"><span class="pill pill-busy" style="font-size:.7rem"><i class="fas fa-eye-slash"></i> Oculta</span></div>' : ''}
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
      <div class="wm-overlay"></div>
      <button onclick="removeModelPhoto(${m.id},${i})"
              style="position:absolute;top:.4rem;right:.4rem;background:rgba(224,80,80,.9);color:#fff;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.75rem;z-index:10">
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

async function addModelPhotos(id, input) {
  const m = MODELS.find(x => x.id === id);
  if (!m || !input.files.length) return;
  const files = Array.from(input.files).slice(0, 6 - m.photos.length);
  showToast('Aplicando marca de agua...', 'info');
  const watermarked = await Promise.all(files.map(file =>
    new Promise(res => {
      const reader = new FileReader();
      reader.onload = async ev => res(await applyWatermark(ev.target.result));
      reader.readAsDataURL(file);
    })
  ));
  watermarked.forEach(url => m.photos.push(url));
  renderModelContent(m);
  showToast(`${files.length} foto(s) con marca de agua agregadas`, 'success');
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
  list.innerHTML = `<div class="empty-state" style="min-height:140px">
    <i class="fas fa-comments"></i>
    <span>Sin reseñas por revisar</span>
    <small>Aquí llegarán las reseñas de clientes para que las apruebes</small>
  </div>`;
}

function buildTxTable() {
  renderEmptyRow('txTbody', 7, 'Sin transacciones todavía');
}

function buildPagosTable() {
  renderEmptyRow('pagosTbody', 7, 'Sin pagos todavía');
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
    html+=`<div class="calendar-day${isToday?' today':''}">${d}</div>`;
  }
  grid.innerHTML=html;
}

function _lugarIcon(tipo) {
  return tipo === 'Motel'
    ? '<i class="fas fa-bed" style="color:#A889C0;font-size:.7rem"></i>'
    : '<i class="fas fa-hotel" style="color:var(--gold);font-size:.7rem"></i>';
}

function buildTodayCitas() {
  const w=document.getElementById('todayCitas');
  if(!w)return;
  w.innerHTML = `<div class="empty-state" style="min-height:120px">
    <i class="fas fa-calendar-day"></i>
    <span>Sin citas para hoy</span>
  </div>`;
}

/* ─── Panel Doncellas ───────────────────────────────────── */
function initPanelModelo() {
  buildModeloCharts();
  buildCurrentGallery();
  buildCitasProximas();
  buildCitasHistorial();
  buildAvailWeekGrid();
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
  renderEmptyChart('modeloRevenueChart', 'Sin ingresos todavía');
  renderEmptyChart('contactSourceChart', 'Sin contactos aún');
  renderEmptyChart('visitasChart',       'Sin visitas todavía');
}

function buildCurrentGallery() {
  const g=document.getElementById('currentGallery');
  if(!g)return;
  /* Sin fotos reales subidas todavía → estado vacío.
     Cuando haya persistencia de uploads, renderizar aquí las fotos de la escort. */
  g.innerHTML = `<div class="empty-state" style="grid-column:1/-1;min-height:140px">
    <i class="fas fa-images"></i>
    <span>Aún no has subido fotos</span>
    <small>Arrastra o explora archivos arriba para empezar tu galería</small>
  </div>`;
}

function buildCitasProximas() {
  const w=document.getElementById('citasProximas');
  if(!w)return;
  w.innerHTML = `<div class="empty-state" style="min-height:140px">
    <i class="fas fa-calendar-plus"></i>
    <span>Sin citas próximas</span>
    <small>Cuando agendes una cita, aparecerá aquí</small>
  </div>`;
}

function buildCitasHistorial() {
  const w=document.getElementById('citasHistorial');
  if(!w)return;
  w.innerHTML = `<div class="empty-state" style="min-height:140px">
    <i class="fas fa-clock-rotate-left"></i>
    <span>Sin historial todavía</span>
    <small>Tus citas completadas aparecerán aquí</small>
  </div>`;
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


/* ── Marca de agua Doncellas ─────────────────────────────── */
const WM_SRC = 'watermark.png';
let _wmImg = null;

function _loadWatermark() {
  if (_wmImg) return Promise.resolve(_wmImg);
  return new Promise(res => {
    const img = new Image();
    img.onload  = () => { _wmImg = img; res(img); };
    img.onerror = () => res(null);
    img.src = WM_SRC;
  });
}

/**
 * Aplica la marca de agua Doncellas a una imagen.
 * @param {string} dataURL  – imagen original en base64
 * @returns {Promise<string>} – imagen con watermark en base64
 */
async function applyWatermark(dataURL) {
  const wm = await _loadWatermark();
  return new Promise(resolve => {
    const photo = new Image();
    photo.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = photo.width;
      canvas.height = photo.height;
      const ctx = canvas.getContext('2d');

      // 1. Dibujar foto original
      ctx.drawImage(photo, 0, 0);

      if (wm) {
        // 2. Marca grande centrada: 65% del lado menor para que quepa bien
        const side   = Math.min(canvas.width, canvas.height);
        const wmW    = Math.round(side * 0.65);
        const wmH    = Math.round(wmW * (wm.height / wm.width));
        const wmX    = Math.round((canvas.width  - wmW) / 2);
        const wmY    = Math.round((canvas.height - wmH) / 2);

        // 3. PNG con transparencia real — source-over directo
        ctx.globalAlpha = 0.58;
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(wm, wmX, wmY, wmW, wmH);
        ctx.globalAlpha = 1;
      }

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    photo.src = dataURL;
  });
}

/* File upload */
function handleFileUpload(e) {
  const grid=document.getElementById('uploadPreviewGrid');
  if(!grid)return;
  Array.from(e.target?.files||e.dataTransfer?.files||[]).forEach(file=>{
    if(!file.type.startsWith('image/')&&!file.type.startsWith('video/'))return;
    const reader=new FileReader();
    reader.onload=async ev=>{
      const item=document.createElement('div');
      item.className='upload-preview-item';
      const isVid=file.type.startsWith('video/');

      // Aplicar watermark a imágenes automáticamente
      const src = isVid ? ev.target.result : await applyWatermark(ev.target.result);

      item.innerHTML=`
        ${isVid
          ? `<video src="${src}" style="width:100%;height:100%;object-fit:cover"></video><div class="wm-video-overlay"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><i class="fas fa-play" style="color:#fff;font-size:1.5rem"></i></div>`
          : `<img src="${src}" alt="${file.name}" />`}
        <button class="upload-preview-remove" onclick="this.closest('.upload-preview-item').remove()"><i class="fas fa-times"></i></button>`;
      grid.appendChild(item);
    };
    reader.readAsDataURL(file);
  });
  showToast(`Aplicando marca de agua Doncellas...`,'success');
}

document.addEventListener('DOMContentLoaded',()=>{
  const zone=document.getElementById('uploadZone');
  if(!zone)return;
  zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('drag-over');});
  zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
  zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('drag-over');handleFileUpload(e);});
});

/* ─── Afiliacion ─────────────────────────────────────────── */
function initMembresias() { /* FAQ handled inline in membresias.html */ }

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
      <div style="position:relative;border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--border)">
        <img src="${m.img}" alt="${m.name}"
             style="width:100%;aspect-ratio:3/4;object-fit:cover;display:block" />
        <div class="wm-overlay"></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:.75rem">
        <div>
          <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;margin-bottom:.4rem">
            <span class="pill ${m.available ? 'pill-available' : 'pill-busy'}" style="font-size:.65rem">${m.available ? 'Disponible' : 'No Disponible'}</span>
            ${m.promo ? `<span class="pill pill-gold" style="font-size:.65rem">🔥 ${m.promo.badge}</span>` : ''}
          </div>
          <div style="font-size:.82rem;color:var(--t2)"><i class="fas fa-birthday-cake" style="color:var(--gold)"></i> ${m.age} años · ${m.cat}</div>
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
            <a href="https://t.me/DoncellasGDLbot" target="_blank" class="btn btn-telegram" style="justify-content:center">
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

/* ─── Sesión activa en nav público ──────────────────────── */
function initNavSession() {
  const role   = sessionStorage.getItem('userRole');
  const nombre = sessionStorage.getItem('userNombre');
  if (!role) return;

  const loginBtn = document.querySelector('.nav-login-btn');
  if (!loginBtn) return;

  if (role === 'admin') {
    loginBtn.outerHTML = `
      <div style="display:flex;align-items:center;gap:.6rem">
        <a href="panel-admin.html" class="btn btn-gold btn-sm" style="font-size:.75rem">
          <i class="fas fa-shield-alt"></i> Panel Admin
        </a>
        <button onclick="cerrarSesion()" class="btn btn-ghost btn-sm" style="font-size:.72rem;color:var(--t3)" title="Cerrar sesión">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>`;
  } else if (role === 'modelo') {
    loginBtn.outerHTML = `
      <div style="display:flex;align-items:center;gap:.6rem">
        <span style="font-size:.78rem;color:var(--t2);max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${nombre || 'Mi Panel'}</span>
        <a href="panel-modelo.html" class="btn btn-gold btn-sm" style="font-size:.75rem">
          <i class="fas fa-user-circle"></i> Mi Panel
        </a>
        <button onclick="cerrarSesion()" class="btn btn-ghost btn-sm" style="font-size:.72rem;color:var(--t3)" title="Cerrar sesión">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>`;
  }
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}

/* ─── Auto-init ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  /* Detectar sesión activa en nav de páginas públicas */
  initNavSession();

  /* Intentar cargar escorts reales desde Supabase */
  const sbModels = await loadModelsFromSupabase();
  if (sbModels && sbModels.length > 0) {
    MODELS = sbModels;
    syncModelAvailabilityWithCitas();
  }

  const raw  = window.location.pathname.split('/').pop();
  const path = raw.replace(/\.html$/, '');
  if (path===''||path==='index') initIndex();
  else if (path==='modelos')      initModelos();
  else if (path==='categorias')   initCategorias();
  else if (path==='perfil')       initPerfil();
  else if (path==='membresias')   initMembresias();
  else if (path==='panel-admin')  initAdmin();
  else if (path==='panel-modelo') initPanelModelo();
});
