<!--
 * @description
!-->
<template>
  <div>
    <Text>通过传入 list 进行渲染 Select 组件</Text>
    <Select ref="selectRef" v-model="selectValue" :list="list"></Select>
    <Text>你也可以传入 blackList 来进行禁用某一项（以 label 来禁用）</Text>
    <Select
      ref="selectRef"
      v-model="selectValue"
      :list="list"
      :blackList="['测试 1']"
    ></Select>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onActivated, onDeactivated } from "vue";
import { Select, Text } from "@/components";
import { useGetComponentExpose } from "@/hooks/component";

const list = [
  { label: "测试 1", value: "test1" },
  { label: "测试 2", value: "test2" },
];
const selectValue = ref("");
const selectRef = ref(null);

onMounted(() => {
  //   const temp = useGetComponentExpose(selectRef, "select");
  //   console.log(temp);
});

onActivated(() => {
  console.log("激活");
});

onDeactivated(() => {
  console.log("离开");
});
</script>
<style scoped lang="scss"></style>
