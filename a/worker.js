importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");

workbox.setConfig({ debug: true });

const {
    routing: { registerRoute, setCatchHandler },
    strategies: { CacheFirst, NetworkFirst, StaleWhileRevalidate },
    cacheableResponse: { CacheableResponse, CacheableResponsePlugin },
    expiration: { ExpirationPlugin, CacheExpiration },
    precaching: { matchPrecache, precacheAndRoute },
} = workbox;

precacheAndRoute([{ url: "/offline.html", revision: null }]);

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                // List of assets to be cached
                "img/",
                "img/android-chrome-36x36.png",
                "img/android-chrome-48x48.png",
                // Include other assets here...
            ]);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            Promise.all(
                keys.map(key => {
                    if (![cacheName].includes(key)) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});

// Meminta izin notifikasi dari pengguna
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'notificationPermission') {
        if (event.data.permission === 'granted') {
            console.log('Notification permission granted.');
            displayNotification();
        }
    }
});

// Fungsi untuk menampilkan notifikasi
function displayNotification() {
    self.registration.showNotification('New post available!', {
        body: 'Check out the latest post on our blog.',
        icon: '/path/to/icon.png' // Ganti dengan URL ikon notifikasi Anda
    });
}

// Mendaftarkan background sync saat service worker diaktifkan
self.addEventListener('activate', event => {
    // Mendaftarkan background sync
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready
            .then(registration => {
                return registration.sync.register('sync-post');
            })
            .catch(error => {
                console.error('Sync registration failed: ', error);
            });
    }
});

// Menangani background sync
self.addEventListener('sync', event => {
    if (event.tag === 'sync-post') {
        event.waitUntil(syncPosts());
    }
});

// Fungsi untuk melakukan sinkronisasi posting
function syncPosts() {
    return fetch('/sync-posts')
        .then(response => {
            console.log('Posts synced successfully.');
        })
        .catch(error => {
            console.error('Error syncing posts: ', error);
        });
              }
