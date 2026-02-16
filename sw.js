self.addEventListener('install',e=>{
 e.waitUntil(caches.open('feng').then(c=>c.addAll(['./'])));
});
self.addEventListener('fetch',e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
