import { ref } from "vue";

export const useFunnel = (STEPS: string[]) => {
  const currentStep = ref(STEPS[0]);
  const direction = ref("forward");

  const setStep = (step: string) => {
    currentStep.value = step;
  };

  const nextStep = () => {
    const currentStepIndex = STEPS.indexOf(currentStep.value);
    if (currentStepIndex < STEPS.length - 1) {
      currentStep.value = STEPS[currentStepIndex + 1];
      direction.value = "forward";
    }
  };

  const prevStep = () => {
    const currentStepIndex = STEPS.indexOf(currentStep.value);
    if (currentStepIndex > 0) {
      currentStep.value = STEPS[currentStepIndex - 1];
      direction.value = "backward";
    }
  };

  return {
    currentStep,
    direction,
    setStep,
    nextStep,
    prevStep,
  };
};
