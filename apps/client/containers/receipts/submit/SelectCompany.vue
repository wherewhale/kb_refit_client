<script setup lang="ts">
import dayjs from "dayjs";

const COMPANY_DATA: Array<{
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
}> = [
  //   {
  //     id: "company1",
  //     name: "깨비들",
  //     startDate: new Date("2023-01-01"),
  //     endDate: new Date("2024-12-31"),
  //   },
  //   {
  //     id: "company2",
  //     name: "시리우스",
  //     startDate: new Date("2025-05-15"),
  //   },
];
const props = defineProps<{
  onNext: () => void;
  onSelectCompany: (company: string) => void;
}>();

const onClickCompany = (companyId: string) => {
  props.onSelectCompany(companyId);
  props.onNext();
};
</script>

<template>
  <ul
    v-if="COMPANY_DATA.length > 0"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <li
      v-for="company in COMPANY_DATA"
      :key="company.id"
      class="p-4 rounded-lg bg-white border border-gray-2 w-full"
    >
      <div class="flex items-center gap-1">
        <div
          class="size-10 rounded-lg flex items-center justify-center shrink-0 bg-green-1"
        >
          <KBUITypography size="h24" weight="bold" class-name="text-center">
            {{ company.name[0] }}
          </KBUITypography>
        </div>
        <div class="flex flex-col">
          <KBUITypography size="b14" :ellipsis="1" class="truncate max-w-48">{{
            company.name
          }}</KBUITypography>
          <KBUITypography size="b12" color="gray-2">
            {{ dayjs(company.startDate).format("YYYY.MM.DD") }} ~
            {{
              dayjs(company.endDate)
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
        @click="onClickCompany(company.id)"
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
