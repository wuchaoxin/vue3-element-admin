import type {
  Detail,
  Engine,
  Platform,
  Shell,
  Supporter,
  System,
} from "@/types/typings/UA";

const ua = navigator.userAgent.toLowerCase();
const testUa = (regexp: RegExp) => regexp.test(ua);
const testVs = (regexp: RegExp) => {
  const temp = ua.match(regexp) || "";
  return temp
    .toString()
    .replace(/[^0-9|_.]/g, "")
    .replace(/_/g, ".");
};

// 系统（Windows、MacOS、Linux、Android、iOS）
let system: System = "unknow";
let systemVs = "unknow";
// 平台（Desktop桌面端、Mobile移动端）
let platform: Platform = "unknow";
// 内核（Webkit、Gecko、Presto、Trident）
let engine: Engine = "unknow";
// 载体（Chrome、Safari、Firefox、Opera、IExplore/Edge）
let supporter: Supporter = "unknow";
let engineVs = "unknow";
let supporterVs = "unknow";
// 外壳（基于 Chromium 进行二次开发再套多一层外壳的浏览器）
let shell: Shell = "none";
let shellVs = "unknow";

/**
 * @description 根据 UA 获取到平台、系统等相关详细信息
 * @returns {Object}
 */
export function getDetail(): Detail {
  _getSystemAndVersion();
  _getPlatform();
  _getEngineAndSupporter();
  _getEngineVsAndSupporterVs();
  _getShellAndShellVs();
  const sheelInfo = shell === "none" ? {} : { shell, shellVs };
  return Object.assign(
    {
      engine,
      engineVs,
      platform,
      supporter,
      supporterVs,
      system,
      systemVs,
    },
    sheelInfo
  );
}

function _getSystemAndVersion() {
  if (testUa(/windows|win32|win64|wow32|wow64/g)) {
    system = "windows";
  } else if (testUa(/macintosh|macintel/g)) {
    system = "macos";
  } else if (testUa(/x11/g)) {
    system = "linux";
  } else if (testUa(/android|adr/g)) {
    system = "android";
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
    system = "ios";
  }

  if (system === "windows") {
    if (testUa(/windows nt 5.0|windows 2000/g)) {
      systemVs = "2000";
    } else if (testUa(/windows nt 5.1|windows xp/g)) {
      systemVs = "xp";
    } else if (testUa(/windows nt 5.2|windows 2003/g)) {
      systemVs = "2003";
    } else if (testUa(/windows nt 6.0|windows vista/g)) {
      systemVs = "vista";
    } else if (testUa(/windows nt 6.1|windows 7/g)) {
      systemVs = "7";
    } else if (testUa(/windows nt 6.2|windows 8/g)) {
      systemVs = "8";
    } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
      systemVs = "8.1";
    } else if (testUa(/windows nt 10.0|windows 10/g)) {
      systemVs = "10";
    }
  } else if (system === "macos") {
    systemVs = testVs(/os x [\d._]+/g);
  } else if (system === "android") {
    systemVs = testVs(/android [\d._]+/g);
  } else if (system === "ios") {
    systemVs = testVs(/os [\d._]+/g);
  }
}

function _getPlatform() {
  if (system === "windows" || system === "macos" || system === "linux") {
    platform = "desktop";
  } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
    platform = "mobile";
  }
}

function _getEngineAndSupporter() {
  if (testUa(/applewebkit/g)) {
    engine = "webkit";
    if (testUa(/edge/g)) {
      supporter = "edge";
    } else if (testUa(/opr/g)) {
      supporter = "opera";
    } else if (testUa(/chrome/g)) {
      supporter = "chrome";
    } else if (testUa(/safari/g)) {
      supporter = "safari";
    }
  } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
    engine = "gecko";
    supporter = "firefox";
  } else if (testUa(/presto/g)) {
    engine = "presto";
    supporter = "opera";
  } else if (testUa(/trident|compatible|msie/g)) {
    engine = "trident";
    supporter = "iexplore";
  }
}

function _getEngineVsAndSupporterVs() {
  if (engine === "webkit") {
    engineVs = testVs(/applewebkit\/[\d._]+/g);
  } else if (engine === "gecko") {
    engineVs = testVs(/gecko\/[\d._]+/g);
  } else if (engine === "presto") {
    engineVs = testVs(/presto\/[\d._]+/g);
  } else if (engine === "trident") {
    engineVs = testVs(/trident\/[\d._]+/g);
  }
  if (supporter === "chrome") {
    supporterVs = testVs(/chrome\/[\d._]+/g);
  } else if (supporter === "safari") {
    supporterVs = testVs(/version\/[\d._]+/g);
  } else if (supporter === "firefox") {
    supporterVs = testVs(/firefox\/[\d._]+/g);
  } else if (supporter === "opera") {
    supporterVs = testVs(/opr\/[\d._]+/g);
  } else if (supporter === "iexplore") {
    supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
  } else if (supporter === "edge") {
    supporterVs = testVs(/edge\/[\d._]+/g);
  }
}

function _getShellAndShellVs() {
  if (testUa(/micromessenger/g)) {
    shell = "wechat";
    shellVs = testVs(/micromessenger\/[\d._]+/g);
  } else if (testUa(/qqbrowser/g)) {
    shell = "qq";
    shellVs = testVs(/qqbrowser\/[\d._]+/g);
  } else if (testUa(/ucbrowser/g)) {
    shell = "uc";
    shellVs = testVs(/ucbrowser\/[\d._]+/g);
  } else if (testUa(/qihu 360se/g)) {
    shell = "360";
  } else if (testUa(/2345explorer/g)) {
    shell = "2345";
    shellVs = testVs(/2345explorer\/[\d._]+/g);
  } else if (testUa(/metasr/g)) {
    shell = "sougou";
  } else if (testUa(/lbbrowser/g)) {
    shell = "liebao";
  } else if (testUa(/maxthon/g)) {
    shell = "maxthon";
    shellVs = testVs(/maxthon\/[\d._]+/g);
  }
}
