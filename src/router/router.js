import Home from "../view/Home.vue";
import Challenge from "../view/Challenge.vue"
import {createRouter, createWebHashHistory} from "vue-router";
const routes = [
  {path:'/challenge/:challengeID', component: Challenge},
  { path: '/', component: Home }
];

const router = createRouter({
  history: createWebHashHistory("/"),
  routes,
});

export { router as default };
