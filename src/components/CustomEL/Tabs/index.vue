<!--
 * @description
!-->
<template>
  <el-tabs v-model="tabsValue" v-bind="myAttrs">
    <template v-for="tab in config.tabPanes || []" :key="tab.name">
      <el-tab-pane v-bind="tab">
        <slot :name="tab.name"></slot>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>
<script setup lang="ts">
import { TabsConfig } from "@/types/typings/components/CustomEL/Tabs";
import { useAttrs, computed, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    config: TabsConfig;
  }>(),
  {
    modelValue: "",
  }
);
const emits = defineEmits(["update:modelValue"]);

const tabsValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});
const myAttrs = computed(() => {
  const defaultAttrs = {};
  const attrs = useAttrs();
  return Object.assign(defaultAttrs, attrs);
});

onMounted(() => {
  if (props.modelValue === "") {
    tabsValue.value = props.config.tabPanes[0].name;
  }
});
</script>
<style scoped lang="scss"></style>
