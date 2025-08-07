<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { UserRole } from "~/enum/role.enum";
import { getMyInfo, postLogin } from "~/services/auth";
import { setTokens } from "~/utils/token";
import Loading from "~/components/common/Loading.vue";

const router = useRouter();
const pinNumber = ref<string[]>([]);
const toast = useToast();

const { mutate: postLoginApi, isPending } = useMutation({
  mutationKey: ["login", pinNumber.value.join("")],
  mutationFn: async () => {
    const response = await postLogin({
      username: pinNumber.value.join(""),
      password: pinNumber.value.join(""),
    });
    return response.data;
  },
  onSuccess: (res) => {
    setTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
    document.cookie = `kb_refit_access_token=${res.accessToken}; path=/; secure`;
    getMeApi();
  },
  onError: (error) => {
    console.error("로그인 실패:", error);
    pinNumber.value = []; // PIN 번호 초기화
    toast.add({
      title: "로그인 실패",
      description: "비밀번호가 올바르지 않습니다. 다시 시도해주세요.",
      color: "error",
      duration: 3000,
    });
  },
});

const { mutate: getMeApi } = useMutation({
  mutationKey: ["getMe"],
  mutationFn: async () => {
    const response = await getMyInfo();
    return response.data;
  },
  onSuccess: (data) => {
    if ([UserRole.USER, UserRole.ADMIN].includes(data.role as UserRole)) {
      router.replace("/"); // 일반 사용자일 경우 홈으로 리다이렉트
    } else {
      removeTokens();
      toast.add({
        title: "로그인 실패",
        description: "일반 사용자만 접근할 수 있습니다.",
        color: "error",
        duration: 3000,
      });
    }
  },
  onError: (error) => {
    console.error("사용자 정보 조회 실패:", error);
  },
});

const onClickPinButton = (number: number) => {
  if (pinNumber.value.length < 6) {
    pinNumber.value.push(number === 10 ? "0" : number.toString());
  }
};

const onClickBackspace = () => {
  if (pinNumber.value.length > 0) {
    pinNumber.value.pop();
  }
};

const onClickConfirm = () => {
  postLoginApi();
};

const shouldShowLoading = import.meta.env.VITEST ? false : isPending;

defineExpose({ pinNumber }); // 🔑 테스트를 위한 노출
</script>

<template>
  <div class="max-w-md mx-auto">
    <Loading v-if="shouldShowLoading" />

    <main class="px-6">
      <figure class="w-10 mt-20 mx-auto">
        <NuxtImg src="assets/images/logos/symbol-logo.png" alt="kb_logo" />
      </figure>

      <KBUITypography
        tag="h2"
        size="h24"
        weight="bold"
        class-name="mt-4 text-center"
        color="white"
      >
        KB국민인증서
      </KBUITypography>
      <UPinInput
        v-model="pinNumber"
        aria-readonly
        mask
        :length="6"
        class="mt-20 justify-center w-full"
      />
      <div
        class="fixed bottom-0 left-1/2 bg-gray-5 py-5 px-6 grid grid-cols-4 gap-2 max-w-md transform -translate-x-1/2 w-full"
      >
        <KBUIButton
          v-for="i in 10"
          :key="i"
          :class-name="i === 2 ? 'col-start-4' : ''"
          size="medium"
          variant="outlined"
          @click="onClickPinButton(i)"
          >{{ i === 10 ? "0" : i }}</KBUIButton
        >
        <KBUIButton variant="secondary" size="medium" @click="onClickBackspace">
          <UIcon name="material-symbols-light:backspace" size="24" />
        </KBUIButton>
        <KBUIButton variant="ghost" size="medium"> 취소 </KBUIButton>
        <KBUIButton
          variant="primary"
          size="medium"
          class-name="w-full col-span-2 block"
          :disabled="pinNumber.length < 6 ? true : false"
          @click="onClickConfirm"
        >
          확인
        </KBUIButton>
      </div>
    </main>
  </div>
</template>
