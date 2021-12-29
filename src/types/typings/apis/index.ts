/**
 * @description 请求公共接口类型
 */

export type Data<T> = {
  code: number;
  msg?: string;
  data: T;
};
export type ReAxiosPromise<T = Dynamic> = Promise<T>;
