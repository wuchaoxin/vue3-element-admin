<!--
 * @description
!-->
<template>
  <el-input v-model="inputValue">
    <template v-slot:prefix v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <template v-slot:suffix v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </template>
    <template v-slot:prepend v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append v-if="$slots.append">
      <slot name="append"></slot>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { removeSpace } from "@/utils/formatter";
import { computed, ref } from "vue";
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
const emits = defineEmits(["update:modelValue"]);

const inputRef = ref(null);

const inputValue = computed({
  get() {
    return removeSpace(props.modelValue, "both");
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

defineExpose({ inputExpose: inputRef });
</script>
<style scoped lang="scss"></style>
