<!--
 * @description 基础 table 组件
!-->
<template>
  <div>
    <el-table
      ref="tableRef"
      v-bind="tableAttrs"
      :data="tableData"
      v-loading="loading"
    >
      <template v-for="(col, index) in columnConfigList" :key="index">
        <!-- 单选列 -->
        <ColumnRadio
          :width="50"
          v-bind="col"
          v-if="col.type === 'radio'"
          :selectionList="selectionList"
        ></ColumnRadio>
        <!-- 多选列 -->
        <el-table-column
          :width="50"
          v-bind="col"
          v-else-if="col.type === 'selection'"
        ></el-table-column>
        <!-- 序号列 -->
        <el-table-column
          :width="50"
          v-bind="col"
          v-else-if="col.type === `index`"
          :index="indexMethod"
        ></el-table-column>
        <!-- 常规列 -->
        <TableColumn v-bind="col" v-else :col="col"></TableColumn>
      </template>
    </el-table>
    <div v-if="config.paginationShow !== false">
      <el-pagination v-bind="paginationAttrs"></el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getTableData } from "@/apis/table";
import {
  useGetComponentExpose,
  useMixinComponentExpose,
} from "@/hooks/component";
import {
  SelectMode,
  TableColumConfig,
  TableConfig,
} from "@/types/typings/components/CustomEL/Table";
import { AxiosCustomRequestConfig } from "@/types/typings/request";
import { computed, ref, reactive, nextTick } from "vue";
import TableColumn from "./components/TableColumn.vue";
import ColumnRadio from "./components/ColumnRadio.vue";
import { NO_DATA } from "@/types/const/common";

const props = defineProps<{
  config: TableConfig;
}>();
const emits = defineEmits(["getData", "selected"]);

// table 标识，用于是否重新渲染
const tableKey = ref(0);
// table 高度，流体高度或者计算高度使用
const tableHeight = ref(460);
// 表格数据
const tableData = ref<unknown>([]);
// 是否开启遮罩
const loading = ref(false);
// 分页配置
const paginationConfig = reactive({
  pageNum: 1,
  pageSize: 10,
  pageSizeOpts: [10, 20, 30, 50, 100],
  total: 0,
});
// 选中的数据
const selectionList = ref<Array<unknown>>([]);
// 选中的个数（之前选中的个数）
const preSelectionLength = ref(0);
// 当前的 type（只记录第一行的操作模式《多选还是单选》）
let selectMode: SelectMode = null;
const tableRef = ref(null);

const tableAttrs = computed(() => {
  const defaultAttrs = {
    border: true,
    height: tableHeight.value,
    key: tableKey.value,
    style: "width: 100%",
    "row-style": rowStyle,
    "empty-text": NO_DATA,
    "onSelection-change": selectionChange,
    "onRow-click": handleSelected,
    onSelect: handleSelected,
  } as AnyObject;
  const maxHeight = props.config?.tableAttrs?.["max-height"];
  if (maxHeight) {
    delete defaultAttrs.height;
    if (typeof maxHeight === "string" || typeof maxHeight === "number") {
      defaultAttrs["max-height"] = maxHeight;
    } else {
      defaultAttrs["max-height"] = tableHeight.value;
    }
  }
  return Object.assign({}, defaultAttrs, props.config.tableAttrs);
});
const paginationAttrs = computed(() => {
  const defaultAttrs = {
    background: true,
    "current-page": paginationConfig.pageNum,
    "page-size": paginationConfig.pageSize,
    "page-sizes": paginationConfig.pageSizeOpts,
    total: paginationConfig.total,
    "onUpdate:current-page": handleCurrentChange,
    "onUpdate:page-size": handleSizeChange,
  };
  return Object.assign(defaultAttrs, props.config.paginationAttrs);
});
const columnConfigList = computed(() => {
  const list: Array<TableColumConfig> = [];
  const config = props.config;
  // 格式化列表
  config.columns.forEach((col) => {
    // 表格默认居中(后续增加默认配置)
    const columnConfig = {
      "header-align": "center",
      // 可拖动
      resizable: true,
      align: "center",
    };
    list.push(Object.assign(columnConfig, col));
  });
  return list;
});

initTable();

