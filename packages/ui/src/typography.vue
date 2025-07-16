<script setup lang="ts">
import { useCssModule, useAttrs, computed } from "vue";
import { type ColorPalette } from "../theme"; // ColorPalette 타입 임포트 확인

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
   * @description 타입그래피 크기.
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
}

const props = withDefaults(defineProps<TypographyProps>(), {
  tag: "p",
  color: "black",
  weight: "regular",
  size: "b16",
  ellipsis: 0,
  inline: false,
  className: "",
});

// size와 weight prop을 조합하여 SCSS 클래스 이름을 동적으로 생성
const computedSizeAndWeightClass = computed(() => {
  if (props.weight === "regular") {
    return props.size;
  }
  return `${props.size}-${props.weight}`;
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      style.typography,
      style[props.color], // color prop에 해당하는 클래스 (예: style.black)
      style[computedSizeAndWeightClass], // size와 weight 조합 클래스 (예: style.b16-medium)
      {
        [style.lineEllipsis]: props.ellipsis === 1,
        [style.multilineEllipsis]:
          props.ellipsis !== undefined && props.ellipsis > 1,
        [style.inline]: props.inline,
      },
      props.className, // 사용자 정의 클래스
    ]"
    :style="{
      // ellipsis가 1보다 클 때만 line-clamp 적용
      lineClamp: props.ellipsis > 1 ? props.ellipsis : undefined,
      // -webkit-line-clamp는 ellipsis가 1보다 클 때만 적용
      WebkitLineClamp: props.ellipsis > 1 ? props.ellipsis : undefined,
    }"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<style module lang="scss">
@use "./scss/base.scss" as *;

// 기본
.typography {
  white-space: pre-line;
  word-break: keep-all;
}

// 한 줄 말줄임
.lineEllipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 여러 줄 말줄임
.multilineEllipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

.inline {
  display: inline;
}

.h36 {
  @include h36;
}

.h36-medium {
  @include h36-medium;
}

.h36-bold {
  @include h36-bold;
}

.h32 {
  @include h32;
}

.h32-medium {
  @include h32-medium;
}

.h32-bold {
  @include h32-bold;
}

.h24 {
  @include h24;
}

.h24-medium {
  @include h24-medium;
}

.h24-bold {
  @include h24-bold;
}

.b20 {
  @include b20;
}

.b20-medium {
  @include b20-medium;
}

.b20-bold {
  @include b20-bold;
}

.b18 {
  @include b18;
}

.b18-medium {
  @include b18-medium;
}

.b18-bold {
  @include b18-bold;
}

.b16 {
  @include b16;
}

.b16-medium {
  @include b16-medium;
}

.b16-bold {
  @include b16-bold;
}

.b15 {
  @include b15;
}

.b15-medium {
  @include b15-medium;
}

.b15-bold {
  @include b15-bold;
}

.b14 {
  @include b14;
}

.b14-medium {
  @include b14-medium;
}

.b14-bold {
  @include b14-bold;
}

.b13 {
  @include b13;
}

.b13-medium {
  @include b13-medium;
}

.b13-bold {
  @include b13-bold;
}

.b12 {
  @include b12;
}

.b12-medium {
  @include b12-medium;
}

.b12-bold {
  @include b12-bold;
}

// TODO: 색상 업데이트 필요
// 색상 클래스 (base.scss에서 @use / @import 되어야 할 변수들 필요)
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

// SCSS에서 정의되지 않은 "black" 색상 클래스 추가 (defualt color prop이 "black"이므로 필요)
// 만약 $black 변수가 base.scss에 정의되어 있다면, 이를 활용합니다.
.black {
  color: $black; // base.scss에 $black 변수가 있다고 가정
}
</style>
