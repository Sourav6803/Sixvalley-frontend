// /* eslint-disable no-undef */
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// const firebaseConfig = {
//     apiKey: "AIzaSyD2tdiMj-trTJuVbGexV3wp2hVq-RMM5m0",
//     authDomain: "multivendor-8779f.firebaseapp.com",
//     projectId: "multivendor-8779f",
//     storageBucket: "multivendor-8779f.appspot.com",
//     messagingSenderId: "1010519479146",
//     appId: "1:1010519479146:web:7dedcbbc001e10b6120b13",
//     measurementId: "G-XWBKV4V57K"
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// console.log("Service Worker is active.");

// // Handle background messages
// // messaging.onBackgroundMessage((payload) => {
// //     console.log('[firebase-messaging-sw.js] Received background message', payload);

// //     const notificationTitle = payload.notification.title;

// //     // const notificationOptions = {
// //     //     body: payload.notification?.body || "You have a new message.",
// //     //     icon: payload.data?.icon ,
// //     //     image: payload.notification?.image, // Display image
// //     //     data: { url: payload.fcmOptions.link },
// //     //     requireInteraction: true
// //     // };

// //     const notificationOptions = {
// //         body: payload.notification?.body || "You have a new message.",
// //         icon: payload.data?.icon || "/default-icon.png", // Default icon if missing
// //         image: payload.notification?.image, // Ensure image is set correctly
// //         data: { url: payload.data?.url }, // URL for redirection
// //         requireInteraction: true, // Keeps notification visible until user interacts
// //         vibrate: [200, 100, 200], // Vibrate pattern
// //       };

// //     console.log("notification option", notificationOptions)

// //     self.registration.showNotification(notificationTitle, notificationOptions);
// // });

// messaging.onBackgroundMessage((payload) => {
//     console.log("Received background message", payload);
  
//     self.registration.showNotification(payload.notification.title, {
//       body: payload.notification.body,
//       icon: payload.notification.icon || "/default-icon.png",
//       badge: "/badge-icon.png",
//       data: { url: payload.notification.click_action },
//     });
//   });

// self.addEventListener("notificationclick", (event) => {
//     console.log("🔗 Notification clicked:", event);
//     event.notification.close();
  
//     if (event.notification.data && event.notification.data.url) {
//       event.waitUntil(clients.openWindow(event.notification.data.url));
//     }
//   });























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