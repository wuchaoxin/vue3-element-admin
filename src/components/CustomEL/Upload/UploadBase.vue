<!--
 * @description
!-->
<template>
  <el-upload v-bind="myAttrs">
    <slot></slot>
  </el-upload>
</template>
<script setup lang="ts">
import { uploadFile } from "@/apis/upload";
import { MessageFn } from "@/components";
import {
  UploadConfig,
  FileList,
  UploadFile,
} from "@/types/typings/components/CustomEL/Upload";
import { useAttrs, computed } from "vue";

const props = withDefaults(
  defineProps<{
    config: UploadConfig;
    // TODO 针对此选项进行操作(同时需要检测一下 on系列的 props 是否生效)
    ["file-list"]?: FileList;
    ["before-upload"]?: (file: UploadFile) => void;
  }>(),
  {}
);

const myAttrs = computed(() => {
  const attrs = useAttrs();
  const defaultAttrs = {
    "http-request": uploadRequest,
    "before-upload": (file: UploadFile) => {
      checkFile(file);
      props["before-upload"]?.(file);
    },
  };
  return Object.assign({}, defaultAttrs, attrs);
});

// 自定义请求方式
function uploadRequest(param: AnyObject<string>) {
  const fileObject = param.file;
  const formData = new FormData();
  formData.append("file", fileObject);
  uploadFile({
    baseURL: "",
    url: "",
    data: formData,
  })
    .then(() => {
      // TODO
    })
    .catch(() => {
      // TODO
    });
}

// 检查文件
function checkFile(file: UploadFile) {
  const limitFileType = props.config.fileType;
  const limitFileSize = props.config.fileSize;
  const currentFileType = (() => {
    const fileName = file.name as string;
    let fileType = fileName.split(".");
    return fileType[fileType.length - 1];
  })();
  const currentFileSize = (() => {
    return Number(file.size) / 1024 / 1024;
  })();
  // 检查文件后缀名
  if (typeof limitFileType === "string") {
    if (limitFileType !== currentFileType) {
      MessageFn({
        message: `上传文件只能是${limitFileType}格式`,
        type: "warning",
      });
      return;
    }
  } else {
    if (!limitFileType.includes(currentFileType)) {
      MessageFn({
        message: `上传文件只能是包含以下格式${limitFileType.join("、")}格式！`,
        type: "warning",
      });
      return;
    }
  }
  // 检查文件大小
  if (limitFileSize < currentFileSize) {
    MessageFn({
      message: `上传文件大小不能超过${limitFileSize}MB`,
      type: "warning",
    });
    return;
  }
}
</script>
<style scoped lang="scss"></style>
