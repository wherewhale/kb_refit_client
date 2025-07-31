<script setup lang="ts">
import { useImageUpload } from "~/hooks/useImageUpload";
// import { useImageDownload } from "~/hooks/useImageDownload";

// const { downloadUrl, loadImage, isLoading } = useImageDownload();
const { imageUrl, onFileChange, isUploading, progress } = useImageUpload();

const isModalOpen = computed(() => isUploading.value);

onMounted(() => {
  // TODO: 서버에서 받아온 이미지 URL로 적용
  // loadImage("dd23c761-7d54-424a-ac0c-3437aa2e3bdd.png"); // uploads/example.png
});
</script>

<template>
  <div>
    <UModal v-model:open="isModalOpen">
      <KBUIButton
        size="large"
        variant="outlined"
        class="flex items-center gap-1 relative"
      >
        <input
          type="file"
          accept="image/*"
          class="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
          @change="onFileChange"
        />
        <UIcon name="ic:outline-attach-file" />
        파일 업로드
      </KBUIButton>
      <template #title> 날짜 범위 선택 </template>
      <template #content>
        <aside class="p-6">
          <UProgress v-model="progress" />
          <p class="text-sm text-gray-500 mt-2">{{ progress }}%</p>
        </aside>
      </template>
    </UModal>

    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Uploaded image"
      class="w-32 mt-4"
    />

    <!-- 이미지 다운로드 테스트 -->
    <!-- <div>
      <p v-if="isLoading">이미지 불러오는 중...</p>
      <img v-else-if="downloadUrl" :src="downloadUrl" alt="다운로드된 이미지" />
    </div> -->
    <!-- 버튼 그룹 -->
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        padding: 2rem;
      "
    >
      <!-- primary -->
      <KBUIButton variant="primary" size="large">button</KBUIButton>
      <KBUIButton variant="primary" size="medium">button</KBUIButton>
      <KBUIButton variant="primary" size="small">button</KBUIButton>

      <!-- primary_circle -->
      <KBUIButton variant="primary" size="large" shape="circle"
        >button</KBUIButton
      >
      <KBUIButton variant="primary" size="medium" shape="circle"
        >button</KBUIButton
      >
      <KBUIButton variant="primary" size="small" shape="circle"
        >button</KBUIButton
      >

      <!-- outlined -->
      <KBUIButton variant="outlined" size="large">button</KBUIButton>
      <KBUIButton variant="outlined" size="medium">button</KBUIButton>
      <KBUIButton variant="outlined" size="small">button</KBUIButton>

      <!-- outlined_circle -->
      <KBUIButton variant="outlined" size="large" shape="circle"
        >button</KBUIButton
      >
      <KBUIButton variant="outlined" size="medium" shape="circle"
        >button</KBUIButton
      >
      <KBUIButton variant="outlined" size="small" shape="circle"
        >button</KBUIButton
      >

      <!-- secondary -->
      <KBUIButton variant="secondary" size="large">button</KBUIButton>
      <KBUIButton variant="secondary" size="medium">button</KBUIButton>
      <KBUIButton variant="secondary" size="small">button</KBUIButton>

      <!-- ghost -->
      <KBUIButton variant="ghost" size="large">button</KBUIButton>
      <KBUIButton variant="ghost" size="medium">button</KBUIButton>
      <KBUIButton variant="ghost" size="small">button</KBUIButton>

      <!-- secondary-ghost -->
      <KBUIButton variant="secondary-ghost" size="large">button</KBUIButton>
      <KBUIButton variant="secondary-ghost" size="medium">button</KBUIButton>
      <KBUIButton variant="secondary-ghost" size="small">button</KBUIButton>
    </div>

    <div
      style="
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        padding: 2rem;
      "
    >
      <!-- Brand -->
      <div style="background-color: #ffbc00; width: 150px; height: 150px">
        #FFBC00
      </div>
      <div style="background-color: #ffcc02; width: 150px; height: 150px">
        #FFCC02
      </div>
      <div style="background-color: #8d744a; width: 150px; height: 150px">
        #FFBC00
      </div>
      <div style="background-color: #84888a; width: 150px; height: 150px">
        #84888A
      </div>
      <div style="background-color: #545045; width: 150px; height: 150px">
        #545045
      </div>
      <div style="background-color: #60584d; width: 150px; height: 150px">
        #60584D
      </div>

      <!-- Sub -->
      <div style="background-color: #def6ed; width: 150px; height: 150px">
        #DEF6ED
      </div>
      <div style="background-color: #72c2a8; width: 150px; height: 150px">
        #72C2A8
      </div>
      <div style="background-color: #eee3ff; width: 150px; height: 150px">
        #EEE3FF
      </div>
      <div style="background-color: #dcf4fe; width: 150px; height: 150px">
        #DCF4FE
      </div>
      <div style="background-color: #1c60ff; width: 150px; height: 150px">
        #1C60FF
      </div>
      <div style="background-color: #fff3ca; width: 150px; height: 150px">
        #FFF3CA
      </div>
      <div style="background-color: #ffe7e7; width: 150px; height: 150px">
        #FFE7E7
      </div>
      <div style="background-color: #fc2e6c; width: 150px; height: 150px">
        #FC2E6C
      </div>

      <!-- Gray Scale -->
      <div style="background-color: #000000; width: 150px; height: 150px">
        #000000
      </div>
      <div style="background-color: #454f5d; width: 150px; height: 150px">
        #454F5D
      </div>
      <div style="background-color: #838a9a; width: 150px; height: 150px">
        #838A9A
      </div>
      <div style="background-color: #d9d9d9; width: 150px; height: 150px">
        #D9D9D9
      </div>
      <div style="background-color: #eaedef; width: 150px; height: 150px">
        #EAEDEF
      </div>
      <div style="background-color: #f5f6f7; width: 150px; height: 150px">
        #F5F6F7
      </div>
      <div style="background-color: #ffffff; width: 150px; height: 150px">
        #FFFFFF
      </div>
    </div>

    <!-- Typography -->
    <div style="padding: 2rem">
      <KBUITypography weight="bold" size="h36"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="h36"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="h36"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="h32"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="h32"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="h32"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="h24"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="h24"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="h24"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="b20"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="b20"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="b20"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="b18"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="b18"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="b18"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="b16"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="b16"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="b16"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="b15"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="b15"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="b15"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="b14"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="b14"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="b14"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="b13"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="b13"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="b13"
        >가나다라마바사아자차카타파하</KBUITypography
      >

      <KBUITypography weight="bold" size="b12"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="medium" size="b12"
        >가나다라마바사아자차카타파하</KBUITypography
      >
      <KBUITypography weight="regular" size="b12"
        >가나다라마바사아자차카타파하</KBUITypography
      >
    </div>
  </div>
</template>
