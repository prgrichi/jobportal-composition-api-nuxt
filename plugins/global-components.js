// plugins/global-components.js
import Icon from '~/components/ui/Icon.vue';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('Icon', Icon);
});
