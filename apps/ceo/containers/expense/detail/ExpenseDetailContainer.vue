<script setup lang="ts">
import type CommonReceipt from "~/components/expense/CommonReceipt.vue";

// TODO: 영수증 정보 불러오기 API 연동

// const route = useRoute();
// const receiptId = route.params.receiptId as string;
// // FIXME: 영수증 정보 API에서 받아온 데이터로 대체
// const isCompanyPayment = true;
// const isRejected = true;

const STEPS = ["경비 처리 신청 정보"];
const stepIndex = 0;

const receiptRef = ref<InstanceType<typeof CommonReceipt> | null>(null);
</script>

<template>
  <main class="px-6 py-20">
    <ClientOnly>
      <FormContainer :steps="STEPS" :current-step="stepIndex">
      <form>
        <KBUITypography size="b14" color="gray-2"> 신청자 </KBUITypography>
        <KBUITypography weight="medium" class-name="mt-2">
          김리핏
        </KBUITypography>
        <KBUITypography size="b14" color="gray-2" class-name="mt-4">
          경비 처리 항목
        </KBUITypography>
        <KBUITypography weight="medium" class-name="mt-2"
          >업무추진</KBUITypography
        >
        <KBUITypography size="b14" color="gray-2" class-name="mt-4">
          관련 이미지
        </KBUITypography>
        <KBUITypography size="b14" color="gray-2" class-name="mt-4">
          세부 사용 내역
        </KBUITypography>
        <div class="w-full rounded-lg border border-black shadow-lg mt-2">
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
            :complete="{ result: false }"
          />
        </div>
      </form>
      </FormContainer>
    </ClientOnly>
  </main>
</template>

