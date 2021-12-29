/* eslint-disable @typescript-eslint/ban-types */
let callbacks: Array<Function> | null = [];

function loadedTinymce() {
  // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2144
  // check is successfully downloaded script
  return window.tinymce;
}

// 动态加载脚本
const dynamicLoadScript = (src: string, callback: Function) => {
  const existingScript = document.getElementById(src);
  const cb = callback || function () {};

  // 如果没有加载过脚本，那么加载脚本
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = src;
    script.id = src;
    document.body.appendChild(script);
    callbacks && callbacks.push(cb);
    stdOnEnd(script);
  }

  if (existingScript && cb) {
    if (loadedTinymce()) {
      cb(null, existingScript);
    } else {
      callbacks && callbacks.push(cb);
    }
  }

  function stdOnEnd(script: HTMLScriptElement) {
    script.onload = function () {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null;
      for (const cb of callbacks || []) {
        cb(null, script);
      }
      callbacks = null;
    };
    script.onerror = function () {
      this.onerror = this.onload = null;
      cb(new Error("Failed to load " + src), script);
    };
  }
};

export default dynamicLoadScript;
