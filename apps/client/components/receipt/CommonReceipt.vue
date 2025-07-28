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
const { t } = useI18n();
const props = defineProps<Props>();
const route = useRoute();
const printRef = ref<HTMLElement | null>(null);

const calculatedTotalPrice =
  props.goods?.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
  props.totalPrice;
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
      <KBUITypography size="b12">{{ t("receipt_detail.num") }}:</KBUITypography>
      <KBUITypography size="b12">{{ props.businessNumber }}</KBUITypography>
    </div>
    <div class="mt-1 flex items-start gap-1">
      <KBUITypography size="b12">{{ t("receipt_detail.representative") }}:</KBUITypography>
      <KBUITypography size="b12">{{ props.ceo }}</KBUITypography>
    </div>
    <div class="mt-1 flex items-start gap-1">
      <KBUITypography size="b12">{{ t("receipt_detail.address") }}:</KBUITypography>
      <KBUITypography size="b12" :ellipsis="2">{{
        props.address
      }}</KBUITypography>
    </div>
    <div v-if="props.goods">
      <hr class="my-1 border-b-0.5 border-gray-4" />
      <!-- 영수증 헤더 -->
      <div class="grid grid-cols-12">
        <div class="col-span-5 text-start">
          <KBUITypography size="b14">{{ t("receipt_detail.designation") }}</KBUITypography>
        </div>
        <div class="col-span-2 text-start">
          <KBUITypography size="b14">{{ t("receipt_detail.price") }}</KBUITypography>
        </div>
        <div class="col-span-2 text-center">
          <KBUITypography size="b14">{{ t("receipt_detail.quantity") }}</KBUITypography>
        </div>
        <div class="col-span-3 text-end">
          <KBUITypography size="b14">{{ t("receipt_detail.amount") }}</KBUITypography>
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
    </div>

    <hr class="my-1 border-b-0.5 border-gray-4" />
    <div class="flex justify-between items-center">
      <KBUITypography size="b14">{{ t("receipt_detail.total") }}</KBUITypography>
      <KBUITypography size="b14">
        {{
          props.totalPrice
            ? props.totalPrice.toLocaleString()
            : calculatedTotalPrice?.toLocaleString()
        }}
      </KBUITypography>
    </div>
    <div class="flex justify-between items-center">
      <KBUITypography size="b14">{{ t("receipt_detail.supply_price") }}</KBUITypography>
      <KBUITypography size="b14">{{
        calculatedTotalPrice
          ? (calculatedTotalPrice - vat).toLocaleString()
          : "0"
      }}</KBUITypography>
    </div>
    <div class="flex justify-between items-center">
      <KBUITypography size="b14">{{ t("receipt_detail.surtax") }}</KBUITypography>
      <KBUITypography size="b14">{{ vat.toLocaleString() }}</KBUITypography>
    </div>
    <hr class="my-1 border-b-0.5 border-gray-4" />
    <div class="flex justify-between items-center my-4">
      <KBUITypography weight="bold"> {{ t("receipt_detail.total_amount") }} </KBUITypography>
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
      <KBUITypography size="b12">{{ t("receipt_detail.transaction") }}:</KBUITypography>
      <KBUITypography size="b12">{{ t("receipt_detail.card_transaction") }}</KBUITypography>
    </div>
    <div class="flex items-start gap-1">
      <KBUITypography size="b12">{{ t("receipt_detail.approval_date") }}:</KBUITypography>
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
        {{
          route.path.startsWith("/medical") ? t("common_medical.label.insurance_completed") : t("common_receipt.label.completed_processing")
        }}
      </KBUITypography>
      <div v-else class="flex flex-col gap-2 items-center justify-center">
        <KBUITypography
          size="b20"
          weight="bold"
          class-name="text-center"
          color="red-2"
        >
          {{
            route.path.startsWith("/medical")
              ? t("common_receipt.label.completed_processing")
              : t("common_receipt.label.not-completed_processing")
          }}
        </KBUITypography>
        <KBUITypography size="b14" class-name="text-center" color="red-2">
          {{ props.complete.message ?? t("common_receipt.label_description.cannot_processed") }}
        </KBUITypography>
      </div>
    </div>
  </section>
</template>
