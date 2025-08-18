<script setup lang="ts">
useSeoMeta({
  title: "종이보다 디지털, 번거로움 대신 KB 리핏",
  ogTitle: "종이보다 디지털, KB 리핏",
  description:
    "KB 리핏은 전자 영수증 서비스입니다. 전자 영수증으로 쉽게 경비 처리, 실비 청구, 넘치는 나만의 혜택까지 만나보세요!",
  ogDescription:
    "KB 리핏은 전자 영수증 서비스입니다. 전자 영수증으로 쉽게 경비 처리, 실비 청구, 넘치는 나만의 혜택까지 만나보세요!",
  ogImage: "https://kb-refit-client.vercel.app/assets/images/logos/OG.png",
});
</script>
<template>
  <UApp>
    <VitePwaManifest />
    <NuxtPage />
    <div id="loading" />
  </UApp>
</template>
