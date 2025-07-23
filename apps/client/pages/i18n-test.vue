<script setup>
const { locales, setLocale } = useI18n();

// const data = await $fetch("/api/sheet-data")

// TODO: 이제 이 data를 json 파일로 만들면 된다.
</script>

<template>
  <div>
    <button v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)">
      {{ locale.code }}
    </button>
    <h1>{{ $t('welcome') }}</h1>
  </div>
</template>