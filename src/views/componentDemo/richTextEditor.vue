<!--
 * @description
!-->
<template>
  <div>
    <Text>你可以在下方进行富文本相关操作</Text>
    <Editor ref="editorRef" v-model="content"></Editor>
    <Text>点击按钮你将可以进行二次操作</Text>
    <Button type="primary" @click="submit">提交</Button>
    <Dialog
      title="发布你的文章"
      v-model="dialogShow"
      @button-click="dialogClick"
      :buttons="buttons"
      size="small"
    >
      <Form v-model="formValue" :config="formConfig" :gutter="0"></Form>
    </Dialog>
    <Dialog
      v-model="previewDialogShow"
      :size="tabsValue"
      buttons-preset="onlyCancel"
    >
      <Tabs v-model="tabsValue" :config="tabsConfig"></Tabs>
      <Iframe :content="previewHTML" :autoHeight="true"></Iframe>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import Editor from "@/components/Tinymce/index.vue";
import { Button, Text, Dialog, Form, Tabs } from "@/components";
import { ref, reactive } from "vue";
import { useGetComponentExpose } from "@/hooks/component";
import { FormConfig } from "@/types/typings/components/CustomEL/Form";
import {
  ButtonProp,
  Buttons,
} from "@/types/typings/components/CustomEL/Button";
import { TabsConfig } from "@/types/typings/components/CustomEL/Tabs";
import { Size } from "@/types/typings/components/CustomEL/Dialog";
import { classOptions } from "@/components/Tinymce/format";
import Iframe from "@/components/Iframe/index.vue";

// 富文本内容
const content = ref("");
const editorRef = ref(null);
// 是否展示提交 dialog
const dialogShow = ref(false);
// 是否展示预览 dialog
const previewDialogShow = ref(false);
const tabsValue = ref<Size | undefined>();
const formValue = reactive({
  mode: "0",
  classOpions: {
    imgHandle: true,
    deleteGap: false,
  },
});
// 展示的 html
const previewHTML = ref("");
// 是否禁用注入 css checkbox
const isDisableClassOpions = ref(false);

const formConfig: FormConfig = reactive([
  [
    {
      label: "请选择发布模式",
      prop: "mode",
      component: "select",
      tips: "清洗模式采取样式表注入形式；而初始模式则是采用内联样式",
      componentAttrs: {
        list: [
          {
            label: "清洗模式",
            value: "0",
          },
          {
            label: "初始模式",
            value: "1",
          },
        ],
        onChange: selectMode,
      },
    },
  ],
  [
    {
      label: "请选择二次清洗样式",
      prop: "classOpions",
      component: "checkboxGroup",
      tips: "你可以在这里按需清洗样式",
      componentAttrs: {
        list: getClassOptionsCheckboxGroupList(),
      },
    },
  ],
]);

const buttons: Buttons = [
  {
    prop: "submit",
    label: "发布",
    type: "primary",
  },
  {
    prop: "view",
    label: "预览",
    type: "info",
  },
  {
    prop: "cancel",
    label: "关闭",
  },
];

const tabsConfig: TabsConfig = {
  tabPanes: [
    {
      label: "small",
      name: "small",
    },
    {
      label: "normal",
      name: "normal",
    },
    {
      label: "large",
      name: "large",
    },
    {
      label: "huge",
      name: "huge",
    },
  ],
};

function submit() {
  const editorExpose = useGetComponentExpose(editorRef, "textEditor");
  dialogShow.value = true;
  console.log(editorExpose);
}

function dialogClick(prop: ButtonProp, close: () => void, again: () => void) {
  if (prop === "submit") {
    close();
  } else if (prop === "view") {
    again();
    previewDialogShow.value = true;
    const editorExpose = useGetComponentExpose(editorRef, "textEditor");
    if (formValue.mode === "0") {
      previewHTML.value = editorExpose.getCleanContent();
      if (formValue.classOpions.imgHandle) {
        previewHTML.value = editorExpose.addContentStyle(
          previewHTML.value,
          classOptions.imgHandle.css
        );
      }
      if (formValue.classOpions.deleteGap) {
        previewHTML.value = editorExpose.addContentStyle(
          previewHTML.value,
          classOptions.deleteGap.css
        );
      }
    } else {
      previewHTML.value = editorExpose.getContent();
    }
  }
}
// 获取二次清洗选项
function getClassOptionsCheckboxGroupList() {
  const result = [];
  for (const [key, val] of Object.entries(classOptions)) {
    const temp: Dynamic = {};
    temp.prop = key;
    temp.label = val.describe;
    temp.disabled = isDisableClassOpions.value;
    result.push(temp);
  }
  return result;
}
// 监听下拉框
function selectMode() {
  if (formValue.mode === "1") {
    formValue.classOpions.imgHandle = false;
    formValue.classOpions.deleteGap = false;
    isDisableClassOpions.value = true;
  } else {
    formValue.classOpions.imgHandle = true;
    formValue.classOpions.deleteGap = false;
    isDisableClassOpions.value = false;
  }
  formConfig[1][0].componentAttrs = {
    list: getClassOptionsCheckboxGroupList(),
  };
}
</script>
<style scoped lang="scss"></style>
