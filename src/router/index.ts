import { CustomRoute, CustomRouteArr, RouteArr } from "@/types/typings/router";
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";

/**
 * Note: 子菜单仅在route children.length >= 1 时显示 
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中（默认值为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，当项目有多个子路由时,
 *                                它将变为嵌套模式，不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，则面包屑中不会重定向
 * name:'router-name'             该名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']     控制页面角色访问（可以设置多个角色）
    title: 'title'                侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x'  图标显示模式在侧边栏中
    breadcrumb: false             如果设置为false，将在面包屑中隐藏（默认值为true）
    activeMenu: '/example/list'   如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基础页面
 * 可以访问所有角色
 */
export const constantRoutes: Array<CustomRoute> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
    hidden: true,
  },

  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/component",
    component: Layout,
    name: "Component",
    meta: { title: "ComponentDemo", icon: "user" },
    children: [
      {
        path: "select",
        name: "select",
        component: () => import("@/views/componentDemo/select.vue"),
        meta: { title: "select", icon: "dashboard" },
      },
      {
        path: "input",
        component: () => import("@/views/componentDemo/input.vue"),
        meta: { title: "input", icon: "dashboard" },
      },
      {
        path: "dialog",
        component: () => import("@/views/componentDemo/dialog.vue"),
        meta: { title: "dialog", icon: "dashboard" },
      },
      {
        path: "form",
        component: () => import("@/views/componentDemo/form.vue"),
        meta: { title: "form", icon: "dashboard" },
      },
      {
        path: "table",
        component: () => import("@/views/componentDemo/table.vue"),
        meta: { title: "table", icon: "dashboard" },
      },
      {
        path: "richTextEditor",
        component: () => import("@/views/componentDemo/richTextEditor.vue"),
        meta: { title: "richTextEditor", icon: "dashboard" },
      },
      {
        path: "jsonEditor",
        component: () => import("@/views/componentDemo/jsonEditor.vue"),
        name: "JsonEditor",
        meta: { title: "JSON Editor", icon: "dashboard" },
      },
      {
        path: "flexBox",
        component: () => import("@/views/componentDemo/flexBox.vue"),
        meta: { title: "flexBox", icon: "dashboard" },
      },
      {
        path: "page",
        component: () => import("@/views/componentDemo/page.vue"),
        meta: { title: "page", icon: "dashboard" },
      },
      {
        path: "echarts",
        component: () => import("@/views/componentDemo/echarts.vue"),
        meta: { title: "echarts", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index.vue"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1/index.vue"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2/index.vue"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1/index.vue"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2/index.vue"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3/index.vue"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index.vue"),
        name: "Menu2",
        meta: { title: "menu2" },
      },
    ],
  },

  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        redirect: "noRedirect",
        meta: { title: "External Link", icon: "link" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "/:pathMatch(.*)*", redirect: "/404", hidden: true },
];

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes: RouteArr = [];

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: Array<string | symbol> = [];
const getRouteNames = (array: CustomRoute[]) =>
  array.forEach((item) => {
    if (item.name) {
      WHITE_NAME_LIST.push(item.name);
    }
    getRouteNames(item.children || []);
  });
getRouteNames(constantRoutes);

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
