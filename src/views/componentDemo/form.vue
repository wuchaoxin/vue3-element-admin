<!--
 * @description
!-->
<template>
  <div>
    <Text>表单以高度集成进行渲染，以配置形式来进行书写</Text>
    <Form v-model="formModel" :config="formConfig" ref="formRef"></Form>
    <Text>点击按钮触发校验</Text>
    <Button @click="validate">触发校验</Button>
  </div>
</template>
<script setup lang="ts">
import { Form, Text, Button } from "@/components";
import { ref } from "vue";
import { FormConfig } from "@/types/typings/components/CustomEL/Form";
import { useGetComponentExpose } from "@/hooks/component";

const formRef = ref(null);
const formModel = ref({
  test4: "只读",
});
const formConfig: FormConfig = [
  [
    {
      prop: "test1",
      component: "input",
      componentAttrs: {
        onInput: () => {
          console.log(formModel.value);
        },
      },
    },
    {
      prop: "test2",
      component: "select",
      componentAttrs: {
        list: [{ label: "测试", value: "test" }],
        onChange: () => {
          console.log(formModel.value);
        },
      },
    },
  ],
  [
    {
      prop: "test3",
      component: "input",
      label: "我是一个 label",
      rules: [{ required: true, message: "哈哈哈", trigger: "blur" }],
      componentAttrs: {
        onInput: () => {
          console.log(formModel.value);
        },
      },
    },
    {
      prop: "test4",
      component: "input",
      label: "我是一个 label",
      readOnly: true,
    },
  ],
];

function validate() {
  const instance = useGetComponentExpose(formRef, "form");
  instance.validate((a, b) => {
    console.log(a);
    console.log(b);
  });
}
</script>
<style scoped lang="scss"></style>
