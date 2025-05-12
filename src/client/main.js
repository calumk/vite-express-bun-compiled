import "./style.css";

import { createApp } from "vue";
import router from "./router";

import PrimeVue from 'primevue/config';
import App from "./App.vue";
import Aura from '@primeuix/themes/aura';
import 'primeflex/primeflex.css'
// import 'primeicons/primeicons.css'


const app = createApp(App);



app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
});


app.use(router)

app.mount("#app");
