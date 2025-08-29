// // // const { initializeApp } = require("firebase/app")
// // // const { getMessaging, getToken, onMessage } = require("firebase/messaging")

// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyD2tdiMj-trTJuVbGexV3wp2hVq-RMM5m0",
//   authDomain: "multivendor-8779f.firebaseapp.com",
//   projectId: "multivendor-8779f",
//   storageBucket: "multivendor-8779f.appspot.com",
//   messagingSenderId: "1010519479146",
//   appId: "1:1010519479146:web:7dedcbbc001e10b6120b13",
//   measurementId: "G-XWBKV4V57K",
// };

// const vapidKey =
//   "BD2wsvd8ROszNseP2X3WOVgkeYmOyfIq7VJ-s-IRNl9aW2Pw_k341GnhhumfCDiv4J5qcFp_TeiBgPLlD8aGOWI";

// // // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const messaging = getMessaging(app);

// let isListenerAttached = false;

// if (!isListenerAttached) {
//   onMessage(messaging, (payload) => {
//     console.log("Foreground Message received:", payload);
//     if (navigator.serviceWorker) {
//       navigator.serviceWorker.getRegistrations().then((registrations) => {
//         if (registrations.length === 0) {
//           showNotification(payload); // Show only if no service worker is handling it
//         }
//       });
//     }
//   });

//   isListenerAttached = true;
// }

// // Register service worker
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch((err) => console.error("Service Worker registration failed:", err));
// }

// export const requestFCMToken = async () => {
//   return Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//       return getToken(messaging, { vapidKey });
//     } else if (permission === "denied") {
//       console.log("Notification permission denied.");
//       throw new Error("Notication not granted");
//     } else {
//       console.log("Notification permission default (not granted or denied).");
//     }
//   });
// };

// function showNotification(payload) {
//   const { notification } = payload;
//   if (Notification.permission === "granted") {
//     new Notification(notification.title, {
//       body: notification.body,
//       icon: notification.icon,
//       data: { url: notification.click_action }, 
//     });
//   }
// }















import { initializeApp, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";



const firebaseConfig = {
  apiKey: "AIzaSyAysDYysJFf1g-ANzOXTtuoiKAeupCZkl4",
  authDomain: "jamalpur-bazar-7f15b.firebaseapp.com",
  projectId: "jamalpur-bazar-7f15b",
  storageBucket: "jamalpur-bazar-7f15b.firebasestorage.app",
  messagingSenderId: "173254412310",
  appId: "1:173254412310:web:b811039d3337b9b18c0d37",
  measurementId: "G-4N3T0JNY9N"
};

const vapidKey = "5hKgfyXLMbZNDeQYF_PzJ7XZ1XF166k5w1J8qP3c1EBO2LcF8F5sjvfbbM_ivGS2nngzJZglrrbFkwClMstHN4jKHF2EcRZkPXVjs1lfU-zcqu0uD60JwYeG96PhyehwM";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to check if the app is in the foreground
function isAppInForeground() {
  return document.visibilityState === "visible"; // 'visible' means app is active
}

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((err) => console.error("Service Worker registration failed:", err));
}

// Request permission and get FCM token
export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      return getToken(messaging, { vapidKey });
    } else {
      console.log("Notification permission denied.");
      throw new Error("Notification not granted");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Ensure only foreground messages are handled here
// onMessage(messaging, (payload) => {
//   console.log("Foreground Message received:", payload);
//   if (navigator.serviceWorker) {
//     navigator.serviceWorker.getRegistrations().then((registrations) => {
//       if (registrations.length === 0) {
//         showNotification(payload); // Only show if no service worker is active
//       }
//     });
//   }
// });

onMessage(messaging, (payload) => {
  console.log("📩 Foreground Message Received:", payload);

  // if (isAppInForeground()) {
  //   // Show in-app notification only if the app is in the foreground
  //   new Notification(payload.notification.title, {
  //     body: payload.notification.body,
  //     icon: payload.notification.icon,
  //   });
  // }

  console.log("Foreground Message received:", payload);
  if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length === 0) {
        showNotification(payload); // Only show if no service worker is active
      }
    });
  }
});

// Show notification function
function showNotification(payload) {
  if (Notification.permission === "granted") {
    const { notification } = payload;
    new Notification(notification.title, {
      body: notification.body,
      icon: notification.icon || "/default-icon.png",
      data: { url: notification.click_action },
    });
  }
}



