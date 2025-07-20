<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { today, getLocalTimeZone } from "@internationalized/date";

// props: 필터 목록과 선택된 값
const props = defineProps<{
  filters: Record<string, string[]>;
  selected: Record<string, string>;
}>();
const emit = defineEmits<{
  (e: "update:selected", value: Record<string, string>): void;
}>();

// 날짜 범위
const rangeValue = shallowRef({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()),
});

// 열림 상태
const isOpen = ref(false);
const toggleFilter = () => (isOpen.value = !isOpen.value);

// 업데이트 함수
function updateFilter(label: string, value: string) {
  emit("update:selected", { ...props.selected, [label]: value });
}
</script>

<template>
  <div class="w-full rounded-lg bg-white p-6 mt-10">
    <button class="ml-auto block cursor-pointer" @click="toggleFilter">
      <KBUITypography size="b12" weight="bold" class="flex items-center gap-2">
        {{ selected["기간"] !== "직접 입력" ? "최근 " : "" }}
        {{ selected["기간"] }} · {{ selected["카테고리"] }} ·
        {{ selected["정렬"] }}
        <UIcon
          name="i-heroicons-chevron-down"
          :class="[
            'text-black transition-transform duration-200',
            isOpen ? 'rotate-180' : '',
          ]"
        />
      </KBUITypography>
    </button>

    <transition name="slide-fade">
      <div v-if="isOpen" class="mt-4 px-6 py-2 bg-gray-4">
        <div
          v-for="(options, label) in filters"
          :key="label"
          class="mt-4 first:mt-0 flex flex-col gap-2"
        >
          <div class="flex items-center gap-4">
            <KBUITypography size="b14" weight="bold">{{
              label
            }}</KBUITypography>
            <div class="flex items-center gap-2">
              <KBUITypography
                v-for="option in options"
                :key="option"
                size="b14"
                :weight="selected[label] === option ? 'bold' : 'regular'"
                :color="selected[label] === option ? 'blue-2' : 'gray-2'"
                class="cursor-pointer"
                @click="updateFilter(label, option)"
              >
                · {{ option }}
              </KBUITypography>
            </div>
          </div>

          <!-- 직접 입력 날짜 입력 -->
          <div
            v-if="label === '기간' && selected[label] === '직접 입력'"
            class="px-4 py-2 border border-black rounded-sm bg-white flex items-center justify-between text-black"
          >
            <UModal>
              <button class="flex items-center gap-1">
                <UIcon name="heroicons:calendar-16-solid" class="mb-0.5" />
                <KBUITypography size="b14" weight="bold">
                  {{ rangeValue.start.toString() }} ~
                  {{ rangeValue.end.toString() }}
                </KBUITypography>
              </button>

              <template #content>
                <aside class="p-6">
                  <UCalendar
                    v-model="rangeValue"
                    color="warning"
                    range
                    :year-controls="false"
                    :maximum-days="365"
                    :max-value="today(getLocalTimeZone())"
                  />
                </aside>
              </template>
            </UModal>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
