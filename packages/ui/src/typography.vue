<template>
  <component
    :is="tag"
    :class="[
      style.typography,
      style[color],
      style[size],
      style[weight],
      {
        [style.lineEllipsis]: ellipsis === 1,
        [style.multilineEllipsis]: ellipsis !== undefined && ellipsis > 1,
        [style.clickable]: Boolean(onClick),
        [style.inline]: inline,
      },
      className,
    ]"
    :style="{
      lineClamp: ellipsis > 1 ? ellipsis : undefined,
      WebkitLineClamp: ellipsis > 1 ? ellipsis : undefined,
    }"
    @click="onClick"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { useCssModule, useAttrs } from "vue";
import { type ColorPalette } from "../theme";

const style = useCssModule();
const $attrs = useAttrs();

interface TypographyProps {
  /**
   * @type {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'}
   * @description 타입그래피 태그 (HTML 요소)
   */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  /**
   * @type {ColorPalette}
   * @description 타입그래피 색상. `theme/index.ts`의 `ColorPalette` 타입을 따릅니다.
   */
  color?: ColorPalette;
  /**
   * @type {'regular' | 'medium' | 'bold'}
   * @description 타입그래피 두께.
   */
  weight?: "regular" | "medium" | "bold";
  /**
   * @type {'h36' | 'h32' | 'h24' | 'b20' | 'b18' | 'b16' | 'b15' | 'b14' | 'b13' | 'b12'}
   * @description 타입그래피 크기. 기존 `variant`의 앞부분에 해당합니다.
   */
  size?:
    | "h36"
    | "h32"
    | "h24"
    | "b20"
    | "b18"
    | "b16"
    | "b15"
    | "b14"
    | "b13"
    | "b12";
  /**
   * @type {number}
   * @description 텍스트 말줄임 처리 (0: 없음, 1: 한 줄, >1: 여러 줄).
   */
  ellipsis?: number;
  /**
   * @type {boolean}
   * @description 텍스트를 인라인 요소로 표시할지 여부.
   */
  inline?: boolean;
  /**
   * @type {string}
   * @description 컴포넌트에 추가될 사용자 정의 CSS 클래스.
   */
  className?: string;
  /**
   * @type {(event: MouseEvent) => void}
   * @description 클릭 이벤트 핸들러.
   */
  onClick?: (event: MouseEvent) => void;
}

const props = withDefaults(defineProps<TypographyProps>(), {
  tag: "p",
  color: "black",
  weight: "regular",
  size: "b16",
  ellipsis: 0,
  inline: false,
  className: "",
  onClick: undefined,
});
</script>

<style module lang="scss">
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-bold: 700;

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
$black: #000000;

.typography {
  white-space: pre-line;
  word-break: keep-all;
}

.lineEllipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

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

$font-sizes-map: (
  h36: 36px,
  h32: 32px,
  h24: 24px,
  b20: 20px,
  b18: 18px,
  b16: 16px,
  b15: 15px,
  b14: 14px,
  b13: 13px,
  b12: 12px,
);

@each $name, $size in $font-sizes-map {
  .#{$name} {
    font-size: $size !important;
    line-height: 1.5 !important;
  }
}

.regular {
  font-weight: $font-weight-regular !important;
}

.medium {
  font-weight: $font-weight-medium !important;
}

.bold {
  font-weight: $font-weight-bold !important;
}

$colors-map: (
  black: $black,
  primary-brand: $primary-brand,
  primary-light1: $primary-light1,
  primary-dark1: $primary-dark1,
  primary-dark2: $primary-dark2,
  green-1: $green-1,
  purple-1: #b7a4f5,
  red-1: $red-1,
  yellow-1: $yellow-1,
  white: $white,
  gray-1: $gray-1,
  gray-2: $gray-2,
  gray-3: $gray-3,
  gray-4: $gray-4,
  gray-5: $gray-5,
);

@each $name, $color-value in $colors-map {
  // ★★★ 이 부분을 수정합니다. ★★★
  // `.` 뒤에 바로 `#{$name}`을 사용합니다.
  .#{$name} {
    color: $color-value;
  }
}
</style>
