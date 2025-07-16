<script setup lang="ts">
import { useCssModule, useAttrs, computed } from "vue";
import InputField from "./input-field.vue";
import Typography from "./typography.vue";
import HelperText from "./helper-text.vue";

const style = useCssModule();
const attrs = useAttrs();

interface InputFieldProps {
  placeholder?: string;
  modelValue?: string | number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  type?: string;
  name?: string;
  id?: string;
  maxLength?: number;
}

interface TextFieldProps extends InputFieldProps {
  /**
   * @type {boolean}
   * @description 하단 메시지(에러/도움말)를 위한 여백을 미리 확보할지 여부.
   */
  gutterBottom?: boolean;
  /**
   * @type {string}
   * @description input 필드 상단에 표시될 라벨 텍스트.
   */
  label?: string;
  /**
   * @type {string}
   * @description input 필드의 도움말 메시지 텍스트 (에러가 아닐 경우).
   */
  helperMessage?: string;
  /**
   * @type {string}
   * @description 에러 메시지 텍스트. `error` prop과 함께 사용됩니다.
   */
  errorMessage?: string;
  /**
   * @type {boolean}
   * @description 글자 수 텍스트 (예: '5 / 10') 표시 여부. `maxLength`가 있을 경우 기본값 `true`.
   */
  isMaxLengthText?: boolean;
  /**
   * @type {boolean}
   * @description TextField가 여러 줄 입력 필드인지 여부 (예: textarea 대신 `<Input type="textarea">` 가정).
   * SCSS의 `.multilineTextfield` 클래스 적용에 사용됩니다.
   */
  multiline?: boolean;
  /**
   * @type {string}
   * @description 최상위 컨테이너에 추가될 사용자 정의 CSS 클래스.
   */
  containerClass?: string;
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  modelValue: "",
  placeholder: "",
  disabled: false,
  error: false,
  gutterBottom: false,
  label: "",
  helperMessage: "",
  errorMessage: "",
  isMaxLengthText: (props) => props.maxLength !== undefined,
  multiline: false,
  containerClass: "",
  type: "text",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const currentLength = computed(() =>
  props.modelValue ? String(props.modelValue).length : 0,
);

const inputPropsToPass = computed(() => {
  const {
    modelValue,
    className: inputClassFromTextField,
    gutterBottom,
    label,
    helperMessage,
    errorMessage,
    isMaxLengthText,
    multiline,
    containerClass,
    ...restProps
  } = props;

  return {
    ...restProps,
    className: inputClassFromTextField,
    ...attrs,
  };
});

const displayMessage = computed(() => {
  return props.error && props.errorMessage
    ? props.errorMessage
    : props.helperMessage;
});

const shouldDisplayHelperText = computed(() => {
  return (props.error && props.errorMessage) || props.helperMessage;
});
</script>

<template>
  <div
    :class="[
      style.container,
      {
        [style.textfield]: !multiline,
        [style.multilineTextfield]: multiline,
      },
      containerClass,
    ]"
  >
    <div
      v-if="
        label || helperMessage || (isMaxLengthText && maxLength !== undefined)
      "
      :class="[
        style.label,
        {
          [style.multilineTextfield]: multiline,
          [style.flexEnd]:
            multiline &&
            (helperMessage || (isMaxLengthText && maxLength !== undefined)) &&
            !label,
        },
      ]"
    >
      <slot name="label">
        <Typography
          v-if="label"
          tag="span"
          size="b14"
          weight="bold"
          color="gray-1"
        >
          {{ label }}
        </Typography>
      </slot>

      <Typography
        v-if="helperMessage || (isMaxLengthText && maxLength !== undefined)"
        tag="span"
        size="b12"
        color="gray-2"
        :class="style.limit"
      >
        {{ helperMessage }}
        <template v-if="isMaxLengthText && maxLength !== undefined">
          <span v-if="helperMessage">&nbsp;|&nbsp;</span>
          {{ currentLength }} / {{ maxLength }}
        </template>
      </Typography>
    </div>

    <div :class="{ [style.gutterBottom]: gutterBottom }">
      <InputField
        v-bind="inputPropsToPass"
        :modelValue="modelValue"
        @update:modelValue="emit('update:modelValue', $event)"
      />

      <HelperText
        v-if="shouldDisplayHelperText"
        placement="bottom"
        :error="error"
        :message="displayMessage"
      />
    </div>
  </div>
</template>

<style module lang="scss">
@use "./scss/base.scss" as *;

.container {
  width: 100%;
}

.gutterBottom {
  min-height: 64px;
}

.label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.textfield .label {
  margin-bottom: $spacing-8;
}

.multilineTextfield .label {
  margin-bottom: $spacing-4;
}

.multilineTextfield .label.flexEnd {
  justify-content: flex-end;
}
</style>
