import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { router } from "@/router";
import store from "@/store";
import axios from "@/utils/http";
import { VueWindowSizePlugin } from "vue-window-size/option-api";
import VueSmoothScroll from "vue3-smooth-scroll";
loadFonts();
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(VueSmoothScroll)
  .use(VueWindowSizePlugin)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount("#app");
