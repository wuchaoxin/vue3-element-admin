<!--
 * @description
!-->
<template>
  <div>
    <Text>Dialog 会自动进行定位，计算高度。同时还封装了底部按钮</Text>
    <Button @click="activeDialog">触发dialog</Button>
    <Dialog v-model="dialogValue" @buttonClick="test">
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
      <div>1212121212</div>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { Button, Dialog, Text } from "@/components";
import { ref } from "vue";

const dialogValue = ref(false);

function activeDialog() {
  dialogValue.value = true;
}
function test(a: string, b: () => void, c: () => void) {
  console.log(a, b, c);
  setTimeout(() => {
    c();
  }, 1000);
}
</script>
<style scoped lang="scss"></style>
