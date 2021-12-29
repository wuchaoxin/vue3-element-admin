<!--
 * @description
!-->
<template>
  <div>
    <Text>将表格和表格再次进行一次封装，同时赋予表格自动计算高度的能力</Text>
    <Page :formConfig="formConfig" :tableConfig="tableConfig">
      <Button type="primary">测试</Button>
    </Page>
  </div>
</template>
<script setup lang="ts">
import { Page, Button, Text } from "@/components";
import { FormConfig } from "@/types/typings/components/CustomEL/Form";
import { TableConfig } from "@/types/typings/components/CustomEL/Table";

const formConfig: FormConfig = [
  [
    {
      label: "文章名称",
      prop: "test1",
      component: "input",
    },
    {
      label: "文章类型",
      prop: "test2",
      component: "select",
    },
    {
      label: "是否对外",
      prop: "test3",
      component: "select",
    },
    {
      label: "发布人",
      prop: "test4",
      component: "select",
    },
  ],
  [
    {
      label: "发布时间",
      prop: "test5",
      component: "datePicker",
      span: 12,
    },
  ],
];

const tableConfig: TableConfig = {
  autoHeight: true,
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
    {
      label: "操作",
      component: "operation",
      buttons: [{ prop: "submit", label: "删除", type: "danger" }],
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
</script>
<style scoped lang="scss"></style>
