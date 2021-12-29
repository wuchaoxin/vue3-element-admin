import {
  createPinia,
  mapActions,
  mapState,
  mapStores,
  storeToRefs,
} from "pinia";

const store = createPinia();

export default store;

export * from "./modules/app";
export * from "./modules/settings";
export * from "./modules/tagsView";
export * from "./modules/permission";
export * from "./modules/user";

// 注：官网提示你不应当使用 mapGetters( map 系列 api 也只是给 options 写法准备)
export { mapActions, mapState, mapStores, storeToRefs };
