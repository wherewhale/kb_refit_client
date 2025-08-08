// hooks/useFunnel.ts
import { ref } from "vue";
import type { Ref } from "vue";

export const useFunnel = <T extends readonly string[]>(STEPS: T) => {
  type Step = T[number];

  const currentStep: Ref<Step> = ref(STEPS[0]);
  const direction = ref<"forward" | "backward">("forward");

  const setStep = (step: Step, dir: "forward" | "backward" = "forward") => {
    currentStep.value = step;
    direction.value = dir;
  };

  const nextStep = () => {
    const i = STEPS.indexOf(currentStep.value);
    if (i < STEPS.length - 1) {
      currentStep.value = STEPS[i + 1];
      direction.value = "forward";
    }
  };

  const prevStep = () => {
    const i = STEPS.indexOf(currentStep.value);
    if (i > 0) {
      currentStep.value = STEPS[i - 1];
      direction.value = "backward";
    }
  };

  return { currentStep, direction, setStep, nextStep, prevStep };
};