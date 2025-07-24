<script setup lang="ts">
import { useCssModule, useAttrs } from "vue";

const style = useCssModule();
const $attrs = useAttrs();

interface ButtonProps {
  /**
   * @type {'primary' | 'outlined' | 'ghost' | 'secondary' | 'secondary-ghost' | 'error'}
   * @description 버튼의 종류 (스타일).
   */
  variant:
    | "primary"
    | "outlined"
    | "ghost"
    | "secondary"
    | "secondary-ghost"
    | "error";
  /**
   * @type {'small' | 'medium' | 'large'}
   * @description 버튼의 크기.
   */
  size: "small" | "medium" | "large";
  /**
   * @type {'rectangle' | 'circle'}
   * @description 버튼의 모양 (모서리 둥글기).
   */
  shape?: "rectangle" | "circle";
  /**
   * @type {boolean}
   * @description 버튼이 비활성화 상태인지 여부.
   */
  disabled?: boolean;
  /**
   * @type {boolean}
   * @description 버튼이 로딩 상태인지 여부.
   */
  loading?: boolean;
  /**
   * @type {boolean}
   * @description 버튼 너비를 100%로 설정할지 여부.
   */
  wide?: boolean;
  /**
   * @type {boolean}
   * @description 버튼이 아이콘만 포함하는지 여부 (패딩 조절).
   */
  iconOnly?: boolean;
  /**
   * @type {boolean}
   * @description 버튼이 활성화된 시각적 상태인지 여부.
   */
  isActive?: boolean;
  /**
   * @type {string}
   * @description 버튼에 추가될 사용자 정의 CSS 클래스.
   */
  className?: string;
  /**
   * @type {(event: MouseEvent) => void}
   * @description 클릭 이벤트 핸들러.
   */
  onClick?: (event: MouseEvent) => void;
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "medium",
  shape: "rectangle", // 기본 모양 추가
  disabled: false,
  loading: false, // 기본값 false
  wide: false, // 기본값 false
  iconOnly: false, // 기본값 false
  isActive: false, // 기본값 false
  className: "",
  onClick: undefined,
});
</script>

<template>
  <button
    :class="[
      style.button,
      style[variant],
      style[size],
      style[shape], // shape 클래스 추가
      {
        [style.disabled]: disabled, // disabled prop이 true일 때 disabled 클래스 적용
        [style.loading]: loading, // loading prop이 true일 때 loading 클래스 적용
        [style.wide]: wide, // wide prop이 true일 때 wide 클래스 적용
        [style.iconOnly]: iconOnly, // iconOnly prop이 true일 때 iconOnly 클래스 적용
        [style.isActive]: isActive, // isActive prop이 true일 때 isActive 클래스 적용
      },
      className, // 사용자가 전달한 className
    ]"
    :disabled="disabled || loading"
    @click="
      typeof $attrs['onClick'] === 'function' && !disabled && !loading
        ? $attrs['onClick']($event)
        : onClick?.($event)
    "
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<style module lang="scss">
@use "./scss/base.scss" as *;

/** 공통 **/
.button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  // 기존 SCSS의 @include default-transition은 base.scss에 있을 것으로 예상

  @include default-transition(color, background-color);

  &.disabled {
    cursor: not-allowed;
  }

  &:not(.disabled) {
    cursor: pointer;
  }
}

/******************************************/
/** loading **/
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading {
  &::before {
    content: "";
    display: block;
    width: 1em;
    height: 1em;
    border: 2px solid transparent;
    border-radius: 50%;
    animation: rotating 1s infinite linear; // linear 추가
    margin-right: 0.5em; // 텍스트와의 간격
  }
}

/******************************************/
/** 모양 **/
.rectangle {
  border-radius: 0.5rem;
}

.circle {
  border-radius: 50px;
}

