<script setup lang="ts">
const props = defineProps<{
  receiptId: string;
  onGoList: () => void;
}>();
</script>

<template>
  <!-- 완료 카드 -->
  <section class="rounded-lg bg-white p-6 text-black">

    <div class="flex flex-col items-center justify-center py-10">
      <div class="w-24 h-24 rounded-full bg-kb-yellow-pos flex items-center justify-center">
        <UIcon name="ic:round-check" :size="48" class="text-white" />
      </div>

      <KBUITypography size="b16" class-name="mt-6" weight="medium">
        반려 처리를 완료했어요!
      </KBUITypography>
    </div>
  </section>

  <KBUIButton
    size="large"
    variant="primary"
    class-name="w-full mt-6"
    @click="props.onGoList"
  >
    완료
  </KBUIButton>
</template>