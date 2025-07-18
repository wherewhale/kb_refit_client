<script lang="tsx" setup>
import type { CardProps } from "~/interfaces/common/card.interface";
import Card from "../common/card.vue";

// TODO: 데이터 연동해서 items 배열에 데이터 연결
const items: CardProps[] = [
  {
    title: "KB스타포인트",
    content: `${(1978).toLocaleString()}P`,
    src: "bibi",
    className: "bg-yellow-1",
    href: "https://www.kbstar.com/",
  },
  {
    title: "리핏으로 할인받은 금액",
    content: `${(32520).toLocaleString()}원`,
    src: "ageo",
    className: "bg-purple-1",
    description: "가장 많이 할인 받은 카테고리는\nreplace 에요!",
    boldText: "돈까스",
  },
  {
    title: "리핏에서 받은 탄소중립포인트",
    content: `${(8350).toLocaleString()}P`,
    src: "coli",
    className: "bg-green-1",
    description: "전자 영수증으로 벌써\nreplace의 나무를 살렸어요!",
    boldText: "2.5그루",
  },
];

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);
const itemsCount = ref(items.length);

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
      :src="`assets/images/characters/${item.src}.png`"
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
