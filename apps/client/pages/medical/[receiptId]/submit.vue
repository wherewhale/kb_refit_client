<script setup lang="ts">
import MedicalSubmitInsurance from "~/containers/medicals/detail/MedicalSubmitInsurance.vue";

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader
      title="실손보험금 청구하기"
      :back-link="`/medical/${receiptId}`"
    />
    <ClientOnly>
      <MedicalSubmitInsurance />
    </ClientOnly>
  </div>
</template>
