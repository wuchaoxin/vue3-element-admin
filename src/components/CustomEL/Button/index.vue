<!--
 * @description 常规按钮，不过新增关于 btnLoading 属性以及相关方法
!-->
<template>
  <el-button v-bind="myAttrs" :loading="isLoading">
    <span v-show="!isLoading">
      <slot></slot>
    </span>
    <span v-show="isLoading">{{ loadingText }}</span>
  </el-button>
</template>
<script setup lang="ts">
import { useAttrs, ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const btnLoading = ref(false);
const loadingText = "加载中";

const isLoading = computed(() => {
  if (props.loading || btnLoading.value) {
    return true;
  } else {
    return false;
  }
});
const myAttrs = computed(() => {
  const attrs = useAttrs();
  const coverConfig = {
    loading: props.loading,
  };
  return Object.assign({}, attrs, coverConfig);
});

function openLoading() {
  btnLoading.value = true;
}
function closeLoading() {
  btnLoading.value = false;
}

defineExpose({
  buttonExpose: {
    openLoading,
    closeLoading,
    prop: myAttrs.value.prop,
  },
});
</script>
<style scoped lang="scss"></style>
