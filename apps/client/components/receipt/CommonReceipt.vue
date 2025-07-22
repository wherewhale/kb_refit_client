<script setup lang="ts">
import dayjs from "dayjs";
import type { Goods } from "~/interfaces/receipt/goods.interface";

interface Props {
  title: string;
  businessNumber: string;
  ceo: string;
  address: string;
  createdAt: string;
  goods?: Goods[];
  totalPrice?: number;
  complete?: {
    result: boolean;
    message?: string;
  };
}

const props = defineProps<Props>();
const printRef = ref<HTMLElement | null>(null);

const calculatedTotalPrice = props.goods?.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const vat = calculatedTotalPrice ? Math.floor(calculatedTotalPrice / 11) : 0;

defineExpose({ printRef });
</script>

<template>
  <section
    ref="printRef"
    class="w-full bg-white rounded-lg px-6 py-10 text-black"
  >
    <KBUITypography
      tag="h3"
      size="h24"
      weight="bold"
      class-name="text-center"
      >{{ props.title }}</KBUITypography
    >
    <KBUITypography class-name="mt-4" size="b12">{{
      props.title
    }}</KBUITypography>
    <div class="mt-1 flex items-start gap-1">
      <KBUITypography size="b12">사업자번호:</KBUITypography>
      <KBUITypography size="b12">{{ props.businessNumber }}</KBUITypography>
    </div>
    <div class="mt-1 flex items-start gap-1">
      <KBUITypography size="b12">대표:</KBUITypography>
      <KBUITypography size="b12">{{ props.ceo }}</KBUITypography>
    </div>
    <div class="mt-1 flex items-start gap-1">
      <KBUITypography size="b12">주소:</KBUITypography>
      <KBUITypography size="b12" :ellipsis="2">{{
        props.address
      }}</KBUITypography>
    </div>
    <hr class="my-1 border-b-0.5 border-gray-4" />
    <!-- 영수증 헤더 -->
    <div class="grid grid-cols-12">
      <div class="col-span-5 text-start">
        <KBUITypography size="b14">명칭</KBUITypography>
      </div>
      <div class="col-span-2 text-start">
        <KBUITypography size="b14">단가</KBUITypography>
      </div>
      <div class="col-span-2 text-center">
        <KBUITypography size="b14">수량</KBUITypography>
      </div>
      <div class="col-span-3 text-end">
        <KBUITypography size="b14">금액</KBUITypography>
      </div>
    </div>
    <hr class="my-1 border-b-0.5 border-gray-4" />
    <!-- 영수증 내용 -->
    <ul>
      <li
        v-for="(item, index) in props.goods"
        :key="index"
        class="grid grid-cols-12"
      >
        <div class="col-span-5 text-start">
          <KBUITypography size="b12" class-name="truncate">{{
            item.name
          }}</KBUITypography>
        </div>
        <div class="col-span-2 text-start">
          <KBUITypography size="b12">{{
            item.price.toLocaleString()
          }}</KBUITypography>
        </div>
        <div class="col-span-2 text-center">
          <KBUITypography size="b12">{{ item.quantity }}</KBUITypography>
        </div>
        <div class="col-span-3 text-end">
          <KBUITypography size="b12">{{
            (item.price * item.quantity).toLocaleString()
          }}</KBUITypography>
        </div>
      </li>
    </ul>

    <hr class="my-1 border-b-0.5 border-gray-4" />
    <div class="flex justify-between items-center">
      <KBUITypography size="b14">합계</KBUITypography>
      <KBUITypography size="b14">
        {{
          props.totalPrice
            ? props.totalPrice.toLocaleString()
            : calculatedTotalPrice?.toLocaleString()
        }}
      </KBUITypography>
    </div>
    <div class="flex justify-between items-center">
      <KBUITypography size="b14">공급가액</KBUITypography>
      <KBUITypography size="b14">{{
        calculatedTotalPrice
          ? (calculatedTotalPrice - vat).toLocaleString()
          : "0"
      }}</KBUITypography>
    </div>
    <div class="flex justify-between items-center">
      <KBUITypography size="b14">부가세</KBUITypography>
      <KBUITypography size="b14">{{ vat.toLocaleString() }}</KBUITypography>
    </div>
    <hr class="my-1 border-b-0.5 border-gray-4" />
    <div class="flex justify-between items-center my-4">
      <KBUITypography weight="bold"> 총액 </KBUITypography>
      <KBUITypography weight="bold">
        {{
          props.totalPrice
            ? props.totalPrice.toLocaleString()
            : calculatedTotalPrice?.toLocaleString()
        }}
      </KBUITypography>
    </div>
    <hr class="my-1 border-b-0.5 border-gray-4" />
    <div class="flex items-start gap-1">
      <KBUITypography size="b12">거래종류:</KBUITypography>
      <KBUITypography size="b12">카드거래</KBUITypography>
    </div>
    <div class="flex items-start gap-1">
      <KBUITypography size="b12">승인일시:</KBUITypography>
      <KBUITypography size="b12">{{
        dayjs(props.createdAt).format("YYYY.MM.DD HH:mm:ss")
      }}</KBUITypography>
    </div>
    <div
      v-if="props.complete"
      :class="[
        'w-full border-4 rounded-lg mt-4 p-1',
        props.complete.result ? 'border-green-2' : 'border-red-2',
      ]"
    >
      <KBUITypography
        v-if="props.complete.result"
        size="b20"
        weight="bold"
        class-name="text-center"
        color="green-2"
      >
        경비 처리 완료
      </KBUITypography>
      <div v-else class="flex flex-col gap-2 items-center justify-center">
        <KBUITypography
          size="b20"
          weight="bold"
          class-name="text-center"
          color="red-2"
        >
          경비 처리 불가
        </KBUITypography>
        <KBUITypography size="b14" class-name="text-center" color="red-2">
          {{ props.complete.message ?? "처리할 수 없는 영수증입니다." }}
        </KBUITypography>
      </div>
    </div>
  </section>
</template>
