import { RouteLocationNormalizedLoaded } from "vue-router";
import { AffixTag } from "../layout/components/tagsView";
export interface TagsViewState {
  visitedViews: VisitedViews;
  cachedViews: CachedViews;
}

export type View =
  | (RouteLocationNormalizedLoaded & {
      name?: string | null | undefined;
    })
  | AffixTag;

export type VisitedView = View & {
  title: unknown;
};
export type VisitedViews = Array<VisitedView>;
export type CachedViews = Array<string>;
