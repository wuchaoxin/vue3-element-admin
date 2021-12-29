## Icon

> 由于 ELement Plus 有 Font icon 转向 Svg icon，这里进行按需引入，然后用 TS 进行类型提示。

如果你要新增 Icon，那么稍微有点麻烦，需要有以下步骤：

1. 手动引入 `@element-plus/icons` 中的图标
2. `SVG_NAME_MAP` 中进行添加名字
3. `svgComponent` computed 中进行 return 对应组件组件

> 几次操作，其实最主要的还是为了拿到 TS 推导类型。