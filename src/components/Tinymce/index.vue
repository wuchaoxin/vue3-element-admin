<!--
 * @description 富文本编辑器（使用社区版，所以通过 cdn 方式引入）
!-->
<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage
        color="#1890ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * @description 详情请见：https://panjiachen.gitee.io/vue-element-admin-site/zh/feature/component/rich-editor.html
 */
import editorImage from "./components/EditorImage.vue";
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";
import {
  ref,
  computed,
  watch,
  onMounted,
  onActivated,
  onDeactivated,
  onUnmounted,
  nextTick,
} from "vue";
import { MessageFn } from "..";
import { FAIL_MESSAGE } from "@/types/const/request";
import formats, { cleanHtml } from "./format";

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";

const props = withDefaults(
  defineProps<{
    // 标识，用于唯一获取实例
    id?: string;
    // 富文本内容
    value?: string;
    // 富文本工具栏
    toolbar?: Array<string>;
    // 富文本顶部条栏
    menubar?: string;
    height?: number | string;
    width?: number | string;
  }>(),
  {
    id: "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""),
    value: "",
    toolbar: () => [],
    menubar: "file edit insert view format table",
    height: 360,
    width: "auto",
  }
);
const emits = defineEmits(["input"]);

// 是否变化
const hasChange = ref(false);
// 是否初始化
const hasInit = ref(false);
const tinymceId = ref(props.id);
const fullscreen = ref(false);
const languageTypeList = {
  en: "en",
  zh: "zh_CN",
  es: "es_MX",
  ja: "ja",
};

// 宽度拼接
const containerWidth = computed(() => {
  const width = props.width.toString();
  if (/^[\d]+(\.[\d]+)?$/.test(width)) {
    return `${width}px`;
  }
  return width;
});

// 只监听一次双向数据流
watch(
  () => props.value,
  (val) => {
    if (!hasChange.value && hasInit.value) {
      nextTick(() => {
        window.tinymce.get(tinymceId.value).setContent(val || "");
      });
    }
  }
);

onMounted(() => {
  init();
});

onActivated(() => {
  if (window.tinymce) {
    initTinymce();
  }
});

onDeactivated(() => {
  destroyTinymce();
});

onUnmounted(() => {
  destroyTinymce();
});

function init() {
  // 使用 cdn 进行动态加载
  load(tinymceCDN, (err: AnyObject) => {
    if (err) {
      const message = (err.message || FAIL_MESSAGE) as string;
      MessageFn({ message, type: "error" });
      return;
    }
    initTinymce();
  });
}

function initTinymce() {
  window.tinymce.init({
    selector: `#${tinymceId.value}`,
    language: languageTypeList["zh"],
    height: props.height,
    body_class: "panel-body",
    object_resizing: false,
    toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
    menubar: props.menubar,
    plugins: plugins,
    // 空元素回车将其拆分
    end_container_on_empty_block: true,
    // 此选项控制如何过滤从Microsoft Word粘贴的内容。
    powerpaste_word_import: "clean",
    code_dialog_height: 450,
    code_dialog_width: 1000,
    advlist_bullet_styles: "square",
    advlist_number_styles: "default",
    // 图像工具允许哪些域（CORS）
    imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
    // 默认 link _target 模式
    default_link_target: "_blank",
    // 此选项允许您禁用链接对话框中的链接标题输入字段。
    link_title: false,
    // 按下 tab 时，强制插入三个空格（need Nonbreaking Space Plugin）
    nonbreaking_force_tab: true,
    // 初始化回调函数
    init_instance_callback: (editor: Dynamic) => {
      editor.setContent(props.value);
      hasInit.value = true;
      editor.on("NodeChange Change KeyUp SetContent", () => {
        hasChange.value = true;
        emits("input", editor.getContent());
      });
    },
    // 初始化前执行
    setup(editor: Dynamic) {
      editor.on("FullscreenStateChanged", (e: Dynamic) => {
        fullscreen.value = e.state;
      });
    },
    // 允许链接和图像url使用js
    convert_urls: false,
    formats: formats,
    content_css: "/mycontent.css",
    image_dimensions: false,
    media_dimensions: false,
    // font-size 选项
    fontsize_formats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
    // font-family
    // font_formats: "",
  });
}

function destroyTinymce() {
  const tinymce = window.tinymce.get(tinymceId.value);
  if (fullscreen.value) {
    tinymce.execCommand("mceFullScreen");
  }

  if (tinymce) {
    tinymce.destroy();
  }
}

function setContent(value: string) {
  window.tinymce.get(tinymceId.value).setContent(value);
}

function getContent() {
  return window.tinymce.get(tinymceId.value).getContent();
}

function imageSuccessCBK(arr: Dynamic) {
  arr.forEach((v: Dynamic) =>
    window.tinymce
      .get(tinymceId.value)
      .insertContent(`<img class="wscnph" src="${v.url}" >`)
  );
}

function getCleanContent() {
  const result = cleanHtml(getContent());
  return result.styleSheet + result.html;
}

function addContentStyle(html: string, classStyle: string) {
  const result = html.replace(
    /(.{1,})(<\/style>)(.{1,})/,
    (match, match1, match2, match3) => {
      return match1 + classStyle + match2 + match3;
    }
  );
  return result;
}

defineExpose({
  textEditorExpose: {
    setContent,
    getContent,
    getCleanContent,
    addContentStyle,
  },
});
</script>
<style scoped lang="scss">
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  :deep(.mce-fullscreen) {
    z-index: 10000;
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
