/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description 这里应当防止全局 api 的类型声明
 */

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.scss" {
  const value: any;
  export default value;
}

declare interface Window {
  tinymce: any;
}

declare type AnyObject<T = unknown> = Record<string, T>;
declare type Dynamic = any;
