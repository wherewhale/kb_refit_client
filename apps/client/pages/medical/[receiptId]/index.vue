<script setup lang="ts">
import MedicalDetailContainer from "~/containers/medicals/detail/MedicalDetailContainer.vue";
</script>

<template>
  <div class="min-h-screen max-w-screen-md mx-auto text-white">
    <DetailHeader title="병원 영수증 확인" back-link="/?tab=hospital_receipt" />
    <component :is="MedicalDetailContainer" />
  </div>
</template>
