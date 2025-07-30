// composables/useImageUpload.ts
import { ref } from "vue";
import { uploadImage } from "~/libs/uploadImage";

export function useImageUpload() {
  const imageUrl = ref<string | null>(null);

  const onFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    imageUrl.value = await uploadImage(file);
  };

  return {
    imageUrl,
    onFileChange,
  };
}
