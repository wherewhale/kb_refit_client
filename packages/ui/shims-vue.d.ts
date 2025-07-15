// packages/ui/shims-vue.d.ts
// script setup에서 'styles' 같은 변수를 인식하게 함 (필요하다면)
import { CSS_MODULES_KEY } from "vue/compiler-sfc";

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 필요하다면 CSS Modules용 타입 정의도 추가 (현재 컴포넌트에는 CSS Modules가 없지만, 나중에 추가할 경우 대비)
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "vue" {
  interface ComponentCustomProperties {
    [CSS_MODULES_KEY]?: {
      [key: string]: string;
    };
  }
}
