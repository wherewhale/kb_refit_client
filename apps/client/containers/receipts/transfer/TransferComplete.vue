<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div
      class="size-20 rounded-full bg-kb-yellow-pos mb-4 flex items-center justify-center"
    >
      <UIcon name="ic:round-check" :size="60" />
    </div>
    <KBUITypography weight="medium">이체를 완료했어요!</KBUITypography>
  </div>
</template>
