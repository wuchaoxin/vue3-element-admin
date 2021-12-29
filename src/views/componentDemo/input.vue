<!--
 * @description
!-->
<template>
  <div>
    <Text>input 将自动删除首尾空格</Text>
    <Input v-model="inputValue" @input="check"></Input>
  </div>
</template>
<script setup lang="ts">
import { Input, Text } from "@/components";
import { ref } from "vue";

const inputValue = ref("");

function check() {
  console.log(inputValue.value);
}
</script>
<style scoped lang="scss"></style>
