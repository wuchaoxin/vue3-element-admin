<!--
 * @description
!-->
<template>
  <el-divider v-bind="myAttrs">
    <slot></slot>
  </el-divider>
</template>
<script setup lang="ts">
import { useAttrs, computed } from "vue";

const myAttrs = computed(() => {
  const defaultAttrs = {};
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});
</script>
<style scoped lang="scss"></style>
