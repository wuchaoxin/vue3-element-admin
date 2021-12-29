## Select

> Select 组件集成了 el-option 组件以及新增场景黑名单。

+ 新增场景《高度集成》：新增 list 属性进行列表渲染。
+ 新增场景《黑名单》：新增 blackList 属性进行列表禁用。

### 属性

属性 | 描述 | 默认值 | 可能的值
---|--- | --- | ---
v-model 语法糖 | 获取 Select 当前的值 | "" | number\|string\|boolean\|Array
list | 传入的列表（对象需要是 label value 格式） | [] | Array
blackList | 禁用的列表（以 label 为标识） | [] | Array