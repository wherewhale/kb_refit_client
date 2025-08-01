import { v4 as uuid } from "uuid";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { storage } from "./firebase";

export async function uploadImageWithProgress(
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  if (!file) throw new Error("파일이 선택되지 않았습니다.");

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("허용되지 않은 이미지 형식입니다.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const filename = `${uuid()}.${extension}`;
  const fileRef = storageRef(storage, `uploads/${filename}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(Math.round(progress));
      },
      (error) => {
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
}
