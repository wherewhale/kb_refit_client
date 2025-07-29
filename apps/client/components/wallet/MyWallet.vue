<script setup lang="ts">
import { BRAND_COMPONENTS } from "~/components/wallet/BrandComponentMap";
import type { Badge } from "@/interfaces/common/badge.interface";
import type { WalletTheme } from "~/interfaces/wallet/theme";

const props = defineProps<{
  badgeList: Badge[];
  theme?: WalletTheme;
}>();

const badgeImagePrefix = "/assets/images/badges/";
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
          v-for="(item, index) in props.badgeList"
          :key="index"
          class="w-10 h-10 mx-auto cursor-pointer"
        >
          <NuxtImg
            :src="badgeImagePrefix + item.image"
            class="w-10 h-10 object-cover rounded mx-auto cursor-pointer"
            loading="lazy"
          />
        </div>
      </div>
      <div class="w-28 h-28 relative flex items-center justify-center">
        <NuxtImg
          :src="`assets/images/brands/${props.theme ? props.theme.toLocaleLowerCase() : 'default'}.png`"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
