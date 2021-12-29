import { RouteRecordRaw } from "vue-router";
import { Roles } from "./role";

export type CustomRoute = RouteRecordRaw & {
  name?: string | null | undefined;
  hidden?: boolean;
  alwaysShow?: boolean;
  noShowingChildren?: boolean;
  meta?: {
    roles?: Roles;
    title?: string;
    icon?: string;
    breadcrumb?: boolean;
    activeMenu?: boolean;
  };
  children?: CustomRouteArr;
};

export type CustomRouteArr = Array<CustomRoute>;

export type Route = CustomRoute;
export type RouteArr = CustomRouteArr;
