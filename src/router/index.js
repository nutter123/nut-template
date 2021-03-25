import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";

Vue.use(Router);
createMenu(routes);
const router = new Router({
  routes,
});
addRouterListener(router);

// 开发环境配置菜单页面
function createMenu(routeList) {
  let menuRoute = {
    path: "/menu",
    name: "menu",
    component: (r) => {
      require(["@/views/menu"], r);
    },
  };
  let isDev = process.env.NODE_ENV == "development";
  if (isDev) {
    routeList.unshift(menuRoute);
  }
}

function addRouterListener(routerObj) {
  routerObj.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    NProgress.start();
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  });

  routerObj.afterEach(() => {
    NProgress.done();
  });
}

export default router;
export { routes };
