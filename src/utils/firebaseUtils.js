import { initializeApp, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

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
      console.log("Notification permission granted 11.");
      const cleanVapidKey = vapidKey.trim().replace(/_/g, '/').replace(/-/g, '+');

      return getToken(messaging, { cleanVapidKey });
    } else {
      console.log("Notification permission denied.");
      throw new Error("Notification not granted");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};


// onMessage(messaging, (payload) => {
//   console.log("Foreground Message received:", payload)
//   if (navigator.serviceWorker) {
//     navigator.serviceWorker.getRegistrations().then((registrations) => {
//       if (registrations.length === 0) {
//         showNotification(payload); // Only show if no service worker is active
//       }
//     });
//   }
// });

export const setupForegroundMessaging = () => {
  
  onMessage(messaging, (payload) => {
    console.log("Foreground Message received:", payload)
    console.log("document.visibilityState-->", document.visibilityState)
    if (document.visibilityState === "visible") {
      // Use toast notification
      // Optional: your custom UI notification
      console.log("document visible")
      showInAppNotification(payload)

      toast.info(payload.notification.title);
    } else {
      // fallback system notification
      showNotification(payload);
      console.log("document not visible")
    }
  });
};

// Optional: your custom UI notification
function showInAppNotification(payload) {
  // e.g. show a toast in your React app
  console.log("In-App Notification:", payload);
}

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



// import { initializeApp, getApp } from "firebase/app";
// import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";


// const firebaseConfig = {
//   apiKey: "AIzaSyAysDYysJFf1g-ANzOXTtuoiKAeupCZkl4",
//   authDomain: "jamalpur-bazar-7f15b.firebaseapp.com",
//   projectId: "jamalpur-bazar-7f15b",
//   storageBucket: "jamalpur-bazar-7f15b.firebasestorage.app",
//   messagingSenderId: "173254412310",
//   appId: "1:173254412310:web:b811039d3337b9b18c0d37",
//   measurementId: "G-4N3T0JNY9N"
// };

// // Your VAPID key - make sure it's properly formatted
// const vapidKey = "5hKgfyXLMbZNDeQYF_PzJ7XZ1XF166k5w1J8qP3c1EBO2LcF8F5sjvfbbM_ivGS2nngzJZglrrbFkwClMstHN4jKHF2EcRZkPXVjs1lfU-zcqu0uD60JwYeG96PhyehwM"


// // Initialize Firebase
// let app;
// let messaging;

// try {
//   app = initializeApp(firebaseConfig);
//   messaging = getMessaging(app);
//   console.log("Firebase initialized successfully");
// } catch (error) {
//   console.error("Firebase initialization error:", error);
// }

// // Check if service worker is supported and register it
// const registerServiceWorker = async () => {
//   if ('serviceWorker' in navigator) {
//     try {
//       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
//       console.log('Service Worker registered with scope:', registration.scope);
//       return registration;
//     } catch (error) {
//       console.error('Service Worker registration failed:', error);
//       return null;
//     }
//   }
//   return null;
// };

// // Enhanced token request function
// export const requestFCMToken = async () => {
//   try {
//     // Check if Firebase Messaging is supported
//     const isMessagingSupported = await isSupported();
//     if (!isMessagingSupported) {
//       console.log("Firebase Messaging not supported in this environment");
//       return null;
//     }

//     const cleanVapidKey = vapidKey.trim().replace(/_/g, '/').replace(/-/g, '+');

//     // Request notification permission
//     const permission = await Notification.requestPermission();
    
//     if (permission === "granted") {
//       console.log("Notification permission granted");
      
//       // Register service worker first
//       await registerServiceWorker();
      
//       // Get FCM token
//       const currentToken = await getToken(messaging, { 
//         cleanVapidKey,
//         serviceWorkerRegistration: await navigator.serviceWorker.ready
//       });
      
      
//       if (currentToken) {
//         console.log("FCM token obtained:", currentToken);
//         return currentToken;
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//         return null;
//       }
//     } else {
//       console.log("Notification permission denied");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//     return null;
//   }
// };

// // Enhanced foreground message handler
// export const setupForegroundMessages = () => {
//   if (!messaging) {
//     console.log("Messaging not available");
//     return;
//   }

//   onMessage(messaging, (payload) => {
//     console.log("📩 Foreground Message Received:", payload);

//     // Check if app is in foreground
//     if (document.visibilityState === "visible") {
//       // Show custom in-app notification instead of browser notification
//       showInAppNotification(payload);
//     }
    
//     // Always pass to service worker for background handling
//     if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
//       navigator.serviceWorker.controller.postMessage({
//         type: 'FOREGROUND_MESSAGE',
//         payload: payload
//       });
//     }
//   });
// };

// // Custom in-app notification function
// const showInAppNotification = (payload) => {
//   const { notification, data } = payload;
  
//   // Create custom notification UI instead of using browser notifications
//   const notificationElement = document.createElement('div');
//   notificationElement.className = 'custom-notification';
//   notificationElement.innerHTML = `
//     <div class="notification-content">
//       <img src="${data?.appIcon || notification?.icon || '/default-icon.png'}" 
//            alt="${data?.appName || 'App'}" 
//            class="notification-icon">
//       <div class="notification-text">
//         <div class="notification-title">${notification?.title || 'Notification'}</div>
//         <div class="notification-body">${notification?.body || ''}</div>
//         <div class="notification-app">${data?.appName || 'Jamalpur Bazar'}</div>
//       </div>
//       <button class="notification-close">&times;</button>
//     </div>
//   `;
  
//   // Add styles
//   notificationElement.style.cssText = `
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     background: white;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     padding: 12px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//     z-index: 10000;
//     max-width: 350px;
//     cursor: pointer;
//   `;
  
//   // Add click handler for redirection
//   notificationElement.addEventListener('click', () => {
//     if (data?.url || data?.click_action) {
//       window.open(data.url || data.click_action, '_blank');
//     }
//     document.body.removeChild(notificationElement);
//   });
  
//   // Add close button handler
//   const closeBtn = notificationElement.querySelector('.notification-close');
//   closeBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     document.body.removeChild(notificationElement);
//   });
  
//   // Auto remove after 5 seconds
//   setTimeout(() => {
//     if (document.body.contains(notificationElement)) {
//       document.body.removeChild(notificationElement);
//     }
//   }, 5000);
  
//   document.body.appendChild(notificationElement);
// };

// // Initialize foreground messaging
// setupForegroundMessages();

// // Export messaging instance
// export { messaging };