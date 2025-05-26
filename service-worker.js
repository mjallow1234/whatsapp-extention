// Enhanced service worker for offline support and asset caching
const CACHE_NAME = 'wa-ext-cache-v2';
const OFFLINE_URL = 'offline.html';
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/manifest.json',
  '/styles.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match(OFFLINE_URL);
      });
    })
  );
});
