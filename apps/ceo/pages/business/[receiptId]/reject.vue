<script setup lang="ts">
import RejectContainer from "~/containers/business/submit/RejectContainer.vue";

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader title="반려 사유 작성" :back-link="`/business/${receiptId}`" />
    <RejectContainer :receipt-id="receiptId" />
  </div>
</template>