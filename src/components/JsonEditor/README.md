## JsonEditor 文档

### 属性

属性 | 描述 | 默认值 | 可能的值
---|--- | --- | ---
value | 编辑器内容(不支持双向绑定) | "" | string \| Array  \|Object
readonly | 编辑器是否不可编辑 | false | true\|false

### 事件

事件 | 描述 | 参数 
---|--- | --- 
change | 输入框值改变触发的事件 | content:string 

### 方法

方法 | 描述 | 参数 | 返回值
---|--- | --- | ---
setContent | 设置编辑器内容 | content:string\|Array\|Object | void
getContent | 获取编辑器内容 | - | string