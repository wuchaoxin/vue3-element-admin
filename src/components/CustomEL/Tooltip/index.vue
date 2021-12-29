<!--
 * @description
!-->
<template>
  <el-tooltip v-bind="myAttrs">
    <slot></slot>
  </el-tooltip>
</template>
<script setup lang="ts">
import { useAttrs, computed } from "vue";

const myAttrs = computed(() => {
  const defaultAttrs = {
    effect: "light",
    placement: "top",
  };
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});
</script>
<style scoped lang="scss"></style>
