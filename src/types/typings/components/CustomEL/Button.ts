import { ButtonProps } from "element-plus";

type TempButtonProps = keyof ButtonProps;
type TempButton = {
  [k in TempButtonProps]?: unknown;
};
export interface Button extends TempButton {
  prop: ButtonProp;
  label: string;
  event?: () => void;
  loading?: boolean;
}
export type Buttons = Array<Button>;
export type ButtonProp =
  | "submit"
  | "edit"
  | "view"
  | "delete"
  | "create"
  | "custom"
  | "cancel";
export type ButtonsPreset = "normal" | "onlyCancel";
export interface ButtonExpose {
  openLoading: () => void;
  closeLoading: () => void;
  prop: string | undefined;
}
