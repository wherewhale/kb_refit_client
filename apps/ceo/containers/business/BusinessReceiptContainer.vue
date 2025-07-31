<script setup lang="ts">
import html2canvas from "html2canvas";
import type CommonReceipt from "~/components/expense/CommonReceipt.vue";

// TODO: 영수증 정보 불러오기 API 연동

const route = useRoute();
const receiptId = route.params.receiptId as string;
// FIXME: 영수증 정보 API에서 받아온 데이터로 대체

const receiptRef = ref<InstanceType<typeof CommonReceipt> | null>(null);

const onDownloadImage = async () => {
  const el = receiptRef.value?.printRef;

  if (!el) {
    console.warn("⚠️ ref가 null이거나 문서에 붙지 않았습니다.");
    return;
  }

  if (!document.body.contains(el)) {
    console.warn("⚠️ DOM이 아직 문서에 attach되지 않았습니다.");
    return;
  }

  const canvas = await html2canvas(el, { scale: 2 });

  // PNG 이미지로 저장
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "receipt.png";
  link.click();
};
</script>

<template>
  <main class="px-6 py-20">
    <ClientOnly>
      <CommonReceipt
        ref="receiptRef"
        title="가게 이름"
        business-number="123-45-67890"
        ceo="홍길동"
        address="서울특별시 강남구 역삼동 123-45"
        :created-at="new Date()"
        :goods="[
          { name: '상품1', price: 10000, quantity: 2 },
          { name: '상품2', price: 15000, quantity: 1 },
        ]"
      />
      <div class="flex flex-col items-center mt-10 gap-2">
        <KBUIButton
          size="large"
          variant="outlined"
          class-name="w-full"
          @click="onDownloadImage"
        >
          이미지로 저장하기
        </KBUIButton>
        <NuxtLink
          :href="`/business/${receiptId}/reject`"
          class="w-full block"
        >
          <UButton
            color="error"
            size="lg"
            class="w-full rounded-lg py-4 text-lg items-center justify-center"
          >반려하기</UButton>
        </NuxtLink>
      </div>
    </ClientOnly>
  </main>
</template>