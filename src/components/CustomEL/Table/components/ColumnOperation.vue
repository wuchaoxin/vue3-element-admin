<!--
 * @description
!-->
<template>
  <span>
    <template v-for="(item, index) in col.buttons || []" :key="index">
      <Button @click.stop="buttonClick(item)" v-bind="item">{{
        item.label
      }}</Button>
    </template>
  </span>
</template>
<script setup lang="ts">
import { TableColumConfig } from "@/types/typings/components/CustomEL/Table";
import { TableButton } from "@/types/typings/components/CustomEL/Table";
import { Button } from "@/components";

const props = defineProps<{
  row: AnyObject;
  column: AnyObject;
  col: TableColumConfig;
}>();

function buttonClick(item: TableButton) {
  const row = props.row;
  const column = props.column;
  item.event?.(item.prop, row, column);
}
</script>
<style scoped lang="scss"></style>
