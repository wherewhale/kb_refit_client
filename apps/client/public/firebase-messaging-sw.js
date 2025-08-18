// Import the firebase app / messaging packages
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

// Initialize app
const app = firebase.initializeApp({
  apiKey: "AIzaSyBWJnTAvotWMpA2_G5QdXUXf7fh2Wb-U-Q",
  authDomain: "kb-refit-97c7f.firebaseapp.com",
  projectId: "kb-refit-97c7f",
  storageBucket: "kb-refit-97c7f.firebasestorage.app",
  messagingSenderId: "663203165058",
  appId: "1:663203165058:web:a03b2cacdb2e029829959b",
  // measurementId: "G-WXWD2W9RQY"
});

// Initialize messaging
const messaging = firebase.messaging();

// Listen to bg messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received a bg message: ", payload);

  const title = payload.notification.title;
  const notification = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Show notification when message received
  self.registration.showNotification(title, notification);
});
