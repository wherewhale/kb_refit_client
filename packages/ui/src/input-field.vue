<script setup lang="ts">
import { useCssModule, useAttrs } from "vue";

const style = useCssModule();
const $attrs = useAttrs(); // 부모 컴포넌트에서 전달되는 모든 속성을 받아옴

interface InputProps {
  /**
   * @type {string}
   * @description input 필드의 placeholder 텍스트.
   */
  placeholder?: string;
  /**
   * @type {string | number}
   * @description input 필드의 현재 값. (v-model과 함께 사용될 수 있음)
   */
  modelValue?: string | number;
  /**
   * @type {boolean}
   * @description input 필드를 비활성화할지 여부.
   */
  disabled?: boolean;
  /**
   * @type {boolean}
   * @description input 필드에 에러 상태를 표시할지 여부.
   */
  error?: boolean;
  /**
   * @type {string}
   * @description input 필드에 추가될 사용자 정의 CSS 클래스.
   */
  className?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  placeholder: "",
  modelValue: "",
  disabled: false,
  error: false,
  className: "",
});

// v-model을 지원하기 위한 emit 정의
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div
    :class="[
      style.field,
      {
        [style.disabled]: props.disabled, // disabled prop에 따라 .disabled 클래스 적용
        [style.error]: props.error, // error prop에 따라 .error 클래스 적용
      },
      props.className, // 사용자 정의 클래스
    ]"
  >
    <slot name="prefix"></slot>
    <input
      :class="style.input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      :disabled="props.disabled"
      @input="handleInput"
      v-bind="$attrs"
    />
    <slot name="suffix"></slot>
  </div>
</template>

<style module lang="scss">
@use "./scss/base.scss" as *; // base.scss 경로 확인 및 필요 변수 임포트

.field {
  display: flex;
  align-items: center;
  column-gap: $spacing-16;
  height: 40px;
  padding: 0 $spacing-16;
  border-bottom: 1px solid;
  border-color: $gray-3;
  background-color: $white;

  // hover 상태: disabled 상태가 아니고, focus-within 상태가 아닐 때
  &:hover:not(.disabled, :focus-within) {
    border-color: $gray-2;
  }

  // error 상태일 때
  &.error {
    border-color: $red-1;
  }

  // input 내부 요소가 포커스 되었을 때 (부모 .field에 적용)
  &:focus-within {
    border-color: $primary-brand;
  }

  // disabled 상태일 때 필드 전체 스타일
  &.disabled {
    background-color: $gray-5;
    border-color: $gray-4;
    color: $gray-3; // 필드 내부 텍스트 색상 (placeholder 등)
    cursor: not-allowed; // 비활성화 커서 추가
  }
}

.input {
  padding: 0;
  flex: 1;
  color: $black;
  @include b15; // base.scss에서 정의된 b15 믹스인 사용
}

.field {
  // input 요소 자체에 대한 스타일 (자식 선택자 사용)
  input {
    width: 100%;
    line-height: 1.5;
    flex: 1; // .input 클래스의 flex: 1과 중복되지만, 명시적 설정
    // background-color는 .field에 의해 이미 설정되므로 여기서는 필요 없을 수 있음
  }

  // input 기본 스타일 리셋
  input:focus,
  input:focus-visible,
  input:focus-within,
  input:-webkit-autofill,
  input:-webkit-autofill:focus,
  input {
    border: none;
    outline: none;
    background-color: $white; // 자동 완성 시 배경색 유지를 위해 중요
  }

  // placeholder 스타일
  input::placeholder {
    color: $gray-2;
  }

  input::-moz-placeholder {
    color: $gray-2;
  }

  input::-webkit-input-placeholder {
    color: $gray-2;
  }

  // input이 disabled 속성을 가질 때의 스타일
  input:disabled {
    background-color: $gray-5; // disabled 상태의 배경색
    border-color: $gray-4; // disabled 상태의 테두리 색상 (상위 .field.disabled가 우선할 수 있음)
    color: $gray-3; // disabled 상태의 텍스트 색상
    cursor: not-allowed;
  }
}
</style>
