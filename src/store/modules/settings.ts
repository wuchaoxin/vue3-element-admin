import { defineStore } from "pinia";
import store from "@/store";
import defaultSettings from "@/settings";
import { SettingData, SettingState } from "@/types/typings/store/settings";

const { fixedHeader, sidebarLogo, tagsView } = defaultSettings;

export const useSettingsStore = defineStore({
  id: "settings",
  state: (): SettingState => ({
    // 是否固定 navibar
    fixedHeader,
    // 是否展示 sidebar 顶部 logo
    sidebarLogo,
    tagsView,
  }),
  getters: {},
  actions: {
    changeSetting(data: SettingData) {
      const { key, value } = data;
      this[key] = value;
    },
  },
});

// 在 setup 之外 时使用
export function useSettingsStoreWithOut() {
  return useSettingsStore(store);
}
