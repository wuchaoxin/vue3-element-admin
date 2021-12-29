<template>
  <el-scrollbar ref="scrollRef" class="scroll-container" @scroll="handleScroll">
    <slot></slot>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { RouterLinkType } from "@/types/typings/layout/components/tagsView";
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  tagList: RouterLinkType[];
}>();
const emits = defineEmits(["scroll"]);

// tagAndTagSpacing
const tagAndTagSpacing = 4;
const scrollRef = ref(null);

onMounted(() => {
  const scrollWrapper = getScrollWrapper();
  if (scrollWrapper) {
    scrollWrapper.addEventListener("scroll", emitScroll, true);
  }
});

onBeforeUnmount(() => {
  const scrollWrapper = getScrollWrapper();
  if (scrollWrapper) {
    scrollWrapper.removeEventListener("scroll", emitScroll);
  }
});

function getScrollWrapper() {
  if (scrollRef.value) {
    const temp = scrollRef.value as Dynamic;
    return temp.$refs.wrap$;
  } else {
    return null;
  }
}

function handleScroll(e: Dynamic) {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  const scrollWrapper = getScrollWrapper();
  if (scrollWrapper) {
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4;
  }
}

function emitScroll() {
  emits("scroll");
}

function moveToTarget(currentTag: RouterLinkType) {
  const temp = scrollRef.value as Dynamic;
  const $container = temp.$refs.scrollbar$;
  const $containerWidth = $container.offsetWidth;
  const $scrollWrapper = getScrollWrapper();
  const tagList = props.tagList;

  let firstTag = null;
  let lastTag = null;

  // 查找第一个标记和最后一个标记
  if (tagList.length > 0) {
    firstTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
  } else {
    //查找 preTag 和 nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag);
    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];

    // 标记在 nextTag 之后的 offsetLeft
    const afterNextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

    // 在 prevTag 之前标记的 offsetLeft
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
}

defineExpose({
  moveToTarget,
});
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  display: flex;
}
/* .scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
} */
</style>
