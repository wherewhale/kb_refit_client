<script setup lang="ts">
import { Logo } from "#components";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();

const isEnglish = ref(locale.value === "en");

watch(isEnglish, (val) => {
  setLocale(val ? "en" : "ko");
});
</script>

<template>
  <header class="flex items-center px-6 py-4 justify-between">
    <Logo />

    <USwitch
      v-model="isEnglish"
      aria-label="language-change-button"
      unchecked-icon="material-symbols:language-korean-latin"
      checked-icon="mdi:alphabetical"
    />
  </header>
</template>
