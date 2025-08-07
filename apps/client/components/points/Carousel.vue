<script lang="tsx" setup>
import { computed } from "vue";
import type { CardProps } from "~/interfaces/common/card.interface";
import Card from "~/components/common/Card.vue";
import { useQuery } from "@tanstack/vue-query";
import { getPointSummary } from "~/services/reward";

const { t } = useI18n();

const { data, isPending } = useQuery({
  queryKey: ["pointSummary"],
  queryFn: async () => (await getPointSummary()).data,
  refetchOnWindowFocus: false,
  retry: false,
});

const items = computed<CardProps[]>(() => {
  const point = data.value?.totalStarPoint ?? 0;
  const discountAmount = data.value?.totalCashback ?? 0;
  const treePoint = data.value?.totalCarbonPoint ?? 0;
  const category = data.value?.category ?? "";

  return [
    {
      title: t("point.card.title1"),
      content: `${point.toLocaleString()}P`,
      src: "bibi",
      className: "bg-yellow-1",
      href: "https://www.kbstar.com/",
    },
    {
      title: t("point.card.title2"),
      content: `${discountAmount.toLocaleString()}원`,
      src: "ageo",
      className: "bg-purple-1",
      description: t("point.card.description2"),
      boldText: category,
    },
    {
      title: t("point.card.title3"),
      content: `${treePoint.toLocaleString()}P`,
      src: "coli",
      className: "bg-green-1",
      description: t("point.card.description"),
      boldText: `${(treePoint / 5000).toFixed(1)}그루`,
    },
  ];
});

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);
const itemsCount = computed(() => items.value.length);

function onClickPrev() {
  activeIndex.value--;
  select(activeIndex.value);
}
function onClickNext() {
  activeIndex.value++;
  select(activeIndex.value);
}

const onSelect = (index: number) => {
  activeIndex.value = index;
};

const select = (index: number) => {
  carousel.value?.emblaApi?.scrollTo(index);
};

const shouldShowLoading = import.meta.env.VITEST ? false : isPending;
</script>
<template>
  <UCarousel
    ref="carousel"
    v-slot="{ item }"
    loop
    wheel-gestures
    :items="items"
    :autoplay="{ delay: 5000 }"
    @select="onSelect"
  >
    <Card
      :title="item.title"
      :content="item.content"
      :description="item.description"
      :bold-text="item.boldText"
      :href="item.href"
      :src="item.src"
      :class-name="item.className"
    />
  </UCarousel>
  <Loading v-if="shouldShowLoading" />
  <div class="flex gap-1 items-center mt-4">
    <UIcon name="ic:baseline-chevron-left" :size="24" @click="onClickPrev" />
    <KBUITypography color="white" size="b16"
      >{{ activeIndex + 1 }} / {{ itemsCount }}</KBUITypography
    >
    <UIcon name="ic:baseline-chevron-right" :size="24" @click="onClickNext" />
  </div>
</template>
