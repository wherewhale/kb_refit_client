<script setup lang="ts">
interface TabItem {
  label: string;
  backgroundColor?: string;
  point: number;
}

const items: TabItem[] = [
  {
    label: "KB스타포인트",
    point: 1978,
    backgroundColor: "bg-yellow-1",
  },
  {
    label: "리핏으로 할인받은 금액",
    point: 32520,
    backgroundColor: "bg-purple-1",
  },
  {
    label: "리핏에서 받은 탄소중립포인트",
    point: 8350,
    backgroundColor: "bg-green-1",
  },
];
</script>
<template>
  <UCarousel
    v-slot="{ item }"
    loop
    wheel-gestures
    :items="items"
    :ui="{ item: 'basis-1/3' }"
  >
    <div
      :class="[
        item.backgroundColor,
        'w-full h-[200px]',
        'flex items-center justify-center text-white text-lg font-bold rounded-lg',
      ]"
    >
      <div>
        <p>{{ item.label }}</p>
        <p>{{ item.point }} 포인트</p>
      </div>
    </div>
  </UCarousel>
</template>
