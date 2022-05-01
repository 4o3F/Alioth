import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Constants from "./utils/Constants";
import { VueReCaptcha } from "vue-recaptcha-v3";

import App from "./App.vue";
import router from "./router/router";

loadFonts();

const app = createApp(App);

app.config.globalProperties.$constants = Constants;

app
  .use(vuetify)
  .use(router)
  .use(VueReCaptcha, {
    siteKey: Constants.reCaptchaSiteKey,
    loaderOptions: {
      useRecaptchaNet: true,
    },
  })
  .mount("#app");
