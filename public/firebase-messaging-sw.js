

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAysDYysJFf1g-ANzOXTtuoiKAeupCZkl4",
  authDomain: "jamalpur-bazar-7f15b.firebaseapp.com",
  projectId: "jamalpur-bazar-7f15b",
  storageBucket: "jamalpur-bazar-7f15b.firebasestorage.app",
  messagingSenderId: "173254412310",
  appId: "1:173254412310:web:b811039d3337b9b18c0d37",
  measurementId: "G-4N3T0JNY9N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background notifications
// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message", payload);

//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: payload.notification.icon || "/default-icon.png",
//     badge: "/badge-icon.png",
//     data: { url: payload.notification.click_action },
//   });
// });


messaging.onBackgroundMessage(async (payload) => {
    console.log("📩 Background Message Received:", payload);
  
    const clientsList = await clients.matchAll({ type: "window", includeUncontrolled: true });
  
    // Check if any open client (tab) is visible
    const isAppInForeground = clientsList.some((client) => client.visibilityState === "visible");
  
    if (!isAppInForeground) {
      console.log("📢 App is in background → Showing notification");
      self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
        data: { url: payload.notification.click_action },
      });
    } else {
      console.log("⚠️ App is in foreground → Suppressing background notification");
    }
  });

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/")
  );
});