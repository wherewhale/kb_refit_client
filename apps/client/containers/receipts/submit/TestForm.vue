<style scoped></style>

<template>
  <DetailLayout :onBack="onClickBack">
    <!-- <div v-if=""></div> -->
    <div class="form-container">
      <transition :name="transitionName" mode="out-in">
        <component
          :is="getStepComponent(currentStep)"
          v-bind="getStepProps(currentStep)"
        />
      </transition>
      <div
        v-if="!isSubmitted"
        class="position-absolute bottom-0 start-0 end-0 p-3"
      >
        <BaseTypography size="2xl" class="text-center mb-4">{{
          errorMessage.length > 0 ? "😵‍💫" : "🧐"
        }}</BaseTypography>
        <button
          class="btn btn-primary btn-lg w-100"
          :disabled="!isValidated"
          @click="onClickNext"
        >
          완료
        </button>
      </div>
      <div v-else class="position-absolute bottom-0 start-0 end-0 p-3">
        <BaseTypography size="2xl" class="text-center mb-4">
          🥳
        </BaseTypography>
        <button
          class="btn btn-primary btn-lg w-100"
          :disabled="!isValidated"
          @click="onClickNext"
        >
          마이 페이지로 가기
        </button>
      </div>
    </div>
  </DetailLayout>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import DetailLayout from "@/components/layouts/DetailLayout.vue";
import BaseTypography from "@/components/common/Typography/BaseTypography.vue";
import InputName from "@/components/my/InputName.vue";
import SummaryAddedData from "@/components/my/SummaryAddedData.vue";
import { useFunnel } from "@/hooks/useFunnel";
import { useValidation } from "@/hooks/useValidation";
import { patchMemberName } from "@/api/member";
import useUserStore from "@/stores/auth";
import { getUserInfo } from "@/api/auth";

const STEPS = ["이름 설정", "추가 완료"];

const router = useRouter();
const isSubmitted = ref(false);

const state = reactive({
  name: "",
  isCompleted: false,
});

const { currentStep, direction, nextStep, prevStep } = useFunnel(STEPS);
const { isValidated, errorMessage, validate } = useValidation();
const user = useUserStore();

const transitionName = computed(() => {
  if (direction.value === "forward") {
    return "slide-left";
  } else if (direction.value === "backward") {
    return "slide-right";
  }
  return "";
});

// 현재 스텝에 따라 보여줄 컴포넌트
const getStepComponent = (step) => {
  if (step === STEPS[0]) return InputName;
  if (step === STEPS[1]) return SummaryAddedData;
};

// 각 스텝에 따라 넘길 props 설정
const getStepProps = (step) => {
  if (step === STEPS[0]) {
    return {
      onChange: onChangeName,
      name: state.name,
      errorMessage: errorMessage.value,
    };
  } else if (step === STEPS[1]) {
    return {
      name: state.name,
    };
  }
};

const onChangeName = (e) => {
  state.name = e.target.value;
  validate(state.name, [
    (value) =>
      value.length > 1
        ? { isValid: true }
        : { isValid: false, errorMessage: "2글자 이상 입력해 주세요!" },
  ]);
};

const onClickBack = () => {
  if (currentStep.value === STEPS[0]) {
    router.back();
    return;
  }
  prevStep();
};

const onClickNext = async () => {
  if (currentStep.value === STEPS[1]) {
    router.push({
      name: "mypage",
    });
    return;
  }
  if (currentStep.value === STEPS[0]) {
    isSubmitted.value = true;
    await patchMemberName(user.userInfo.id, state.name);
    const userInfo = await getUserInfo(user.userInfo.id);
    user.setUserInfo(userInfo);
    nextStep();
    return;
  }
  if (isValidated.value) {
    isValidated.value = false;
    nextStep();
  }
};

onMounted(() => {
  if (user.isLoggedIn) {
    state.name = user.userInfo.nickname;
  }
});
</script>
