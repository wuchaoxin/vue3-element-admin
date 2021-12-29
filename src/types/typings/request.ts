/**
 * @description 有关请求配置相关的类型定义
 */
import { AxiosRequestConfig } from "axios";

type Reuqest = Array<"get" | "GET" | "post" | "POST">;
type AppendData = {
  key: string;
  value: string | (() => string | undefined);
  params: Reuqest;
  data: Reuqest;
};

export interface AxiosCustomConfig {
  // 是否开启去除重复请求
  noRepeat: boolean;
  cache: {
    // 是否开启缓存
    storage: boolean;
    // 需要缓存多久
    storageTime: number;
  };
  // 请求失败后，是否重复请求
  retry: {
    // 重复请求几次
    retries: number;
    // 控制重试请求之间的延迟。
    retryDelay: number;
    // 选择哪些 api 需要进行重复请求
    apis?: Array<string>;
  };
  // 追加参数列表（方法以区分大小写）
  appendData: Array<AppendData>;
  // 追加消息头配置
  appendHeader: {
    [key: string]: (config?: AxiosCustomRequestConfig) => string;
  };
}

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  // 是否开启去除重复请求
  noRepeat?: boolean;
  // 请求失败后，是否重复请求
  retry?: boolean;
  // 请求数据方式是否为表单
  fromData?: boolean;
  // 是否开启缓存
  cache?: boolean;
  // 缓存过期时间
  storageTime?: number;
  // 是否需要进度条
  progressBar?: boolean;
  // 是否不需要自动处理错误
  noHint?: boolean;
  // 业务线（该操作只会改变 header 中 x-product）
  business?: "broker" | "wm";
}

export interface AxiosCustomResponseConfig<T = Dynamic> {
  data: T;
  status: number;
  statusText: string;
  headers: Dynamic;
  config: AxiosCustomRequestConfig;
  request?: Dynamic;
}

export interface Cache {
  [key: string]: CacheItem;
}

export interface CacheItem {
  storageExpire: number;
  data: AnyObject;
}
