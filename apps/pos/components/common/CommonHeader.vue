<script setup lang="ts">
import { removeTokens } from "@/utils/token";

const router = useRouter();

const onClickRemoveTokens = async () => {
  await removeTokens();
  router.push("/auth/login");
};
</script>
<template>
  <header class="bg-white w-full p-4">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center justify-center gap-2">
        <figure class="relative flex justify-center items-center size-10">
          <NuxtImg
            src="assets/images/logos/symbol-logo.png"
            alt="kb_logo"
            width="40"
          />
        </figure>
        <KBUITypography size="h32" weight="bold"> POS 시스템</KBUITypography>
      </div>

      <KBUIButton
        class="ml-auto"
        variant="outlined"
        size="small"
        @click="onClickRemoveTokens"
      >
        로그아웃
      </KBUIButton>
    </div>
  </header>
</template>
