export interface TextEditorExpose {
  setContent: (str: string) => void;
  getContent: () => string;
  getCleanContent: () => string;
  addContentStyle: (html: string, classStyle: string) => string;
}
