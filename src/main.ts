import { createApp } from "vue";
import App from "./example/App.vue";
import PinInputPlugin from "./index";

createApp(App).use(PinInputPlugin).mount("#app");
