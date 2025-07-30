<script setup lang="ts">
import { BRAND_COMPONENTS } from "~/components/wallet/BrandComponentMap";
import type { Badge } from "@/interfaces/common/badge.interface";
import type { WalletTheme } from "~/interfaces/wallet/theme";

const props = defineProps<{
  badgeList: Badge[];
  theme?: WalletTheme;
  onClickBadge: (badgeIndex: number) => void;
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
        <figure
          v-for="(slot, index) in 4"
          :key="index"
          class="size-12 mx-auto cursor-pointer flex items-center justify-center"
        >
          <NuxtImg
            v-if="props.badgeList[index]"
            :src="`assets/images/badges/${props.badgeList[index].image}.png`"
            class="size-12 object-cover rounded"
            loading="lazy"
            @click="props.onClickBadge(index)"
          />
          <KBUIButton
            v-else
            variant="secondary-ghost"
            size="large"
            @click="props.onClickBadge(index)"
          >
            <UIcon name="mdi:plus" />
          </KBUIButton>
        </figure>
      </div>

      <figure class="size-28 relative flex items-center justify-center">
        <NuxtImg
          :src="`assets/images/brands/${props.theme ? props.theme.toLocaleLowerCase() : 'default'}.png`"
          loading="lazy"
        />
      </figure>
    </div>
  </div>
</template>
