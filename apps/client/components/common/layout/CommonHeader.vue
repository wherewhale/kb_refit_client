<script setup lang="ts">
import { Logo } from "#components";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();

const isKorean = ref(locale.value === "ko");

watch(isKorean, (val) => {
  setLocale(val ? "ko" : "en");
});
// import { removeTokens } from "@/utils/token";
// FIXME: 추후 개발 과정에서는 setToken 관련 내용 삭제

// const router = useRouter();

// const onClickRemoveTokens = async () => {
//   await removeTokens();
//   router.push("/auth/login");
// };
</script>

<template>
  <header class="flex items-center px-6 py-4 justify-between">
    <Logo />

    <USwitch
      v-model="isKorean"
      unchecked-icon="mdi:alphabetical"
      checked-icon="material-symbols:language-korean-latin"
      default-value
    />
    <!-- <KBUIButton
      class="ml-auto"
      variant="outlined"
      size="small"
      @click="onClickRemoveTokens"
    >
      로그아웃
    </KBUIButton> -->
  </header>
</template>
