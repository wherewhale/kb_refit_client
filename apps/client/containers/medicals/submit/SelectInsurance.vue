<script setup lang="ts">
import dayjs from "dayjs";

const INSURANCE_DATA: Array<{
  id: string;
  name: string;
  registerDate: Date;
  logo: string;
}> = [
  {
    id: "insurance1",
    name: "(무)KB손보간편가입실손의료비보험",
    registerDate: new Date("2023-03-16"),
    logo: "kb",
  },
  {
    id: "insurance2",
    name: "(무)KB손보간편가입실손의료비보험",
    registerDate: new Date("2017-03-05"),
    logo: "db",
  },
  {
    id: "insurance3",
    name: "(무)KB손보간편가입실손의료비보험",
    registerDate: new Date("2025-03-02"),
    logo: "meritz",
  },
];
const props = defineProps<{
  onNext: () => void;
  onSelectInsurance: (insurance: string) => void;
}>();

const onClickInsurance = (insuranceId: string) => {
  props.onSelectInsurance(insuranceId);
  props.onNext();
};
</script>

<template>
  <ul
    v-if="INSURANCE_DATA.length > 0"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <li
      v-for="insurance in INSURANCE_DATA"
      :key="insurance.id"
      class="p-4 rounded-lg bg-white border border-gray-2 w-full"
    >
      <div class="flex items-center gap-1">
        <div
          class="size-10 rounded-lg relative flex items-center justify-center shrink-0"
        >
          <NuxtImg
            :src="`assets/images/insurances/${insurance.logo}.png`"
            alt="Insurance Logo"
            width="40"
            height="40"
          />
        </div>
        <div class="flex flex-col">
          <KBUITypography size="b14" :ellipsis="1" class="truncate max-w-48">{{
            insurance.name
          }}</KBUITypography>
          <KBUITypography size="b12" color="gray-2"
            >가입일 :
            {{
              dayjs(insurance.registerDate).format("YYYY.MM.DD")
            }}</KBUITypography
          >
        </div>
      </div>

      <KBUIButton
        size="small"
        variant="primary"
        class="ml-auto"
        @click="onClickInsurance(insurance.id)"
      >
        선택하기
      </KBUIButton>
    </li>
  </ul>
  <div v-else class="w-full mt-10 flex flex-col items-center justify-center">
    <UIcon
      name="material-symbols:sd-card-alert-sharp"
      size="80"
      class="text-gray-3"
    />
    <KBUITypography size="b18" color="gray-2" class-name="mt-4 text-center">
      가입된 보험 정보가 없어요!<br />
      새로운 보험에 가입해볼까요?
    </KBUITypography>
    <NuxtLink
      to="https://kbinsure-online.co.kr/"
      target="_blank"
      class="block w-full mt-10"
    >
      <KBUIButton size="large" variant="primary" class="w-full">
        KB 손해보험으로 이동하기
      </KBUIButton>
    </NuxtLink>
  </div>
</template>
