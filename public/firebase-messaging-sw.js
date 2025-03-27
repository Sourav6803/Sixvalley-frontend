/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyD2tdiMj-trTJuVbGexV3wp2hVq-RMM5m0",
    authDomain: "multivendor-8779f.firebaseapp.com",
    projectId: "multivendor-8779f",
    storageBucket: "multivendor-8779f.appspot.com",
    messagingSenderId: "1010519479146",
    appId: "1:1010519479146:web:7dedcbbc001e10b6120b13",
    measurementId: "G-XWBKV4V57K"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

console.log("Service Worker is active.");

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message', payload);

    const notificationTitle = payload.notification.title;

   

    const notificationOptions = {
        body: payload.notification?.body || "You have a new message.",
        icon: payload.data?.icon ,
        image: payload.notification?.image, // Display image
        data: { click_action: payload.fcmOptions?.link },
        requireInteraction: true
    };

    console.log("notification option", notificationOptions)

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    if (event.notification.data && event.notification.data.click_action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.click_action)
        );
    }
});