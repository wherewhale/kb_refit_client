<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { getMyInsuranceList } from "~/services/medical";

const { data } = useQuery({
  queryKey: ["insuranceList"],
  queryFn: async () => (await getMyInsuranceList()).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,
});

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
    v-if="(data ?? []).length > 0"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <li
      v-for="insurance in data"
      :key="insurance.insuranceId"
      class="p-4 rounded-lg bg-white border border-gray-2 w-full"
    >
      <div class="flex items-center gap-1">
        <figure
          class="size-10 rounded-lg relative flex items-center justify-center shrink-0"
        >
          <NuxtImg
            :src="`assets/images/insurances/${getInsuranceLogo(insurance.insuranceName)}.png`"
            alt="Insurance Logo"
            width="40"
            height="40"
          />
        </figure>
        <div class="flex flex-col">
          <KBUITypography size="b14" :ellipsis="1" class="truncate max-w-48">{{
            insurance.insuranceName
          }}</KBUITypography>
          <KBUITypography size="b12" color="gray-2"
            >가입일 :
            {{
              dayjs(insurance.joinedDate).format("YYYY.MM.DD")
            }}</KBUITypography
          >
        </div>
      </div>

      <KBUIButton
        size="small"
        variant="primary"
        class="ml-auto"
        @click="onClickInsurance(`${insurance.insuranceId}`)"
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
