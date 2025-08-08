import { ref as storageRef, getDownloadURL } from "@firebase/storage";
import { storage } from "./firebase";

export async function downloadMedicalPdf(filename: string): Promise<string> {
  // 확장자 추출
  const fileRef = storageRef(storage, `medicals/${filename}`);
  console.log("Downloading medical PDF:", getDownloadURL(fileRef));

  return await getDownloadURL(fileRef);
}
