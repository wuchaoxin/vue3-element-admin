/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
const path = require("path");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const webpack = require("webpack");
const IS_PROD = process.env.NODE_ENV === "production";
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  publicPath: "",
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.externals = {
      mockjs: "Mock",
    };
    config.plugins = [
      ...config.plugins,
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()],
      }),
      new webpack.NormalModuleReplacementPlugin(
        /element-plus[/\\]lib[/\\]locale[/\\]lang[/\\]en/,
        "element-plus/lib/locale/lang/zh-cn"
      ),
    ];
    if (IS_PROD) {
      config.plugins = [
        ...config.plugins,
        // 开启 gzip 压缩
        new CompressionPlugin({
          // 处理所有匹配此 {RegExp} 的资源
          test: /\.js$|\.html$|.\css/,
          // 对超过10k的数据压缩
          threshold: 10240,
          // 不删除源文件
          deleteOriginalAssets: false,
        }),
      ];
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        // 此处为ture的时候不会启用压缩处理,目的是为了开发模式下调试速度更快
        disable: IS_PROD ? true : false,
      })
      .end();
    // 设置 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    // 给 node 核心模板是否加入 polyfill（webpack5 不再为 node 核心模板自动加入 polyfill）
    config.resolve.set("fallback", {
      path: false,
    });
    // 向 env 注入变量
    config.plugin("define").tap((args) => {
      args[0]["process.env"]["SELF_CONFIG"] = JSON.stringify(process.env);
      return args;
    });
  },
};

function resolve(dir) {
  return path.join(__dirname, dir);
}
