<!--
 * @description
!-->
<template>
  <div class="collapsed_noDropdown_icon">
    <Icon v-if="SVG_NAME_LIST.includes(icon)" :svg="elIcon"></Icon>
    <SvgIcon v-else :icon-class="icon" />
    <span v-if="title">{{ title }}</span>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { Icon } from "@/components";
import { SVG_NAME_LIST } from "@/types/const/components/Icon";
import { SvgName } from "@/types/typings/components/CustomEL/Icon";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    icon?: string;
    title?: string;
  }>(),
  {
    icon: "",
  }
);

const elIcon = computed(() => {
  return props.icon as SvgName;
});
</script>
<style scoped lang="scss">
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
