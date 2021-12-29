import { Route, RouteArr } from "@/types/typings/router";

export interface PermissonState {
  routes: RouteArr;
  addRoutes: RouteArr;
}

export type PermissonRoute = Route;
export type PermissonRouteArr = RouteArr;
