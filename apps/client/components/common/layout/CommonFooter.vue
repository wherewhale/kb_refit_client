<script setup lang="ts">
import { removeTokens } from "@/utils/token";
import { getToken } from "@firebase/messaging";
import { useMutation } from "@tanstack/vue-query";
import { postUserFcmToken } from "~/services/fcm";

const router = useRouter();
const toast = useToast();

const { mutate: postFcmTokenApi } = useMutation({
  mutationFn: async (token: string) => await postUserFcmToken(token),
  onSuccess: () => {
    console.log("FCM 토큰이 성공적으로 서버에 저장되었습니다.");
  },
  onError: () => {
    console.error("FCM 토큰을 서버에 저장하는 데 실패했습니다.");
    toast.add({
      title: "토큰 설정 오류",
      description: "FCM 토큰을 서버에 저장하는 데 실패했습니다.",
      color: "error",
    });
  },
});

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
  if (token) {
    postFcmTokenApi(token);
  } else {
    toast.add({
      title: "토큰 설정 오류",
      description: "FCM 토큰을 가져오는 데 실패했습니다.",
      color: "error",
    });
  }
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
