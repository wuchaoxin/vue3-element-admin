<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: tagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView v-if="tagsView"></TagsView>
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import { useAppStore, useSettingsStore, storeToRefs } from "@/store";
import { computed } from "vue";
import { useResize } from "./hooks/ResizeHandler";

const appStore = useAppStore();
const { sidebar, device } = storeToRefs(useAppStore());
const { fixedHeader, tagsView } = storeToRefs(useSettingsStore());

useResize();

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === "mobile",
  };
});

const closeSideBar = appStore.closeSideBar;

function handleClickOutside() {
  closeSideBar({ withoutAnimation: false });
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/_variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
