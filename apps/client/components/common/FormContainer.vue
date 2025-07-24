<script setup lang="ts">
const props = defineProps<{
  steps: string[];
  currentStep: number;
}>();
</script>
<template>
  <section class="w-full rounded-lg bg-white shadow-md p-6 pb-20">
    <div class="w-full flex justify-between items-center">
      <KBUITypography size="b14" color="gray-2" class-name="block">
        {{ props.steps[props.currentStep] }}
      </KBUITypography>
      <KBUITypography size="b14" color="gray-2" class-name="block">
        {{ props.currentStep + 1 }} / {{ props.steps.length }}
      </KBUITypography>
    </div>
    <KBUITypography weight="bold" class-name="my-4">
      {{ props.steps[props.currentStep] }}
    </KBUITypography>
    <slot />
  </section>
</template>
