<script setup lang="ts">
// TODO: 영수증 정보 불러오기 API 연동
const TEST_DATA = {
  id: 1,
  title: "영수증 상세",
  date: "2025-07-14",
  amount: -32500,
  label: "브네",
};

const route = useRoute();
const receiptId = route.params.receiptId as string;
</script>

<template>
  <section class="mt-20 w-full bg-white rounded-lg px-6 py-10 text-black">
    {{ receiptId }} 번 데이터의 영수증 정보
  </section>
  <div class="flex flex-col items-center gap-2 mt-10">
    <KBUIButton size="large" variant="outlined" class-name="w-full">
      PDF로 저장하기
    </KBUIButton>
    <KBUIButton size="large" variant="primary" class-name="w-full">
      영수 처리하기
    </KBUIButton>
  </div>
</template>
