<script setup lang="ts">
import { computed, ref, watch, useCssModule, useAttrs } from "vue";
import InputField from "./InputField.vue";
import Typography from "./Typography.vue";
import HelperText from "./HelperText.vue";

const style = useCssModule();
const attrs = useAttrs();

interface InputFieldProps {
  placeholder?: string;
  modelValue?: string | number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  type?: string;
  name?: string;
  id?: string;
  maxLength?: number;
}

interface TextFieldProps extends InputFieldProps {
  gutterBottom?: boolean;
  label?: string;
  helperMessage?: string;
  isMaxLengthText?: boolean;
  multiline?: boolean;
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

// ✅ v-model 연동용 내부 값
const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  }
);
watch(inputValue, (val) => {
  emit("update:modelValue", val);
});

const currentLength = computed(() =>
  inputValue.value ? String(inputValue.value).length : 0
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

const displayMessage = computed(() =>
  props.error && props.errorMessage ? props.errorMessage : props.helperMessage
);

const shouldDisplayHelperText = computed(
  () => (props.error && props.errorMessage) || props.helperMessage
);
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
      <!-- ✅ 내부 v-model은 inputValue로 연결됨 -->
      <InputField v-bind="inputPropsToPass" v-model="inputValue" />

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
