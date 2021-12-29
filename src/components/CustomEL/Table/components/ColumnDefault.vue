<!--
 * @description
!-->
<template>
  <span>{{ text }}</span>
</template>
<script setup lang="ts">
import { TABLE_NULL_VALUE } from "@/types/const/common";
import { TableColumConfig } from "@/types/typings/components/CustomEL/Table";
import { computed } from "vue";

const props = defineProps<{
  row: AnyObject;
  column: AnyObject;
  col: TableColumConfig;
}>();

const text = computed(() => {
  const row = props.row as Dynamic;
  const column = props.column as Dynamic;
  const col = props.col;
  let text = row[column.property];
  // 判断表格中是否有值，无值回传 -
  if (text === null || text === "") {
    text = TABLE_NULL_VALUE;
  } else {
    // 是否格式化数据
    if (col.formatFn) {
      return col.formatFn(text);
    }
  }
  return text;
});
</script>
<style scoped lang="scss"></style>
