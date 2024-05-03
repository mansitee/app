// worker.js

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('offline-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/main.js',
        '/manifest.json',
        '/worker.js',
        // Tambahkan URL lain yang perlu di-cache
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  return fetch('https://mansitee.github.io/app/a')
    .then(function(response) {
      // Lakukan sesuatu dengan respons
      console.log('Data berhasil disinkronisasi:', response);
    })
    .catch(function(error) {
      // Tangani kesalahan
      console.error('Gagal menyinkronisasi data:', error);
    });
}

self.addEventListener('push', function(event) {
  const title = 'Pemberitahuan';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'periodic-sync') {
    event.waitUntil(syncData());
  }
});