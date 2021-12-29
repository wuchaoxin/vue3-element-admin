import { defineStore } from "pinia";
import store from "@/store";
import { getCookie, setCookie } from "@/utils/cookie";
import { AppState, Device } from "@/types/typings/store/app";
import { YF_SIDEBAR_STATUS } from "@/types/const/storage";

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    sidebar: {
      // 侧边栏是否打开
      opened: getCookie(YF_SIDEBAR_STATUS)
        ? !!+getCookie(YF_SIDEBAR_STATUS)
        : true,
      // 手机端首次进入时消除动画
      withoutAnimation: false,
    },
    // 当前的设备（根据屏幕宽度来进行计算）
    device: "desktop",
  }),
  getters: {},
  actions: {
    // 侧边栏打开或者关闭触发
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        setCookie(YF_SIDEBAR_STATUS, "1");
      } else {
        setCookie(YF_SIDEBAR_STATUS, "0");
      }
    },
    closeSideBar(config: { withoutAnimation: boolean }) {
      setCookie(YF_SIDEBAR_STATUS, "0");
      const withoutAnimation = config.withoutAnimation;
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: Device) {
      this.device = device;
    },
  },
});

// 在 setup 之外 时使用
export function useAppStoreWithOut() {
  return useAppStore(store);
}
