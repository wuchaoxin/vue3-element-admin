/* eslint-disable @typescript-eslint/ban-types */
import { SUCCESS_CODE } from "@/types/const/request";

/**
 * @description 开启 mock
 * @returns {void}
 */
export function mockInit(): Promise<void> {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.1-beta3/mock-min.js";
  document.getElementsByTagName("head")[0].appendChild(script);
  return new Promise((resolevd, rejected) => {
    script.onload = function () {
      resolevd();
    };
    script.onerror = function () {
      rejected();
    };
  });
}

/**
 * @description 进行 mock 数据（注意：使用 mock.js 后会重写 XMLHTTPRequest，使得依赖此对象的相关内容变得异常）
 * @param {Function} fn 请求方法
 * @param {AnyObject} data 返回的数据
 * @returns {void}
 */
export function handleMock<T = AnyObject>(fn: Function, data: T): void {
  const { url, method } = _getURLAndMethod(fn);
  import("mockjs").then((Mock) => {
    Mock.mock(url, method, (options: Dynamic) => {
      const responseOptions = options;
      responseOptions.data = data;
      console.log("mock 数据成功", responseOptions);
      return {
        code: SUCCESS_CODE,
        message: "数据 mock 成功",
        data,
      };
    });
  });
}

/**
 * @description 是否处于 mock 环境
 * @returns {boolean}
 */
export function isMock(): boolean {
  if (process.env.SELF_CONFIG.mock) {
    return true;
  } else {
    return false;
  }
}

// 利用正则获取方法的 url 和方法
function _getURLAndMethod(fn: Function): { url: RegExp; method: string } {
  const result = {
    url: new RegExp(""),
    method: "get",
  };
  const fnStr = fn.toString();
  const urlReg = /url:\s.{1,}/;
  const methodReg = /method:\s.{1,}/;
  const urlTemp = urlReg.exec(fnStr);
  const methodTemp = methodReg.exec(fnStr);
  if (urlTemp && urlTemp[0]) {
    result.url = _url2reg(_deleteSign(urlTemp[0]));
  }
  if (methodTemp && methodTemp[0]) {
    result.method = _deleteSign(methodTemp[0]);
  }
  return result;
}

// 将 url 处于成正则
function _url2reg(url: string) {
  // 替换 es6 字符变量（故请求里不要使用字符串拼接）
  const reg = /\${.{1,}}/;
  // 拿到新的正则
  const newReg = new RegExp(url.replace(reg, ".{1,}"));
  return newReg;
}

// 删除传递过来的不需要的符号
function _deleteSign(str: string) {
  const val = str.split(":")[1].slice(1);
  const reg = /`|"|'|,/g;
  return val.replace(reg, "");
}
