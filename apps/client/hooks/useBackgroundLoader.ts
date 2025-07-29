import { defineAsyncComponent, shallowRef, watchEffect } from "vue";
import type { WalletTheme } from "~/interfaces/wallet/theme";

export function useBackgroundLoader(themeTypeRef?: Ref<WalletTheme | null>) {
  const component = shallowRef();

  watchEffect(() => {
    switch (themeTypeRef?.value) {
      case "Adidas":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Adidas.vue")
        );
        break;
      case "Balenciaga":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Balenciaga.vue")
        );
        break;
      case "Burberry":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Burberry.vue")
        );
        break;
      case "Cartier":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Cartier.vue")
        );
        break;
      case "Celine":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Celine.vue")
        );
        break;
      case "Chanel":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Chanel.vue")
        );
        break;
      case "Coach":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Coach.vue")
        );
        break;
      case "Dior":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Dior.vue")
        );
        break;
      case "Fendi":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Fendi.vue")
        );
        break;
      case "Gucci":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Gucci.vue")
        );
        break;
      case "Hermes":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Hermes.vue")
        );
        break;
      case "Louisvuitton":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Louisvuitton.vue")
        );
        break;
      case "Miumiu":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Miumiu.vue")
        );
        break;
      case "Nike":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Nike.vue")
        );
        break;
      case "Prada":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/Prada.vue")
        );
        break;
      case "SaintLaurant":
        component.value = defineAsyncComponent(
          () => import("~/components/wallet/theme/SaintLaurant.vue")
        );
        break;
      default:
        component.value = null;
    }
  });

  return component;
}
