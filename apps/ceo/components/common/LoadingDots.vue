<script setup lang="ts">
const props = defineProps<{
  /**
   * @type {string}
   * @description "not-started" | "loading" | "complete"
   */
  state: string;
}>();
</script>

<template>
  <div
    :class="[
      'flex gap-1 items-center',
      props.state === 'loading' ? 'animate-pulse' : '',
    ]"
  >
    <div
      :class="[
        'size-[10px] rounded-full',
        props.state === 'not-started' ? 'bg-gray-3' : 'bg-kb-yellow-pos',
      ]"
    />
    <div
      :class="[
        'size-[10px] rounded-full',
        {
          'bg-gray-3': props.state === 'not-started',
          'bg-kb-yellow-neg': props.state === 'loading',
          'bg-kb-yellow-pos': props.state === 'complete',
        },
      ]"
    />
    <div
      :class="[
        'size-[10px] rounded-full',
        {
          'bg-gray-3': props.state === 'not-started',
          'bg-yellow-1': props.state === 'loading',
          'bg-kb-yellow-pos': props.state === 'complete',
        },
      ]"
    />
  </div>
</template>
