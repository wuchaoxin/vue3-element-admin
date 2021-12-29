import { PaginationProps } from "element-plus";
import { Ref } from "vue";
import { Button, ButtonProp } from "./Button";

export interface TableAttrs {
  [key: string]: unknown;
  ["max-height"]: string | number | boolean;
}

export type PaginationAttrs = PaginationProps;

// 如果自定义属性和 Attrs 冲突，那么自定义属性优先级会高于 Attrs 中的属性
export interface TableConfig {
  // 自动计算高度（注意该属性只在 Page 组件中可以使用，因为是利用 Ref 去寻找其它部分）
  autoHeight?: boolean;
  // table 相关的属性
  tableAttrs?: TableAttrs;
  // 分页相关的属性
  paginationAttrs?: PaginationAttrs;
  paginationShow?: boolean;
  requestBaseURL?: string;
  requestURL?: string;
  requestMethod?: "get" | "post";
  // 请求 url 参数
  requestParams?: AnyObject;
  // 请求下 body 参数
  requestData?: AnyObject;
  // 自定义数据（该选项会阻断请求）
  data?: Array<unknown>;
  // 列配置
  columns: Array<TableColumConfig>;
}

export type TableColumConfig = TableColumSelectConfig & TableColumBaseConfig;
export interface TableColumSelectConfig {
  // 表头标题
  label?: string;
  // 类型（index：序号；radio：单选；selection：多选）
  type?: "index" | SelectMode;
}

export type TableButton = Button & {
  event?: (prop: ButtonProp, row: AnyObject, column: AnyObject) => void;
};

export interface TableColumBaseConfig {
  label?: string;
  prop?: string;
  // 组件类型（默认为：default；operation 为按钮组）
  component?: "default" | "operation";
  // TODO 是否排序（暂未封装）
  sortable?: "custom";
  // 是否需要格式化文本
  formatFn?: (text: string) => string;
  // 按钮组配置
  buttons?: Array<TableButton>;
}

export type SelectMode = "radio" | "selection" | null;

export interface TableExpose {
  clearSelection: () => void;
  toggleRowSelection: (row: AnyObject, selected?: boolean) => void;
  toggleAllSelection: () => void;
  toggleRowExpansion: (row: AnyObject, expanded?: boolean) => void;
  setCurrentRow: (row: AnyObject) => void;
  clearSort: () => void;
  clearFilter: (columnKeys?: Array<string>) => void;
  doLayout: () => void;
  sort: (prop: string, order: "ascending" | "descending") => void;
  selectionList: Ref<Array<unknown>>;
  setTableHeight: (height: string | number) => void;
}

export interface TableScope {
  $index: number;
  row: AnyObject;
  column: AnyObject;
  store: AnyObject;
}
