<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="menu 1">
      <router-view />
    </el-alert>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({});
</script>
