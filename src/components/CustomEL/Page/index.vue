<!--
 * @description
!-->
<template>
  <div>
    <div class="search-area" ref="search-area">
      <FlexBox>
        <Form v-model="formModel" :config="formConfig"></Form>
      </FlexBox>
    </div>
    <div class="buttons-area" ref="buttons-area">
      <slot></slot>
    </div>
    <div class="table-area" ref="table-area">
      <Table ref="tableRef" :config="tableConfig"></Table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FlexBox, Form, Table } from "@/components";
import { ref, getCurrentInstance, onMounted } from "vue";
import { FormConfig } from "@/types/typings/components/CustomEL/Form";
import { TableConfig } from "@/types/typings/components/CustomEL/Table";
import { useGetComponentExpose } from "@/hooks/component";

const props = withDefaults(
  defineProps<{
    formConfig: FormConfig;
    tableConfig: TableConfig;
    autoHeight?: boolean;
  }>(),
  {
    autoHeight: true,
  }
);

const formModel = ref({});
const instance = getCurrentInstance();
const tableRef = ref(null);

onMounted(() => {
  if (props.autoHeight) {
    setTableHeight();
  }
});

function setTableHeight() {
  const pageRef = instance?.refs as Dynamic;
  if (pageRef) {
    // 屏幕可见总高度（包括边框）
    const documentHeight = document.body.offsetHeight;
    // 搜索区高度
    const searchAreaHeight = pageRef["search-area"].clientHeight as number;
    // 按钮区高度
    const buttonsAreaHeight = pageRef["buttons-area"].clientHeight as number;
    const buttonsAreaMargin = 20;
    // 分页器高度
    const pageHeight = 32;
    // 面包屑高度
    const breadDomHeight = 50;
    // 主区域 padding
    const mainPadding = 32;
    const height =
      documentHeight -
      searchAreaHeight -
      buttonsAreaHeight -
      buttonsAreaMargin -
      pageHeight -
      breadDomHeight -
      mainPadding -
      50;
    const tableExpose = useGetComponentExpose(tableRef, "table");
    tableExpose.setTableHeight(height);
  }
}
</script>
<style scoped lang="scss">
.buttons-area {
  margin: 10px 0;
}
</style>
