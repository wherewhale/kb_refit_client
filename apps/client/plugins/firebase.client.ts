import { defineNuxtPlugin } from "#app";
import { initializeApp, getApps } from "@firebase/app";
import { getMessaging, isSupported, onMessage } from "@firebase/messaging";
import type { Messaging } from "@firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBnu6RjJ590LXibggfB1YM2oHhbPJ0LxuE",
  authDomain: "kb-refit.firebaseapp.com",
  projectId: "kb-refit",
  storageBucket: "kb-refit.firebasestorage.app",
  messagingSenderId: "289583572319",
  appId: "1:289583572319:web:6920aa2a5986aff45bc2ea",
};

declare module "#app" {
  interface NuxtApp {
    $messaging: Messaging;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $messaging: Messaging;
  }
}

export default defineNuxtPlugin(async () => {
  const app = getApps()[0] ?? initializeApp(firebaseConfig);

  const supported = await isSupported();
  const messaging = supported ? getMessaging(app) : null;

  if (messaging) {
    onMessage(messaging, (payload) => {
      alert(JSON.stringify(payload, null, 2));
    });
  }

  return {
    provide: { messaging },
  };
});
