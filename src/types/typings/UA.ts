/**
 * @description 关于 detail 相关的类型声明
 */

export type System =
  | "windows"
  | "macos"
  | "linux"
  | "android"
  | "ios"
  | "unknow";
export type Platform = "desktop" | "mobile" | "unknow";
export type Engine = "webkit" | "gecko" | "presto" | "trident" | "unknow";
export type Supporter =
  | "edge"
  | "opera"
  | "chrome"
  | "safari"
  | "firefox"
  | "opera"
  | "iexplore"
  | "unknow";
export type Shell =
  | "wechat"
  | "qq"
  | "uc"
  | "360"
  | "2345"
  | "sougou"
  | "liebao"
  | "maxthon"
  | "none";

export type Detail = {
  engine: Engine;
  engineVs: string;
  platform: Platform;
  supporter: Supporter;
  supporterVs: string;
  system: System;
  systemVs: string;
} & (
  | {
      shell?: undefined;
      shellVs?: undefined;
    }
  | {
      shell: Shell;
      shellVs: string;
    }
);
