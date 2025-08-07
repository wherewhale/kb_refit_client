<template>
  <div v-if="!isVitest">
    <Teleport to="#loading">
      <div
        class="fixed inset-0 z-40 bg-gray-50 flex items-center justify-center"
        role="alert"
        aria-busy="true"
        aria-live="assertive"
      >
        <Vue3Lottie :width="200" :height="200" :animation-data="loadingJson" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { Vue3Lottie } from "vue3-lottie";
import loadingJson from "@/assets/lottie/loading.json";
</script>
