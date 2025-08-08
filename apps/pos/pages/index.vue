<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { StoreInfo } from "~/interfaces/store.interface";
import { getCompanyList } from "~/services/pos";
import { useCompanyStore } from "~/stores/company";

const { data } = useQuery({
  queryKey: ["companyList"],
  queryFn: async () => (await getCompanyList()).data,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
});

const router = useRouter();

const { onChangeCompany, reset } = useCompanyStore();

const onSelectCompany = (company: StoreInfo) => {
  onChangeCompany(company);
  router.push(`/${company.companyId}`);
};

onMounted(() => {
  reset();
});
</script>

<template>
  <div>
    <CommonHeader />
    <div class="min-h-screen mx-auto text-white p-10">
      <ul v-if="(data?.list ?? []).length > 0" class="space-y-4">
        <li
          v-for="company in data?.list"
          :key="company.companyId"
          class="p-4 border bg-white text-black rounded-lg flex justify-between items-center"
        >
          <div>
            <KBUITypography size="b20" weight="medium">
              {{ company.companyName }}
            </KBUITypography>
            <KBUITypography size="b16" weight="regular" color="gray-2">
              대표명 : {{ company.ceoName }}
            </KBUITypography>
            <KBUITypography size="b16" weight="regular" color="gray-2">
              주소 : {{ company.address }}
            </KBUITypography>
            <KBUITypography size="b16" weight="regular" color="gray-2">
              사업자 번호 :
              {{ convertNumberBusinessNumberToString(company.companyId) }}
            </KBUITypography>
          </div>

          <KBUIButton
            variant="primary"
            size="medium"
            @click="onSelectCompany(company)"
          >
            선택하기
          </KBUIButton>
        </li>
      </ul>
    </div>
  </div>
</template>
