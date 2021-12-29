<!--
 * @description
!-->
<template>
  <div class="upload-container">
    <Button
      class="upload-button"
      :icon="UploadFilled"
      type="primary"
      @click="dialogShow = true"
      >upload</Button
    >
    <Dialog v-model="dialogShow" @button-click="handleSubmit">
      <Upload
        :config="uploadConfig"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      ></Upload>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { Button, Dialog, MessageFn, Upload } from "@/components";
import { ref } from "vue";
import {
  UploadConfig,
  UploadFile,
} from "@/types/typings/components/CustomEL/Upload";
import { ButtonProp } from "@/types/typings/components/CustomEL/Button";
import { UploadFilled } from "@element-plus/icons";

const emits = defineEmits(["successCBK"]);

const dialogShow = ref(false);
interface Listobj {
  [key: string]: { hasSuccess: boolean; uid: number; url?: string };
}
const listObj = ref<Listobj>({});

const uploadConfig: UploadConfig = {
  fileSize: "1",
  fileType: ["jpg", "jpge", "png"],
  baseURL: "",
  URL: "",
};

function checkAllSuccess() {
  return Object.keys(listObj.value).every(
    (item) => listObj.value[item].hasSuccess
  );
}

function handleSubmit(prop: ButtonProp, close: () => void, again: () => void) {
  if (prop === "submit") {
    const arr = Object.keys(listObj.value).map((v) => listObj.value[v]);
    if (!checkAllSuccess()) {
      MessageFn.warning(
        "请等待所有图像成功上载。如果出现网络问题，请刷新页面并重新上传"
      );
      again();
    } else {
      emits("successCBK", arr);
      listObj.value = {};
      close();
    }
  }
}

function handleSuccess(response: Dynamic, file: UploadFile) {
  const uid = file.uid;
  const objKeyArr = Object.keys(listObj.value);
  for (let i = 0, len = objKeyArr.length; i < len; i++) {
    const compareObj = (() => {
      return listObj.value[objKeyArr[i]];
    })();
    if (compareObj.uid === uid) {
      compareObj.url = response.files.file;
      compareObj.hasSuccess = true;
      return;
    }
  }
}

function handleRemove(file: UploadFile) {
  const uid = file.uid;
  const objKeyArr = Object.keys(listObj.value);
  for (let i = 0, len = objKeyArr.length; i < len; i++) {
    const compareUid = (() => {
      return listObj.value[objKeyArr[i]].uid;
    })();
    if (compareUid === uid) {
      delete listObj.value[objKeyArr[i]];
      return;
    }
  }
}

function beforeUpload(file: UploadFile) {
  const fileName = file.uid.toString();
  listObj.value[fileName] = { hasSuccess: false, uid: -1 };
  return new Promise((resolve) => {
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = function () {
      listObj.value[fileName] = {
        hasSuccess: false,
        uid: file.uid,
      };
    };
    resolve(true);
  });
}
</script>
<style scoped lang="scss">
.upload-button {
  padding: 7px 15px;
  height: 28px;
  min-height: 28px;
}
</style>
