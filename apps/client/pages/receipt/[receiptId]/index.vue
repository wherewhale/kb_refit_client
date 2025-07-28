<script setup lang="ts">
import ReceiptDetailContainer from "~/containers/receipts/detail/ReceiptDetailContainer.vue";

const { t } = useI18n();
const receiptTitle = computed(() => t("receipt_detail.title.check_receipt"));


</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader :title="receiptTitle" back-link="/?tab=receipt" />
    <component :is="ReceiptDetailContainer" />
  </div>
</template>
