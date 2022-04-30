import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import { createStore } from "vuex";
import { loadFonts } from "./plugins/webfontloader";

import App from './App.vue'
import router from './router/router'

loadFonts();

const store = createStore()

createApp(App).use(vuetify).use(store).use(router).mount("#app");
