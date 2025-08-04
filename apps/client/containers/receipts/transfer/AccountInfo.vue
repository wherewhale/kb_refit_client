<script setup lang="ts">
import type { ReceiptDetail } from "~/types/receipt";

const props = defineProps<{
  receiptData?: Ref<ReceiptDetail | undefined>;
}>();
const toast = useToast();

const onClickAccountInfo = () => {
  navigator.clipboard
    .writeText(
      `(국민) ${convertNumberBusinessNumberToString(props.receiptData?.value?.companyId ?? 0)}`
    )
    .then(() => {
      toast.add({ title: "가상 계좌 정보가 복사되었습니다." });
    })
    .catch(() => {
      toast.add({
        title: "가상 계좌 정보 복사에 실패했습니다.",
        color: "error",
      });
    });
};
</script>

<template>
  <div class="flex flex-col gap-2 mt-4">
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      상호
    </KBUITypography>
    <KBUITypography weight="medium">
      {{ props.receiptData?.value?.companyName }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      사업장 주소
    </KBUITypography>
    <KBUITypography weight="medium">
      {{ props.receiptData?.value?.address }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      가상 계좌 정보 (클릭 시 복사)
    </KBUITypography>
    <KBUITypography
      weight="medium"
      class="underline decoration-solid cursor-pointer"
      color="blue-2"
      @click="onClickAccountInfo"
    >
      (국민)
      {{
        convertNumberBusinessNumberToString(receiptData?.value?.companyId ?? 0)
      }}
    </KBUITypography>
  </div>
</template>
