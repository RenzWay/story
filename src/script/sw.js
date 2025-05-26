async function precacheResource(cachename) {
  const cache = await caches.open(cachename);

  await cache.addAll([
    "./index.html",
    "./index.js",
    "./main.css",
    "./icon-story.png",
    "./app.webmanifest",
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheResource("story-app"));

  console.log("Service Worker installed.");
});

self.addEventListener("push", function (event) {
  console.log("Push event received!", event);

  let data = {};

  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: "Notifikasi Default",
      body: "Isi notifikasi tidak tersedia",
    };
  }

  const title = data.title || "Judul Notifikasi";
  const options = {
    body: data.body || "Isi notifikasi...",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
