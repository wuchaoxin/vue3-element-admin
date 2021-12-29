## Tinymce 文档

### 属性

属性 | 描述 | 默认值 | 可能的值
---|--- | --- | ---
id | 唯一标识（用于唯一获取实例） | 默认根据时间生成 | string
value | 传入给富文本的内容（不具有双向绑定，只是初始化。请勿动态设置，如果想获取文本或者设置文本请调用方法） | "" | string
menubar | 富文本顶部工具栏 | "file edit insert view format table" | string
toolbar | 富文本编辑器工具栏 | 具体参见  toolbar.ts |  具体参见 toolbar.ts
height | 富文本编辑器 | 360 | number\|string
width | 富文本编辑器 | "auto" | number\|string

### 事件

事件 | 描述 | 参数 
---|--- | --- 
input | 输入值触发的事件 | content:string 

### 方法

方法 | 描述 | 参数 | 返回值
---|--- | --- | ---
setContent | 设置富文本的内容 | html:string | void
getContent | 获取富文本的内容 | - | string
getCleanContent| 获取富文本样式清洗后的内容 | - | {html:string,styleSheet:string}