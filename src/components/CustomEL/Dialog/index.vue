<!--
 * @description dialog 组件，新增自动计算高度以及对按钮做了封装
!-->
<template>
  <el-dialog v-model="dialogValue" v-bind="myAttrs">
    <el-scrollbar ref="scrollbarsRef">
      <slot></slot>
    </el-scrollbar>
    <template #footer>
      <Space>
        <Button
          v-for="item in buttonList"
          :key="item.prop"
          :ref="setPropRef"
          @click="chooseBtn(item)"
          v-bind="item"
          >{{ item.label }}</Button
        >
      </Space>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed, useAttrs, ref, onUpdated, nextTick } from "vue";
import { Space, Button } from "@/components";
import { Size } from "@/types/typings/components/CustomEL/Dialog";
import {
  Buttons,
  Button as ButtonItem,
  ButtonsPreset,
} from "@/types/typings/components/CustomEL/Button";
import { SIZE_MAP } from "@/types/const/components/Dialog";
import { ButtonExpose } from "@/types/typings/components/CustomEL/Button";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title?: string;
    // 底部按钮相关
    buttons?: Buttons;
    // 底部按钮预设
    buttonsPreset?: ButtonsPreset;
    // 宽度有关
    size?: Size;
    // 是否开启高度自适应
    autoHeight?: boolean;
  }>(),
  {
    modelValue: false,
    title: "提示",
    buttonsPreset: "normal",
    size: "normal",
    autoHeight: true,
  }
);
const emits = defineEmits(["update:modelValue", "buttonClick"]);

const buttonRefList: Array<ButtonExpose> = [];
const scrollbarsRef = ref(null);
const dialogTop = ref("15vh");
const isCalculate = ref(true);

const buttonList = computed<Buttons>(() => {
  if (props.buttons) {
    return props.buttons;
  } else {
    if (props.buttonsPreset === "normal") {
      return [
        { prop: "submit", label: "提交", type: "primary" },
        { prop: "cancel", label: "关闭", type: "default" },
      ];
    } else if (props.buttonsPreset === "onlyCancel") {
      return [{ prop: "cancel", label: "关闭", type: "default" }];
    } else {
      return [];
    }
  }
});
const myAttrs = computed(() => {
  const defaultAttrs = {
    title: props.title,
    "close-on-click-modal": false,
    width: SIZE_MAP[props.size],
  };
  const attrs = useAttrs() as Dynamic;
  const coverAttrs = {
    top: dialogTop.value,
    onClosed: () => {
      attrs?.onClosed?.();
      isCalculate.value = true;
    },
  };
  return Object.assign({}, defaultAttrs, attrs, coverAttrs);
});

const dialogValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

onUpdated(() => {
  limitChangeHeight();
});

function setPropRef(obj: Dynamic) {
  const buttonExpose = obj.buttonExpose as ButtonExpose;
  buttonRefList.push(buttonExpose);
}
function chooseBtn(currentItem: ButtonItem) {
  if (currentItem.event) {
    currentItem.event();
  }
  if (currentItem.prop === "cancel") {
    closeDailog();
  } else {
    let closeLoading = () => {};
    for (const item of buttonRefList) {
      if (item.prop && item.prop === currentItem.prop) {
        item.openLoading();
        closeLoading = item.closeLoading;
      }
    }
    emits(
      "buttonClick",
      currentItem.prop,
      () => {
        // close
        closeLoading();
        closeDailog();
      },
      () => {
        // again
        closeLoading();
      }
    );
  }
}
function closeDailog() {
  dialogValue.value = false;
  isCalculate.value = true;
}
function limitChangeHeight() {
  const scrollbars = scrollbarsRef.value as Dynamic;
  if (scrollbars && isCalculate.value && props.autoHeight) {
    isCalculate.value = false;
    changeHeight();
  }
}
function changeHeight() {
  nextTick(() => {
    const scrollbars = scrollbarsRef.value as Dynamic;
    scrollbars.$refs.wrap$.style.height = "100%";
    // 获取整个页面的高度
    const contextHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    // 获取当前模态框的高度
    const modelEl = scrollbars.$refs.wrap$.parentNode.parentNode.parentNode;
    const modalHeight = modelEl.clientHeight;
    if (modalHeight < contextHeight * 0.56) {
      dialogTop.value = contextHeight * 0.22 + "px";
    } else if (modalHeight < contextHeight * 0.9) {
      // 设置模态框垂直居中
      dialogTop.value = (contextHeight - modalHeight) / 2 + "px";
    } else {
      // 设置模态框距离顶部距离为页面高度的5%
      dialogTop.value = contextHeight * 0.05 + "px";
      // 设置模态框内容物的高度
      scrollbars.wrap$.style.height = contextHeight * 0.9 - 110 + "px";
    }
  });
}
</script>
<style scoped lang="scss"></style>
