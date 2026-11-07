// Service Worker for "معراج الإتقان في متشابهات القرآن" - الإصدار v120
const CACHE_NAME = 'miraj-itqan-v129-tablet-portrait-harmony';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './quran_cache.json',
  './app-icon.svg',
  './app-icon.jpg',
  './app-icon-192.png',
  './app-icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Always network-first with no-store for HTML navigation to ensure immediate updates without cache lag
  if (event.request.mode === 'navigate' || event.request.url.includes('index.html') || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          if (response && response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(res => res || caches.match('./index.html')))
    );
    return;
  }

  // Assets: cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return response;
      });
    })
  );
});
