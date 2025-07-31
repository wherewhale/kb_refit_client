<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  open: boolean;              // v-model:open
  count: number;              // 총 건수
}>();
const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  (e: 'send', payload: { email: string }): void;
}>();

const email = ref('');
const error = ref('');

const close = () => emit('update:open', false);

const onBackdrop = (e: MouseEvent) => {
  if (e.target === e.currentTarget) close();
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close();
};

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

const onSubmit = () => {
  error.value = '';
  const ok = /^\S+@\S+\.\S+$/.test(email.value);
  if (!ok) {
    error.value = '올바른 이메일을 입력하세요.';
    return;
  }
  emit('send', { email: email.value });
};
</script>

<template>
  <Teleport to="body">
    <!-- 어두운 배경 -->
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[3000] bg-black/50"
        @click="onBackdrop"
      >
        <!-- 바텀시트(풀스크린, 상단 여백 클릭 시 닫힘) -->
        <Transition name="sheet">
          <section
            v-if="open"
            role="dialog"
            aria-modal="true"
            class="fixed inset-0 flex flex-col"
          >
            <!-- 상단 여백: 탭하면 닫힘 -->
            <div
              class="pt-[8vh] md:pt-[96px] flex-1 flex flex-col cursor-pointer"
              @click="close"
            >
              <!-- 실제 패널: 내부 클릭은 유지 -->
              <div
                class="bg-white rounded-t-2xl shadow-xl flex flex-col h-full cursor-auto"
                @click.stop
              >
                <!-- 상단 그립 -->
                <div class="pt-3 flex justify-center">
                  <div class="h-1.5 w-12 rounded-full bg-gray-300" />
                </div>

                <!-- 헤더 -->
                <header class="px-6 pt-2">
                  <KBUITypography size="b16" weight="bold">
                    경비 처리 항목 보내기
                  </KBUITypography>
                </header>

                <!-- 본문: 스크롤 영역 -->
                <div class="px-6 mt-4 overflow-auto min-h-0">
                  <KBUITypography size="b14" color="gray-2">
                    경비 처리 수
                  </KBUITypography>
                  <KBUITypography size="b16" weight="medium" class-name="mt-1">
                    총 {{ props.count.toLocaleString() }}건
                  </KBUITypography>

                  <KBUITypography size="b14" color="gray-2" class-name="mt-6">
                    처리 내용을 받을 이메일
                  </KBUITypography>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="test@domain.com"
                    class="mt-2 w-full bg-transparent outline-none border-b
                           border-gray-300 focus:border-green-500 pb-2"
                    @keyup.enter="onSubmit"
                  />
                  <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>

                  <div class="h-8" />
                </div>

                <!-- 하단 고정 푸터 -->
                <footer
                  class="mt-auto px-6 pt-2 bg-white
                         pb-[calc(env(safe-area-inset-bottom,0)+16px)]"
                >
                  <KBUIButton
                    variant="primary"
                    size="large"
                    class="w-full rounded-xl py-4"
                    :disabled="!/^\S+@\S+\.\S+$/.test(email)"
                    @click="onSubmit"
                  >
                    보내기
                  </KBUIButton>
                </footer>
              </div>
            </div>
          </section>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>