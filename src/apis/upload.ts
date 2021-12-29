/**
 * @description upload 组件里所需的方法
 */
import { AxiosCustomRequestConfig } from "@/types/typings/request";
import service from "@/utils/request";

export function uploadFile(config: AxiosCustomRequestConfig) {
  const defaultConfig = {
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
  };
  return service(Object.assign({}, defaultConfig, config));
}
