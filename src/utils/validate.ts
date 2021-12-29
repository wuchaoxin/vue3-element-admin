/**
 * @description 校验相关
 */

/**
 * @description 是否是外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string): boolean {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @description 校验生成器
 * @param {Dynamic} rule 规则（由于这里是交叉类型，所以直接用 any 了）
 * @param {string | number | boolean | Array<unknown>} value 校验的值
 * @param {Function} callback
 * @returns {void|Errpr}
 */
export function generateValidate(
  rule: Dynamic,
  value: string | number | boolean | Array<unknown>,
  callback: (error?: Error) => Error | void
) {
  if (rule.required) {
    if (Array.isArray(value)) {
      if (value.length <= 0) {
        callback(new Error(rule.message));
      } else {
        callback();
      }
    } else {
      if (!value) {
        callback(new Error(rule.message));
      } else {
        callback();
      }
    }
  } else if (
    (rule.min || rule.max) &&
    (typeof value === "string" || typeof value !== undefined)
  ) {
    if (typeof value === "string") {
      if (rule.min) {
        if (value.length < rule.min) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      }
      if (rule.max) {
        if (value.length < rule.min) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      }
    } else {
      callback(new Error(rule.message));
    }
  } else if (rule.regExp) {
    if (!rule.regExp.test(value)) {
      callback(new Error(rule.message));
    } else {
      callback();
    }
  }
}
