<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { SpecificBadgeDetail } from "~/types/wallet";
import { recommendBadges } from "~/utils/chatbot"; // ← includes 기반 단일 함수

const props = defineProps<{ badges?: SpecificBadgeDetail[] }>();

/** 모달/입력/상태 */
const isOpen = ref(false);
const userText = ref("");
const isAnalyzing = ref(false);
const hasAnalyzed = ref(false);
const selectedBadge = ref<SpecificBadgeDetail | null>(null);

/** 배지 원본 */
const allBadges = ref<SpecificBadgeDetail[]>(props.badges ?? []);
watch(
  () => props.badges,
  (v) => {
    if (Array.isArray(v)) allBadges.value = v;
  }
);

/** 마지막 분석 질의(결과 계산에 사용) */
const lastQuery = ref("");

/** 분석 버튼 */
async function onAnalyze() {
  const text = userText.value.trim();
  if (!text) return;
  isAnalyzing.value = true;
  selectedBadge.value = null;
  await new Promise((r) => setTimeout(r, 2000)); // 연출용 딜레이
  lastQuery.value = text;
  isAnalyzing.value = false;
  hasAnalyzed.value = true;
}

/** 결과 계산 (includes 기반 추천) */
const filteredBadges = computed(() =>
  lastQuery.value ? recommendBadges(lastQuery.value, allBadges.value, 4) : []
);

/** 메시지 상태 */
const isUnknown = computed(
  () =>
    hasAnalyzed.value && !isAnalyzing.value && filteredBadges.value.length === 0
);
const isAllUnowned = computed(
  () =>
    hasAnalyzed.value &&
    !isAnalyzing.value &&
    filteredBadges.value.length > 0 &&
    filteredBadges.value.every((b) => !b.owned)
);
</script>

<template>
  <div class="mt-4">
    <KBUIButton
      variant="outlined"
      size="small"
      class="flex items-center gap-2"
      @click="isOpen = true"
    >
      <UIcon name="hugeicons:chat-bot" />
      챗봇한테 물어보기
    </KBUIButton>

    <UModal v-model:open="isOpen">
      <template #title>챗봇과 대화하기</template>

      <template #content>
        <aside class="p-6 space-y-4">
          <div class="flex gap-2">
            <UTextarea
              :model-value="userText"
              class="w-full resize-none"
              :rows="2"
              :max-length="40"
              :autoresize="true"
              color="warning"
              size="lg"
              :placeholder="'예) 출장 중 숙소/교통비 정리, 주말엔 여행 경비 정리'"
              @keydown.enter="onAnalyze"
              @input="userText = $event.target.value"
            />

            <KBUIButton
              variant="primary"
              size="large"
              class="shrink-0 rounded-xl"
              :disabled="!userText.trim()"
              @click="onAnalyze"
            >
              분석
            </KBUIButton>
          </div>

          <!-- 분석 중 스켈레톤 -->
          <ul v-if="isAnalyzing" class="grid grid-cols-3 gap-4">
            <KBUITypography
              size="b14"
              color="gray-1"
              class="w-full text-center col-span-3"
            >
              리핏 챗봇이 배지를 분석 중이에요...
            </KBUITypography>
            <li v-for="n in 6" :key="n" class="animate-pulse">
              <div class="mx-auto size-24 rounded-xl bg-gray-3" />
              <div class="mx-auto mt-2 h-3 w-20 rounded bg-gray-3" />
            </li>
          </ul>

          <!-- 결과/메시지 -->
          <div v-else>
            <KBUITypography v-if="isUnknown" color="gray-2" size="b14">
              배지를 알 수 없어요. 예: “점심/교통비”, “여행/숙소”처럼 키워드를
              포함해 주세요.
            </KBUITypography>

            <KBUITypography
              v-else-if="isAllUnowned"
              color="gray-2"
              size="b14"
              class-name="mt-2"
            >
              배지를 알 수 없어요. 예: “점심/교통비”, “여행/숙소”처럼 키워드를
              포함해 주세요.
            </KBUITypography>

            <ul v-if="filteredBadges.length" class="grid grid-cols-3 gap-4">
              <li
                v-for="badge in filteredBadges"
                :key="badge.badgeId"
                @click="selectedBadge = badge"
              >
                <div
                  class="relative mx-auto flex size-24 cursor-pointer items-center justify-center"
                >
                  <figure
                    class="relative z-20 flex size-20 items-center justify-center"
                  >
                    <NuxtImg
                      :src="`assets/images/badges${badge.owned ? '' : '-gray'}/${badge.badgeImage}.png`"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div class="mt-1 flex items-center justify-center gap-1">
                  <KBUITypography size="b12" weight="medium">
                    {{ badge.badgeTitle }}
                  </KBUITypography>
                </div>
              </li>
            </ul>

            <div
              v-if="selectedBadge"
              class="mt-4 rounded-xl border border-gray-3 p-4"
            >
              <KBUITypography weight="bold">{{
                selectedBadge.badgeTitle
              }}</KBUITypography>
              <KBUITypography weight="regular" color="gray-2" size="b14">
                혜택: {{ selectedBadge.badgeBenefit }}
              </KBUITypography>
              <KBUITypography weight="regular" color="gray-2" size="b14">
                조건:
                {{ selectedBadge.owned ? selectedBadge.badgeCondition : "???" }}
              </KBUITypography>
            </div>
          </div>
        </aside>
      </template>
    </UModal>
  </div>
</template>
