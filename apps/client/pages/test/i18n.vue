<script setup lang="ts">
const { locales, setLocale } = useI18n();

const onClick = (lang: "en" | "ko") => {
  console.log(lang);
  setLocale(lang);

  console.log($t('client.tab.point'));
}

</script>

<template>
  <div>
    <button v-for="locale in locales" :key="locale.code" @click="onClick(locale.code)">
      {{ locale.code }}
    </button>
    <h1>{{ $t('client.tab.point') }}</h1>
  </div>
</template>