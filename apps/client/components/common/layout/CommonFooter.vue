<script setup lang="ts">
import { removeTokens } from "@/utils/token";

const router = useRouter();

const onClickRemoveTokens = async () => {
  await removeTokens();
  router.push("/auth/login");
};
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
    <KBUITypography size="b14" weight="medium" color="gray-3">
      © 2025 깨비들. All rights reserved.
    </KBUITypography>
  </footer>
</template>
