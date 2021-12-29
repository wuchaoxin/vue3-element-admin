<!--
 * @description
!-->
<template>
  <el-date-picker
    style="width: 100%"
    v-model="datePickerValue"
    v-bind="myAttrs"
  ></el-date-picker>
</template>
<script setup lang="ts">
import { computed, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
const emits = defineEmits(["update:modelValue"]);

const datePickerValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const myAttrs = computed(() => {
  const defaultAttrs = {
    type: "daterange",
  };
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});
</script>
<style scoped lang="scss"></style>
