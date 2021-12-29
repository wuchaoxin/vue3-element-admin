export type SelectValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>;
export type SelectList = Array<SelectListItem>;
export interface SelectListItem {
  label: string;
  value: string | number | boolean | Array<string | number | boolean>;
}

export type BlackList = Array<string>;

export interface SelectExpose {
  focus: () => void;
  blur: () => void;
}
