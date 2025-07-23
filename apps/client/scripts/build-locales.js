import fs from "fs";
import path from "path";
import fetch from "node-fetch";

async function buildSheetData() {
  try {
    const response = await fetch("http://localhost:3000/api/sheet-data");
    const { values } = await response.json(); // rows

    const rows = values.slice(1); // 데이터 행

    // 언어별 결과 객체 초기화
    const locales = {
      ko: {},
      en: {},
    };

    // 각 언어별로 key path를 기반으로 JSON 구조 생성
    for (const row of rows) {
      const [koValue, enValue, fullKey, ns] = row;

      if (!locales.ko[ns]) locales.ko[ns] = {};
      if (!locales.en[ns]) locales.en[ns] = {};

      const keyName = fullKey.split('.').pop();

      locales.ko[ns][keyName] = koValue;
      locales.en[ns][keyName] = enValue;
    }

    const outputDir = path.resolve("i18n/locales");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, "ko.json"), JSON.stringify(locales.ko, null, 2), "utf-8");
    fs.writeFileSync(path.join(outputDir, "en.json"), JSON.stringify(locales.en, null, 2), "utf-8");

    console.log("✅ 다국어 파일 생성 완료 (ko.json, en.json)");
  } catch (error) {
    console.error("❌ 시트 데이터를 처리하는 데 실패했습니다:", error);
    process.exit(1);
  }
}

buildSheetData();