<template>
  <div class="components-container">
    <Text>Json编辑器基于CodeMirror。Lint基于json Lint。</Text>
    <div class="editor-container">
      <JsonEditor ref="jsonEditor" :value="jsonCode" :readonly="readonly" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { JsonEditor, Text } from "@/components";

const jsonEditor = ref();
const jsonData =
  '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""}]';
const jsonCode = ref(JSON.parse(jsonData));
const readonly = ref<boolean>(false);
</script>

<style scoped>
.editor-container {
  position: relative;
  height: 100%;
}
</style>
