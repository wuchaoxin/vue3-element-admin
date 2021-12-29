<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template v-slot:title>
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { isExternal } from "@/utils/validate";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
import { useFixIOSHanlde } from "./FixiOSBug";
import { ref } from "vue";
import { CustomRoute } from "@/types/typings/router";

const props = withDefaults(
  defineProps<{
    item: CustomRoute;
    isNest?: boolean;
    basePath?: string;
  }>(),
  {
    isNest: false,
    basePath: "",
  }
);

const onlyOneChild = ref<Dynamic>({});

useFixIOSHanlde();

// 是否只有一个子项进行显示
function hasOneShowingChild(
  children: Array<CustomRoute> = [],
  parent: CustomRoute
) {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // 临时设置（如果只有一个子项，将使用）
      onlyOneChild.value = item;
      return true;
    }
  });
  // 当只有一个子路由器时，默认情况下显示子路由器
  if (showingChildren.length === 1) {
    return true;
  }
  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}

function resolvePath(routePath: string) {
  const basePath = props.basePath;
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(basePath)) {
    return basePath;
  }
  if (routePath[0] === "/") {
    return routePath;
  } else {
    if (basePath === "/") {
      return basePath + routePath;
    } else {
      return basePath + "/" + routePath;
    }
  }
}
</script>
