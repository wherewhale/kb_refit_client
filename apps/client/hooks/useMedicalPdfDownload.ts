import { ref } from "vue";
import { downloadMedicalPdf } from "~/libs/downloadMedicalPdf";

export function useMedicalPdfDownload() {
  const downloadUrl = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadPdf = async (filename: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const url = await downloadMedicalPdf(filename);
      downloadUrl.value = url;
    } catch (err) {
      error.value = "진료비 세부산정 내역 다운로드에 실패했습니다.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    downloadUrl,
    isLoading,
    error,
    loadPdf,
  };
}