/******************************************/
/** 아이콘 - 텍스트 간격 **/
.loading {
  column-gap: $spacing-8;

  &.wide,
  &.small {
    column-gap: $spacing-4;
  }
}

/******************************************/
/** Wide **/
.wide {
  width: 100%;
}

/******************************************/
/** Size **/
.large {
  @include b18-medium;
  line-height: 1;

  height: 3.5rem;
  min-width: 3.5rem;

  &:not(.iconOnly) {
    padding-left: $spacing-16;
    padding-right: $spacing-16;
  }
}

.medium {
  @include b16-medium;
  line-height: 1;

  height: 2.5rem;
  min-width: 2.5rem;

  &:not(.iconOnly) {
    padding-left: $spacing-12;
    padding-right: $spacing-12;
  }
}

.small {
  @include b14-medium;
  line-height: 1;

  height: 2rem;
  min-width: 2rem;

  &:not(.iconOnly) {
    padding-left: $spacing-8;
    padding-right: $spacing-8;
  }
}

/******************************************/
/** Variant **/
.primary {
  background-color: $kb-yellow-pos;
  color: $black;
  border-color: transparent;

  &.loading::before {
    // ::before로 변경
    border-top-color: $white;
  }

  @media (hover: hover) {
    &:hover:not(.disabled) {
      background-color: $kb-yellow-neg;
    }
  }

  &:active,
  &.isActive {
    border-color: transparent;
    background-color: $kb-gray;
    color: $white;
  }

  &.disabled {
    border-color: transparent;
    background-color: $gray-4;
    color: $gray-3;
  }
}

.outlined {
  background-color: $white;
  border-color: $black;
  color: $black;

  &.loading::before {
    // ::before로 변경
    border-top-color: $black;
  }

  @media (hover: hover) {
    &:hover:not(.disabled) {
      background-color: $black;
      color: $white;
    }
  }

  &:active,
  &.isActive {
    background-color: $gray-2;
    color: $white;
    border-color: $gray-1;
  }

  &.disabled {
    border-color: transparent;
    background-color: $gray-4;
    color: $gray-3;
  }
}

.ghost {
  background-color: transparent;
  border-color: transparent;
  color: $black;

  &.loading::before {
    // ::before로 변경
    border-top-color: $black;
  }

  @media (hover: hover) {
    &:hover:not(.disabled) {
      color: $kb-yellow-neg;
    }
  }

  &:active,
  &.isActive {
    color: $kb-yellow-pos;
  }

  &.disabled {
    color: $gray-3;
  }
}

.secondary {
  background-color: $black;
  border-color: $black;
  color: $white;

  &.loading::before {
    // ::before로 변경
    border-top-color: $white;
  }

  @media (hover: hover) {
    &:hover:not(.disabled) {
      border-color: $black;
      background-color: $white;
      color: $black;
    }
  }

  &:active,
  &.isActive {
    border-color: $gray-2;
    background-color: $gray-1;
  }

  &.disabled {
    border-color: transparent;
    background-color: $gray-4;
    color: $gray-3;
  }
}

.secondary-ghost {
  background-color: transparent;
  border-color: transparent;
  color: $gray-2;

  &.loading::before {
    // ::before로 변경
    border-top-color: $black;
  }

  @media (hover: hover) {
    &:hover:not(.disabled) {
      color: $gray-1;
    }
  }

  &.isActive,
  &:active {
    color: $black;
  }

  &.disabled {
    color: $gray-3;
  }
}

.error {
  background-color: $red-1;
  color: $white;
  border-color: transparent;

  &.loading::before {
    // ::before로 변경
    border-top-color: $white;
  }

  @media (hover: hover) {
    &:hover:not(.disabled) {
      border-color: $red-1;
      color: $red-1;
      background-color: $white;
    }
  }

  &:active,
  &.isActive {
    opacity: 0.8;
  }

  &.disabled {
    border-color: transparent;
    background-color: $gray-4;
    color: $gray-3;
  }
}
</style>
