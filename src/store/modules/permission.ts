import { defineStore } from "pinia";
import store from "@/store";
import { asyncRoutes, constantRoutes } from "@/router";
import {
  PermissonState,
  PermissonRoute,
  PermissonRouteArr,
} from "@/types/typings/store/permission";
import { Roles } from "@/types/typings/role";

// constantRoutes： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
// asyncRoutes： 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面

export const usePermissionStore = defineStore({
  id: "permission",
  state: (): PermissonState => ({
    routes: [],
    addRoutes: [],
  }),
  getters: {},
  actions: {
    generateRoutes(roles: Roles) {
      return new Promise((resolve) => {
        let accessedRoutes;
        if (roles.includes("admin")) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        this.addRoutes = accessedRoutes;
        this.routes = constantRoutes.concat(accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
});

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: PermissonRouteArr, roles: Roles) {
  const res: PermissonRouteArr = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

/**
 * 使用 meta.role 以确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(route: PermissonRoute, roles: Roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(
      (role) =>
        route.meta && route.meta.roles && route.meta.roles.includes(role)
    );
  } else {
    return true;
  }
}

// 在 setup 之外 时使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
