/**
 * @description 该文件旨在根据 UA 判断系统以及平台等相关信息
 */
import { getDetail } from "./detail";

const detail = getDetail();

class UADetector {
  defaultVersion: string;
  constructor() {
    this.defaultVersion = "";
  }
  isInApp(): boolean {
    return this.isInSuperApp();
  }
  isInSuperApp(): boolean {
    return !!this.getSuperAppVersion();
  }
  getAppVersion(): string {
    if (this.isInSuperApp()) {
      return this.getSuperAppVersion();
    } else {
      return this.defaultVersion;
    }
  }
  getSuperAppVersion(): string {
    const version = navigator.userAgent.match(/SuperApp[/]([.0-9]+)/i);
    return version ? version[1] : this.defaultVersion;
  }
  isWeChat(): boolean {
    return !!detail.shell && detail.shell === "wechat";
  }
  isWeiXin(): boolean {
    return this.isWeChat();
  }
  isChrome(): boolean {
    return detail.supporter === "chrome";
  }
  isSafari(): boolean {
    return detail.supporter === "safari";
  }
  isMobile(): boolean {
    return detail.platform === "mobile";
  }
  isDesktop(): boolean {
    return detail.platform === "desktop";
  }
  isIOS(): boolean {
    return detail.system === "ios";
  }
  isMac(): boolean {
    return detail.system === "macos";
  }
  isAndroid(): boolean {
    return detail.system === "android";
  }
  isIexplore(): boolean {
    return detail.supporter === "iexplore";
  }
  isIE(): boolean {
    return this.isIexplore();
  }
  getIexploreVersion(): boolean | string {
    if (this.isIexplore()) {
      return detail.supporterVs;
    } else {
      return false;
    }
  }
  getIEVersion(): boolean | string {
    return this.getIexploreVersion();
  }
  getDetail() {
    return detail;
  }
}

export default new UADetector();

export function useUADetector(): UADetector {
  return new UADetector();
}
