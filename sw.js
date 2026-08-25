/* Youth Alive 26 — minimal offline service worker.
   Bump CACHE when you change content so phones get the update. */
const CACHE = "ya26-v19";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./artwork-en.png",
  "./artwork-tr.png",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    const isDoc = req.mode === "navigate" ||
      url.pathname.endsWith("/") || url.pathname.endsWith("index.html");
    if (isDoc) {
      // The page itself: NETWORK-FIRST so updates always show; cache is offline fallback.
      e.respondWith(
        fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        }).catch(() => caches.match(req).then(h => h || caches.match("./index.html")))
      );
      return;
    }
    // Other same-origin assets (icons, artwork, manifest): cache-first.
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }))
    );
    return;
  }

  // Google Fonts (cross-origin): stale-while-revalidate so text stays styled offline.
  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
  }
});
