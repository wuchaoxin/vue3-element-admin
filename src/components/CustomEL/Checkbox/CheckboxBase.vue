<!--
 * @description
!-->
<template>
  <el-checkbox v-model="checkboxValue" v-bind="myAttrs"></el-checkbox>
</template>
<script setup lang="ts">
import { useAttrs, computed } from "vue";

const props = withDefaults(
  defineProps<{
    prop?: string;
    modelValue?: boolean;
  }>(),
  {
    modelValue: false,
  }
);
const emits = defineEmits(["update:modelValue"]);

const checkboxValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val, props.prop);
  },
});

const myAttrs = computed(() => {
  const defaultAttrs = {};
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});
</script>
<style scoped lang="scss"></style>
