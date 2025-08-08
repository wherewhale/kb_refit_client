<script setup lang="ts">
import { computed, reactive } from "vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getMerchandiseList, postPurchaseReceipt } from "~/services/pos";
import { useCompanyStore } from "~/stores/company";

type Merchandise = {
  merchandiseId: number;
  merchandiseName: string;
  merchandisePrice: number;
};

const store = useCompanyStore();
const toast = useToast();

const { data } = useQuery({
  queryKey: ["companyInfo", store.companyId],
  queryFn: async () => (await getMerchandiseList(store.companyId)).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
});

const merchandiseList = computed<Merchandise[]>(
  () => data?.value?.merchandiseList || []
);

// ✅ Map을 reactive로
const cartAmounts = reactive(new Map<number, number>());
const isCorporateCard = ref(false);
const userId = ref("");

function addToCart(m: Merchandise) {
  const id = m.merchandiseId;
  cartAmounts.set(id, (cartAmounts.get(id) ?? 0) + 1);
}
function removeOne(m: Merchandise) {
  const id = m.merchandiseId;
  const cur = cartAmounts.get(id) ?? 0;
  if (cur <= 1) cartAmounts.delete(id);
  else cartAmounts.set(id, cur - 1);
}
function clearCart() {
  cartAmounts.clear();
}

/** ✅ 서버 전송용 payload: Map을 올바르게 순회 */
const contentsList = computed(() => {
  const arr: { merchandiseId: number; amount: number }[] = [];
  for (const [id, amount] of cartAmounts) {
    if (amount > 0) arr.push({ merchandiseId: id, amount });
  }
  return arr;
});

/** 화면 표시용(이름/단가/소계 포함) */
const displayCart = computed(() => {
  const result: {
    merchandiseId: number;
    name: string;
    amount: number;
    price: number;
    subtotal: number;
  }[] = [];

  for (const item of contentsList.value) {
    const m = merchandiseList.value.find(
      (x) => x.merchandiseId === item.merchandiseId
    );
    const price = m?.merchandisePrice ?? 0;
    result.push({
      merchandiseId: item.merchandiseId,
      name: m?.merchandiseName ?? "",
      amount: item.amount,
      price,
      subtotal: price * item.amount,
    });
  }
  return result;
});

/** 합계 금액 */
const totalPrice = computed(() => {
  let sum = 0;
  for (const row of displayCart.value) sum += row.subtotal;
  return sum;
});

const { mutate: purchaseMerchandises } = useMutation({
  mutationKey: ["purchase", store.companyId, contentsList.value],
  mutationFn: async () =>
    await postPurchaseReceipt({
      cardId: `${Number(userId.value) + (isCorporateCard.value ? 1 : 0)}`,
      contentsList: contentsList.value,
    }),
  onSuccess: () => {
    toast.add({
      title: "결제 성공",
      description: "상품이 성공적으로 결제되었습니다.",
      color: "success",
    });
    clearCart();
  },
  onError: (error) => {
    toast.add({
      title: "결제 실패",
      description: error instanceof Error ? error.message : "알 수 없는 오류",
      color: "error",
    });
  },
});

async function submitOrder() {
  if (contentsList.value.length === 0) {
    toast.add({
      title: "장바구니 비어있음",
      description: "상품을 추가한 후 결제해주세요.",
      color: "warning",
    });
    return;
  }

  purchaseMerchandises();
}
</script>

<template>
  <div>
    <CommonHeader />
    <main class="min-h-screen mx-auto p-10 flex gap-6">
      <section class="bg-white w-full p-6 rounded-lg shadow-lg">
        <KBUITypography tag="h1" size="b20" weight="bold" class="mb-6">
          {{ store.companyName || "회사 정보가 없습니다." }}
        </KBUITypography>

        <ul>
          <li
            v-for="merchandise in merchandiseList"
            :key="merchandise.merchandiseId"
            class="mb-4"
          >
            <div
              class="p-4 border bg-gray-100 rounded-lg flex justify-between items-center"
            >
              <div>
                <KBUITypography size="b16" weight="medium">
                  {{ merchandise.merchandiseName }}
                </KBUITypography>
                <KBUITypography size="b14" weight="regular" color="gray-2">
                  가격: {{ merchandise.merchandisePrice }} 원
                </KBUITypography>
              </div>
              <div class="flex items-center gap-2">
                <KBUIButton
                  variant="secondary"
                  size="small"
                  @click="removeOne(merchandise)"
                >
                  -
                </KBUIButton>
                <KBUIButton
                  variant="primary"
                  size="medium"
                  @click="addToCart(merchandise)"
                >
                  추가
                </KBUIButton>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section
        class="bg-white p-6 rounded-lg shadow-lg w-[350px] flex-shrink-0"
      >
        <div class="flex items-center justify-between mb-4">
          <KBUITypography tag="h1" size="b20" weight="bold"
            >합계</KBUITypography
          >
          <KBUIButton variant="ghost" size="small" @click="clearCart">
            비우기
          </KBUIButton>
        </div>

        <ul class="space-y-3 mb-4">
          <li
            v-for="row in displayCart"
            :key="row.merchandiseId"
            class="flex justify-between text-sm"
          >
            <span class="truncate">
              {{ row.name }} × {{ row.amount }} ({{
                row.price.toLocaleString()
              }}원)
            </span>
            <strong>{{ row.subtotal.toLocaleString() }}원</strong>
          </li>
          <li v-if="displayCart.length === 0" class="text-gray-400 text-sm">
            담긴 상품이 없습니다.
          </li>
        </ul>

        <div class="flex justify-between items-center border-t pt-4">
          <KBUITypography size="b16" weight="bold">총 금액</KBUITypography>
          <KBUITypography size="b18" weight="bold">
            {{ totalPrice.toLocaleString() }}원
          </KBUITypography>
        </div>

        <div class="w-full h-[200px] rounded-lg bg-blue-2 mt-10 pt-5">
          <div class="w-full h-10 bg-black" />
          <div class="flex gap-2 items-center px-4 mt-2">
            <KBUITypography
              class="text-center text-white"
              size="b16"
              weight="bold"
            >
              userId:
            </KBUITypography>
            <KBUITextField v-model="userId" />
          </div>
          <div class="flex gap-2 items-center px-4 mt-2">
            <KBUITypography
              class="text-center text-white"
              size="b16"
              weight="bold"
            >
              법인 카드 여부
            </KBUITypography>
            <UCheckbox
              v-model="isCorporateCard"
              label="법인 카드"
              class="text-white"
            />
          </div>
        </div>

        <KBUIButton
          class="w-full mt-6"
          variant="primary"
          size="large"
          @click="submitOrder"
        >
          결제하기
        </KBUIButton>
      </section>
    </main>
  </div>
</template>
