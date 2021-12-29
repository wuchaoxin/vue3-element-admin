import { Route } from "@/types/typings/router";
import { VisitedView, VisitedViews } from "../../store/tagsView";

export type AffixTag = Route & {
  fullPath: string;
  path: string;
  query: Record<string, never>;
};
export type AffixTagArr = Array<AffixTag>;

export type Tag = VisitedView;

export type TagArr = VisitedViews;

export interface RouterLinkType {
  activeClass: string | undefined;
  ariaCurrentValue: string;
  custom: boolean;
  exactActiveClass: string | undefined;
  replace: boolean;
  to: {
    fullPath: string;
    path: string;
    query: AnyObject;
  };
  $el: HTMLElement;
}
