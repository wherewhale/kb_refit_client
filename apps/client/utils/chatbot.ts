// utils/badge-pick.ts
import type { SpecificBadgeDetail } from "~/types/wallet";

/** 사용자가 입력한 문장에 특정 단어가 포함되면 해당 배지ID를 담습니다. */
export function recommendBadges(
  query: string,
  badgeList: SpecificBadgeDetail[],
  limit = 4
): SpecificBadgeDetail[] {
  const q = query.trim();
  if (!q) return [];

  const ids = new Set<number>();

  // 병원/의료
  if (
    q.includes("병원") ||
    q.includes("진료") ||
    q.includes("의료") ||
    q.includes("약국")
  )
    ids.add(1);

  // 대중교통
  if (
    q.includes("대중교통") ||
    q.includes("버스") ||
    q.includes("지하철") ||
    q.includes("기차") ||
    q.includes("택시") ||
    q.includes("KTX")
  )
    ids.add(2);

  // 반려동물
  if (
    q.includes("반려동물") ||
    q.includes("펫") ||
    q.includes("애완") ||
    q.includes("강아지") ||
    q.includes("고양이")
  )
    ids.add(3);

  // 영화/극장
  if (q.includes("영화") || q.includes("극장")) ids.add(4);

  // 주점/술
  if (
    q.includes("술") ||
    q.includes("주점") ||
    q.includes("포차") ||
    q.includes("바") ||
    q.includes("맥주") ||
    q.includes("소주")
  )
    ids.add(5);

  // 문구/서점/책
  if (q.includes("문구") || q.includes("서점") || q.includes("책")) ids.add(6);

  // 여행
  if (q.includes("여행")) ids.add(7);

  // OTT/구독
  if (
    q.includes("OTT") ||
    q.includes("구독") ||
    q.includes("넷플릭스") ||
    q.includes("디즈니") ||
    q.includes("티빙") ||
    q.includes("웨이브")
  )
    ids.add(8);

  // 노래방
  if (q.includes("노래방") || q.includes("노래")) ids.add(9);

  // 샐러드/건강식
  if (q.includes("샐러드") || q.includes("다이어트") || q.includes("건강식"))
    ids.add(10);

  // 게임/PC방
  if (q.includes("게임") || q.includes("PC방")) ids.add(11);

  // 주유/자동차
  if (q.includes("주유") || q.includes("자동차") || q.includes("기름값"))
    ids.add(12);

  // 카페/커피
  if (q.includes("카페") || q.includes("커피")) ids.add(13);

  // 뷰티/화장품
  if (q.includes("뷰티") || q.includes("화장품") || q.includes("미용"))
    ids.add(14);

  // 콘서트/공연
  if (q.includes("콘서트") || q.includes("공연")) ids.add(15);

  // 숙소/숙박/호텔 → 16번(집좀가)
  if (
    q.includes("숙소") ||
    q.includes("숙박") ||
    q.includes("호텔") ||
    q.includes("모텔") ||
    q.includes("에어비앤비") ||
    q.includes("민박") ||
    q.includes("펜션") ||
    q.includes("외박")
  )
    ids.add(16);

  // 선택된 ID들만 추출 (소유 배지 우선 정렬)
  const out: SpecificBadgeDetail[] = [];
  for (const b of badgeList) {
    if (ids.has(b.badgeId)) out.push(b);
  }
  out.sort((a, b) => (a.owned === b.owned ? 0 : a.owned ? -1 : 1));

  return out.slice(0, limit);
}
