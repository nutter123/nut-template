import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import nutterUi from "nutter-ui";
// 样式引入
import "element-ui/lib/theme-chalk/index.css";
import "nutter-ui/dist/nutterUi.css";
import "@/scss/new.scss";
// 配置本地文件引入
import api from "@/api";
import "@/mock";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(nutterUi);

Vue.prototype.$apis = api;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
