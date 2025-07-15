<script setup lang="ts">
import { computed, useAttrs, type VNode } from "vue";
import { type ColorPalette, type TypographyVariant } from "../theme"; // @ui/theme 경로는 그대로 유지됩니다.

interface TypographyProps {
  variant: TypographyVariant;
  children?: string | (string | VNode)[];
  color?: ColorPalette;
  className?: string;
  element?: string;
  inline?: boolean;
  ellipsis?: number;
  onClick?: (event: MouseEvent) => void;
}

const props = withDefaults(defineProps<TypographyProps>(), {
  color: "black",
  element: "p",
  inline: false,
  ellipsis: 0,
});

const attrs = useAttrs();

const classNames = computed(() => {
  return [
    "typography",
    props.color,
    props.variant,
    {
      "line-ellipsis": props.ellipsis === 1,
      "multiline-ellipsis": props.ellipsis !== undefined && props.ellipsis > 1,
      clickable: Boolean(props.onClick), // onClick 핸들러가 있으면 clickable 클래스 추가
      inline: props.inline,
    },
    props.className, // 외부에서 전달받은 className 추가
  ];
});

const ComponentElement = computed(() => props.element || "p");
</script>

<template>
  <component
    :is="ComponentElement"
    :class="classNames"
    :style="{
      lineClamp: ellipsis,
      WebkitLineClamp: ellipsis,
    }"
    @click="props.onClick"
    v-bind="attrs"
  >
    <slot>{{ props.children }}</slot>
  </component>
</template>

<style module lang="scss">
/*
  이제 `@use` 룰은 필요 없습니다.
  모든 스타일 속성들이 각 클래스 안에 직접 정의됩니다.
*/

// 기본
.typography {
  white-space: pre-line;
  word-break: keep-all;
}

// 한 줄 말줄임 (SCSS Module은 kebab-case로 변환: line-ellipsis)
.lineEllipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 여러 줄 말줄임 (SCSS Module은 kebab-case로 변환: multiline-ellipsis)
.multilineEllipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

.clickable {
  cursor: pointer;
}

.inline {
  display: inline;
}

// TypographyVariant에 해당하는 스타일 정의
// 폰트 두께 변수는 그대로 사용하지만, 각 클래스 안에 직접 값을 넣었습니다.
// $font-weight-regular, $font-weight-medium, $font-weight-bold 이 변수들은 이제 이 SCSS 블록 안에 정의되어야 합니다.
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-bold: 700;

.h36 {
  font-size: 36px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.5 !important;
}

.h36-medium {
  font-size: 36px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.5 !important;
}

.h36-bold {
  font-size: 36px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.5 !important;
}

.h32 {
  font-size: 32px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.5 !important;
}

.h32-medium {
  font-size: 32px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.5 !important;
}

.h32-bold {
  font-size: 32px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.5 !important;
}

.h24 {
  font-size: 24px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.5 !important;
}

.h24-medium {
  font-size: 24px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.5 !important;
}

.h24-bold {
  font-size: 24px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.5 !important;
}

.b20 {
  font-size: 20px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.5 !important;
}

.b20-medium {
  font-size: 20px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.5 !important;
}

.b20-bold {
  font-size: 20px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.5 !important;
}

.b18 {
  font-size: 18px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.5 !important;
}

.b18-medium {
  font-size: 18px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.5 !important;
}

.b18-bold {
  font-size: 18px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.5 !important;
}

.b16 {
  font-size: 16px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.5 !important;
}

.b16-medium {
  font-size: 16px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.5 !important;
}

.b16-bold {
  font-size: 16px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.5 !important;
}

.b15 {
  font-size: 15px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.71 !important;
}

.b15-medium {
  font-size: 15px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.71 !important;
}

.b15-bold {
  font-size: 15px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.71 !important;
}

.b14 {
  font-size: 14px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.71 !important;
}

.b14-medium {
  font-size: 14px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.71 !important;
}

.b14-bold {
  font-size: 14px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.71 !important;
}

.b13 {
  font-size: 13px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.75 !important;
}

.b13-medium {
  font-size: 13px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.75 !important;
}

.b13-bold {
  font-size: 13px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.75 !important;
}

.b12 {
  font-size: 12px !important;
  font-weight: $font-weight-regular !important;
  line-height: 1.75 !important;
}

.b12-medium {
  font-size: 12px !important;
  font-weight: $font-weight-medium !important;
  line-height: 1.75 !important;
}

.b12-bold {
  font-size: 12px !important;
  font-weight: $font-weight-bold !important;
  line-height: 1.75 !important;
}

// ColorPalette에 해당하는 색상 정의 (직접 색상 코드로)
// $변수를 사용하려면 이 SCSS 블록 안에 $변수도 정의해야 합니다.
$primary-brand: #4eb5b5;
$primary-light1: #d1e0e3;
$primary-dark1: #5aa470;
$primary-dark2: #54765e;
$green-1: #72c2a8;
$purple-1: #b7a4f5;
$red-1: #fc2e6c;
$yellow-1: #ffe48a;
$white: #ffffff;
$gray-1: #454f5d;
$gray-2: #838a9a;
$gray-3: #d9d9d9;
$gray-4: #eaedef;
$gray-5: #f5f6f7;

.primary-brand {
  color: $primary-brand;
}

.primary-light1 {
  color: $primary-light1;
}

.primary-dark1 {
  color: $primary-dark1;
}

.primary-dark2 {
  color: $primary-dark2;
}

.green-1 {
  color: $green-1;
}

.purple-1 {
  color: $purple-1;
}

.red-1 {
  color: $red-1;
}

.yellow-1 {
  color: $yellow-1;
}

.white {
  color: $white;
}

.gray-1 {
  color: $gray-1;
}

.gray-2 {
  color: $gray-2;
}

.gray-3 {
  color: $gray-3;
}

.gray-4 {
  color: $gray-4;
}

.gray-5 {
  color: $gray-5;
}
</style>
