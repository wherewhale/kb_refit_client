<script setup lang="ts">
import type { Badge } from '@/interfaces/common/badge.interface';

const props = defineProps<{
  badgeList: Badge[];
}>();

const badgeImagePrefix = '/assets/images/badges/';
</script>

<template>
  <div :class="['w-full h-52 rounded-sm p-4 flex flex-col justify-between items-center', 'bg-gray-2']">
    <div class="grid grid-cols-4 w-full">
      <div
        v-for="(item, index) in props.badgeList"
        :key="index"
        class="w-10 h-10 mx-auto cursor-pointer"
      >
        <NuxtImg
          :src="badgeImagePrefix + item.image"
          class="w-10 h-10 object-cover rounded mx-auto cursor-pointer"
          format="webp"
          loading="lazy"
        />
      </div>
    </div>
    <div class="bg-kb-yellow-pos w-28 h-28" />
  </div>
</template>