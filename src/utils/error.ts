import { MessageFn } from "@/components/CustomEL";
import {
  FAIL_MESSAGE,
  NETWORK_ERROR,
  NETWORK_ERROR_MESSAGE,
} from "@/types/const/request";
import { ErrorConfig } from "@/types/typings/error";
import { AxiosCustomRequestConfig } from "@/types/typings/request";

export function handleRequestError(
  error: AnyObject,
  source: "response" | "request",
  requestConfig?: AxiosCustomRequestConfig
): void {
  let errorConfig: ErrorConfig = {};
  const message = FAIL_MESSAGE;
  errorConfig = {
    code: error.code || "null",
    source: source,
    message,
    raw: error,
  };
  // 是否进行提示
  if (requestConfig?.noHint !== true) {
    const rawMessage = error?.message;
    if (rawMessage === NETWORK_ERROR) {
      MessageFn({
        message: NETWORK_ERROR_MESSAGE,
        type: "error",
      });
    } else {
      const message = errorConfig.message as string;
      MessageFn({
        message,
        type: "error",
      });
    }
  }
}
