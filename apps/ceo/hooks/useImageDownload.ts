// composables/useImageDownload.ts
import { ref } from "vue";
import { downloadImage } from "~/libs/downloadImage";

export function useImageDownload() {
  const downloadUrl = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadImage = async (filename: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const url = await downloadImage(filename);
      downloadUrl.value = url;
    } catch (err) {
      error.value = "이미지 다운로드에 실패했습니다.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    downloadUrl,
    isLoading,
    error,
    loadImage,
  };
}
