<!--
 * @description 单选列
!-->
<template>
  <el-table-column>
    <template #default="scope">
      <label :class="['el-radio', isCurrentRow(scope) ? 'is-checked' : '']">
        <span
          :class="['el-radio__input', isCurrentRow(scope) ? 'is-checked' : '']"
        >
          <span class="el-radio__inner"></span>
        </span>
      </label>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import "element-plus/es/components/radio/style/index";
import { TableScope } from "@/types/typings/components/CustomEL/Table";

const props = defineProps<{
  selectionList: Array<unknown>;
}>();

function isCurrentRow(scope: TableScope) {
  const currentRow = props.selectionList[0];
  if (currentRow === scope.row) {
    return true;
  } else {
    return false;
  }
}
</script>
<style scoped lang="scss">
:deep(.el-radio__label) {
  display: none;
}
</style>
