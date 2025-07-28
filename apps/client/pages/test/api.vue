<script setup lang="ts">
import { getTest } from "~/services/test";
import { checkBaseUrl } from "~/services/apiClient";
import { useQuery } from "@tanstack/vue-query";

const { data, error } = useQuery({
  queryKey: ["test", new Date().getTime()],
  queryFn: async () => await getTest(),
  refetchOnWindowFocus: false,
});

const onClickCheckUrl = () => {
  checkBaseUrl();
  console.log(data.value);
};

onMounted(() => {
  console.log("API 호출 테스트 페이지가 마운트되었습니다.");
  console.log("API 호출 결과:", data);
});
</script>

<template>
  <div>
    <KBUIButton size="large" variant="primary" @click="onClickCheckUrl"
      >API 호출 테스트</KBUIButton
    >API 호출 결과 : {{ data }}
  </div>
</template>
