<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useSettingsStore, storeToRefs } from "@/store";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import scssVariables from "@/styles/_variables.module.scss";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { sidebar } = storeToRefs(useAppStore());
const { sidebarLogo } = storeToRefs(useSettingsStore());

const routes = computed(() => {
  return router.options.routes;
});
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
const showLogo = computed(() => {
  return sidebarLogo.value;
});
const variables = computed(() => {
  return scssVariables;
});
const isCollapse = computed(() => {
  return !sidebar.value.opened;
});
</script>
