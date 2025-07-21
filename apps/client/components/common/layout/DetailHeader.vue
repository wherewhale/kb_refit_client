<script setup lang="ts">
import { UIcon } from "#components";

interface Props {
  title: string;
  backLink?: string;
}

const props = defineProps<Props>();

const router = useRouter();

const goBack = () => {
  if (props.backLink) {
    router.push(props.backLink);
    return;
  } else {
    router.back();
  }
};
</script>

<template>
  <header class="grid grid-cols-3 px-6 py-4">
    <div class="flex items-center justify-start">
      <UIcon
        name="i-heroicons-chevron-left"
        size="24"
        class="cursor-pointer hover:text-kb-yellow-pos"
        @click="goBack"
      />
    </div>
    <div class="flex items-center justify-center">
      <KBUITypography tag="h2" weight="medium" color="white">{{
        "props.title"
      }}</KBUITypography>
    </div>
  </header>
</template>
