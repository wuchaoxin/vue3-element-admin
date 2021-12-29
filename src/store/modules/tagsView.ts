import { defineStore } from "pinia";
import store from "@/store";
import { TagsViewState, View } from "@/types/typings/store/tagsView";

export const useTagsViewStore = defineStore({
  id: "tagsView",
  state: (): TagsViewState => ({
    // 用户访问过的页面，就是标签栏导航显示的一个个 tag 数组集合
    visitedViews: [],
    // 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存。
    cachedViews: [],
  }),
  getters: {},
  actions: {
    addView(view: View) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    addVisitedView(view: View) {
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: (view.meta && view.meta.title) || "no-name",
        })
      );
    },
    addCachedView(view: View) {
      if (view.name) {
        if (this.cachedViews.includes(view.name)) return;
        if (view.meta && !view.meta.noCache) {
          this.cachedViews.push(view.name);
        }
      }
    },
    delView(view: View) {
      return new Promise<TagsViewState>((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(view: View) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: View) {
      return new Promise((resolve) => {
        if (view.name) {
          const index = this.cachedViews.indexOf(view.name);
          index > -1 && this.cachedViews.splice(index, 1);
        }
        resolve([...this.cachedViews]);
      });
    },
    delOthersViews(view: View) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: View) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return (v.meta && v.meta.affix) || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: View) {
      return new Promise((resolve) => {
        if (view.name) {
          const index = this.cachedViews.indexOf(view.name);
          if (index > -1) {
            this.cachedViews = this.cachedViews.slice(index, index + 1);
          } else {
            // if index = -1, there is no cached tags
            this.cachedViews = [];
          }
        }
        resolve([...this.cachedViews]);
      });
    },
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        // keep affix tags
        const affixTags = this.visitedViews.filter(
          (tag) => tag.meta && tag.meta.affix
        );
        this.visitedViews = affixTags;
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },
    updateVisitedView(view: View) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});

// 在 setup 之外 时使用
export function useTagsViewStoreWithOut() {
  return useTagsViewStore(store);
}
