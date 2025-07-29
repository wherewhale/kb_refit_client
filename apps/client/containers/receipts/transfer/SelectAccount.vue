<script setup lang="ts">
const props = defineProps<{
  onNext: () => void;
}>();

const ACCOUNT_DATA = [
  {
    id: "account1",
    name: "KB국민은행",
    accountNumber: "123-456-7890",
    balance: 1000000,
  },
  {
    id: "account2",
    name: "신한은행",
    accountNumber: "987-654-3210",
    balance: 500000,
  },
];
</script>

<template>
  <ul
    v-if="ACCOUNT_DATA.length > 0"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <li
      v-for="account in ACCOUNT_DATA"
      :key="account.id"
      class="p-4 rounded-lg bg-white border border-gray-2 w-full"
    >
      <div class="flex items-center gap-1">
        <div
          class="size-10 rounded-lg flex items-center justify-center shrink-0 bg-green-1"
        >
          <KBUITypography size="h24" weight="bold" class-name="text-center">
            {{ account.name[0] }}
          </KBUITypography>
        </div>
        <div class="flex flex-col">
          <KBUITypography size="b14" :ellipsis="1" class="truncate max-w-48">{{
            account.accountNumber
          }}</KBUITypography>
          <KBUITypography size="b12" color="gray-2">
            잔액 : {{ account.balance.toLocaleString() }}원</KBUITypography
          >
        </div>
      </div>

      <KBUIButton
        size="small"
        variant="primary"
        class="ml-auto"
        @click="props.onNext"
      >
        선택하기
      </KBUIButton>
    </li>
  </ul>
</template>
