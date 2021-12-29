/**
 * @description 与格式化有关的函数
 */
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

/**
 * @description 时间操作实际就是返回 dayjs 对象
 * @param {string|Date|number} time 时间
 * @example
 */
export function time(time: string | number | Date = new Date()): Dayjs {
  return dayjs(time);
}

/**
 * @description 标准时间格式化(中文)
 * @param {string|Date|number} time 时间
 * @param {string} formatConfig 格式
 * @returns {string}
 */
export function timeFormat(
  time: string | number | Date = new Date(),
  formatConfig = "YYYY-MM-DD"
): string {
  dayjs.extend(LocalizedFormat);
  dayjs.locale("zh-cn");
  return dayjs(time).format(formatConfig);
}

/**
 * @description 时间格式化(中文)，显示距离此刻时间
 * @param {string|Date|number} time 时间
 * @returns {string}
 */
export function timeFormatFormNow(
  time: string | number | Date = new Date()
): string {
  dayjs.extend(RelativeTime);
  dayjs.locale("zh-cn");
  return dayjs(time).fromNow();
}

/**
 * @description 删除空格
 * @param {string} str 待处理字符串
 * @param {'all'|'left'|'right'|'both'} type 处理方式（默认 both)
 * @returns {string}
 */
export function removeSpace(
  str: string,
  type: "all" | "left" | "right" | "both" = "both"
): string {
  if (type === "both") {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (type === "all") {
    return str.replace(/\s+/g, "");
  } else if (type === "left") {
    return str.replace(/^\s*/, "");
  } else if (type === "right") {
    return str.replace(/(\s*$)/g, "");
  } else {
    return str;
  }
}

/**
 * @description 补上后缀或者前缀
 * @param {string} text 文本
 * @param {string} symbol 要追加的文本
 * @param {boolean} order 正序还是倒序
 * @returns {string}
 */

export function addSuffix(
  text: string | number,
  symbol: string,
  order = false
): string {
  if (text) {
    if (order) {
      return symbol + text;
    } else {
      return text + symbol;
    }
  } else {
    return "";
  }
}
