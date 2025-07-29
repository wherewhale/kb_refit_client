<script setup lang="ts">
// TODO: 계좌 정보 및 가격 가져오는 API 연동
</script>

<template>
  <div class="flex flex-col gap-2">
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      상호
    </KBUITypography>
    <KBUITypography weight="medium"> 국민은행 </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      가상계좌
    </KBUITypography>
    <KBUITypography weight="medium"> (국민) 938002-00-317546 </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      송금금액
    </KBUITypography>
    <KBUITypography weight="medium">
      {{ (106000).toLocaleString() }}원
    </KBUITypography>
  </div>
</template>
