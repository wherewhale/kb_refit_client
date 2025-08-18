# 🧾 종이보다 디지털, 번거로움 대신 KB리핏

> KB의 새로운 전자영수증 서비스 KB리핏!
> KB리핏은 Receipt, Reward, Benefit의 합성어로, 영수증의 디지털화를 통해 혜택을 돌려주는 웹 애플리케이션입니다.

## 😀 프로젝트 목적

전자영수증 기반의 회계·세무 자동화 및 보험 청구 지갑 서비스 ‘KB 리핏’은 아래와 같은 목적을 위해 개발되었습니다.

### 1. 환경 개선 (ESG)

- 환경부에 따르면 2018년 기준, 연간 약 128억 건의 종이영수증 발행
- 원목 약 128,900 그루 벌목 추산 → 전자영수증으로 전환 시, 산림 보호 및 자원 절감에 직접적 기여
- 종이영수증은 감열지로 제작되어 재활용 불가
- 소비자는 언제 어디서나 디지털 방식으로 영수증 열람 가능 → 소비자 편의성 및 접근성 증대

### 2. 가치 창출

#### 개인 사업자

- 수기로 관리하던 영수증의 디지털 전환 → 입출금 내역의 체계적 관리
- 전자영수증을 통한 비용 증빙 자동화 → 세무·자금 관리 효율성 향상
- 의료비 납입 영수증을 전자화 후 보험사로 자동 전송 → 기업 복지 시스템과의 연계로 관리·운영 비용 절감

#### 일반 사용자

- 개인 정보 유출 방지 → 종이영수증 분실 및 폐기 시 발생할 수 있는 피싱, 스미싱 등의 범죄 위험 최소화
- 소비 기록의 장기 보관 가능 → 별도의 보관 노력없이 전자 방식으로 장기적인 소비 기록 확인 가능
- 소비 패턴 분석 → 카테고리 분류를 통해 개인의 소비 패턴 성향, 지출 패턴 시각화 ⇒ 자산 관리 및 소비 습관 개선에 기여
- 영수증 만으로 새로운 가치 창출 → 소비 패턴을 기반으로 맞춤형 금융 상품 연동 ⇒ 국민은행의 신규 고객으로 자연스러운 전환 유도
- 병원·약국 등에서 발생한 납입 내역을 보험사로 자동 전송 → 사용자 불편 최소화

> 본 프로젝트는 IT's Your Life 6기 실무 역량 프로젝트이며, 금융 주제를 기반한 프로젝트 설계와 경험, 완성을 목표로 합니다.

## 📅 프로젝트 기간

2025.07.09 ~ 2025.08.21

## 🛠️ 기술 스택

| 구분      | 기술 스택                                                 |
| --------- | --------------------------------------------------------- |
| Core      | Turborepo, Vue3, Nuxt, TypeScript, PWA                    |
| 상태 관리 | Tanstack-Query, Pinia                                     |
| 스타일링  | TailwindCSS, SCSS                                         |
| 테스트    | Vitest                                                    |
| 기타      | Firebase Cloud Storage, Firebase Cloud Message (푸시알림) |

## 🖌 와이어프레임

클릭해서 와이어프레임을 확인하세요

### 클라이언트 페이지

<details>
  <summary>로그인</summary>
<img width="282" height="526" alt="스크린샷 2025-08-18 오후 1 56 39" src="https://github.com/user-attachments/assets/9ef50632-97d4-4ac6-b50c-4729db564ca2" />
</details>

<details>
  <summary>포인트</summary>
<img width="703" height="664" alt="스크린샷 2025-08-18 오후 1 57 25" src="https://github.com/user-attachments/assets/d69cc220-04ed-4700-990d-1530a870c78b" />
</details>

<details>
  <summary>구매영수증</summary>
<img width="950" height="458" alt="스크린샷 2025-08-18 오후 1 58 04" src="https://github.com/user-attachments/assets/17eee23f-b7ad-43fb-869a-f4f915e253f3" />
</details>

<details>
  <summary>병원영수증</summary>
<img width="874" height="344" alt="스크린샷 2025-08-18 오후 1 58 35" src="https://github.com/user-attachments/assets/1cb126f2-cac3-436f-a0ff-9e51cd42d9d9" />
</details>

<details>
  <summary>영수 처리하기</summary>
