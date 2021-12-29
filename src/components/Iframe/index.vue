<!--
 * @description
!-->
<template>
  <iframe ref="iframeRef" v-bind="myAttrs"></iframe>
</template>
<script setup lang="ts">
import { useAttrs, ref, computed, onMounted, onUpdated } from "vue";

const props = defineProps<{
  content?: string;
  autoHeight?: boolean;
}>();

const iframeRef = ref(null);

const myAttrs = computed(() => {
  const defaultAttrs = {
    frameborder: "0",
    style: "width:100%;min-height: 420px;margin:0 auto;display:block",
  };
  if (props.autoHeight) {
    defaultAttrs.style = `width:100%;min-height: ${getHeight()}px;margin:0 auto;display:block`;
  }
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});

onMounted(() => {
  setContent();
});

onUpdated(() => {
  setContent();
});

function setContent() {
  const iframe = iframeRef.value as Dynamic;
  const iframeBody = iframe.contentWindow.document.body;
  if (props.content) {
    iframeBody.innerHTML = props.content;
  }
}

function getHeight() {
  // 整个页面的高度
  const contextHeight = document.documentElement.clientHeight;
  return contextHeight * 0.5;
}
</script>
<style scoped lang="scss"></style>
