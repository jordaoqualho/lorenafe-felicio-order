const CACHE_NAME = "lorenafe-v2"; // Incrementar versão para forçar atualização
const urlsToCache = ["/", "/manifest.json", "/images/icons/icon-192.png", "/images/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", (event) => {
  // Para imagens, usa network-first com fallback para cache
  if (event.request.url.includes("/images/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Se a requisição foi bem-sucedida, atualiza o cache
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Se a rede falhar, usa o cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Para outros recursos, usa cache-first
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
