// // const { initializeApp } = require("firebase/app")
// // const { getMessaging, getToken, onMessage } = require("firebase/messaging")

import { initializeApp } from "firebase/app";
import { getMessaging, getToken , onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyD2tdiMj-trTJuVbGexV3wp2hVq-RMM5m0",
  authDomain: "multivendor-8779f.firebaseapp.com",
  projectId: "multivendor-8779f",
  storageBucket: "multivendor-8779f.appspot.com",
  messagingSenderId: "1010519479146",
  appId: "1:1010519479146:web:7dedcbbc001e10b6120b13",
  measurementId: "G-XWBKV4V57K"
};

const vapidKey = 'BD2wsvd8ROszNseP2X3WOVgkeYmOyfIq7VJ-s-IRNl9aW2Pw_k341GnhhumfCDiv4J5qcFp_TeiBgPLlD8aGOWI'

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app)

export const requestFCMToken = async () => {

    return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            return getToken(messaging, { vapidKey })
        } else if (permission === 'denied') {
            console.log('Notification permission denied.');
            throw new Error("Notication not granted")
        } else {
            console.log('Notification permission default (not granted or denied).');
        }
    });

}

// Listen for foreground messages
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // You can also do additional processing on the payload here if needed
  });