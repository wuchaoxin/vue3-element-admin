/**
 * @description 跟进度条相关
 */
import progressBar from "nprogress";
import "nprogress/nprogress.css";
// https://github.com/rstacruz/nprogress
progressBar.configure({ showSpinner: false });

/**
 * @description 开启进度条
 * @returns {void}
 */
export function startProgressBar(): void {
  progressBar.start();
}

/**
 * @description 关闭进度条
 * @returns {void}
 */
export function stopProgressBar(): void {
  progressBar.done();
}
