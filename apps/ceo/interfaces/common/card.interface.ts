export interface CardProps {
  /**
   * @type {string}
   * @description 타이틀 라벨
   */
  title: string;
  /**
   * @type {string}
   * @description ~원, ~건, ~P 등 메인 콘텐츠 내용
   */
  content: string;
  /**
   * @type {string}
   * @description 메인 콘텐츠 하단 세부 설명 내용
   */
  description?: string;
  /**
   * @type {string}
   * @description 강조 표시할 텍스트
   */
  boldText?: string;
  /**
   * @type {string}
   * @description 링크 URL
   */
  href?: string;
  /**
   * @type {string}
   * @description 이미지 URL
   */
  src: string;
  /**
   * @type {string}
   * @description 컴포넌트에 추가될 사용자 정의 CSS 클래스
   */
  className?: string;
}
