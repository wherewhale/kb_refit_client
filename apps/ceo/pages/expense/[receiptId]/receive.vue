<script setup lang="ts">
import ExpenseDetailContainer from "~/containers/expense/detail/ExpenseDetailContainer.vue";

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader title="경비 처리하기" :back-link="`/?tab=expense`" />
    <ClientOnly>
      <ExpenseDetailContainer :receipt-id="receiptId" />
    </ClientOnly>
  </div>
</template>