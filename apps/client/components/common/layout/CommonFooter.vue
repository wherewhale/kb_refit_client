<script setup lang="ts">
import { removeTokens } from "@/utils/token";
import { getToken } from "@firebase/messaging";

const router = useRouter();

const onClickRemoveTokens = async () => {
  await removeTokens();
  router.push("/auth/login");
};

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

  messagingToken.value = token;
}

function copy() {
  navigator.clipboard.writeText(messagingToken.value);
}
</script>

<template>
  <footer class="flex flex-col gap-4 items-center justify-center mt-10 pb-20">
    <KBUITypography
      size="b14"
      weight="medium"
      color="gray-2"
      class="cursor-pointer hover:text-gray-4 transition-colors"
      @click="onClickRemoveTokens"
    >
      로그아웃
    </KBUITypography>
    <KBUITypography
      size="b14"
      weight="medium"
      color="gray-2"
      class="cursor-pointer hover:text-gray-4 transition-colors mt-2"
      @click="requestPermission"
    >
      푸시 알림 받기
    </KBUITypography>
    <div v-if="messagingToken">
      <div class="break-all text-ellipsis text-wrap text-gray-3">
        {{ messagingToken }}
      </div>

      <KBUITypography
        size="b14"
        weight="medium"
        color="gray-2"
        class="cursor-pointer hover:text-gray-4 transition-colors mt-2 text-center"
        @click="copy"
      >
        클립보드에 복사
      </KBUITypography>
    </div>

    <KBUITypography size="b14" weight="medium" color="gray-3">
      © 2025 깨비들. All rights reserved.
    </KBUITypography>
  </footer>
</template>
