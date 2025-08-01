<script setup lang="ts">
const props = defineProps<{
  receiptId: string;
  onPrev: () => void;
  onSubmit: () => void;
}>();

// 이벤트로 reason을 넘겨주면 부모가 필요시 받을 수 있음
const emit = defineEmits<{
  (e: "submit", reason: string): void;
}>();

const reason = ref("");
const maxLen = 40;

const isValid = computed(() => {
  const v = reason.value;
  return v.length > 0 && v.length <= maxLen;
});

const onClickSubmit = () => {
  if (!isValid.value) return;
  emit("submit", reason.value.trim());
  props.onSubmit?.();
};
</script>

<template>
  <section class="rounded-lg bg-white text-black">

    <div class="mt-6">
      <KBUITypography size="b14" weight="medium" color="gray-2">반려 사유</KBUITypography>

      <div class="mt-2">
        <textarea
          v-model="reason"
          :maxlength="maxLen"
          placeholder="최대 40자까지 입력 가능합니다."
          class="w-full rounded-lg border border-gray-2 p-4 outline-none"
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