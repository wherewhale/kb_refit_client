<script setup lang="ts">
import { Logo } from "#components";

import { removeTokens } from "@/utils/token";

const router = useRouter();

const onClickRemoveTokens = async () => {
  await removeTokens();
  router.push("/auth/login");
};
</script>

<template>
  <header class="flex items-center px-6 py-4">
    <Logo />
    <KBUITypography tag="h3" color="white" weight="bold" size="b14">
      사장님
    </KBUITypography>

    <KBUIButton
      class="ml-auto"
      variant="outlined"
      size="small"
      @click="onClickRemoveTokens"
    >
      로그아웃
    </KBUIButton>
  </header>
</template>
