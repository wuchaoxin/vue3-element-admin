/**
 * @description table 组件里所需的方法
 */
import { AxiosCustomRequestConfig } from "@/types/typings/request";
import service from "@/utils/request";

export function getTableData(config: AxiosCustomRequestConfig) {
  return service(config);
}
