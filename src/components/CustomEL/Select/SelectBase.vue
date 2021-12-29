<!--
 * @description
!-->
<template>
  <el-select
    ref="selectRef"
    v-bind="myAttrs"
    v-model="selectValue"
    style="width: 100%"
  >
    <el-option
      v-for="(item, index) in list"
      :key="index"
      :value="item.value"
      :label="item.label"
      :disabled="isDisabled(item)"
    ></el-option>
  </el-select>
</template>
<script setup lang="ts">
import { NO_DATA } from "@/types/const/common";
import {
  BlackList,
  SelectList,
  SelectListItem,
  SelectValue,
} from "@/types/typings/components/CustomEL/Select";
import { computed, ref, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: SelectValue;
    // 传入的列表
    list?: SelectList;
    // 黑名单（用于禁用）
    blackList?: BlackList;
  }>(),
  {
    modelValue: "",
    list: () => [],
    blackList: () => [],
  }
);
const emits = defineEmits(["update:modelValue"]);

const selectRef = ref(null);

const myAttrs = computed(() => {
  const defaultAttrs = {
    "no-data-text": NO_DATA,
    placeholder: "请选择",
  };
  const attrs = useAttrs();
  return Object.assign({}, defaultAttrs, attrs);
});
const selectValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

function isDisabled(item: SelectListItem) {
  const blackList = props.blackList;
  if (blackList.length > 0) {
    if (blackList.includes(item.label)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

defineExpose({ selectExpose: selectRef });
</script>
<style scoped lang="scss"></style>
