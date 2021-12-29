/**
 * @description css 转换至 class 关系表
 * + class 命名以 https://tailwindcss.com/docs 为准，如果你使用过 tailwindcss 将会十分熟练（文字颜色这个除外，这个命名无法一致）
 * + 关于设置相关请见：中文：http://tinymce.ax-z.cn/general/filter-content.php 英文：https://www.tiny.cloud/docs/configure/content-formatting/#formats
 */

const defaultSelector = "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img";
const classPrefix = "info-center-";

const formatsConfig = {
  alignleft: {
    selector: defaultSelector,
    classes: `${classPrefix}text-left`,
    styles: {
      textAlign: "left",
    },
  },
  aligncenter: {
    selector: defaultSelector,
    classes: `${classPrefix}text-center`,
    styles: {
      textAlign: "center",
    },
  },
  alignright: {
    selector: defaultSelector,
    classes: `${classPrefix}text-right`,
    styles: {
      textAlign: "right",
    },
  },
  alignjustify: {
    selector: defaultSelector,
    classes: `${classPrefix}text-justify`,
    styles: {
      textAlign: "justify",
    },
  },
  // 加粗
  bold: {
    inline: "span",
    classes: `${classPrefix}font-bold`,
    styles: { fontWeight: "700" },
  },
  // 斜体
  italic: {
    inline: "span",
    classes: `${classPrefix}italic`,
    styles: { fontStyle: "italic" },
  },
  // 下滑线
  underline: {
    inline: "span",
    classes: `${classPrefix}underline`,
    styles: { textDecoration: "underline" },
  },
  // 删除线
  strikethrough: {
    inline: "span",
    classes: `${classPrefix}line-through`,
    styles: { textDecoration: "line-through" },
  },
  // 文字颜色
  forecolor: {
    inline: "span",
    classes: `${classPrefix}text-color-%value`,
    styles: {
      color: "%value",
    },
  },
  // 背景颜色
  hilitecolor: {
    inline: "span",
    classes: `${classPrefix}bg-%value`,
    styles: {
      color: "%value",
    },
  },
  // font-family
  fontname: {
    inline: "span",
    classes: `${classPrefix}font-%value`,
    styles: {
      fontFamily: "%value",
    },
  },
  // font-size
  fontsize: {
    inline: "span",
    classes: `${classPrefix}text-size-%value`,
    styles: {
      fontSize: "%value",
    },
  },
};

export default formatsConfig;

/**
 * @description 清洗 html，根据 class 以及 css 生成样式表
 * @param {string} html 富文本编辑器生成的 html
 * @returns {Object}
 */
export function cleanHtml(html: string) {
  let styleSheet = "<style>";
  const reg = new RegExp('<.{1,}?class="(.{1,}?)".{1,}?style="(.{1,}?)">', "g");
  const cleanHtml = html.replace(reg, (match, match1, match2) => {
    styleSheet += `.${match1}{${match2}}`;
    return match.replace(/\sstyle=".{1,}"/g, "");
  });
  styleSheet += "</style>";
  return {
    styleSheet,
    html: cleanHtml,
  };
}

export const classOptions = {
  imgHandle: {
    describe: "图片响应式处理",
    css: `img {
        width: 100%;
        height: auto;
      }
      @media only screen and (min-width: 767px) {
        img {
          display: block;
          width: 40% !important;
        }
      }
      @media only screen and (min-width: 1800px) {
        img {
          display: block;
          width: 25% !important;
        }
      }`,
  },
  deleteGap: {
    describe: "去除默认间距",
    css: `*{
        margin:0;
        padding:0;
    }`,
  },
};
