const CACHE_NAME = 'dba-bank-v1';

// قائمة الصفحات الموجودة في مستودعك لتخزينها بالكامل
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './RM-TB.html',
  './Ma-IS-TB.html'
];

// تثبيت الخدمة وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم تخزين جميع بنوك الأسئلة أوفلاين');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل الخدمة وتنظيف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// استراتيجية التشغيل أوفلاين
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
