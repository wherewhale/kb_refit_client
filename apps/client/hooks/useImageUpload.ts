import { ref } from "vue";
import { uploadImageWithProgress } from "~/libs/uploadImagWithProgress";

export function useImageUpload() {
  const imageUrl = ref<string | null>(null);
  const progress = ref<number>(0);
  const isUploading = ref(false);

  const onFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    isUploading.value = true;
    progress.value = 0;

    try {
      imageUrl.value = await uploadImageWithProgress(file, (p) => {
        progress.value = p;
      });
    } catch (err) {
      console.error("업로드 실패:", err);
    } finally {
      isUploading.value = false;
      progress.value = 0;
    }
  };

  return {
    imageUrl,
    onFileChange,
    isUploading,
    progress,
  };
}
