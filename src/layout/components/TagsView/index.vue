<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
      :tagList="tagList"
    >
      <router-link
        v-for="tag in visitedViews"
        :ref="setTagRef"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span :class="isActive(tag) ? 'active' : ''" class="tags-view-item">
          {{ tag.title }}
          <Icon
            v-if="!isAffix(tag)"
            class="close-icon"
            svg="Close"
            @click.prevent.stop="closeSelectedTag(tag)"
          ></Icon>
        </span>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, nextTick, watch, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import ScrollPane from "./ScrollPane.vue";
import { useTagsViewStore, usePermissionStore } from "@/store";
import type {
  AffixTagArr,
  RouterLinkType,
  Tag,
  TagArr,
} from "@/types/typings/layout/components/tagsView";
import { RouteArr } from "@/types/typings/router";
import { View } from "@/types/typings/store/tagsView";
import { Icon } from "@/components";

const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();
const route = useRoute() as View;
const router = useRouter();

// 目前访问过的路由
const visitedViews = computed(() => {
  return tagsViewStore.visitedViews;
});
// 当前可访问的路由
const routes = computed(() => {
  return permissionStore.routes;
});

// 标签列表
const tagList = ref<RouterLinkType[]>([]);
// 滚动区实例
const scrollPaneRef = ref(null);
// 是否展示右键悬浮栏
const visible = ref<boolean>(false);
// 悬浮栏 top 距离
const top = ref<number>(0);
// 悬浮栏 left 距离
const left = ref<number>(0);
// 当前被选中的 tag
const selectedTag = ref<Tag>();
// 路由中所有的标签页
const affixTags = ref<AffixTagArr>([]);

// 监听路由
watch(
  () => route.path,
  () => {
    addTags();
    moveToCurrentTag();
  }
);

// 监听悬浮栏显示状态
watchEffect(() => {
  if (visible.value) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

onMounted(() => {
  initTags();
  addTags();
});

// tag 是否匹配当前路由
function isActive(tagRoute: Tag) {
  return route.path === tagRoute.path;
}
// 当前 tag 是否为不可删除
function isAffix(tag: Tag | undefined) {
  if (tag) {
    return tag.meta && tag.meta.affix;
  }
}
// 获取所有的不可删除的 tag
function filterAffixTags(routes: RouteArr, basePath = "/") {
  let tagArr: AffixTagArr = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = basePath + route.path;
      const tag = Object.assign({}, route, {
        fullPath: tagPath,
        path: tagPath,
        query: {},
      });
      tagArr.push(tag);
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tagArr = [...tagArr, ...tempTags];
      }
    }
  });
  return tagArr;
}
// 初始化 tag
function initTags() {
  affixTags.value = filterAffixTags(routes.value);
  for (const tag of affixTags.value) {
    // 必须有标记名
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
}
// 新增 tag
function addTags() {
  const { name } = route;
  if (name) {
    tagsViewStore.addVisitedView(route);
  }
  return false;
}
// v-for 中的 Ref 数组
function setTagRef(el: RouterLinkType) {
  if (el) {
    tagList.value.push(el);
  }
}
// 激活当前的 tag
function moveToCurrentTag() {
  const tags = tagList.value;
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        const temp = scrollPaneRef.value as Dynamic;
        if (temp) {
          temp.moveToTarget(tag);
          // when query is different then update
          if (tag.to.fullPath !== route.fullPath) {
            tagsViewStore.updateVisitedView(route);
          }
          break;
        }
      }
    }
  });
}
// 刷新当前 tag 对应的路由
function refreshSelectedTag(view: Tag | undefined) {
  if (view) {
    tagsViewStore.delCachedView(view).then(() => {
      const { fullPath } = view;
      nextTick(() => {
        router.replace({
          path: "/redirect" + fullPath,
        });
      });
    });
  }
}
// 关闭当前的 tag
function closeSelectedTag(view: Tag | undefined) {
  if (view) {
    tagsViewStore.delView(view).then(({ visitedViews }) => {
      if (isActive(view)) {
        toLastView(visitedViews, view);
      }
    });
  }
}
// 关闭其他 tag
function closeOthersTags() {
  if (selectedTag.value) {
    router.push(selectedTag.value);
    tagsViewStore.delOthersViews(selectedTag.value).then(() => {
      moveToCurrentTag();
    });
  }
}
// 关闭所有的 tag
function closeAllTags(view: Tag | undefined) {
  if (view) {
    tagsViewStore.delAllViews().then(() => {
      if (affixTags.value.some((tag) => tag.path === view.path)) {
        return;
      }
      toLastView(tagsViewStore.$state.visitedViews, view);
    });
  }
}
// 触发最后一个 tag
function toLastView(visitedViews: TagArr, view: Tag) {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    // 如果没有 tag，默认情况下会重定向到主页，
    if (view.name === "Dashboard") {
      // 重新加载主页
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
}
// 打开悬浮栏
function openMenu(tag: Tag, e: MouseEvent) {
  const el = e.target as HTMLElement;
  const menuMinWidth = 105;
  // 容器左边距
  const offsetLeft = el.getBoundingClientRect().left;
  // 容器宽度
  const offsetWidth = (() => {
    const container = document.querySelector(
      ".tags-view-wrapper .el-scrollbar__wrap"
    ) as HTMLElement;
    return container.offsetWidth;
  })();
  // 左边界
  const maxLeft = offsetWidth - menuMinWidth;
  const leftVal = e.clientX - offsetLeft + 15;
  if (leftVal > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = leftVal;
  }
  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
}
// 关闭悬浮栏
function closeMenu() {
  visible.value = false;
}
// 处理滚动
function handleScroll() {
  closeMenu();
}
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  a:nth-child(1) {
    margin-left: 15px;
  }
  a:nth-last-child(1) {
    margin-right: 15px;
  }
}
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      .close-icon {
        margin-left: 2px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
