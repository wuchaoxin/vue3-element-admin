## Table

> Table 组件为获取高度集成，修改了原有的属性以及事件用法。

+ 新增场景《高度集成》：Table 将用统一配置进行布局渲染、显示。
+ 新增场景《自请求》：Table 将带请求功能

### 属性

属性 | 描述 | 默认值 | 可能的值
---|--- | --- |---
config | Table 配置（详情请见 TableConfig TS 类型） | 必传 | Object

### 事件

事件 | 描述 | 参数 
---|--- | --- 
getData | 请求后触发 | data:Object 
selected | 开启选择模式后，选中时触发。可以获取到点击这一行，并且得知是取消还是选中 | (row:AnyObject,isSelected:boolean)

### 暴露属性

属性 | 描述 | 默认值 | 可能的值
---|--- | --- |---
selectionList | 当前选中的列表 | [] | Array