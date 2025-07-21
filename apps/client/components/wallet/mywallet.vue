<script setup lang="ts">
const props = defineProps<{
  badgeList: { image: string }[]
}>();
</script>

<template>
  <div :class="['w-full h-[200px] rounded-sm p-4 flex flex-col justify-between items-center', 'bg-gray-2']">
    <div class="grid grid-cols-4 w-full">
      <div
        v-for="(item, index) in props.badgeList"
        :key="index"
        class="w-[40px] h-[40px] mx-auto cursor-pointer"
      >
        <img :src="item.image" class="w-full h-full object-cover rounded" />
      </div>
    </div>
    <div class="bg-kb-yellow-pos w-28 h-28" />
  </div>
</template>