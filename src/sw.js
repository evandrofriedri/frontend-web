import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (e) => {
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: "favicon.ico",
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      data: { url: data.url },
      actions: [{ action: "open_url", title: "Abrir" }]
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  const url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
