<script setup lang="ts">
const toast = useToast();

const onClickAccountInfo = () => {
  navigator.clipboard
    .writeText("(국민) 938002-00-317546")
    .then(() => {
      toast.add({ title: "가상 계좌 정보가 복사되었습니다." });
    })
    .catch(() => {
      toast.add({
        title: "가상 계좌 정보 복사에 실패했습니다.",
        color: "error",
      });
    });
};
</script>

<template>
  <div class="flex flex-col gap-2 mt-4">
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      상호
    </KBUITypography>
    <KBUITypography weight="medium"> 국민은행 </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      사업장 주소
    </KBUITypography>
    <KBUITypography weight="medium">
      서울특별시 광진구 화양동 4-3 403호
    </KBUITypography>
    <KBUITypography size="b14" color="gray-2" class="mt-2">
      가상 계좌 정보 (클릭 시 복사)
    </KBUITypography>
    <KBUITypography
      weight="medium"
      class="underline decoration-solid cursor-pointer"
      color="blue-2"
      @click="onClickAccountInfo"
    >
      (국민) 938002-00-317546
    </KBUITypography>
  </div>
</template>
