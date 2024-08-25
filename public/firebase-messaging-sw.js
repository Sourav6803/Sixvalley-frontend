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
        body: payload.notification.body,
        icon: '/firebase-logo.png' // Replace with your app's logo or notification icon
    };
    /* eslint-disable no-restricted-globals */

    self.registration.showNotification(notificationTitle, notificationOptions);
});