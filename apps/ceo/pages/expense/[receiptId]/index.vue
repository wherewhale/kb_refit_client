<script setup lang="ts">
import ExpenseApprovalContainer from "~/containers/expense/approval/ExpenseApprovalContainer.vue";

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader title="경비 처리 신청 정보 확인" back-link="/?tab=expense" />
    <ExpenseApprovalContainer :receipt-id="receiptId" />
  </div>
</template>