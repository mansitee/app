// main.js

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('worker.js').then(function(registration) {
    console.log('Service Worker terdaftar!', registration);
  }).catch(function(error) {
    console.error('Gagal mendaftarkan Service Worker:', error);
  });
}
 
function requestBackgroundSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(function(registration) {
      return registration.sync.register('background-sync');
    }).catch(function(error) {
      console.error('Gagal mendaftarkan sinkronisasi latar belakang:', error);
    });
  } else {
    console.error('Background sync tidak didukung.');
  }
}

function requestPeriodicSync() {
  if ('serviceWorker' in navigator && 'periodicSync' in registration) {
    navigator.serviceWorker.ready.then(function(registration) {
      return registration.periodicSync.register('periodic-sync', {
        minInterval: 24 * 60 * 60 * 1000, // Set interval harian
      });
    }).catch(function(error) {
      console.error('Gagal mendaftarkan sinkronisasi periodik:', error);
    });
  } else {
    console.error('Periodic sync tidak didukung.');
  }
}

function requestNotificationPermission() {
  Notification.requestPermission(function(permission) {
    if (permission === 'granted') {
      console.log('Izin pemberitahuan diberikan.');
    }
  });
}

// Panggil fungsi-fungsi ini saat aplikasi dimuat
requestBackgroundSync();
requestPeriodicSync();
requestNotificationPermission();