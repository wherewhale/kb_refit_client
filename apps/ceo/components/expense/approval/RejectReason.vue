<!-- components/expense/approval/RejectReason.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  receiptId: string;
  onPrev?: () => void;                 // 선택: 이전으로
  onSubmit?: () => void;               // 선택: 부모 콜백(인자 없이)
}>();

// 이벤트로 reason을 넘겨주면 부모가 필요시 받을 수 있음
const emit = defineEmits<{
  (e: "submit", reason: string): void;
}>();

const reason = ref("");
const maxLen = 40;

const isValid = computed(() => {
  const v = reason.value.trim();
  return v.length > 0 && v.length <= maxLen;
});

const onClickSubmit = () => {
  if (!isValid.value) return;
  // 1) 이벤트로 사유 전달
  emit("submit", reason.value.trim());
  // 2) 부모에서 단순 콜백만 넘긴 경우도 지원
  props.onSubmit?.();
};
</script>

<template>
  <!-- 카드 -->
  <section class="rounded-lg bg-white text-black">

    <div class="mt-6">
      <KBUITypography size="b14" weight="medium" color="gray-2">반려 사유</KBUITypography>

      <!-- 텍스트 입력 (최대 40자) -->
      <div class="mt-2">
        <textarea
          v-model="reason"
          :maxlength="maxLen"
          placeholder="최대 40자까지 입력 가능합니다."
          class="w-full rounded-lg border border-gray-300 p-4 outline-none"
          rows="4"
        />
        <div class="mt-1 text-right">
          <KBUITypography size="b12" color="gray-2">
            {{ reason.length }} / {{ maxLen }}
          </KBUITypography>
        </div>
      </div>
    </div>
  </section>

  <!-- 하단 버튼들: 스타일은 유지, 로직만 -->
  <div class="mt-6 flex gap-3">
    <KBUIButton
      variant="primary"
      size="large"
      class-name="w-full"
      :disabled="!isValid"
      @click="onClickSubmit"
    >
      반려하기
    </KBUIButton>
  </div>
</template>