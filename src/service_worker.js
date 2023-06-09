const OFFLINE_VERSION = 1;
const CACHE_NAME = "vascoai_cache";
const OFFLINE_URL = "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      //cache html url
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));

      //cache images and icons
      await cache.addAll(
        [
          './8b1ebe1eeb9bc6868617ef07c5cf9a2a.svg',
          './54c8389a56794c537e6d93e5b483aef2.svg',
          './361332e3e64807087c49abaf8434a66b.svg',
          './ba598288dfc486c2e55ad34c5891ce62.svg',
          './e0f662a6dc35e54832a9e8fa9305748a.svg'
        ]
      )
    })()
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the navigation preload response if it's
          // supported.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Always try the network first.
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // catch is only triggered if an exception is thrown, which is
          // likely due to a network error.
          // If fetch() returns a valid HTTP response with a response code in
          // the 4xx or 5xx range, the catch() will NOT be called.
          console.info("Fetch failed; returning offline page instead.", error);
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});


