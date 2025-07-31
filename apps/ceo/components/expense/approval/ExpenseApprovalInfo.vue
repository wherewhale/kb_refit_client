<script setup lang="ts">
const props = defineProps<{
  onApprove: () => void;
  onReject: () => void;
}>();
</script>

<template>
  <form>
    <KBUITypography size="b14" color="gray-2"> 신청자 </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2">
      김리핏
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      경비 처리 항목
    </KBUITypography>
    <KBUITypography weight="medium" class-name="mt-2"
      >업무추진</KBUITypography
    >
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      관련 이미지
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class-name="mt-4">
      세부 사용 내역
    </KBUITypography>
    <div class="w-full rounded-lg border border-black shadow-lg mt-2">
      <CommonReceipt
        ref="receiptRef"
        title="가게 이름"
        business-number="123-45-67890"
        ceo="홍길동"
        address="서울특별시 강남구 역삼동 123-45"
        :created-at="new Date()"
        :goods="[
          { name: '상품1', price: 10000, quantity: 2 },
          { name: '상품2', price: 15000, quantity: 1 },
        ]"
      />
    </div>
  </form>
s  <div class="mt-6 grid grid-cols-2 gap-6">
    <UButton
      color="primary"
      class="flex-1 min-h-[56px] rounded-lg px-8 text-white text-lg font-medium items-center justify-center"
      :disabled="false"
      @click="props.onApprove"
      >승인하기</UButton>
    <UButton
      color="error"
      class="flex-1 min-h-[56px] rounded-lg px-8 text-white text-lg font-medium items-center justify-center"
      @click="props.onReject"
    >반려하기</UButton>
  </div>
</template>