<!--
 * @description
!-->
<template>
  <div>
    <Text
      >表格高度集成，以配置的形式来进行渲染，同时表格自带请求，封装单选、多选形式。</Text
    >
    <Button @click="test">测试</Button>
    <Table ref="tableRef" :config="tableConfig"></Table>
  </div>
</template>
<script setup lang="ts">
import { Table, Button, Text } from "@/components";
import { useGetComponentExpose } from "@/hooks/component";
import { TableConfig } from "@/types/typings/components/CustomEL/Table";
import { ref } from "vue";

const tableRef = ref(null);

const tableConfig: TableConfig = {
  columns: [
    {
      type: "radio",
    },
    {
      label: "序号",
      type: "index",
    },
    {
      label: "测试1",
      prop: "test1",
    },
    {
      label: "测试2",
      prop: "test2",
    },
    {
      label: "测试3",
      prop: "test3",
    },
    {
      label: "测试4",
      prop: "test4",
    },
  ],
  data: [
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
    { test1: "test1", test2: "test2", test3: "test3", test4: "test4" },
  ],
};

function test() {
  const tableExpose = useGetComponentExpose(tableRef, "table");
  console.log(tableExpose);
}
</script>
<style scoped lang="scss"></style>