// 初始化 table
function initTable() {
  searchData(true, true);
  judgeSelectMode();
}

// 判断选择模式
function judgeSelectMode() {
  const firstColumn = props.config.columns[0];
  if (firstColumn.type === "radio") {
    selectMode = "radio";
  } else if (firstColumn.type === "selection") {
    selectMode = "selection";
  }
}

function selectionChange(val: Array<unknown>) {
  selectionList.value = val;
}

// 选中当前列
function handleSelected(row: AnyObject) {
  const tableExpose = useGetComponentExpose(tableRef, "table");
  if (selectMode === "selection" || selectMode === "radio") {
    // 记录选中还是取消
    let isSelect = false;
    if (selectMode === "selection") {
      isSelect = (() => {
        if (preSelectionLength.value < selectionList.value.length) {
          return true;
        } else {
          return false;
        }
      })();
      tableExpose.toggleRowSelection(row);
    } else {
      isSelect = (() => {
        if (selectionList.value.length === 0) {
          return true;
        } else {
          if (selectionList.value[0] === row) {
            return false;
          } else {
            return true;
          }
        }
      })();
      if (isSelect) {
        tableExpose.clearSelection();
        tableExpose.toggleRowSelection(row);
      } else {
        tableExpose.toggleRowSelection(row, false);
      }
    }
    emits("selected", row, isSelect);
    preSelectionLength.value = selectionList.value.length;
  } else {
    preSelectionLength.value = 0;
    tableExpose.clearSelection();
  }
}

// 翻页操作
function handleCurrentChange(val: number) {
  paginationConfig.pageNum = val;
  searchData();
}

// 切换分页器
function handleSizeChange(val: number) {
  paginationConfig.pageSize = val;
  searchData(true, true);
}

// 设置行的样式
function rowStyle() {
  const config = props.config as Dynamic;
  const firstColType = config.columns[0].type;
  if (firstColType === "selection" || firstColType === "radio") {
    return { cursor: "pointer" };
  } else {
    return "";
  }
}

// 显示序号
function indexMethod(index: number) {
  const curpage = paginationConfig.pageNum;
  const limitpage = paginationConfig.pageSize;
  return index + 1 + (curpage - 1) * limitpage;
}

function searchData(goBack = false, reset = false) {
  if (goBack) {
    paginationConfig.pageNum = 1;
    if (reset) {
      resetTable();
    }
  }
  backTop();
  const config = props.config;
  if (config.data) {
    const data = config.data || [];
    paginationConfig.total = config.data.length;
    const currentNumber =
      (paginationConfig.pageNum - 1) * paginationConfig.pageSize;
    const currentData = data.slice(
      currentNumber,
      currentNumber + paginationConfig.pageSize
    );
    tableData.value = currentData;
    emits("getData", currentData);
  } else {
    request();
  }
}

// 回到顶部
function backTop() {
  if (tableRef.value) {
    const temp = tableRef?.value as Dynamic;
    const el = temp.$el;
    const bodyWrapper = el.querySelector(".el-table__body-wrapper");
    bodyWrapper.scrollTop = 0;
  }
}

// 进行请求
function request() {
  const config = props.config;
  if (config.requestBaseURL && config.requestURL) {
    const requestConfig: AxiosCustomRequestConfig = {
      baseURL: config.requestBaseURL,
      url: config.requestURL,
      method: config.requestMethod || "get",
      params: config.requestParams,
      data: config.requestData,
    };
    loading.value = true;
    getTableData(requestConfig)
      .then((res) => {
        emits("getData", res.data);
        paginationConfig.total = res.data.total;
        tableData.value = res.data.records;
      })
      .catch(() => {
        emits("getData", null);
      })
      .finally(() => {
        loading.value = false;
      });
  }
}

function resetTable() {}

function setTableHeight(height: string | number) {
  nextTick(() => {
    tableKey.value++;
    if (typeof height === "number") {
      tableHeight.value = height;
    } else {
      tableHeight.value = Number.parseFloat(height);
    }
  });
}

useMixinComponentExpose(tableRef, { selectionList, setTableHeight });
defineExpose({
  tableExpose: tableRef,
});
</script>
<style scoped lang="scss"></style>
