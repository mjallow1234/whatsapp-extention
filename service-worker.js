// Basic service worker for offline support
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('wa-ext-cache-v1').then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(networkResponse => {
          // Optionally cache new requests
          // cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
