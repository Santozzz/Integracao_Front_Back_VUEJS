// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importa o Vue Router

const app = createApp(App);
app.use(router); // Usa o Vue Router
app.mount("#app");
