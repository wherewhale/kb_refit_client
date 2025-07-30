<script setup lang="ts">
import type CommonReceipt from "~/components/expense/CommonReceipt.vue";

// TODO: 영수증 정보 불러오기 API 연동

// const route = useRoute();
// const receiptId = route.params.receiptId as string;
// // FIXME: 영수증 정보 API에서 받아온 데이터로 대체
// const isCompanyPayment = true;
// const isRejected = true;

const receiptRef = ref<InstanceType<typeof CommonReceipt> | null>(null);
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
        :complete="{
          result: false,
        }"
      />
    </ClientOnly>
  </main>
</template>

