
// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// const firebaseConfig = {
//   apiKey: "AIzaSyAysDYysJFf1g-ANzOXTtuoiKAeupCZkl4",
//   authDomain: "jamalpur-bazar-7f15b.firebaseapp.com",
//   projectId: "jamalpur-bazar-7f15b",
//   storageBucket: "jamalpur-bazar-7f15b.firebasestorage.app",
//   messagingSenderId: "173254412310",
//   appId: "1:173254412310:web:b811039d3337b9b18c0d37",
//   measurementId: "G-4N3T0JNY9N"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// const APP_ICON = "https://res.cloudinary.com/dr4mnk4tw/image/upload/v1742971153/brand/uy0fpbxihxkfvkdqmxzs.png";
// const APP_NAME = "Jamalpur Bazar";

// // Updated service worker (firebase-messaging-sw.js)
// messaging.onBackgroundMessage(async (payload) => {
//   console.log("📩 Background Message Received:", payload);

//   const clientsList = await clients.matchAll({ type: "window", includeUncontrolled: true });
//   const isAppInForeground = clientsList.some((client) => client.visibilityState === "visible");

//   if (!isAppInForeground) {
//     console.log("📢 App is in background → Showing notification");
    
//     // Use data payload instead of notification payload
//     const notificationData = payload.data || payload.notification;
    
//     self.registration.showNotification(notificationData.title, {
//       body: notificationData.body,
//       icon: notificationData.icon || APP_ICON,
//       image: notificationData.image, // Add image support
//       data: { 
//         url: notificationData.url || notificationData.click_action 
//       },
//     });
//   } else {
//     console.log("⚠️ App is in foreground → Suppressing background notification");
//   }
// });

// // Handle notification click
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();
//   event.waitUntil(
//     clients.openWindow(event.notification.data.url || "/")
//   );
// });



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

const APP_CONFIG = {
  name: "Jamalpur Bazar",
  icon: "https://res.cloudinary.com/dr4mnk4tw/image/upload/v1742971153/brand/uy0fpbxihxkfvkdqmxzs.png",
  badge: "https://res.cloudinary.com/dr4mnk4tw/image/upload/v1742971153/brand/uy0fpbxihxkfvkdqmxzs.png",
  url: "http://localhost:3000" // Replace with your actual domain
};

// Enhanced background message handler
messaging.onBackgroundMessage(async (payload) => {
  console.log("📩 Background Message Received:", payload);

  try {
    const clientsList = await clients.matchAll({ 
      type: "window", 
      includeUncontrolled: true 
    });
    
    const isAppInForeground = clientsList.some(
      (client) => client.visibilityState === "visible"
    );

    if (!isAppInForeground) {
      await showBackgroundNotification(payload);
    } else {
      console.log("⚠️ App is in foreground → Suppressing background notification");
    }
  } catch (error) {
    console.error("Error handling background message:", error);
    // Fallback: show notification even if check fails
    await showBackgroundNotification(payload);
  }
});

async function showBackgroundNotification(payload) {
  const notificationData = payload.data || payload.notification;
  
  const notificationOptions = {
    body: notificationData.body,
    icon: notificationData.icon || APP_CONFIG.icon,
    badge: APP_CONFIG.badge,
    image: notificationData.image,
    tag: notificationData.tag || 'general',
    requireInteraction: false,
    actions: notificationData.actions ? JSON.parse(notificationData.actions) : [],
    data: { 
      url: notificationData.url || notificationData.click_action || APP_CONFIG.url
    },
    // Add these for better notification appearance
    vibrate: [200, 100, 200],
    timestamp: Date.now()
  };

  await self.registration.showNotification(
    notificationData.title || APP_CONFIG.name,
    notificationOptions
  );
}

// Enhanced notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("🔔 Notification clicked:", event.notification);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || APP_CONFIG.url;

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there's already a window open with the target URL
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no window found, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle notification close
self.addEventListener("notificationclose", (event) => {
  console.log("🔔 Notification closed:", event.notification);
});