import { ref as storageRef, getDownloadURL } from "@firebase/storage";
import { storage } from "./firebase";

export async function downloadImage(filename: string): Promise<string> {
  // 확장자 추출
  const fileRef = storageRef(storage, `uploads/${filename}`);

  return await getDownloadURL(fileRef);
}
