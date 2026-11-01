// Keeps Money Tracker opening with no signal: serves the app shell from cache, refreshes it in the background.
// Sync traffic (Firestore, sign-in) is never cached; Firebase queues those writes itself while offline.
const CACHE = "money-v3";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./firebase-config.js", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const staticLib = /(^|\.)gstatic\.com$|^fonts\.googleapis\.com$|^cdnjs\.cloudflare\.com$/.test(url.hostname);
  if (!sameOrigin && !staticLib) return;
  // the app page itself: newest version first so updates show on the first open; the saved copy only when offline
  if (req.mode === "navigate") {
    // no-cache: always ask the server whether there's a newer page, instead of reusing the browser's 10-minute copy
    e.respondWith(fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put("./index.html", copy)); }
      return res;
    }).catch(() => caches.match("./index.html").then((hit) => hit || caches.match("./"))));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async (cache) => {
    const hit = await cache.match(req);
    const fresh = fetch(req).then((res) => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => hit);
    return hit || fresh;
  }));
});
