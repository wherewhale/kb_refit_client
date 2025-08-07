<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getMonthlySummary, postEmailSend } from "~/services/expense";
import { isValidEmail } from '~/utils/regex'

const props = defineProps<{
  open: boolean         // v-model:open
}>();

const isBottomSheetOpen = ref(props.open);

const { data } = useQuery<number>({
  queryKey: ["getMonthlySummary"],
  queryFn: async () => (await getMonthlySummary()).data,
  retry: false,
});

const emit = defineEmits<{
  (eventName: 'update:open', newOpenValue: boolean): void;
  (eventName: 'send', payload: { email: string }): void;
}>();

const email = ref('')
const error = ref('')
const toast = useToast();

const { mutate: sendEmail } = useMutation({
  mutationFn: postEmailSend,
  onSuccess: () => {
    toast.remove('sending')
    toast.add({
      title: '경비 처리 항목을 보냈습니다.',
      description: `${email.value} 로 처리 결과를 전송했어요.`,
      color: 'success'
    })
  },
  onError: () => {
    toast.remove('sending')
    toast.add({
      title: '전송 실패',
      description: '네트워크 상태를 확인 후 다시 시도하세요.',
      color: 'error'
    })
  }
})

const onSubmit = () => {
  error.value = ''
  if (!isValidEmail(email.value)) {
    error.value = '올바른 이메일을 입력하세요.'
    return
  }
  isBottomSheetOpen.value = false
    toast.add({
    id: 'sending',
    title: '보내는 중...',
    description: '이메일 전송중...',
  })
  sendEmail({ email: email.value })
}

watch(
  () => props.open,
  (newOpenValue) => {
    isBottomSheetOpen.value = newOpenValue;
  }
);

watch(
  isBottomSheetOpen,
  (newOpenValue) => {
    emit('update:open', newOpenValue);
  }
);
</script>

<template>
  <USlideover side="bottom" :open="isBottomSheetOpen" @update:open="isBottomSheetOpen = $event">
    <template #content>
      <form class="p-4 pt-8 h-[600px] flex flex-col justify-between overflow-y-scroll max-w-sm mx-auto w-full">
        <div>
          <KBUITypography size="b16" weight="bold">
          경비 처리 항목 보내기
        </KBUITypography>

        <KBUITypography size="b14" color="gray-2">경비 처리 수</KBUITypography>
        <KBUITypography size="b16" weight="medium" class-name="mt-1">
          총 {{ data ?? 0 }}건
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
        />
        <KBUITypography v-if="error" size="b14" class="mt-2 text-sm text-red-2">{{ error }}</KBUITypography>
        </div>
        
        <KBUIButton
        variant="primary"
        size="large"
        class="w-full block"
        :disabled="!isValidEmail(email)"
        type="submit"
        @click.prevent="onSubmit"
      >
        보내기
      </KBUIButton>
      </form> 
    </template>
  </USlideover>
</template>