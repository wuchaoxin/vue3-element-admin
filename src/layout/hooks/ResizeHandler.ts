import { onBeforeMount, onBeforeUnmount, onMounted, watch } from "vue";
import { useAppStore, storeToRefs } from "@/store";
import { useRoute } from "vue-router";

export function useResize() {
  const { body } = document;
  // 参阅 Bootstrap 的响应式设计
  const WIDTH = 992;
  const route = useRoute();
  const appStore = useAppStore();
  const { device, sidebar } = storeToRefs(useAppStore());

  // 消除手机下的 transition
  watch(
    () => route.path,
    () => {
      if (device.value === "mobile" && sidebar.value.opened) {
        appStore.closeSideBar({ withoutAnimation: false });
      }
    }
  );

  onBeforeMount(() => {
    window.addEventListener("resize", _resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", _resizeHandler);
  });

  onMounted(() => {
    const isMobile = _isMobile();
    if (isMobile) {
      appStore.toggleDevice("mobile");
      appStore.closeSideBar({ withoutAnimation: true });
    }
  });

  function _isMobile() {
    // 返回元素的大小及其相对于视口的位置
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  }

  function _resizeHandler() {
    if (!document.hidden) {
      const isMobile = _isMobile();
      appStore.toggleDevice(isMobile ? "mobile" : "desktop");
      if (isMobile) {
        appStore.closeSideBar({ withoutAnimation: true });
      }
    }
  }
}
