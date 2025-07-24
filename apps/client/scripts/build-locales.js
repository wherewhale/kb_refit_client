import fs from "fs";
import path from "path";
import fetch from "node-fetch";

/**
 * 중첩 키 경로에 따라 값을 할당하는 유틸 함수
 * key가 중간에 string이면 에러 방지
 */
function setNestedValue(obj, keys, value) {
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // 충돌 방지: 이미 문자열로 저장되어 있다면 객체 할당 불가
    if (typeof current[key] === "string") {
      console.warn(`⚠️ 경로 충돌: '${keys.slice(0, i + 1).join(".")}'는 문자열이므로 객체로 확장 불가. 스킵됨.`);
      return;
    }

    if (!current[key]) {
      current[key] = {};
    }

    current = current[key];
  }

  const lastKey = keys[keys.length - 1];

  // 동일 키에 객체가 이미 있다면 덮어쓰기 방지
  if (
    current[lastKey] &&
    typeof current[lastKey] === "object" &&
    typeof value === "string"
  ) {
    console.warn(`⚠️ 경로 충돌: '${keys.join(".")}'는 이미 객체이므로 문자열로 덮어쓰기 불가. 스킵됨.`);
    return;
  }

  current[lastKey] = value;
}

/**
 * Google Sheet 데이터를 JSON으로 저장하는 메인 함수
 */
async function buildSheetData() {
  try {
    const response = await fetch("http://localhost:3000/api/sheet-data");
    const { values } = await response.json();

    const rows = values.slice(1); // 첫 줄은 헤더이므로 제외

    const locales = {
      ko: {},
      en: {},
    };

    for (const row of rows) {
      const [koValue, enValue, , ...keyParts] = row;
      const keyPath = keyParts.filter((key) => key && key.trim() !== "");

      if (keyPath.length === 0) continue; // 키 정보 없으면 스킵

      setNestedValue(locales.ko, keyPath, koValue);
      setNestedValue(locales.en, keyPath, enValue);
    }

    const outputDir = path.resolve("i18n/locales");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outputDir, "ko.json"),
      JSON.stringify(locales.ko, null, 2),
      "utf-8"
    );
    fs.writeFileSync(
      path.join(outputDir, "en.json"),
      JSON.stringify(locales.en, null, 2),
      "utf-8"
    );

    console.log("✅ 다국어 파일 생성 완료 (ko.json, en.json)");
  } catch (error) {
    console.error("❌ 시트 데이터를 처리하는 데 실패했습니다:", error);
    process.exit(1);
  }
}

buildSheetData();