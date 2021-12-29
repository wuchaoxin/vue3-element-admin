import { ValidateFieldCallback } from "element-plus/es";

// PS:双重数组是为了顺便把布局也一同处理了
export type FormConfig = Array<FormRowConfig>;

export type FormRowConfig = Array<FormColConfig>;

export interface FormColConfig {
  // 标识
  prop: string;
  label?: string;
  rules?: Rules;
  // props & events
  componentAttrs?: AnyObject;
  // 组件类型
  component: "input" | "select" | "datePicker" | "checkbox" | "checkboxGroup";
  // 预留组件类型拓展位（防止变种出现）
  compoonentType?: string;
  // 是否只读
  readOnly?: boolean;
  // 横向布局方式（Row 组件），24 栅格（剩下如果未指定，会自动分配）
  span?: number;
  // label 小提示
  tips?: string;
}

export type Rules = Array<Rule>;

export interface RuleBase {
  message: string;
  trigger?: "blur" | "change";
}

export type Rule =
  | (RuleBase & {
      min?: number;
      max?: number;
    })
  | (RuleBase & {
      required: boolean;
    })
  | (RuleBase & {
      regExp: RegExp;
    });

export interface FormExpose {
  validate: (callback: ValidateFieldCallback) => void;
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void;
  resetFields: () => void;
  scrollToField: (props: string) => void;
  clearValidate: (props: string | string[]) => void;
}
