import { v4 as uuid } from "uuid";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(file: File): Promise<string> {
  if (!file) throw new Error("파일이 선택되지 않았습니다.");

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("허용되지 않은 이미지 형식입니다.");
  }

  // 확장자 추출
  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const filename = `${uuid()}.${extension}`;
  const fileRef = storageRef(storage, `uploads/${filename}`);

  await uploadBytes(fileRef, file);
  console.log("파일 업로드 성공:", filename);
  // 파일 URL 반환
  console.log("파일 URL:", fileRef.fullPath);
  console.log("파일 다운로드 URL:", await getDownloadURL(fileRef));

  return await getDownloadURL(fileRef);
}
