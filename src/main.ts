import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// CSS重置的现代替代方案
import "normalize.css/normalize.css";
import "@/styles/index.scss";

import "@/icons/index"; // icon
import "@/permission"; // permission control
import { isMock, mockInit } from "@/utils/mock";

// 是否进行 mock 数据
if (isMock()) {
  mockInit()
    .then(() => {
      require("@/apis/mock");
      bootstrap();
    })
    .catch(() => {
      console.error("mockjs error");
    });
} else {
  bootstrap();
}

function bootstrap() {
  const app = createApp(App);
  app.use(router);
  app.use(store);
  // element-plus 全局配置
  app.config.globalProperties.$ELEMENT = {
    size: "small",
    zIndex: 3000,
  };
  app.mount("#app");
}
