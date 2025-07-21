<script lang="ts" setup>
import type { CardProps } from "~/interfaces/common/card.interface";

const props = withDefaults(defineProps<CardProps>(), {
  description: undefined,
  href: undefined,
  className: "",
});
</script>
<template>
  <div
    :class="[
      props.className,
      'w-full min-h-[200px] rounded-lg shadow-lg p-6 flex flex-col justify-between',
    ]"
  >
    <div class="w-full flex justify-between">
      <div class="flex flex-col justify-between">
        <KBUITypography>{{ props.title }}</KBUITypography>
        <KBUITypography size="h24" weight="bold">{{
          props.content
        }}</KBUITypography>
      </div>
      <div class="size-20 relative">
        <NuxtImg
          :src="`assets/images/characters/${props.src}.png`"
          alt="KB 프렌즈"
          width="80"
        />
      </div>
    </div>
    <NuxtLink
      v-if="props.href"
      :to="props.href"
      target="_blank"
      class="mt-auto block w-full"
    >
      <KBUIButton size="medium" variant="primary" class="w-full"
        >스타포인트 사용하러 가기</KBUIButton
      >
    </NuxtLink>
    <KBUITypography v-if="props.description" size="b14">
      {{ props.description.split("replace")[0] }}<b>{{ props.boldText }}</b
      >{{ props.description.split("replace")[1] }}
    </KBUITypography>
  </div>
</template>
