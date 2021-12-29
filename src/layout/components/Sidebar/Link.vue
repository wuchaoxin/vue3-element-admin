<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal as isExternalFn } from "@/utils/validate";
import { computed } from "vue";

const props = defineProps<{
  to: string;
}>();

const isExternal = computed(() => {
  return isExternalFn(props.to);
});
const type = computed(() => {
  if (isExternal.value) {
    return "a";
  }
  return "router-link";
});

function linkProps(to: string) {
  if (isExternal.value) {
    return {
      href: to,
      target: "_blank",
      rel: "noopener",
    };
  }
  return {
    to: to,
  };
}
</script>
