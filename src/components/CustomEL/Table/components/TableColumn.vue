<!--
 * @description
!-->
<template>
  <el-table-column>
    <template v-slot="scope">
      <component :is="renderColumns" v-bind="getBind(scope, col)"></component>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import { TableColumConfig } from "@/types/typings/components/CustomEL/Table";
import { computed } from "vue";
import ColumnDefault from "./ColumnDefault.vue";
import ColumnOperation from "./ColumnOperation.vue";

const poprs = defineProps<{
  col: TableColumConfig;
}>();

const renderColumns = computed(() => {
  let component = ColumnDefault;
  const col = poprs.col;
  if (col.component === "operation") {
    component = ColumnOperation;
  }
  return component;
});

function getBind(scope: Dynamic, col: TableColumConfig) {
  const { row, column } = scope;
  const props = { row, column, col };
  return props;
}
</script>
<style scoped lang="scss"></style>
