import { defineNuxtPlugin } from "#app";
import { initializeApp, getApps } from "@firebase/app";
import { getMessaging, isSupported, onMessage } from "@firebase/messaging";
import type { Messaging } from "@firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBWJnTAvotWMpA2_G5QdXUXf7fh2Wb-U-Q",
  authDomain: "kb-refit-97c7f.firebaseapp.com",
  projectId: "kb-refit-97c7f",
  storageBucket: "kb-refit-97c7f.firebasestorage.app",
  messagingSenderId: "663203165058",
  appId: "1:663203165058:web:a03b2cacdb2e029829959b",
  // measurementId: "G-WXWD2W9RQY"
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
