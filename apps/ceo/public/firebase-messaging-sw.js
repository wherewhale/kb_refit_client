// Import the firebase app / messaging packages
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

// Initialize app
const app = {
  apiKey: "AIzaSyBnu6RjJ590LXibggfB1YM2oHhbPJ0LxuE",
  authDomain: "kb-refit.firebaseapp.com",
  projectId: "kb-refit",
  storageBucket: "kb-refit.firebasestorage.app",
  messagingSenderId: "289583572319",
  appId: "1:289583572319:web:6920aa2a5986aff45bc2ea",
};

firebase.initializeApp(app);

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
