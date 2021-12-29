## Dialog

> Dialog 在原有的基础上新增了自动计算高度以及底部按钮的封装

+ 新增场景《自动计算高度》：根据页面以及 dialog 内容的高度进行自动定位以及设置高度。
+ 新增场景《封装底部按钮》：根据传入的按钮列表，进行渲染，同时 emits 出对应的事件。

### 属性

属性 | 描述 | 默认值 | 可能的值
---|--- | --- | ---
v-model 语法糖 | 是否显示 Dialog | false | true\|false
title | 标题 | "提示" | string
buttons | 按钮列表 | - | Array
buttonsPreset | 按钮列表 预设 | "normal" |  string
size | Dialog 的大小（其实就是封装了一次 width） | "normal" |  string
autoHeight | 是否开启自动计算高度 | true | true\|false

### 事件

事件 | 描述 | 参数 
---|--- | --- 
buttonClick | 点击 Dialog 底部按钮后触发。可以获取对应的按钮类型以及是否关闭 Dialog或者关闭 Button 的 loading 效果。 | (prop:string,close:()=>void;again:()=>void) 