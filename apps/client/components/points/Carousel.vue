<script lang="tsx" setup>
import { computed } from "vue";
import type { CardProps } from "~/interfaces/common/card.interface";
import Card from "~/components/common/Card.vue";

const { t } = useI18n();

// TODO: 데이터 연동해서 items 배열에 데이터 연결

const items = computed<CardProps[]>(() => [
  {
    title: t('point.card.title1'),
    content: `${(1978).toLocaleString()}P`,
    src: 'bibi',
    className: 'bg-yellow-1',
    href: 'https://www.kbstar.com/',
  },
  {
    title: t('point.card.title2'),
    content: `${(32520).toLocaleString()}원`,
    src: 'ageo',
    className: 'bg-purple-1',
    description: t('point.card.description2'),
    boldText: '돈까스',
  },
  {
    title: t('point.card.title3'),
    content: `${(8350).toLocaleString()}P`,
    src: 'coli',
    className: 'bg-green-1',
    description: t('point.card.description'),
    boldText: '2.5그루',
  },
]);

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
  <div class="flex gap-1 items-center mt-4">
    <UIcon name="ic:baseline-chevron-left" :size="24" @click="onClickPrev" />
    <KBUITypography color="white" size="b16"
      >{{ activeIndex + 1 }} / {{ itemsCount }}</KBUITypography
    >
    <UIcon name="ic:baseline-chevron-right" :size="24" @click="onClickNext" />
  </div>
</template>
