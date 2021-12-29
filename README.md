## 项目简介

本项目基于 [vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/)进行二次开发，具体可以参见文档。

为了之后没有技术栈包袱，本项目在 `vue-element-admin` 的基础上进行vue3 升级。项目中结构目录以及写法将尽可能对齐前者项目。

### 项目启动

本项目无后端服务，所以需要已 mock 模式运行。以`npm run mock`进行运行。

### 文档列表

+ [vue3](https://v3.cn.vuejs.org/)
+ [vue-router4](https://next.router.vuejs.org/zh/)
+ [pinia](https://pinia.esm.dev/introduction.html#a-more-realistic-example)
+ [element-plus](https://element-plus.gitee.io/zh-CN/)
+ [vue-cli5](https://cli.vuejs.org/zh/guide/)
+ [vue-use](https://vueuse.org/)
+ [vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/)

### 迁移状况

+ vue2 => vue3（有部分 api 变动）
+ vueRouter3 => vueRouter4(有部分 api 变动)
+ vuex3 => pinia2（创建 api 彻底变更，使用 api 细微调整）
+ element => element plus(变更较少)
+ 项目自带的TS 配置以及格式化设置 => VueCli5 自带的 TS 规则以及 petter 配置

### 关于 mock 数据

> mock 方案采用传统的`mock.js`进行处理，由于`mock.js`重写了`XMLHttpRequest`关于请求相关信息，将不会在控制台的`Network`进行展示，这里将部分信息打印在控制台。

运行命令 `npm run mock` 以启动 `mock` 模式

`src/apis/mock` 里的文件将进行拦截处理。

`mock`数据应该使用`handleMock`方法，详情请见方法注释（使用时一定要注意保持同等写法，不然不会生效）。

> 注意：使用 mock.js 后会重写 XMLHTTPRequest，使得依赖此对象的相关内容变得异常

> mock.js 不会被打入 chunk 包中，所以无需进行删除。

### 值得注意点

+ 本项目不再使用 `vuex4` 来进行状态管理，而是采用了`pinia`（预备vuex5）。原因为：`vuex4` 目前对 TS 的自动推导不够好，而 `pinia` 能够完成自己动类型推导，并且移除了命名空间，采用扁平化管理 store，更加贴近函数式写法。
+ 项目中使用了 `unplugin-vue-components`，会自动按需引入`element plus`组件，所以你不需要进行局部引入或者局部注册，一切都会自动进行（二次包装的 EL 组件不会自动导入）。
+ 项目中存在 `sass`与`js`共享变量的情况，你的共享文件命名命名必须是私有且带`module`标识
    > 猜测是因为 sass 在后续更新引入了 module 的概念所导致的问题。
+ 之前的项目中存在 node api 在运行时使用的情况（并不考虑与之对齐写法），已进行替换写法。
+ 在使用 ref 获取二次包装组件的实例时，一定要去查看`useGetComponentExpose`这个 hook，这个 hook 方法旨在获取到正确的 ref 实例（有命名要求），同时根据传入的组件类型得到相应的类型（这里是一个折中的方法，因为 expose 不具有类型推导的能力）。
+ 之前未对 TS 以及 ESLlint 配置编译器宏的忽略，所以存在 import 编译器宏的现象。现在你不需要再对编译器宏（compiler macro） api 进行导入`defineXXX`、`withDefaults`，因为这些 api 已在上下文中存在（当然你只能在 vue sfc 中使用）。
+ 在`shims-global.d.ts`混入全局类型`AnyObject`以及`Dynamic`，`AnyObject` 为正常类型使用即可，`Dynamic` 类型其实就是 any 类型，这是因为在组件中很时候很难去寻找对应的类型，平时你不应当在业务中使用。
+ 在写自定义组件的配置时，你也许会好奇为什么只预留了 Attrs，没有预留 Events 配置。这是因为 vue3 中将属性和事件统一进行合并了，所有的事件加一个 on，即可在 Attrs 中生效。例如：change => onChange
+ 项目中使用了 `vue use` 一个 vue3 hook 工具库，相关工具方法你都可以在这里寻找，算是比较全面。