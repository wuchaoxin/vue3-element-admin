// PS:这些知识组件方法，静态方法，你应该从 Echarts 对象上调用
export interface EchartExpose {
  setOption: (
    option: AnyObject,
    opts?: {
      notMerge?: boolean;
      replaceMerge?: string | string[];
      lazyUpdate?: boolean;
    }
  ) => void;
  getWidth: () => number;
  getHeight: () => number;
  // 获取 ECharts 实例容器的 dom 节点。
  getDom: () => HTMLCanvasElement | HTMLDivElement;
  // 获取当前实例中维护的 option 对象
  getOption: () => AnyObject;
  resize: (opts?: {
    width?: number | string;
    height?: number | string;
    silent?: boolean;
    animation?: {
      duration?: number;
      easing?: string;
    };
  }) => AnyObject;
  // 触发图表行为
  dispatchAction: (payload: AnyObject) => void;
  // 转换坐标系上的点到像素坐标值。
  convertToPixel: (
    // finder 用于指示『使用哪个坐标系进行转换』。
    // 通常地，可以使用 index 或者 id 或者 name 来定位。
    finder: {
      seriesIndex?: number;
      seriesId?: string;
      seriesName?: string;
      geoIndex?: number;
      geoId?: string;
      geoName?: string;
      xAxisIndex?: number;
      xAxisId?: string;
      xAxisName?: string;
      yAxisIndex?: number;
      yAxisId?: string;
      yAxisName?: string;
      gridIndex?: number;
      gridId?: string;
      gridName?: string;
    },
    // 要被转换的值。
    value: Array<unknown> | string
    // 转换的结果为像素坐标值，以 echarts 实例的 dom 节点的左上角为坐标 [0, 0] 点。
  ) => Array<unknown> | string;
  // 转换像素坐标值到逻辑坐标系上的点。是 convertToPixel 的逆运算。
  convertFromPixel: (
    // finder 用于指示『使用哪个坐标系进行转换』。
    // 通常地，可以使用 index 或者 id 或者 name 来定位。
    finder: {
      seriesIndex?: number;
      seriesId?: string;
      seriesName?: string;
      geoIndex?: number;
      geoId?: string;
      geoName?: string;
      xAxisIndex?: number;
      xAxisId?: string;
      xAxisName?: string;
      yAxisIndex?: number;
      yAxisId?: string;
      yAxisName?: string;
      gridIndex?: number;
      gridId?: string;
      gridName?: string;
    },
    // 要被转换的值，为像素坐标值，以 echarts 实例的 dom 节点的左上角为坐标 [0, 0] 点。
    value: Array<unknown> | string
    // 转换的结果，为逻辑坐标值。
  ) => Array<unknown> | string;
  // 判断给定的点是否在指定的坐标系或者系列上。
  containPixel: (
    // finder 用于指示『在哪个坐标系或者系列上判断』。
    // 通常地，可以使用 index 或者 id 或者 name 来定位。
    finder: {
      seriesIndex?: number;
      seriesId?: string;
      seriesName?: string;
      geoIndex?: number;
      geoId?: string;
      geoName?: string;
      xAxisIndex?: number;
      xAxisId?: string;
      xAxisName?: string;
      yAxisIndex?: number;
      yAxisId?: string;
      yAxisName?: string;
      gridIndex?: number;
      gridId?: string;
      gridName?: string;
    },
    // 要被判断的点，为像素坐标值，以 echarts 实例的 dom 节点的左上角为坐标 [0, 0] 点。
    value: Array<unknown>
  ) => boolean;
  // 显示加载动画效果。
  showLoading: (type?: string, opts?: AnyObject) => void;
  hideLoading: () => void;
  // 导出图表图片，返回一个 base64 的 URL，可以设置为Image的src。
  getDataURL: (opts: {
    // 导出的格式，可选 png, jpg, svg
    // 注意：png, jpg 只有在 canvas 渲染器的时候可使用，svg 只有在使用 svg 渲染器的时候可用
    type?: string;
    // 导出的图片分辨率比例，默认为 1。
    pixelRatio?: number;
    // 导出的图片背景色，默认使用 option 里的 backgroundColor
    backgroundColor?: string;
    // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
    excludeComponents?: Array<string>;
  }) => string;
  // 导出联动的图表图片，返回一个 base64 的 url，可以设置为Image的src。导出图片中每个图表的相对位置跟容器的相对位置有关。
  getConnectedDataURL: (opts: {
    // 导出的格式，可选 png, jpeg
    type?: string;
    // 导出的图片分辨率比例，默认为 1。
    pixelRatio?: number;
    // 导出的图片背景色，默认使用 option 里的 backgroundColor
    backgroundColor?: string;
    // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
    excludeComponents?: Array<string>;
  }) => string;
  // 清空当前实例，会移除实例中所有的组件和图表。
  clear: () => void;
  // 销毁实例，销毁后实例无法再被使用。
  dispose: () => void;
}
