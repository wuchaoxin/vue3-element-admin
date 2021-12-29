<!--
 * @description 由于 ELement Plus 有 Font icon 转向 Svg icon，这里封装一下
!-->
<template>
  <el-icon>
    <component :is="svgComponent"></component>
  </el-icon>
</template>
<script setup lang="ts">
import { SvgName } from "@/types/typings/components/CustomEL/Icon";
import {
  ArrowDown,
  UploadFilled,
  CaretBottom,
  QuestionFilled,
  Close,
} from "@element-plus/icons";
import { computed } from "vue";

const props = defineProps<{
  svg: SvgName;
}>();

const svgComponent = computed(() => {
  const svgName = props.svg;
  if (svgName === "ArrowDown") {
    return ArrowDown;
  } else if (svgName === "UploadFilled") {
    return UploadFilled;
  } else if (svgName === "CaretBottom") {
    return CaretBottom;
  } else if (svgName === "QuestionFilled") {
    return QuestionFilled;
  } else if (svgName === "Close") {
    return Close;
  }
  return null;
});
</script>
<style scoped lang="scss"></style>
