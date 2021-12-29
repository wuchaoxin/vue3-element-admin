<!--
 * @description: 伸缩框
-->
<template>
  <div class="search-out">
    <div class="fold-bar" @click="toFold">
      <Icon svg="ArrowDown" :style="foldIcon" class="fold-icon"></Icon>
      <span class="fold-text">{{ hint }}</span>
    </div>
    <div class="search">
      <div class="search-tools">
        <div class="tools-term">
          <span>
            <slot name="header">{{ title }}</slot>
          </span>
        </div>
      </div>
      <div class="search-content" :style="folding">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@/components";

const fold = ref(false);
const hint = ref<"展开" | "收起">("收起");

withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "标题",
  }
);

const folding = computed(() => {
  if (fold.value) {
    return {
      "max-height": "35px",
    };
  }
  return { "max-height": "500px" };
});

const foldIcon = computed(() => {
  if (!fold.value) return { transform: "rotate(180deg)" };
  return { transform: "" };
});

function toFold() {
  fold.value = !fold.value;
  hint.value = hint.value === "展开" ? "收起" : "展开";
}
</script>

<style lang="scss" scoped>
.search-out {
  position: relative;
  .fold-bar {
    width: 55px;
    height: 12px;
    position: absolute;
    bottom: -6px;
    left: 50%;
    margin-left: -20px;
    cursor: pointer;
    z-index: 101;
    .fold-icon {
      position: absolute;
      left: 3px;
      z-index: 101;
      transition: all 0.6s;
      font-size: 14px;
      font-weight: bolder;
    }
    .fold-text {
      font-weight: 500;
      color: #606266;
      position: absolute;
      right: 3px;
      top: -2px;
      z-index: 101;
      font-size: 14px;
    }
    &::before {
      z-index: 100;
      content: "";
      background-color: #fff;
      position: absolute;
      top: 5px;
      width: 100%;
      height: 1px;
    }
  }
  .search {
    width: 100%;
    border: 1px solid #d1dbe5;
    border-radius: 5px;
    overflow: hidden;
    .search-tools {
      height: 28px;
      line-height: 28px;
      background-color: #f8f8f9;
      .tools-term {
        padding: 0 0 0 5px;
        span {
          color: #909399;
          font-weight: bold;
        }
      }
      .tools-buttons {
        width: 85px;
        .primary {
          padding: 4px 7px;
        }
      }
    }
    .search-content {
      overflow: hidden;
      position: relative;
      transition: all 0.4s ease;
      padding: 5px 10px;
    }
  }
}
</style>
