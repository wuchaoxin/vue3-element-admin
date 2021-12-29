import { MessageOptions } from "element-plus";

type TempMessageOptionsList = keyof MessageOptions;
type TempMessage = {
  [k in TempMessageOptionsList]?: MessageOptions[k];
};

export interface Message extends TempMessage {
  message: string;
}
