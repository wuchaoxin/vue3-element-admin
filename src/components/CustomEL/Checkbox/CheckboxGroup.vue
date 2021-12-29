<!--
 * @description
!-->
<template>
  <Space>
    <template v-for="(item, index) in list" :key="index">
      <CheckboxBase
        v-bind="item"
        :modelValue="modelValue[item.prop]"
        @update:model-value="emitValue"
      ></CheckboxBase>
    </template>
  </Space>
</template>
<script setup lang="ts">
import CheckboxBase from "./CheckboxBase.vue";
import { Space } from "@/components";
import {
  CheckboxGourpList,
  CheckboxGourpValue,
} from "@/types/typings/components/CustomEL/Checkbox";

const props = withDefaults(
  defineProps<{
    modelValue?: CheckboxGourpValue;
    list?: CheckboxGourpList;
  }>(),
  {
    modelValue: () => ({}),
    list: () => [],
  }
);
const emits = defineEmits(["update:modelValue"]);

function emitValue(val: boolean, prop: string) {
  const value = Object.assign({}, props.modelValue, { [prop]: val });
  emits("update:modelValue", value);
}
</script>
<style scoped lang="scss"></style>
