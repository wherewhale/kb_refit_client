<script setup lang="ts">
import BadgeList from "~/containers/wallets/badgeCollection/BadgeList.vue";
import BadgeChatbot from "./BadgeChatbot.vue";
import { useQuery } from "@tanstack/vue-query";
import { getBadgeCollection } from "~/services/wallet";

const props = defineProps<{
  onNext: (page: string) => void;
  onBack: (page: string) => void;
}>();

const { data, isPending } = useQuery({
  queryKey: ["getBadgeCollection"],
  queryFn: async () => {
    const res = await getBadgeCollection();
    return res?.data?.badgeList ?? [];
  },
  refetchOnWindowFocus: false,
});
</script>
<template>
  <div>
    <button
      class="flex items-center gap-1 text-black cursor-pointer hover:text-kb-yellow-pos"
      @click="props.onBack('내 지갑')"
    >
      <UIcon name="i-heroicons-chevron-left" size="16" />
      <KBUITypography size="b14" weight="medium">배지 도감</KBUITypography>
    </button>
    <BadgeChatbot v-if="!isPending" :badges="data" />
    <BadgeList v-if="!isPending" :badges="data" />
  </div>
</template>
