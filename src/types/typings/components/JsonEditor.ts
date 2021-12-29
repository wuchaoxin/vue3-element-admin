import { EditorFromTextArea } from "codemirror";

// type 似乎不准确，手动合并一下
export interface JsonEditor extends EditorFromTextArea {
  options: AnyObject;
}

export interface JsonEditorExpose {
  setContent: (conten: string | Array<unknown> | AnyObject) => void;
  getContent: () => void;
}
