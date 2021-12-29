import { onMounted, getCurrentInstance } from "vue";
import { useAppStore } from "@/store";

export function useFixIOSHanlde() {
  onMounted(() => {
    fixBugIniOS();
  });
}

function fixBugIniOS() {
  const device = useAppStore().device;
  const instance = getCurrentInstance();
  const subMenu = instance?.refs.subMenu as Dynamic;
  if (subMenu) {
    const handleMouseleave = subMenu.handleMouseleave;
    subMenu.handleMouseleave = (e: Dynamic) => {
      if (device === "mobile") {
        return;
      }
      handleMouseleave(e);
    };
  }
}
