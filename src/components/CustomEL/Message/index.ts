import { Message } from "@/types/typings/components/CustomEL/Message";
import { ElMessage } from "element-plus";

export function MessageFn(options: Message) {
  ElMessage(options);
}

MessageFn.info = (message: string) => {
  MessageFn({
    message,
    type: "info",
  });
};

MessageFn.success = (message: string) => {
  MessageFn({
    message,
    type: "success",
  });
};

MessageFn.warning = (message: string) => {
  MessageFn({
    message,
    type: "warning",
  });
};

MessageFn.error = (message: string) => {
  MessageFn({
    message,
    type: "error",
  });
};
