import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import router from "./router/router.js";

const app = createApp(App)

Sentry.init({
    app,
    dsn: "",
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "url", /^\//],
            tracesSampleRate: 1.0,
        }),
    ],
})

app.use(router).mount('#app')
