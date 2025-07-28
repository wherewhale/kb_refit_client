import { VueQueryPlugin } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  // Register the Vue Query plugin
  nuxtApp.vueApp.use(VueQueryPlugin);

  // Optionally, you can configure Vue Query here
  // For example, setting a default query function or global options
  // nuxtApp.vueApp.config.globalProperties.$queryClient = new QueryClient();
});
