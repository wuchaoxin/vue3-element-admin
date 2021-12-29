<!--
 * @description
!-->
<!-- <template>
  <EChart ref="echartRef" :option="option"></EChart>
</template>
<script setup lang="ts">
import EChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import { ref, onMounted, onActivated, onUnmounted, onDeactivated } from "vue";
import { useGetComponentExpose } from "@/hooks/component";
import { useDebounceFn } from "@vueuse/core";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

defineProps<{
  option: AnyObject;
}>();

let resizeHandler: null | (() => void) = null;
const echartRef = ref(null);

onMounted(() => {
  initResizeHandler();
});

onActivated(() => {
  if (resizeHandler) {
    initResizeHandler();
  }
  resize();
});

onUnmounted(() => {
  removeResizeHandler();
});

onDeactivated(() => {
  removeResizeHandler();
});

function initResizeHandler() {
  resizeHandler = useDebounceFn(() => {
    resize();
  }, 100);
  addResizeHandler();
}

function addResizeHandler() {
  if (resizeHandler) {
    window.addEventListener("resize", resizeHandler);
  }
}
function removeResizeHandler() {
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }
}

function resize() {
  const echartExpose = useGetComponentExpose(echartRef, "echart");
  echartExpose.resize();
}
</script>
<style scoped lang="scss"></style> -->
