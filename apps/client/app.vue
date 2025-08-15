<script lang="ts" setup>
import { getToken } from "@firebase/messaging";

const messagingToken = ref("");

onMounted(() => {
  requestPermission();
});

function requestPermission() {
  if (!window.Notification) return;

  if (window.Notification.permission === "granted") {
    setToken();
  } else {
    window.Notification.requestPermission((value) => {
      if (value === "granted") {
        setToken();
      }
    });
  }
}

async function setToken() {
  const { $messaging } = useNuxtApp();
  const token = await getToken($messaging, {
    vapidKey:
      "BKOStP9Dtijt8pt9a3i_dOvDvXoeWvqViTBpRb-jAvwnlqbvGJToOKfGjrs4uCfbjLnofmwqMNxPAX6lLVe6yEM",
  });
  // TODO: 여기서 서버에 유저 정보 업데이트 API

  // Send token to server, save in user schema
  // but we're just manually doing it
  messagingToken.value = token;
}

function copy() {
  navigator.clipboard.writeText(messagingToken.value);
}
</script>

<template>
  <UApp>
    <div>{{ messagingToken }}</div>
    <button v-if="messagingToken" @click="copy">Copy to Clipboard</button>
    <button @click="requestPermission">Allow Notifications</button>
    <VitePwaManifest />
    <NuxtPage />
    <div id="loading" />
  </UApp>
</template>
