/**
 * @description 请求实例
 */
import axios from "axios";
import { getLang } from "@/utils/url";
import { handleRequestError } from "@/utils/error";
import {
  addPendingAjax,
  appendParamsOrData,
  cacheRequest,
  cacheResponse,
  generateUUID,
  handleRequestRetry,
  handleStartProgressBar,
  handleStopProgressBar,
  isCache,
  productInfo,
  removePendingAjax,
  setHeaders,
  setRequestType,
} from "./requestAttach";
import {
  AxiosCustomConfig,
  AxiosCustomRequestConfig,
} from "@/types/typings/request";
import { SUCCESS_CODE } from "@/types/const/request";
import { ReAxiosPromise } from "@/types/typings/apis";

// 创建一个 axios 实例
const instance = axios.create({
  // url = base url + request url
  // 当跨域请求时发送cookie
  withCredentials: true,
  // 请求超时
  timeout: 5000,
});

// 自定义配置
export const axiosCustomConfig: AxiosCustomConfig = {
  noRepeat: false,
  // 默认配置，请求侧可再次更改（只对 get 请求有效）
  cache: {
    storage: false,
    storageTime: 5 * 60 * 1000,
  },
  // 默认关闭，需要在请求侧开启
  retry: { retries: 3, retryDelay: 1000 },
  appendData: [
    // {
    //   key: "device_id",
    //   value: (): string | undefined => store.getters.devicedId,
    //   params: ["get"],
    //   data: ["post"],
    // },
  ],
  appendHeader: {
    "Accept-Language": (): string => getLang(),
    "X-requestId": (): string => generateUUID(),
    "X-product": (config?: AxiosCustomRequestConfig): string =>
      productInfo(config),
    "X-timestamp": (): string => Date.now().toString(),
  },
};

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求开始之前检查先前的请求
    removePendingAjax(config);
    // 将当前请求添加到pendingAjax
    addPendingAjax(axios, config);
    appendParamsOrData(config);
    setHeaders(config);
    setRequestType(config);
    cacheRequest(config, axios);
    handleStartProgressBar(config);
    return config;
  },
  (error) => {
    // 请求错误操作
    handleRequestError(error, "request");
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    handleStopProgressBar();
    const res = response.data;
    // 如果自定义代码不是 0，就会被判定为错误。
    if (res.code !== SUCCESS_CODE) {
      const requestConfig = response.config as AxiosCustomRequestConfig;
      handleRequestError(res, "response", requestConfig);
      return Promise.reject(res);
    } else {
      cacheResponse(response);
      return res;
    }
  },
  (error) => {
    handleStopProgressBar();
    const cache = isCache(error);
    if (cache) {
      return Promise.resolve(JSON.parse(error.message));
    } else {
      // then 说明处于重复请求中
      handleRequestRetry(error).catch(() => {
        handleRequestError(error, "response");
      });
      return Promise.reject(error);
    }
  }
);

// 向外暴露的最终方法
async function service(
  config: AxiosCustomRequestConfig
): ReAxiosPromise<Dynamic> {
  const customConfig = config;
  return instance(customConfig);
}

export default service;
