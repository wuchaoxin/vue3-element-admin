<!--
 * @description
!-->
<template>
  <el-space v-bind="myAttrs">
    <slot></slot>
  </el-space>
</template>
<script setup lang="ts">
import { useAttrs, computed } from "vue";

const myAttrs = computed(() => {
  const defaultAttrs = {
    size: "small",
  };
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});
</script>
<style scoped lang="scss"></style>
