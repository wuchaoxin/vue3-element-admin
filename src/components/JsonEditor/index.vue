<template>
  <div class="json-editor">
    <textarea ref="textareaRef" />
  </div>
</template>

<script setup lang="ts">
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
// 代码高亮
import "codemirror/mode/javascript/javascript";
// 代码错误检查
import "script-loader!jsonlint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";
// 主题样式
// import "codemirror/theme/rubyblue.css";
// import "codemirror/theme/dracula.css";
// import "codemirror/theme/base16-light.css";
import "codemirror/theme/idea.css";
// 括号显示匹配
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
// 括号、引号编辑和删除时成对出现
import "codemirror/addon/edit/closebrackets";
// 折叠代码要用到的
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/brace-fold";

import { ref, onMounted, watchEffect } from "vue";
import { JsonEditor } from "@/types/typings/components/JsonEditor";

const props = withDefaults(
  defineProps<{
    value?: string | AnyObject | Array<unknown>;
    readonly?: boolean;
  }>(),
  {
    value: "",
    readonly: false,
  }
);
const emits = defineEmits(["change"]);

const textareaRef = ref();

let jsonEditor: null | JsonEditor;

onMounted(() => {
  initJsonEditor();
});

// 监听 readonly
watchEffect(() => {
  if (jsonEditor) {
    const readonly = props.readonly;
    jsonEditor.options.readonly = readonly;
  }
});

// 初始化
function initJsonEditor() {
  const temp = CodeMirror.fromTextArea(textareaRef.value, {
    mode: "application/json",
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers",
    ],
    theme: "idea",
    lint: true,
    indentUnit: 4, // 缩进多少个空格
    tabSize: 4, // 制表符宽度
    smartIndent: true, // 是否智能缩进
    styleActiveLine: true, // 当前行高亮
    lineNumbers: true, // 显示行号
    lineWrapping: true, // 自动换行
    matchBrackets: true, // 括号匹配显示
    autoCloseBrackets: true, // 输入和退格时成对
    readOnly: props.readonly, // 是否只读
    foldGutter: true,
  });
  const jsonCode = props.value;
  jsonEditor = temp as JsonEditor;
  setJsonEditorValue(jsonCode);
  jsonEditor.on("change", (cm) => {
    emits("change", cm.getValue());
  });
  jsonEditor.on("blur", (cm) => {
    setJsonEditorValue(cm.getValue());
  });
}

function setJsonEditorValue(jsonCode: string | AnyObject | Array<unknown>) {
  try {
    if (jsonEditor) {
      if (typeof jsonCode === "string") {
        jsonCode = JSON.parse(jsonCode);
        jsonEditor.setValue(JSON.stringify(jsonCode, null, 2));
      } else {
        jsonEditor.setValue(JSON.stringify(jsonCode, null, 2));
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function getContent() {
  if (jsonEditor) {
    return jsonEditor.getValue();
  } else {
    return "";
  }
}

defineExpose({
  jsonEditorExpose: {
    setContent: setJsonEditorValue,
    getContent,
  },
});
</script>

<style lang="scss" scoped>
.json-editor {
  height: 100%;
  position: relative;

  :deep(.CodeMirror) {
    height: auto;
    min-height: 300px;
  }

  :deep(.CodeMirror-scroll) {
    min-height: 300px;
  }

  :deep(.cm-s-rubyblue span.cm-string) {
    color: #f08047;
  }
}
</style>
