<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { getMyDataCompany } from "~/services/company";

const props = defineProps<{
  onNext: () => void;
  onSelectCompany: (company: number) => void;
}>();

const { data: companyList } = useQuery({
  queryKey: ["myDataCompanies"],
  queryFn: async () => (await getMyDataCompany()).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,
});

const onClickCompany = (companyId: number) => {
  props.onSelectCompany(companyId);
  props.onNext();
};
</script>

<template>
  <ul
    v-if="(companyList ?? []).length > 0"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <li
      v-for="company in companyList"
      :key="company.companyId"
      class="p-4 rounded-lg bg-white border border-gray-2 w-full"
    >
      <div class="flex items-center gap-1">
        <div
          class="size-10 rounded-lg flex items-center justify-center shrink-0 bg-green-1"
        >
          <KBUITypography size="h24" weight="bold" class-name="text-center">
            {{ company.companyName[0] }}
          </KBUITypography>
        </div>
        <div class="flex flex-col">
          <KBUITypography size="b14" :ellipsis="1" class="truncate max-w-48">{{
            company.companyName
          }}</KBUITypography>
          <KBUITypography size="b12" color="gray-2">
            {{ dayjs(company.startDate).format("YYYY.MM.DD") }} ~
            {{
              company.endDate
                ? dayjs(company.endDate).format("YYYY.MM.DD")
                : "현재"
            }}</KBUITypography
          >
        </div>
      </div>

      <KBUIButton
        size="small"
        variant="primary"
        class="ml-auto"
        @click="onClickCompany(company.companyId)"
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
      확인되는 고용 정보가 없어요!
    </KBUITypography>
    <KBUIButton
      size="large"
      variant="primary"
      class="w-full mt-10"
      @click="props.onNext"
    >
      직접 입력하기
    </KBUIButton>
  </div>
</template>
