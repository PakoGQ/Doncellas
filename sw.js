const CACHE_NAME = 'doncellas-v2';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/styles.css',
  '/app.js',
  '/offline.html',
  '/manifest.json',
  '/logo.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
];

const HTML_PAGES = [
  '/',
  '/index.html',
  '/modelos.html',
  '/categorias.html',
  '/perfil.html',
  '/membresias.html',
  '/panel-admin.html',
  '/panel-modelo.html',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([...STATIC_ASSETS, ...HTML_PAGES, OFFLINE_URL])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  const isHTML = request.headers.get('accept')?.includes('text/html') ||
                 url.pathname.endsWith('.html') ||
                 url.pathname === '/';

  if (isHTML) {
    // Network-first for HTML pages
    e.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
  } else {
    // Cache-first for static assets
    e.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
          return res;
        });
      })
    );
  }
});
