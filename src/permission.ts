import router from "@/router";
import { useUserStoreWithOut, usePermissionStoreWithOut } from "@/store";
import { getToken } from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title";
import { startProgressBar, stopProgressBar } from "@/utils/progressBar";
import { RouteRecordRaw } from "vue-router";
import { MessageFn } from "./components/CustomEL";
import { FAIL_MESSAGE } from "./types/const/request";

// 重定向白名单
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  const permissonStore = usePermissionStoreWithOut();
  const userStore = useUserStoreWithOut();
  // 启动进度条
  startProgressBar();

  // 设置页面标题
  const title = (to.meta.title || "") as string;
  document.title = getPageTitle(title);

  // 确定用户是否已登录
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，重定向到主页
      next({ path: "/" });
      stopProgressBar();
    } else {
      const hasGetUserInfo = userStore.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // 获取用户信息
          await userStore.getInfo();

          // generate accessible routes map based on roles
          await permissonStore.generateRoutes(userStore.roles);

          // dynamically add accessible routes
          permissonStore.addRoutes.forEach((item) => {
            const tempItem = item as RouteRecordRaw;
            if (tempItem) {
              router.addRoute(tempItem);
            }
          });

          next();
        } catch (error) {
          // 删除令牌并转到登录页面重新登录
          await userStore.resetToken();
          MessageFn({
            message: FAIL_MESSAGE,
            type: "error",
          });
          next(`/login?redirect=${to.path}`);
          stopProgressBar();
        }
      }
    }
  } else {
    /* 没有 token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在重定位白名单中那么就放行
      next();
    } else {
      // 没有访问权限的其他页面将重定向到登录页面
      next(`/login?redirect=${to.path}`);
      stopProgressBar();
    }
  }
});

router.afterEach(() => {
  // 关闭进度条
  stopProgressBar();
});
