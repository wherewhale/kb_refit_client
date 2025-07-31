import { ref as storageRef, getDownloadURL } from "@firebase/storage";
import { storage } from "./firebase";

export async function downloadImage(filename: string): Promise<string> {
  // 확장자 추출
  const fileRef = storageRef(storage, `uploads/${filename}`);

  // 파일 URL 반환
  console.log("파일 URL:", fileRef.fullPath);
  console.log("파일 다운로드 URL:", await getDownloadURL(fileRef));

  return await getDownloadURL(fileRef);
}
