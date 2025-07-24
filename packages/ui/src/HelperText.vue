<script setup lang="ts">
import { useCssModule } from "vue";
import Typography from "./Typography.vue"; // Typography 컴포넌트 경로 확인 및 수정

const style = useCssModule();

interface HelperTextProps {
  /**
   * @type {'bottom' | 'top-right'}
   * @description 헬퍼 텍스트의 배치 위치.
   */
  placement?: "bottom" | "top-right";
  /**
   * @type {string}
   * @description 표시될 메시지 텍스트.
   */
  message?: string;
  /**
   * @type {boolean}
   * @description 에러 상태 여부. true일 경우 텍스트 색상이 'red-1'로 변경됩니다.
   */
  error?: boolean;
  /**
   * @type {string}
   * @description 컴포넌트에 추가될 사용자 정의 CSS 클래스.
   */
  className?: string;
}

const props = withDefaults(defineProps<HelperTextProps>(), {
  placement: "bottom", // 기본값 설정
  message: "", // 기본값 설정
  error: false, // 기본값 설정
  className: "", // 기본값 설정
});
</script>

<template>
  <Typography
    tag="span"
    size="b12"
    :color="props.error ? 'red-2' : 'green-2'"
    :class="[style.text, style[props.placement], props.className]"
  >
    <span> • </span>
    {{ props.message }}
  </Typography>
</template>

<style module lang="scss">
@use "./scss/base.scss" as *; // base.scss 경로 확인 및 필요 변수 임포트

.text {
  // 기본 헬퍼 텍스트 스타일 (필요하다면 여기에 추가)
  display: block; // Typography는 기본적으로 인라인이지만, 헬퍼 텍스트는 보통 블록 요소
  margin-top: $spacing-4; // 텍스트 필드와의 간격
  text-align: left;
}

.bottom {
  // 하단 배치 스타일 (기본 text 스타일을 따르므로 추가 스타일이 없을 수도 있음)
}

.top-right {
  // 상단 우측 배치 스타일 (필요하다면 여기에 추가, 예: position, transform 등)
  text-align: right;
  // 예시: 텍스트 필드 옆에 작은 힌트처럼 배치될 경우
  // position: absolute;
  // top: -20px; // 조절 필요
  // right: 0;
}
</style>
