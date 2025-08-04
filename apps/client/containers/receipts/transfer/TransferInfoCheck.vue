<script setup lang="ts">
import type { ReceiptDetail } from "~/types/receipt";

const props = defineProps<{
  receiptData: Ref<ReceiptDetail | undefined>;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      상호
    </KBUITypography>
    <KBUITypography weight="medium">
      {{ props.receiptData?.value?.companyName }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      가상계좌
    </KBUITypography>
    <KBUITypography weight="medium">
      (국민)
      {{
        convertNumberBusinessNumberToString(
          props.receiptData?.value?.companyId ?? 0
        )
      }}
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      송금금액
    </KBUITypography>
    <KBUITypography weight="medium">
      {{ (props.receiptData?.value?.totalPrice ?? 0).toLocaleString() }}원
    </KBUITypography>
  </div>
</template>
