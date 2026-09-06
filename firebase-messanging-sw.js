importScripts("https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCwc-W77xFztHROZEpvfK0nWZC2P9bNGOQ",
  authDomain: "platform-loker-bengkulu.firebaseapp.com",
  projectId: "platform-loker-bengkulu",
  storageBucket: "platform-loker-bengkulu.firebasestorage.app",
  messagingSenderId: "522033003669",
  appId: "1:522033003669:web:4ff46c3f27a8df48eeaf9c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: { url: payload.data?.url || "/" }
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