<img width="933" height="252" alt="스크린샷 2025-08-18 오후 1 59 13" src="https://github.com/user-attachments/assets/f615e57e-a478-4510-ab49-ba7152e4c984" />
</details>

<details>
  <summary>보험 처리하기</summary>
<img width="882" height="281" alt="스크린샷 2025-08-18 오후 2 00 27" src="https://github.com/user-attachments/assets/8eb60c26-72d7-443b-90c1-a4729e6989fa" />
</details>

<details>
  <summary>지갑 꾸미기</summary>
<img width="876" height="792" alt="스크린샷 2025-08-18 오후 2 00 49" src="https://github.com/user-attachments/assets/a66b369e-c346-405c-9a16-48429419ae73" />
</details>

### 사장님 페이지

<details>
  <summary>경비 처리</summary>
<img width="647" height="733" alt="스크린샷 2025-08-18 오후 2 02 59" src="https://github.com/user-attachments/assets/360e9cc2-f779-4612-9c54-ce2b1af3d7d3" />
<img width="673" height="511" alt="스크린샷 2025-08-18 오후 2 03 19" src="https://github.com/user-attachments/assets/501eb31c-cbc1-499d-982a-576762b09f44" />

</details>

<details>
  <summary>사업자 영수증</summary>
<img width="839" height="519" alt="스크린샷 2025-08-18 오후 2 03 40" src="https://github.com/user-attachments/assets/df4b25b2-6127-45ce-9e36-ed3e0490b0c1" />
</details>

## ⚙ 설치 및 실행 방법

### 1. 레포지토리 클론

```sh
git clone https://github.com/KB-PBL-GGABEES/kb_refit_client.git
cd kb_refit_client
```

### 2. 의존성 설치

```sh
npm install
```

### 3. Nuxt App 실행

```sh
npm run dev
```

- `포트 3000` : 클라이언트 앱
- `포트 3001`: 사장님 앱
- `포트 3002` : Pos기 시뮬레이터

## 📌 주요 기능

### ✅ 세무·자금 관리 및 법적 증빙 수단용 전자영수증 발급

- pos 시뮬레이터를 활용한 전자영수증 발급 과정 시뮬레이션
- 일반 사용자 및 사업자 사용자 유저 결제 내역 연계

### ✅ 소비 패턴 분석 기반 맞춤형 혜택 제공

- 전자 영수증 내역 기반 소비 카테고리 분석
- 배지 시스템을 통한 맞춤형 혜택 리워드 제공

### ✅ 전자영수증 기반 의료비 청구 간소화

- 의료 영수증 연계 실비 보험금 청구 간소화
- 보험사 연계 진료비 세부 산정 내역 송신 과정 funnel 구조로 연계

### ✅ 경비 처리

- 사업체 연계 경비 처리 과정 간소화
- 법인 카드 사용 반려 및 환수 조치 과정 간소화

👥 팀원
| 이름 | 사진 | GitHub | 역할 | 담당 기능|
|---|---|---|---|---|
| 손영호 | <img width="240" height="240" alt="image" src="https://github.com/user-attachments/assets/7c6143d8-e77e-4a6c-81f9-ee15b2cae395" /> | @wherewhale | 프론트엔드 리딩 | Turborepo 기초 구성 (공용 Component, Auth 로직 구성), 클라이언트, Pos 시뮬레이터 개발 |
| 강지원 | <img width="480" height="480" alt="image" src="https://github.com/user-attachments/assets/51350f37-44d8-407b-8cb9-233ee69ba31b" /> | @jionii | 프론트엔드 | 사장님 애플리케이션 개발 |

## 👥 개선 사항 및 후기

### 🐳 손영호

#### 📝 프로젝트 후기

첫 금융 프로젝트를 진행하며, 훨씬 더 많은 부분에서 보안과 개인정보를 신경써야 한다는 것을 알게 되었습니다!
실무에 적용하기 위해 테스트 코드 도입과 i18n, PWA와 같은 새로운 기술을 적용하며, 안정적으로 더 많은 사용자를 유치하기 위해 노력했어요.
특히, 새로운 프레임워크와 내용에 적응하느라 힘쓴 유일한 프론트엔드 팀원... @jionii 님에게 깊은 감사를 표합니다. ㅎㅎㅎ...
(제 부족한 코드를 따라오느라 고생했어요 ㅠㅠㅠ)

