<script setup lang="ts">
import { BRAND_COMPONENTS } from "~/components/wallet/BrandComponentMap";
import type { Badge } from "@/interfaces/common/badge.interface";
import type { WalletTheme } from "~/interfaces/wallet/theme";

const props = defineProps<{
  badgeList: Badge[];
  theme?: WalletTheme;
}>();
</script>

<template>
  <div
    :class="[
      'w-full h-52 rounded-sm relative overflow-hidden shadow-xl border-gray-5',
      'bg-gray-2',
    ]"
  >
    <component :is="BRAND_COMPONENTS[theme]" v-if="theme" />
    <div
      class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center gap-4 z-20 p-4"
    >
      <div class="grid grid-cols-4 w-full">
        <div
          v-for="item in props.badgeList"
          :key="item.badgeId"
          class="size-12 mx-auto cursor-pointer"
        >
          <NuxtImg
            :src="`assets/images/badges/${item.image}.png`"
            class="size-12 object-cover rounded mx-auto cursor-pointer"
            loading="lazy"
          />
        </div>
      </div>
      <div class="size-28 relative flex items-center justify-center">
        <NuxtImg
          :src="`assets/images/brands/${props.theme ? props.theme.toLocaleLowerCase() : 'default'}.png`"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
