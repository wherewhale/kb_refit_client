<script setup lang="ts">
const pinNumber = ref<string[]>([]); // PIN 번호를 저장하는 배열

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
</script>

<template>
  <div class="max-w-sm mx-auto">
    <header>
      <div class="w-[99px] h-[17px] relative mx-auto mt-4">
        <NuxtImg src="/assets/images/logos/kb_logo.png" alt="KB Logo" />
      </div>
    </header>
    <main class="px-6">
      <KBUITypography
        tag="h2"
        size="h24"
        weight="bold"
        class-name="mt-20 text-center"
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
        class="fixed bottom-0 left-1/2 bg-gray-5 py-5 px-6 grid grid-cols-4 gap-2 max-w-sm transform -translate-x-1/2 w-full"
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
        <NuxtLink
          to="/"
          class="w-full block col-span-2"
          :disabled="pinNumber.length < 6"
        >
          <KBUIButton
            variant="primary"
            size="medium"
            class-name="w-full"
            :disabled="pinNumber.length < 6"
          >
            확인
          </KBUIButton>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
