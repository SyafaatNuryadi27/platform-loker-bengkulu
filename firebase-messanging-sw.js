// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js");

// Inisialisasi Firebase App di Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyCwc-W77xFztHROZEpvfK0nWZC2P9bNGOQ",
  authDomain: "platform-loker-bengkulu.firebaseapp.com",
  projectId: "platform-loker-bengkulu",
  storageBucket: "platform-loker-bengkulu.firebasestorage.app",
  messagingSenderId: "522033003669",
  appId: "1:522033003669:web:4ff46c3f27a8df48eeaf9c"
});

const messaging = firebase.messaging();

// Menangani notifikasi saat aplikasi ditutup / berjalan di background
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Pesan background diterima: ", payload);

  const notificationTitle = payload.notification?.title || "Loker Bengkulu Notification";
  const notificationOptions = {
    body: payload.notification?.body || "Ada pembaruan lowongan kerja baru!",
    icon: "/icon.png", // Ganti dengan path ikon web Anda
    badge: "/badge.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
