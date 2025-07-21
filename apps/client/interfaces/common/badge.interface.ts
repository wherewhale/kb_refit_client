export interface Badge {
  /**
   * 배지 고유 이름 (내부 식별용 ID)
   * @type {string}
   */
  badge: string;

  /**
   * 배지 타이틀 (사용자에게 보여지는 이름)
   * @type {string}
   */
  title: string;

  /**
   * 배지 설명 문구 (페이백 등 안내 문구)
   * @type {string}
   */
  description: string;

  /**
   * 배지 이미지 경로(URL)
   * @type {string}
   */
  image: string;
}