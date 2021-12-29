/**
 * @description 与 url 操作相关的函数
 */
import { DEFAULT_LANG, LANG_MAP } from "@/types/const/pageInfo";
import { Lang } from "@/types/typings/pageInfo";

/**
 * @description: 对 url 中的参数进行删除
 * @param {string} url
 * @param {string} deleteParam 需要删除的参数
 * @return {string} 修改后的 url
 */
export function deleteQueryParams(url: string, deleteParam: string): string {
  if (!url) {
    return url;
  }
  const { baseUrl, params } = getURLAndParams(url);
  let result = baseUrl + "?";
  for (const item of Object.keys(params)) {
    if (item !== deleteParam) {
      result += `${item}=${params[item]}&`;
    }
  }
  result = result.slice(0, result.length - 1);
  return result;
}

/**
 * @description: 对 url 中的参数进行新增
 * @param {string} url
 * @param {string} addParam 需要新增的参数
 * * @param {string} value 新增的参数值
 * @return {string} 修改后的 url
 */
export function addQueryParams(
  url: string,
  addParam: string,
  value: string
): string {
  if (!url) {
    return url;
  }
  const { baseUrl, params } = getURLAndParams(url);
  let result = baseUrl + "?";
  params[addParam] = value;
  for (const item of Object.keys(params)) {
    result += `${item}=${params[item]}&`;
  }
  result = result.slice(0, result.length - 1);
  return result;
}

/**
 * @description: 获取 url 中的 baseURL 和 query 参数
 * @param {string} url
 * @return {Object} baseURL 和 query 参数
 */
export function getURLAndParams(url: string = window.location.href): {
  baseUrl: string;
  params: AnyObject<string>;
} {
  try {
    const tempArr = url.split("?");
    const urlConfig = new URL(url);
    const baseUrl = urlConfig.origin + urlConfig.pathname + urlConfig.hash;
    tempArr.splice(0, 1);
    const paramsStr = tempArr.join("&");
    const params: AnyObject<string> = {};
    if (paramsStr) {
      const paramsGroup = paramsStr.split("&");
      for (const item of paramsGroup) {
        const temp = item.split("=");
        temp[1] = filterHash(temp[1]);
        params[temp[0]] = temp[1];
      }
    }
    return {
      baseUrl,
      params,
    };
  } catch (error) {
    console.log("getURLAndParams url error", error);
    return {
      baseUrl: "",
      params: {},
    };
  }
}

function filterHash(val: string) {
  const hashreg = /^.*#\//;
  if (val && hashreg.test(val)) {
    return val.split("#/")[0];
  } else {
    return val;
  }
}

/**
 * @description 获取语言环境
 * @returns {string}
 */
export function getLang(): Lang {
  const browserAddress = window.location.href;
  const { params } = getURLAndParams(browserAddress);
  const lang = params.lang as undefined | Lang;
  const langList = Object.keys(LANG_MAP);
  if (lang && langList.includes(lang)) {
    return lang;
  } else {
    return DEFAULT_LANG;
  }
}
