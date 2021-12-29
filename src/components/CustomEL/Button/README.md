## Button

> Button 中并无修改原有的功能。

+ 新增场景《loading》：Button 在进行 loading 时，文件会进行改变。同时，可调用具体方法来进行打开、关闭 loading。
+ 新增场景《prop》：新增暴露 prop 属性，该属性只是在 dialog、table 中使用时，获取 button 唯一性。

### 方法

方法 | 描述 | 参数 | 返回值
---|--- | --- | ---
openLoading | 打开 loading | - | void
closeLoading | 关闭 loading | - | void