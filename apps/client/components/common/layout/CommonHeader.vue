<script setup lang="ts">
import { Logo } from "#components";
import { removeTokens } from "@/utils/token";
// FIXME: 추후 개발 과정에서는 setToken 관련 내용 삭제

const router = useRouter();

const onClickRemoveTokens = async () => {
  await removeTokens();
  router.push("/auth/login");
};
</script>

<template>
  <header class="flex items-center px-6 py-4">
    <Logo />
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
