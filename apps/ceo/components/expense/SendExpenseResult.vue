<script setup lang="ts">
import { isValidEmail } from '~/utils/regex'

const props = defineProps<{
  open: boolean         // v-model:open
  count: number         // 총 경비 건수
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'send', payload: { email: string }): void
}>()

const email = ref('')
const error = ref('')

const onSubmit = () => {
  error.value = ''
  if (!isValidEmail(email.value)) {
    error.value = '올바른 이메일을 입력하세요.'
    return
  }
  emit('send', { email: email.value })
}

const isBottomSheetOpen = ref(props.open)
watch(() => props.open, v => isBottomSheetOpen.value = v)
watch(isBottomSheetOpen, v => emit('update:open', v))
</script>

<template>
  <USlideover side="bottom" :open="isBottomSheetOpen" @update:open="isBottomSheetOpen = $event">
    <template #content>
      <div class="p-4 pt-8 h-[600px] overflow-y-scroll max-w-sm mx-auto w-full">
        <KBUITypography size="b16" weight="bold">
          경비 처리 항목 보내기
        </KBUITypography>

        <KBUITypography size="b14" color="gray-2">경비 처리 수</KBUITypography>
        <KBUITypography size="b16" weight="medium" class-name="mt-1">
          총 {{ props.count.toLocaleString() }}건
        </KBUITypography>

        <KBUITypography size="b14" color="gray-2" class-name="mt-6">
          처리 내용을 받을 이메일
        </KBUITypography>
        <input
          v-model="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          class="mt-2 w-full bg-transparent outline-none border-b
                  border-gray-3 focus:border-green-1 pb-2"
          @keyup.enter="onSubmit"
        />
        <KBUITypography v-if="error" size="b14" class="mt-2 text-sm text-red-2">{{ error }}</KBUITypography>
      </div>

      <KBUIButton
        variant="primary"
        size="large"
        :disabled="!isValidEmail(email)"
        @click="onSubmit"
      >
        보내기
      </KBUIButton>
    </template>
  </USlideover>
</template>