#### 🔄 이번 프로젝트에서 참여한 부분들

- Turborepo를 활용한 모노레포 구성 (일반 사용자, 사장님, Admin 전용 페이지 분리)
- Middleware를 활용한 Auth 로직 구성 (페이지 권한별 예외 처리 로직 구성)
- Firebase Cloud Storage 연동 및 이미지 업로드·다운로드 기능 개발
- i18n, Google Sheets 연동을 통한 다국어 지원 (한국어, 영어) - JSON 생성 스크립트 개발
- Vitest를 활용한 페이지별 UI 로직 테스트 코드 작성, Husky를 활용한 커밋 전 테스트 로직 연동
- Vue Transition, Custom Hook, Pinia를 활용한 useFunnel 커스텀 훅 구현
- PWA 웹 앱 구성을 위한 Manifest 작성
- FCM을 활용한 푸시 알림 연동

#### 🧗 Skill Up Points

- React 프레임워크뿐만 아니라 Vue, Nuxt.js 프레임워크를 기반으로 프로젝트를 구성하고 개발하며, 프레임워크 사용 이유에 대해 이해하였습니다.
- 이전에 실패했던 Middleware를 활용한 Auth 로직 구성에 성공하였으며, 도메인 차이를 극복하기 위해 Client에서 쿠키를 발급하였습니다.
- Vitest를 활용한 페이지별 테스트 코드를 추가하였고, Husky를 이용해 commit 전 자동으로 테스트를 진행하는 프로젝트 구성을 통해 기능을 기술적으로 보장하는 방식을 구상하고 구현하였습니다.
- Toss의 @use-funnel 라이브러리의 step과 context를 Vue 기반으로 마이그레이션하기 위해 <transition />, <component :is />, Pinia를 활용하였고, 단계별로 전환되는 페이지 단위 Form 구성을 구현하는 데 성공하였습니다. (현재 npm 라이브러리 배포 준비 중)
- Monorepo로 프로젝트를 구성하는 의의와 방법을 이해하였으며, 반복되는 코드를 줄이고 개발 경험을 향상하기 위한 구성을 진행하였습니다.

#### 🐞 이슈 트래킹 기록

[tanstack mutationKey 값으로 인한 Maximum call stack size exceeded 이슈](https://velog.io/@wha1eson/tanstack-mutationKey-%EA%B0%92%EC%9C%BC%EB%A1%9C-%EC%9D%B8%ED%95%9C-Maximum-call-stack-size-exceeded-%EC%9D%B4%EC%8A%88)

##### 트러블 슈팅 요약

Vue의 반응형 시스템과 TanStack Query의 내부 동작 방식이 충돌한 것이 원인
문제의 핵심 원인은 mutationKey에 store라는 반응형 객체를 그대로 전달했다는 점

```ts
mutationKey: ["submitReceiptExpense", store]; // ❌
```

### 👩‍💻 강지원

#### 📝 프로젝트 후기

두 달도 안 되는 시간동안 기획부터 발표까지 쉼 없이 달려온 우리 팀에게 정말 고생했다고 전하고 싶습니다.
프론트를 개발하며 단순 코드 구현 뿐만 아니라 어떻게 하면 더 좋은 서비스를 개발할 수 있는지, 내가 쓴 코드의 근거가 무엇인지부터 하나하나 알려주고 키워준 영호 오빠(@wherewhale )에게 압도적 감사를 표합니다..!!(정말 최고👍🏻)
덕분에 개발자로서 갖춰야 할 필수 역량들을 키울 수 있는 소중한 프로젝트였습니다 ☺️

#### 🐞 이슈 트래킹 기록

[[Nuxt.js] computed를 사용한 실시간 다국어 변환 구현](https://jioning.tistory.com/entry/Nuxtjs-computed%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EB%8B%A4%EA%B5%AD%EC%96%B4-%EB%B3%80%ED%99%98-%EA%B5%AC%ED%98%84)

#### 트러블 슈팅 요약

기존의 코드를 최대한 깨지 않으며, 동적으로 변화하는 언어 변경 비즈니스 로직을 구현하기 위해 `i18n 도입`
`computed`, `Nuxt Config`를 활용하여 i18n과 연동하여 동적으로 한국어와 영어 동시 지원
