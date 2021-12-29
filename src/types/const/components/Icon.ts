// 仅仅是为了 TS 好去推断 SVG_NAME 具体值所设置
export const SVG_NAME_MAP = {
  ArrowDown: "",
  UploadFilled: "",
  CaretBottom: "",
  QuestionFilled: "",
  Close: "",
} as const;

export const SVG_NAME_LIST = Object.keys(SVG_NAME_MAP);
