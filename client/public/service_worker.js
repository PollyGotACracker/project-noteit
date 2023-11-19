self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  clients.claim();
});

self.addEventListener("push", (e) => {
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo512.png",
      data: data,
      requireInteraction: true,
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  //cf) e.notification.data 는 showNotification 의 data 프로퍼티의 값
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});
