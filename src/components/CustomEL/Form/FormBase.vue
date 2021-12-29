<!--
 * @description Form 基础组件，以配置形式书写表单
!-->
<template>
  <el-form ref="formRef" v-bind="myAttrs">
    <el-row
      v-for="(rowItem, rowIndex) in config"
      :key="rowIndex"
      :gutter="gutter"
    >
      <el-col
        v-for="(colItem, colIndex) in rowItem"
        :key="colIndex"
        :span="calculateSpan(colItem, rowItem)"
      >
        <form-col
          :colInfo="colItem"
          v-model="formModel[colItem.prop]"
          @col-value="transferForm"
        ></form-col>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import {
  FormColConfig,
  FormConfig,
  FormRowConfig,
} from "@/types/typings/components/CustomEL/Form";
import { useAttrs, computed, ref } from "vue";
import FormCol from "./components/FormCol.vue";

const props = withDefaults(
  defineProps<{
    gutter?: number;
    modelValue?: AnyObject;
    config?: FormConfig;
  }>(),
  {
    modelValue: () => ({}),
    config: () => [],
    gutter: 10,
  }
);
const emits = defineEmits(["update:modelValue"]);

const formRef = ref(null);

const myAttrs = computed(() => {
  const defaultAttrs = {
    model: props.modelValue,
  };
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});
const formModel = computed(() => {
  return props.modelValue;
});

function calculateSpan(col: FormColConfig, row: FormRowConfig) {
  if (col.span) {
    return col.span;
  } else {
    let usedSpan = 0;
    for (const item of row) {
      if (item.span) {
        usedSpan += item.span;
      }
    }
    return (24 - usedSpan) / row.length;
  }
}
function transferForm(val: AnyObject) {
  const model = Object.assign(formModel.value, val);
  emits("update:modelValue", model);
}

defineExpose({
  formExpose: formRef,
});
</script>
<style scoped lang="scss"></style>
