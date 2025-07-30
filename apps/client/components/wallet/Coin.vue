<script setup lang="ts">
const props = defineProps<{
  size: "sm" | "lg";
}>();
</script>

<template>
  <div
    :class="[
      props.size === 'lg' ? 'size-6' : 'size-4',
      'rounded-full bg-kb-silver-1 flex items-center justify-center',
    ]"
  >
    <div
      :class="[
        props.size === 'lg' ? 'size-[18px]' : 'size-3',
        'rounded-full bg-kb-yellow-neg flex items-center justify-center',
      ]"
    >
      <div
        :class="[
          props.size === 'lg' ? 'size-4' : 'size-[10px]',
          'rounded-full bg-kb-yellow-pos flex items-center justify-center',
        ]"
      >
        <KBUITypography
          :size="props.size === 'lg' ? 'b14' : 'b12'"
          weight="bold"
          color="white"
          :class="props.size === 'lg' ? '' : '!text-[10px]'"
          >P</KBUITypography
        >
      </div>
    </div>
  </div>
</template>
